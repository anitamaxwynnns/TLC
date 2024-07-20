import { supabase } from "src/libs/database/supabase";
import { View, Text, SafeAreaView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAuth } from "src/libs/auth/auth_provider";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackNavigatorParamsList } from "App";
import { getProfilePicUrl } from "src/libs/database/functions";
import { Avatar as PaperAvatar } from "react-native-paper";
import { WorkoutStackNavigatorParamsList } from "../workout/workout";
export default function Profile() {
    const navigation =
        useNavigation<StackNavigationProp<RootStackNavigatorParamsList>>();
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState("");
    const { session } = useAuth();

    async function getUserInfo(): Promise<{ name: string } | null> {
        if (!session?.user?.id) {
            return null;
        }

        const { data, error } = await supabase
            .from("profile")
            .select("name")
            .eq("user_id", session.user.id);

        if (error) {
            console.error(error);
            return null;
        }
        return data.length > 0 ? data[0] : null;
    }

    useEffect(() => {
        let ignore = false;
        getUserInfo().then((result) => {
            if (!ignore) {
                setUser(result);
                setLoading(false);
            }
        });
        return () => {
            ignore = true;
        };
    }, []);

    if (loading) {
        return (
            <View>
                <ActivityIndicator
                    animating={true}
                    color={MD2Colors.black}
                    size={"large"}
                />
            </View>
        );
    }

    async function onPress() {
        await supabase.auth.signOut();
        navigation.navigate("StartScreen");
    }

    function RenderCalendar() {
        navigation.navigate("Calendar");
    }

    return (
        <SafeAreaView
            style={{
                alignItems: "center",
                gap: 20,
                backgroundColor: "white",
                flex: 1,
            }}
        >
            <View style={{ alignItems: "center", padding: 60, gap: 20 }}>
                <PaperAvatar.Image
                    source={{ uri: getProfilePicUrl(session?.user.id ?? "") }}
                    size={200}
                />
                <Text style={{ fontSize: 40, fontWeight: 500 }}>
                    {user?.name}
                </Text>
                <View style={{ paddingTop: 30, gap: 10 }}>
                    <Pressable
                        onPress={RenderCalendar}
                        style={{
                            backgroundColor: "black",
                            borderRadius: 20,
                            padding: 20,
                        }}
                    >
                        <Text style={{ fontSize: 20, color: "white" }}>
                            {" "}
                            View Calendar
                        </Text>
                    </Pressable>
                    <View style={{ paddingTop: 30 }}>
                        <Pressable
                            onPress={() =>
                                navigation.navigate("WorkoutHistory")
                            }
                            style={{
                                backgroundColor: "black",
                                borderRadius: 20,
                                padding: 20,
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: "white", fontSize: 20 }}>
                                Workout History
                            </Text>
                        </Pressable>
                    </View>
                    <View style={{ paddingTop: 180, paddingHorizontal: 45 }}>
                        <Pressable
                            onPress={onPress}
                            style={{
                                backgroundColor: "black",
                                borderRadius: 20,
                                paddingTop: 10,
                                paddingBottom: 10,
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: "white", fontSize: 15 }}>
                                Log Out
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
