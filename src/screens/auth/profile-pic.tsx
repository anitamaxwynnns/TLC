import {
    ImageBackground,
    Image,
    SafeAreaView,
    View,
    StyleSheet,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Avatar from "../tabs/profile/avatar";
import { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamsList } from "App";
import { Button } from "react-native-paper";

export default function ProfilePic() {
    const navigation =
        useNavigation<NavigationProp<RootStackNavigatorParamsList>>();
    const [avatarUrl, setAvatarUrl] = useState("");

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../../assets/background.png")}
                style={styles.image}
                blurRadius={2}
            >
                <Avatar
                    size={200}
                    url={avatarUrl}
                    onUpload={(url: string) => {
                        setAvatarUrl(url);
                    }}
                />
                <Button
                    onPress={() => navigation.navigate("Main")}
                    mode="contained"
                    theme={{ colors: { primary: "black" } }}
                    style={{marginTop: 50}}
                >{"Next"}</Button>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    image: {
        flex: 1,
        resizeMode: "contain",
        alignItems: "center",
        justifyContent: "center",
    },
    textinput: {
        marginTop: 400,
        justifyContent: "center",
        width: 300,
        marginRight: 20,
    },
    textinput2: {
        marginRight: 20,
        width: 300,
        marginTop: 30,
    },
    button: {
        marginTop: 30,
        marginRight: 15,
    },
});
