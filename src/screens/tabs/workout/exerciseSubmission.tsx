import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Alert,
    SafeAreaView,
    Pressable,
    TextInput,
} from "react-native";
import { NavigationProp, useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamsList } from "./workout";
import { useState } from "react";
import { supabase } from "src/libs/database/supabase";

export default function ExerciseSubmission() {
    const route = useRoute();
    const { selectedExercises } = route.params;
    const navigation =
        useNavigation<NavigationProp<RootStackNavigatorParamsList>>();
    const [reps, setReps] = useState("");
    const [sets, setSets] = useState("");
    const [name, setName] = useState("");

    const createWorkout = async () => {
        const res = await supabase
            .from("workout")
            .insert({ name: name })
            .select();
        await supabase.from("workout_exercise").insert(
            selectedExercises.map((exercise: any) => ({
                workout_id: res.data?.at(0).id,
                exercise_id: exercise.id,
                sets: sets,
                reps: reps,
            })),
        );
        Alert.alert(
            "Workout Submitted",
            "Your workout has been successfully submitted!",
            [
                {
                    text: "OK",
                    onPress: () => navigation.navigate("workouthome"),
                },
            ],
        );
    };

    const renderExercise = ({ item }: { item: any }) => (
        <View style={styles.exerciseItem}>
            <View style={{ gap: 2 }}>
                <Text style={styles.exerciseText}>{item.name}</Text>
                <Text style={styles.bodyPart}>{item.muscle}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 20, width: "100%" }}>
                <View
                    style={{
                        flexDirection: "row",
                        gap: 8,
                        alignItems: "center",
                        flex: 1,
                    }}
                >
                    <Text style={styles.repsSets}>Sets</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            height: "auto",
                            padding: 8,
                            borderColor: "grey",
                            flex: 1,
                        }}
                        onChangeText={(sets) => setSets(sets)}
                        keyboardType="numeric"
                    />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        gap: 8,
                        alignItems: "center",
                        flex: 1,
                    }}
                >
                    <Text style={styles.repsSets}>Reps</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            height: "auto",
                            padding: 8,
                            borderColor: "grey",
                            flex: 1,
                        }}
                        onChangeText={(reps) => setReps(reps)}
                    />
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView
            style={{
                height: "100%",
                width: "100%",
            }}
        >
            <View style={styles.container}>
                <Text style={styles.header}>Create Workout</Text>
                <View style={{ gap: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>
                        Name
                    </Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 10,
                            borderColor: "grey",
                        }}
                        onChangeText={(name) => setName(name)}
                    />
                </View>
                <View style={{ gap: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>
                        Exercises
                    </Text>
                    <FlatList
                        data={selectedExercises}
                        renderItem={renderExercise}
                        keyExtractor={(item) => item.name}
                        contentContainerStyle={{ gap: 20 }}
                    />
                </View>
                <Pressable style={styles.button} onPress={createWorkout}>
                    <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 20,
    },
    button: {
        backgroundColor: "#000000",
        padding: 15,
        borderRadius: 30,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    exerciseItem: {
        gap: 16,
        padding: 16,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    exerciseText: {
        fontSize: 18,
    },
    bodyPart: {
        fontSize: 14,
        color: "#555",
    },
    repsSets: {
        fontSize: 16,
        color: "#333",
    },
});
