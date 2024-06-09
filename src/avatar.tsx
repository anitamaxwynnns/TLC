import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import {
    StyleSheet,
    View,
    Alert,
    Image,
    Button,
    ViewStyle,
    StyleProp,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "./auth_provider";

interface Props {
    size: number;
    url: string | null;
    onUpload: (filePath: string) => void;
    style?: StyleProp<ViewStyle>;
}

export default function Avatar({ url, size = 150, onUpload, style }: Props) {
    const [uploading, setUploading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const avatarSize = { height: size, width: size };
    const {session} = useAuth()

    useEffect(() => {
        if (url) downloadImage(url);
    }, [url]);

    async function downloadImage(path: string) {
        try {
            const { data, error } = await supabase.storage
                .from("avatars")
                .download(path);

            if (error) {
                throw error;
            }

            const fr = new FileReader();
            fr.readAsDataURL(data);
            fr.onload = () => {
                setAvatarUrl(fr.result as string);
            };
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error downloading image: ", error.message);
            }
        }
    }

    async function uploadAvatar() {
        try {
            setUploading(true);

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: false,
                allowsEditing: true,
                quality: 1,
                exif: false,
            });

            if (
                result.canceled ||
                !result.assets ||
                result.assets.length === 0
            ) {
                console.log("User cancelled image picker.");
                return;
            }

            const image = result.assets[0];
            console.log("Got image", image);

            if (!image.uri) {
                throw new Error("No image uri!");
            }

            const arraybuffer = await fetch(image.uri).then((res) =>
                res.arrayBuffer(),
            );

            const fileExt =
                image.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
            const path = `${session?.user.id}/${Date.now()}.${fileExt}`;
            const { data, error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(path, arraybuffer, {
                    contentType: image.mimeType ?? "image/jpeg",
                });

            if (uploadError) {
                throw uploadError;
            }

            onUpload(data.path);
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            } else {
                throw error;
            }
        } finally {
            setUploading(false);
        }
    }

    return (
        <View>
            {avatarUrl ? (
                <Image
                    source={{ uri: avatarUrl }}
                    accessibilityLabel="Avatar"
                    style={[avatarSize, styles.avatar, styles.image]}
                />
            ) : (
                <View style={[avatarSize, styles.avatar, styles.noImage]} />
            )}
            <View>
                <Button
                    title={uploading ? "Uploading ..." : "Upload"}
                    onPress={uploadAvatar}
                    disabled={uploading}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 5,
        overflow: "hidden",
        maxWidth: "100%",
    },
    image: {
        objectFit: "cover",
        paddingTop: 0,
    },
    noImage: {
        backgroundColor: "#333",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgb(200, 200, 200)",
        borderRadius: 5,
    },
});
