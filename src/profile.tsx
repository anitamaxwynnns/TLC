import { supabase } from "./supabase";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, MD2Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Avatar from "./avatar";
import { useAuth } from "./auth_provider";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackNavigatorParamsList } from "../App";

export default function Profile() {
    const navigation =
        useNavigation<StackNavigationProp<RootStackNavigatorParamsList>>();
    const [user, setUser] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [avatarUrl, setAvatarUrl] = useState("");
    const { session } = useAuth();

    async function getUserInfo(): Promise<{ name: string } | undefined> {
        const { data, error } = await supabase
            .from("profile")
            .select("name")
            .eq("user_id", session?.user.id);

        if (error) {
            console.error(error);
            return undefined;
        }
        console.log(data);
        return data[0];
    }
    useEffect(() => {
        let ignore = false;
        getUserInfo().then((result) => {
            if (result === undefined) {
                setUser("Error");
            }
            if (!ignore) {
                setUser(result);
                setLoading(false);
            }
        });
        return () => {
            ignore = true;
        };
    }, []); 

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator animating={true} color={MD2Colors.black} size={'large'} />
            </View>
        );
    }
    async function onPress() {
        await supabase.auth.signOut();
        navigation.navigate("StartScreen");
    }
    return (
        <SafeAreaView style={styles.container}>
            <Avatar
                size={200}
                url={avatarUrl}
                onUpload={(url: string) => {
                    setAvatarUrl(url);
                }}
                style={styles.image}
            />
            <Text style={styles.text}>{user.name}</Text>
            <Button
                mode="contained"
                theme={{ colors: { primary: "black" } }}
                style={styles.button}
                onPress={onPress}
            >
                {"Log Out"}
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    image: {
        marginTop: 100,
    },
    text: {
        fontSize: 35,
        marginTop: 10,
    },
    button: {
        marginTop: 130,
    },
});
