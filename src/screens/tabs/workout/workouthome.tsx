import { Entypo } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View, Text, Pressable } from "react-native";
import { useAuth } from "src/libs/auth/auth_provider";
import { getManyWorkouts } from "src/libs/database/functions";
import { WorkoutStackNavigatorParamsList } from "./workout";

function RenderWorkout({ item }: { item: any }) {
    const navigation =
        useNavigation<NavigationProp<WorkoutStackNavigatorParamsList>>();
    return (
        <Pressable
            onPress={() =>
                navigation.navigate("WorkoutContent", { workoutId: item.id })
            }
        >
            <View
                style={{
                    padding: 20,
                    borderWidth: 1,
                    borderColor: "grey",
                    borderRadius: 10,
                }}
            >
                <Text style={{ fontSize: 20, fontWeight: 600 }}>
                    {item.name}
                </Text>
            </View>
        </Pressable>
    );
}

export default function WorkoutHome({ route }: any) {
    const { session } = useAuth();
    const [workouts, setWorkouts] = useState<{ name: string }[]>([]);
    const navigation =
        useNavigation<NavigationProp<WorkoutStackNavigatorParamsList>>();
    useEffect(() => {
        let ignore = false;
        getManyWorkouts(session?.user.id ?? "").then((result) => {
            if (!ignore) {
                if (result !== undefined) {
                    setWorkouts(result);
                }
            }
        });
    }, [route]);

    return (
        <SafeAreaView>
            <View style={{ padding: 20, gap: 20 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={{ fontSize: 35, fontWeight: 700 }}>
                        Workouts
                    </Text>
                    <Pressable
                        onPress={() => navigation.navigate("AddWorkout")}
                    >
                        <View>
                            <Entypo name="plus" size={30} color="black" />
                        </View>
                    </Pressable>
                </View>

                <FlatList
                    data={workouts}
                    renderItem={({ item }) => <RenderWorkout item={item} />}
                    contentContainerStyle={{ gap: 20 }}
                />
            </View>
        </SafeAreaView>
    );
}
