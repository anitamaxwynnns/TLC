import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamsList } from "App";
import { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Appbar, Button } from "react-native-paper";
import ImageSelectorProp from "./ImageSelectorProp";

export default function ImageSelector() {
    const navigation =
        useNavigation<NavigationProp<RootStackNavigatorParamsList>>();
    const [avatarUrl, setAvatarUrl] = useState("");
    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.Content title="Select Image" />
            </Appbar.Header>
            <ImageSelectorProp
                size={500}
                url={avatarUrl}
                onUpload={(url: string) => {
                    setAvatarUrl(url);
                }}
            />
            <Button
                onPress={() => navigation.navigate("CreatePost")}
                style={{
                    width: 80,
                    alignSelf: "center",
                    backgroundColor: "black",
                    marginTop: 50,
                }}
                textColor="white"
            >
                Next
            </Button>
        </View>
    );
}
