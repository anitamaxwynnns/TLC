import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import { getOneWorkout } from "src/libs/database/functions";
import { supabase } from "src/libs/database/supabase";
import { RootStackNavigatorParamsList } from "./workout";

type Exercises = {
    exercise_id: number;
    sets: number;
    reps: number;
};

function renderExercise({ item }: { item: Exercises }) {
    return <View></View>;
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
        <SafeAreaView>
            <View style={{padding: 20}}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={{fontSize: 15, fontWeight: 500 }}>Back</Text>
                </Pressable>
            </View>
            <FlatList
                data={workouts.workout_exercise}
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
                            <Text>Set 1</Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
