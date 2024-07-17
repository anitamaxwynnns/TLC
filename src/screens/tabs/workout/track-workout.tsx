import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import { getOneWorkout } from "src/libs/database/functions";
import { RootStackNavigatorParamsList } from "./workout";
import { Entypo } from "@expo/vector-icons";

type Exercises = {
    exercise_id: number;
    sets: number;
    reps: number;
};

function renderItem({
    item,
    index,
}: {
    item: {
        sets: any;
        reps: any;
        exercise_table: {
            name: any;
            muscle: any;
        };
    };
    index: number;
}) {
    return (
        <View key={index} style={{ gap: 10, padding: 10 }}>
            <View>
                <Text style={{ fontSize: 20, fontWeight: 500 }}>
                    {item.exercise_table.name}
                </Text>
            </View>
            <View
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
                <View style={{ alignItems: "center", gap: 5 }}>
                    <Text style={{ fontSize: 18, fontWeight: 500 }}>Sets</Text>
                    {Array.from({ length: item.sets }, (_, i) => (
                        <View key={`${index}-${i}`} style={{}}>
                            <Text style={{ fontSize: 15 }}>{i + 1}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ alignItems: "center", gap: 5 }}>
                    <Text style={{ fontSize: 18, fontWeight: 500 }}>Reps</Text>
                    {Array.from({ length: item.sets }, (_, i) => (
                        <View key={`${index}-${i}`} style={{}}>
                            <Text style={{ fontSize: 15 }}>{item.reps}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ alignItems: "center", gap: 5 }}>
                    <Entypo name="check" size={24} color="black" />
                    {Array.from({ length: item.sets }, (_, i) => (
                        <View key={`${index}-${i}`} style={{}}>
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
    const [workouts, setWorkouts] = useState<any>([]);
    const { workoutId } = route.params;
    useEffect(() => {
        let ignore = false;
        getOneWorkout(workoutId).then((result) => {
            if (!ignore) {
                if (result !== undefined) {
                    setWorkouts(result);
                }
            }
        });
        console.log(workouts);
    }, [workoutId]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ padding: 20 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 15, fontWeight: 500 }}>Back</Text>
                </Pressable>
            </View>
            <FlatList
                data={workouts.workout_exercise}
                contentContainerStyle={{ gap: 20 }}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
}
