import { Entypo } from "@expo/vector-icons";
import {
    NavigationProp,
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import { getOneWorkout } from "src/libs/database/functions";
import { RootStackNavigatorParamsList } from "./workout";

export default function WorkoutContent() {
    const route = useRoute();
    const { workoutId } = route.params as any;
    const [workout, setWorkout] = useState<any>(undefined);
    const navigation =
        useNavigation<NavigationProp<RootStackNavigatorParamsList>>();

   useEffect(() => {
        let ignore = false;
        getOneWorkout(workoutId).then((result) => {
            if (!ignore) {
                if (result !== undefined) {
                    setWorkout(result);
                }
            }
        });
    }, [workoutId]);

    if (workout === undefined) {
        return <View></View>;
    }

    return (
        <SafeAreaView style={{ height: "100%", width: "100%" }}>
            <View style={{ padding: 20, gap: 10, flex: 1 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Entypo name="chevron-left" size={36} color="black" />
                        <Text style={{ fontSize: 35, fontWeight: 700 }}>
                            {workout.name}
                        </Text>
                    </View>
                </Pressable>
                <FlatList
                    data={workout.workout_exercise}
                    contentContainerStyle={{ gap: 20 }}
                    renderItem={({
                        item,
                    }: {
                        item: {
                            sets: any;
                            reps: any;
                            exercise_table: {
                                name: any;
                                muscle: any;
                            };
                        };
                    }) => (
                        <View
                            style={{
                                borderWidth: 2,
                                borderRadius: 10,
                                gap: 5,
                                padding: 20,
                                borderColor: "grey",
                            }}
                        >
                            <Text style={{ fontSize: 20 }}>
                                {item.exercise_table.name}
                            </Text>
                            <View style={{ flexDirection: "row", gap: 25 }}>
                                <Text style={{ fontSize: 15 }}>
                                    Sets: {item.sets}
                                </Text>
                                <Text style={{ fontSize: 15 }}>
                                    Reps: {item.reps}
                                </Text>
                            </View>
                        </View>
                    )}
                />
            </View>
            <View style={{ paddingBottom: 50, paddingHorizontal: 20 }}>
                <Pressable
                    style={{
                        alignSelf: "center",
                        borderWidth: 2,
                        borderRadius: "100%",
                        padding: 20,
                        backgroundColor: "black",
                        width: "100%",
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 18,
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        Start Workout
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
