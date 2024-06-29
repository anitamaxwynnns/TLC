import { AntDesign, Entypo } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamsList } from "App";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    Pressable,
    Image,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useAuth } from "src/libs/auth/auth_provider";
import { getProfilePicUrl } from "src/libs/database/functions";
import { supabase } from "src/libs/database/supabase";

type Post = {
    id: number;
    author_id: string;
    created_at: string;
    comments: number;
    body: string;
    image_url: string;
};

function RenderPost({ post }: { post: Post }) {
    const [authorName, setAuthorName] = useState("");
    const [commentCount, setCommentCount] = useState(0);
    const { session } = useAuth();
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        let ignore = false;
        supabase
            .from("likes")
            .select("*", { head: true, count: "exact" })
            .eq("post_id", post.id)
            .eq("user_id", session?.user.id)
            .then((result) => {
                if (!ignore) {
                    if (result !== undefined && result.count !== null) {
                        setLiked(result.count > 0);
                        setLikes(result.count);
                    }
                }
            });
        return () => {
            ignore = false;
        };
    }, []);

    function HandleLike() {
        if (liked === false) {
            supabase
                .from("likes")
                .insert({ post_id: post.id, user_id: session?.user.id });
        }
    }
    useEffect(() => {
        let ignore = false;
        supabase
            .from("profile")
            .select("name")
            .eq("user_id", post.author_id)
            .then((result) => {
                if (!ignore) {
                    if (result !== undefined && result.data !== null) {
                        setAuthorName(result.data[0].name);
                    }
                }
            });
        supabase
            .from("comments")
            .select("*", { head: true, count: "exact" })
            .eq("post_id", post.id)
            .then((result) => {
                if (!ignore) {
                    if (result !== undefined && result.count !== null) {
                        setCommentCount(result.count);
                    }
                }
            });
        return () => {
            ignore = false;
        };
    }, []);
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
                        source={{
                            uri: getProfilePicUrl(post.author_id ?? ""),
                        }}
                    />
                    <View style={{ gap: 10 }}>
                        <Text>{authorName}</Text>
                        <Text>
                            {new Date(post.created_at).toLocaleString()}
                        </Text>
                    </View>
                </View>
                <View>
                    <Image
                        source={{ uri: post.image_url }}
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
                    <Pressable onPress={HandleLike}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 5,
                            }}
                        >
                            <AntDesign name="like2" size={20} color="black" />
                            <Text>{likes}</Text>
                        </View>
                    </Pressable>
                    <View>
                        <Text>{commentCount} comment</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default function Forum() {
    const [data, setData] = useState<Post[]>([]);
    useEffect(() => {
        let ignore = false;
        supabase
            .from("posts")
            .select("*")
            .then((result) => {
                if (!ignore) {
                    if (result !== undefined && result.data !== null) {
                        setData(result.data);
                    }
                }
            });
        return () => {
            ignore = false;
        };
    }, []);
    const navigation =
        useNavigation<NavigationProp<RootStackNavigatorParamsList>>();
    return (
        <SafeAreaView style={{ flex: 1 }}>
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
