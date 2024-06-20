import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamsList } from "App";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "src/libs/database/supabase";
import { View, Button, TextInput, Image } from "react-native";

export default function CreatePostScreen() {
    const navigation =
        useNavigation<NavigationProp<RootStackNavigatorParamsList>>();
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [userId, setUserId] = useState("");

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(null);
        }
    };

    const uploadImage = async () => {
        if (!image) return;

        const response = await fetch(image);
        const blob = await response.blob();
        const { data, error } = await supabase.storage
            .from("images")
            .upload(`public/${Date.now()}.jpg`, blob, {
                cacheControl: "3600",
                upsert: false,
            });
        if (error) {
            console.log("Error uploading image:", error);
        } else {
            const imageUrl = `${supabase.storageUrl}/public/${data.Key}`;
            createPost(imageUrl);
        }
    };
    const createPost = async (imageUrl: string) => {
        const { error } = await supabase
            .from("posts")
            .insert([{ image_url: imageUrl, caption, user_id: userId }]);

        if (error) {
            console.log("Error creating post:", error.message);
        } else {
            navigation.goBack();
        }
    };
    return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <TextInput
        placeholder="Write a caption..."
        value={caption}
        onChangeText={setCaption}
      />
      <Button title="Post" onPress={uploadImage} />
    </View>
  );
}
