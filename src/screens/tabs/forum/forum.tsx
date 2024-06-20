import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Alert,
    AppState,
    FlatList,
    Button,
    Image,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {  TextInput } from "react-native-paper";
import { supabase } from "src/libs/database/supabase";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackNavigatorParamsList } from "App";

type Post = {
    id: string;
    image_url: string;
    caption: string;
    likes: number;
    profile: {
        name: string;
    };
};

export default function Forum() {
    const navigation =
        useNavigation<NavigationProp<RootStackNavigatorParamsList>>();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        let {data: Post, error } = await supabase.from('posts').select('id, image_url, caption, likes, profile (name)');
        if (error) console.log('error', error);
        else setPosts(posts);
    };

    const likePosts = async (postId: string, currentLikes: number) => {
        let { error } = await supabase.from('posts').update({ likes: currentLikes + 1 })
        .eq('id', postId);
    if (!error) fetchPosts();
    }
    
     return (
    <View>
      <Button title="Create Post" onPress={() => navigation.navigate('CreatePost')} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.image_url }} style={{ width: 100, height: 100 }} />
            <Text>{item.caption}</Text>
            <Text>Posted by: {item.profile.name}</Text>
            <Button title="Like" onPress={() => likePosts(item.id, item.likes)} />
            <Text>{item.likes} Likes</Text>
          </View>
        )}
      />
    </View>
  );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderText: {
        fontSize: 30,
        fontWeight: "bold",
    },
});
