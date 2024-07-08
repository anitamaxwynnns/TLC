import { NavigationProp, useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { RootStackNavigatorParamsList } from "./workout";
import { supabase } from "src/libs/database/supabase";

const renderExercise = ({ item }) => (
    <View
        style={{
            borderWidth: 2,
            borderRadius: 10,
            gap: 5,
            padding: 20,
            borderColor: "grey",
        }}
    >
        <Text style={{ fontSize: 20 }}>{item.name}</Text>
        <Text style={{ fontSize: 15 }}>{item.muscle}</Text>
        <View style={{ flexDirection: "row", gap: 25 }}>
            <Text style={{ fontSize: 15 }}>Sets: {item.sets}</Text>
            <Text style={{ fontSize: 15 }}>Reps: {item.reps}</Text>
        </View>
    </View>
);

export default function AiWorkoutSubmission() {
    const route = useRoute();
    const { workout: workoutParam } = route.params;
    const workout = JSON.parse(workoutParam);
    const navigation =
        useNavigation<NavigationProp<RootStackNavigatorParamsList>>();

    const GoHome = async () => {
        const newWorkout = await supabase
            .from("workout")
            .insert({ name: workout.name })
            .select();
        await supabase.from("workout_exercise").insert(
            workout.exercises.map((exercise: any) => ({
                workout_id: newWorkout.data?.at(0).id,
                exercise_id: exercise.id,
                sets: exercise.sets,
                reps: exercise.reps,
            })),
        );
        navigation.navigate("workouthome", { refresh: true });
    };

    return (
        <SafeAreaView style={{ height: "100%", width: "100%" }}>
            <View style={{ paddingHorizontal: 20, gap: 20, flex: 1 }}>
                <Text style={{ fontSize: 35, fontWeight: 700 }}>
                    {workout.name}
                </Text>
                <FlatList
                    data={workout.exercises}
                    renderItem={renderExercise}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ gap: 20 }}
                    ListFooterComponent={
                        <View
                            style={{
                                gap: 5,
                                paddingBottom: 20,
                                flexDirection: "row",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    backgroundColor: "white",
                                    padding: 15,
                                    borderRadius: 30,
                                    alignItems: "center",
                                }}
                                onPress={() => navigation.goBack()}
                            >
                                <Text
                                    style={{
                                        color: "black",
                                        fontSize: 18,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Back
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    backgroundColor: "black",
                                    padding: 15,
                                    borderRadius: 30,
                                    alignItems: "center",
                                }}
                                onPress={GoHome}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: 18,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Save
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
}
