import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import { getOneWorkout } from "src/libs/database/functions";
import { RootStackNavigatorParamsList } from "./workout";
import { Entypo } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";

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
    checkSet,
}: {
    item: FormattedExercise;
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
                    borderWidth: 2,
                    padding: 10,
                    borderColor: "grey",
                    borderRadius: 10,
                }}
            >
                <View style={{ gap: 5 }}>
                    <Text style={{ fontSize: 24, fontWeight: 500 }}>Sets</Text>
                    {Array.from({ length: item.sets }, (_, i) => (
                        <View key={`${index}-${i}`} style={{}}>
                            <Text style={{ fontSize: 24 }}>{i + 1}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ gap: 5 }}>
                    <Text style={{ fontSize: 24, fontWeight: 500 }}>Reps</Text>
                    {Array.from({ length: item.sets }, (_, i) => (
                        <View key={`${index}-${i}`} style={{}}>
                            <Text style={{ fontSize: 24 }}>{item.reps}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ marginTop: 5 }}>
                    <Entypo
                        name="check"
                        size={24}
                        color="black"
                        style={{ marginLeft: 5 }}
                    />
                    {Array.from({ length: item.sets }, (_, i) => (
                        <View
                            key={`${index}-${i}`}
                            style={{ transform: [{ scale: 1.25 }] }}
                        >
                            <Checkbox.Android
                                status={checked ? "checked" : "unchecked"}
                                onPress={() => setChecked(!checked)}
                            />
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

export default function TrackWorkout({ route }: any) {
    const navigation =
        useNavigation<NavigationProp<RootStackNavigatorParamsList>>();
    const [workouts, setWorkouts] = useState<FormattedExercise[]>([]);
    const { workoutId } = route.params;
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
    }, [workoutId]);

    function checkSet(exerciseIndex: number, setIndex: number) {
        const updated: FormattedExercise[] = JSON.parse(
            JSON.stringify(workouts),
        );
        updated[exerciseIndex].sets[setIndex].checked = true;
        setWorkouts(updated);
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
                renderItem={({ item }) => (
                    <RenderItem item={item} checkSet={checkSet} />
                )}
                keyExtractor={(_, index) => `${index}`}
            />
        </SafeAreaView>
    );
}

// export default function TrackWorkout({ route }: any) {
//     const navigation =
//         useNavigation<NavigationProp<RootStackNavigatorParamsList>>();
//     const [workouts, setWorkouts] = useState<any>([]);
//     const { workoutId } = route.params;
//     useEffect(() => {
//         let ignore = false;
//         getOneWorkout(workoutId).then((result) => {
//             if (!ignore) {
//                 if (result !== undefined) {
//                     setWorkouts(result);
//                 }
//             }
//         });
//         console.log(workouts);
//     }, [workoutId]);
//
//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//             <View style={{ padding: 20 }}>
//                 <Pressable onPress={() => navigation.goBack()}>
//                     <Text style={{ fontSize: 15, fontWeight: 500 }}>Back</Text>
//                 </Pressable>
//             </View>
//             <FlatList
//                 data={workouts.workout_exercise}
//                 contentContainerStyle={{ gap: 20 }}
//                 renderItem={({ item }) => <RenderItem item={item} />}
//                 keyExtractor={(_, index) => `${index}`}
//             />
//         </SafeAreaView>
//     );
// }
