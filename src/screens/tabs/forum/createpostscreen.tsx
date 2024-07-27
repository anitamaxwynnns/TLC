import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamsList } from "App";
import { useState } from "react";
import { SafeAreaView, Text, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useAuth } from "src/libs/auth/auth_provider";
import { supabase } from "src/libs/database/supabase";

export default function CreatePost({ route }: any) {
    const { imageUrl } = route.params;
    const navigation = useNavigation<NavigationProp<RootStackNavigatorParamsList>>();
    const [text, setText] = useState("");
    const { session } = useAuth();

    async function HandlePost() {
        await supabase.from("posts").insert({
            author_id: session?.user.id,
            body: text,
            image_url: imageUrl,
        });
        navigation.navigate("Forum", { refresh: true });
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <SafeAreaView style={{ padding: 10, justifyContent: "center", flex: 1 }}>
                    <View style={{ justifyContent: "center", flexDirection: "row" }}>
                        <Text style={{ fontSize: 30 }}>{"Write your Caption"}</Text>
                    </View>
                    <View style={{ padding: 30 }}>
                        <TextInput
                            style={{ height: 150, backgroundColor: "white" }}
                            multiline
                            numberOfLines={100}
                            mode="outlined"
                            value={text}
                            onChangeText={(text) => setText(text)}
                        />
                    </View>
                    <Button
                        mode="contained"
                        onPress={HandlePost}
                        style={{ width: 100, alignSelf: "center" }}
                        theme={{ colors: { primary: "black" } }}
                    >
                        Submit
                    </Button>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
