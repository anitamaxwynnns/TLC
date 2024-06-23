import { AntDesign, Entypo } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamsList } from "App";
import { View, Text, SafeAreaView, FlatList, Pressable } from "react-native";
import { Avatar } from "react-native-paper";

type Post = {
    authorid: string;
    date: Date;
    likes: number;
    comments: number;
    body: string;
};

const data: Post[] = [
    {
        authorid: "22e75c13-d542-4dec-96d2-0b84256153c4",
        date: new Date(),
        likes: 0,
        comments: 0,
        body: "noob",
    },
    {
        authorid: "22e75c13-d542-4dec-96d2-0b84256153c4",
        date: new Date(),
        likes: 0,
        comments: 0,
        body: "noob",
    },
    {
        authorid: "22e75c13-d542-4dec-96d2-0b84256153c4",
        date: new Date(),
        likes: 0,
        comments: 0,
        body: "noob",
    },
];

function RenderPost({ post }: { post: Post }) {
    return (
        <View style={{ backgroundColor: "white", borderRadius: 30 }}>
            <View style={{ padding: 20, gap: 30 }}>
                <View
                    style={{
                        flexDirection: "row",
                        gap: 30,
                        alignItems: "center",
                    }}
                >
                    <Avatar.Image
                        source={require("../../../../assets/background.png")}
                    />
                    <View style={{ gap: 10 }}>
                        <Text>john doe</Text>
                        <Text>{post.date.toLocaleString()}</Text>
                    </View>
                </View>
                <View>
                    <Text>{post.body}</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Pressable>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 5,
                            }}
                        >
                            <AntDesign name="like2" size={20} color="black" />
                            <Text>{post.likes}</Text>
                        </View>
                    </Pressable>
                    <View>
                        <Text>{post.comments} comment</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default function Forum() {
    const navigation = useNavigation<NavigationProp<RootStackNavigatorParamsList>>();
    return (
        <SafeAreaView>
            <View
                style={{
                    alignItems: "flex-end",
                    padding: 10,
                    paddingRight: 20,
                }}
            >
                <Pressable onPress={() => navigation.navigate('CreatePost')}>
                    <View>
                        <Entypo name="plus" size={30} color="black" />
                    </View>
                </Pressable>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => <RenderPost post={item} />}
                contentContainerStyle={{ gap: 10 }}
            />
        </SafeAreaView>
    );
}
