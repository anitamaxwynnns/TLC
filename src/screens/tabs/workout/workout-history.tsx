import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamsList } from "App";
import { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import { supabase } from "src/libs/database/supabase";

function renderItem({
    item,
}: {
    item: {
        created_at: Date;
        workout: {
            name: string;
        };
    };
}) {
    return (
        <View
            style={{
                marginHorizontal: 10,
                paddingHorizontal: 35,
                padding: 20,
                gap: 10,
                borderRadius: 10,
                borderColor: "gray",
                borderWidth: 1,
            }}
        >
            <Text style={{ fontSize: 20, fontWeight: 500 }}>
                {item.workout.name}
            </Text>
            <Text>
                Completed on: {new Date(item.created_at).toLocaleString()}
            </Text>
        </View>
    );
}

export default function WorkoutHistory() {
    const [history, setHistory] = useState<any[] | null>([]);
    const navigation =
        useNavigation<NavigationProp<RootStackNavigatorParamsList>>();
    useEffect(() => {
        let ignore = false;
        supabase
            .from("track_workout")
            .select("created_at, workout (name)")
            .order("created_at", { ascending: false })
            .then((result) => {
                if (!ignore) {
                    if (result.data !== undefined) {
                        setHistory(result.data);
                    }
                }
            });
        return () => {
            ignore = true;
        };
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ gap: 10, flex: 1 }}>
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={{ padding: 20 }}
                >
                    <Text style={{ fontSize: 15 }}>Back</Text>
                </Pressable>
                <View>
                    <Text style={{ fontSize: 30, paddingLeft: 20, fontWeight: 600 }}>Completed Workouts</Text>
                </View>
                <FlatList
                    data={history}
                    renderItem={renderItem}
                    contentContainerStyle={{ gap: 10 }}
                />
            </View>
        </SafeAreaView>
    );
}
