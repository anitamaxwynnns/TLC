import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
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
    Modal,
} from "react-native";
import { Avatar, TextInput } from "react-native-paper";
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

type Comment = {
    id: number;
    post_id: number;
    created_at: string;
    author_id: string;
    body: string;
};

function RenderPost({
    post,
    openCommentModal,
}: {
    post: Post;
    openCommentModal: (postId: number) => void;
}) {
    const [authorName, setAuthorName] = useState("");
    const [commentCount, setCommentCount] = useState(0);
    const { session } = useAuth();
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);

    async function HandleLike() {
        if (!liked) {
            await supabase
                .from("likes")
                .insert({ post_id: post.id, user_id: session?.user.id });
        } else {
            await supabase
                .from("likes")
                .delete()
                .eq("post_id", post.id)
                .eq("user_id", session?.user.id);
        }
        supabase
            .from("likes")
            .select("*", { head: true, count: "exact" })
            .eq("post_id", post.id)
            .eq("user_id", session?.user.id)
            .then((result) => {
                if (result !== undefined && result.count !== null) {
                    setLiked(result.count > 0);
                    setLikes(result.count);
                }
            });
    }

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
                            {liked ? (
                                <AntDesign
                                    name="like1"
                                    size={20}
                                    color="black"
                                />
                            ) : (
                                <AntDesign
                                    name="like2"
                                    size={20}
                                    color="black"
                                />
                            )}
                            <Text>{likes}</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => openCommentModal(post.id)}>
                        <View>
                            <Text>{commentCount} comment</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

function CommentModal({
    postId,
    visible,
    closeCommentModal,
}: {
    postId: number | null;
    visible: boolean;
    closeCommentModal: () => void;
}) {
    const [text, setText] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const { session } = useAuth();

    useEffect(() => {
        let ignore = false;
        supabase
            .from("comments")
            .select("*")
            .eq("post_id", postId)
            .then((result) => {
                if (!ignore) {
                    setComments(result.data ?? []);
                }
            });
    }, [postId]);

    async function handleComment() {
        await supabase.from("comments").insert({
            author_id: session?.user.id,
            body: text,
            post_id: postId,
        });
        supabase
            .from("comments")
            .select("*")
            .eq("post_id", postId)
            .then((result) => {
                setComments(result.data ?? []);
            });
        setText("");
    }

    return (
        <Modal visible={visible} animationType="slide">
            <SafeAreaView>
                <Pressable
                    onPress={closeCommentModal}
                    style={{
                        alignSelf: "flex-end",
                        paddingRight: 20,
                        paddingBottom: 10,
                    }}
                >
                    <AntDesign name="close" size={24} color="black" />
                </Pressable>
                <View
                    style={{
                        paddingLeft: 20,
                        paddingRight: 20,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 20,
                    }}
                >
                    <TextInput
                        mode="outlined"
                        label="Add a comment..."
                        value={text}
                        onChangeText={(text) => setText(text)}
                        style={{ flex: 1 }}
                        activeOutlineColor="black"
                        outlineColor="black"
                    />
                    <Pressable onPress={handleComment}>
                        <View>
                            <Ionicons
                                name="send-sharp"
                                size={30}
                                color="black"
                            />
                        </View>
                    </Pressable>
                </View>
                {postId !== null && (
                    <FlatList
                        data={comments}
                        renderItem={({ item }) => <RenderComment item={item} />}
                    />
                )}
            </SafeAreaView>
        </Modal>
    );
}

function RenderComment({ item }: { item: Comment }) {
    const [authorName, setAuthorName] = useState("");

    useEffect(() => {
        let ignore = false;
        supabase
            .from("profile")
            .select("name")
            .eq("user_id", item.author_id)
            .then((result) => {
                if (!ignore) {
                    if (result !== undefined && result.data !== null) {
                        setAuthorName(result.data[0].name);
                    }
                }
            });
        return () => {
            ignore = false;
        };
    }, []);

    return (
        <View style={{ flexDirection: "row", gap: 20, padding: 20 }}>
            <Avatar.Image
                source={{ uri: getProfilePicUrl(item.author_id ?? "") }}
            />
            <View style={{ gap: 10 }}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                    <Text style={{fontWeight:500}}>{authorName}</Text>
                    <Text>{new Date(item.created_at).toLocaleString()}</Text>
                </View>
                <Text>{item.body}</Text>
            </View>
        </View>
    );
}

export default function Forum() {
    const [data, setData] = useState<Post[]>([]);
    const [visible, setVisible] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

    const navigation =
        useNavigation<NavigationProp<RootStackNavigatorParamsList>>();

    function openCommentModal(postId: number) {
        setVisible(true);
        setSelectedPostId(postId);
    }

    function closeCommentModal() {
        setVisible(false);
        setSelectedPostId(null);
    }

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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    alignItems: "flex-end",
                    padding: 10,
                    paddingRight: 20,
                    paddingLeft: 20,
                    justifyContent: "space-between",
                    alignContent: "center",
                    flexDirection: "row",
                }}
            >
                <Text style={{ fontSize: 35, fontWeight: "700" }}>Forum</Text>
                <Pressable onPress={() => navigation.navigate("ImageSelector")}>
                    <View>
                        <Entypo name="plus" size={30} color="black" />
                    </View>
                </Pressable>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <RenderPost
                        openCommentModal={openCommentModal}
                        post={item}
                    />
                )}
                contentContainerStyle={{ gap: 10 }}
            />
            <CommentModal
                postId={selectedPostId}
                visible={visible}
                closeCommentModal={closeCommentModal}
            />
        </SafeAreaView>
    );
}
