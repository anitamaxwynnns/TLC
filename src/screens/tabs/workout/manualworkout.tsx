import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
} from "react-native";
import { getManyExercises } from "src/libs/database/functions";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamsList } from "App";

export default function ManualWorkout() {
    const [exercises, setExercises] = useState<any[]>([]);
    const [selectedExercises, setSelectedExercises] = useState<any[]>([]);
    const navigation = useNavigation<NavigationProp<RootStackNavigatorParamsList>>();

    const HandleExerciseSubmission = () => {
        navigation.navigate("ExerciseSubmission", { selectedExercises });
    };

    useEffect(() => {
        let ignore = false;
        getManyExercises().then((result) => {
            if (!ignore) {
                setExercises(result);
            }
        });
        return () => {
            ignore = true;
        };
    }, []);

    const handleSelectExercise = (exercise) => {
        if (selectedExercises.some((item) => item.name === exercise.name)) {
            setSelectedExercises(
                selectedExercises.filter((item) => item.name !== exercise.name),
            );
        } else {
            setSelectedExercises([
                ...selectedExercises,
                { ...exercise, reps: 10, sets: 1 },
            ]);
        }
    };

    const handleRepsChange = (name, reps) => {
        setSelectedExercises(
            selectedExercises.map((item) =>
                item.name === name
                    ? { ...item, reps: reps ? parseInt(reps) : "" }
                    : item,
            ),
        );
    };

    const handleSetsChange = (name, sets) => {
        setSelectedExercises(
            selectedExercises.map((item) =>
                item.name === name
                    ? { ...item, sets: sets ? parseInt(sets) : "" }
                    : item,
            ),
        );
    };

    const renderExercise = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.exerciseItem,
                selectedExercises.some((ex) => ex.name === item.name) &&
                    styles.selectedExerciseItem,
            ]}
            onPress={() => handleSelectExercise(item)}
        >
            <Text style={styles.exerciseText}>{item.name}</Text>
            <Text style={styles.bodyPart}>{item.muscle}</Text>
        </TouchableOpacity>
    );

    const renderSelectedExercise = ({ item }) => (
        <View key={item.name} style={styles.selectedExerciseItem}>
            <Text style={styles.exerciseText}>{item.name}</Text>
            <Text style={styles.bodyPart}>{item.muscle}</Text>
            <TextInput
                style={styles.input}
                placeholder="Reps"
                keyboardType="numeric"
                value={item.reps.toString()}
                onChangeText={(text) => handleRepsChange(item.name, text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Sets"
                keyboardType="numeric"
                value={item.sets.toString()}
                onChangeText={(text) => handleSetsChange(item.name, text)}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboard}
                keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
            >
                <Text style={styles.header}>Select Exercises</Text>
                <FlatList
                    data={exercises}
                    renderItem={renderExercise}
                    keyExtractor={(item) => item.name}
                />
                {selectedExercises.length > 0 && (
                    <View style={styles.selectedContainer}>
                        <Text>
                            Selected Exercises
                        </Text>
                        <ScrollView style={{flex:1}}>
                            {selectedExercises.map((exercise) =>
                                renderSelectedExercise({ item: exercise }),
                            )}
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={HandleExerciseSubmission}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    keyboard: {
        flex: 1,
        flexGrow: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#000000",
        padding: 15,
        borderRadius: 30,
        marginVertical: 10,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    exerciseItem: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    selectedExerciseItem: {
        backgroundColor: "#cce5ff",
        borderColor: "#0056b3",
    },
    exerciseText: {
        fontSize: 18,
    },
    selectedContainer: {
        maxHeight: 200,
    },
    bodyPart: {
        fontSize: 14,
        color: "#555",
    },
    input: {
        height: 40,
        borderColor: "#ddd",
        borderWidth: 1,
        marginVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 8,
        width: "100%",
    },
});
