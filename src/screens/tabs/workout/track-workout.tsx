import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import { getOneWorkout } from "src/libs/database/functions";
import { WorkoutStackNavigatorParamsList } from "./workout";
import { Entypo } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";
import { supabase } from "src/libs/database/supabase";
import { useAuth } from "src/libs/auth/auth_provider";

type FormattedExercise = {
    name: string;
    muscle: string;
    sets: {
        set: number;
        reps: number;
        checked: boolean;
    }[];
};

function RenderItem({
    item,
    exerciseIndex,
    checkSet,
}: {
    item: FormattedExercise;
    exerciseIndex: number;
    checkSet: any;
}) {
    return (
        <View style={{ gap: 10, padding: 10 }}>
            <View style={{ paddingLeft: 10 }}>
                <Text style={{ fontSize: 25, fontWeight: 500 }}>
                    {item.name}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    gap: 60,
                    padding: 10,
                    paddingRight: 30,
                }}
            >
                <Text style={{ fontSize: 24, fontWeight: 500 }}>Sets</Text>
                <Text style={{ fontSize: 24, fontWeight: 500 }}>Reps</Text>
                <Entypo
                    name="check"
                    size={24}
                    color="black"
                    style={{ marginLeft: 5 }}
                />
            </View>
            {item.sets.map((set, setIndex) => (
                <View
                    key={`${exerciseIndex}:${setIndex}`}
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        gap: 60,
                        padding: 10,
                        alignItems: "center",
                    }}
                >
                    <View style={{ gap: 5 }}>
                        <Text style={{ fontSize: 20 }}>{set.set}</Text>
                    </View>
                    <View style={{ gap: 5 }}>
                        <Text style={{ fontSize: 20 }}>{set.reps}</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <View style={{ transform: [{ scale: 1.25 }] }}>
                            <Checkbox.Android
                                status={set.checked ? "checked" : "unchecked"}
                                onPress={() =>
                                    checkSet(exerciseIndex, setIndex)
                                }
                                color="black"
                                uncheckedColor="black"
                            />
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
}

export default function TrackWorkout({ route }: any) {
    const navigation =
        useNavigation<NavigationProp<WorkoutStackNavigatorParamsList>>();
    const [workouts, setWorkouts] = useState<FormattedExercise[]>([]);
    const { workoutId } = route.params;
    const { session } = useAuth();

    useEffect(() => {
        let ignore = false;
        getOneWorkout(workoutId).then((result) => {
            if (!ignore) {
                if (result !== undefined) {
                    const formatted: FormattedExercise[] =
                        result.workout_exercise.map((val) => {
                            const exercise: FormattedExercise = {
                                name: val.exercise_table.name,
                                muscle: val.exercise_table.muscle,
                                sets: [],
                            };
                            for (let i = 1; i <= val.sets; ++i) {
                                exercise.sets = [
                                    ...exercise.sets,
                                    {
                                        set: i,
                                        reps: val.reps,
                                        checked: false,
                                    },
                                ];
                            }
                            return exercise;
                        });
                    setWorkouts(formatted);
                }
            }
        });
        return () => {
            ignore = true;
        };
    }, [workoutId]);

    const isFinished = useMemo(
        () =>
            workouts.every((exercise) =>
                exercise.sets.every((set) => set.checked),
            ),
        [workouts],
    );

    function checkSet(exerciseIndex: number, setIndex: number) {
        const updated: FormattedExercise[] = JSON.parse(
            JSON.stringify(workouts),
        );
        updated[exerciseIndex].sets[setIndex].checked =
            !updated[exerciseIndex].sets[setIndex].checked;
        setWorkouts(updated);
    }

    async function handleWorkoutSubmit() {
        await supabase.from("track_workout").insert({ workout_id: workoutId });
        navigation.navigate("FinishWorkout");
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ padding: 20 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 15, fontWeight: 500 }}>Back</Text>
                </Pressable>
            </View>
            <FlatList
                data={workouts}
                contentContainerStyle={{ gap: 20 }}
                renderItem={({ item, index }) => (
                    <RenderItem
                        item={item}
                        exerciseIndex={index}
                        checkSet={checkSet}
                    />
                )}
                keyExtractor={(_, index) => `${index}`}
                ListFooterComponent={
                    <View style={{ paddingBottom: 20, paddingHorizontal: 20 }}>
                        <Pressable
                            disabled={!isFinished}
                            style={{
                                backgroundColor: isFinished ? "black" : "gray",
                                borderRadius: 200,
                                padding: 20,
                                width: "100%",
                            }}
                            onPress={handleWorkoutSubmit}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    alignSelf: "center",
                                    fontSize: 18,
                                    fontWeight: 700,
                                }}
                            >
                                Finish Workout
                            </Text>
                        </Pressable>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
