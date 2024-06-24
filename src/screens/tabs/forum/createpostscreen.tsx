import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamsList } from "App";
import { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Button, TextInput } from "react-native-paper";
export default function CreatePost() {
    const navigation = useNavigation<NavigationProp<RootStackNavigatorParamsList>>();
    const [text, setText] = useState('')
    return (
        <SafeAreaView style={{ padding: 10, justifyContent: "center", flex:1 }}>
            <View style={{justifyContent:'center', flexDirection:'row'}}>
                <Text style={{fontSize:30}}>{"Create your Post"}</Text>
            </View>
            <View style={{padding:30}}>
                <TextInput
                    style={{ height: 150, backgroundColor: "white" }}
                    multiline
                    numberOfLines={100}
                    mode="outlined"
                    value={text}
                    onChangeText={text => setText(text)}
                />
            </View>
            <Button mode="contained" onPress={() => navigation.goBack()} style={{width:100, alignSelf:'center'}}>Submit</Button>
        </SafeAreaView>
    );
}
