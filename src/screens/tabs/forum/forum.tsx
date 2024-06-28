import { AntDesign, Entypo } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamsList } from "App";
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    Pressable,
    Image,
} from "react-native";
import { Avatar } from "react-native-paper";

type Post = {
    authorid: string;
    date: Date;
    likes: number;
    comments: number;
    body: string;
    imageurl: string;
};

const data: Post[] = [
    {
        authorid: "22e75c13-d542-4dec-96d2-0b84256153c4",
        date: new Date(),
        likes: 0,
        comments: 0,
        body: "noob",
        imageurl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzMFZxkerYDuRn7B2oD4pmdWtigvi3pTH5pA&s",
    },
    {
        authorid: "22e75c13-d542-4dec-96d2-0b84256153c4",
        date: new Date(),
        likes: 0,
        comments: 0,
        body: "noob",
        imageurl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzMFZxkerYDuRn7B2oD4pmdWtigvi3pTH5pA&s",
    },
    {
        authorid: "22e75c13-d542-4dec-96d2-0b84256153c4",
        date: new Date(),
        likes: 0,
        comments: 0,
        body: "noob",
        imageurl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzMFZxkerYDuRn7B2oD4pmdWtigvi3pTH5pA&s",
    },
];

function RenderPost({ post }: { post: Post }) {
    return (
        <View style={{ backgroundColor: "white", borderRadius: 30 }}>
            <View style={{ padding: 20, gap: 10 }}>
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
                    <Image
                        source={{ uri: post.imageurl }}
                        style={{ height: 400, width: 400, alignSelf: "center" }}
                        resizeMode="contain"
                    />
                    <Text
                        style={{
                            fontSize: 20,
                            alignSelf: "auto",
                            paddingTop: 10,
                        }}
                    >
                        {post.body}
                    </Text>
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
    const navigation =
        useNavigation<NavigationProp<RootStackNavigatorParamsList>>();
    return (
        <SafeAreaView>
            <View
                style={{
                    alignItems: "flex-end",
                    padding: 10,
                    paddingRight: 20,
                }}
            >
                <Pressable onPress={() => navigation.navigate("ImageSelector")}>
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
