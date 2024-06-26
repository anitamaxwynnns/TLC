import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamsList } from "App";
import { SafeAreaView, Text, View } from "react-native";
import { Appbar, Button } from "react-native-paper";

export default function ImageSelector() {
    const navigation =
        useNavigation<NavigationProp<RootStackNavigatorParamsList>>();
    return (
        <View style={{flex:1}}>
        <Appbar.Header>
            <Appbar.Content title='Select Image' />
        </Appbar.Header>
            <Button onPress={() => navigation.navigate('CreatePost')}>Next</Button>
        </View>
    );
}
