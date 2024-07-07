import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
} from "react-native";
import { getManyExercises } from "src/libs/database/functions";
import axios from "axios";

async function generateWorkout(exercisePrompt: string, userPrompt: string) {
    const prompt = `
Here is a comma separated table of exercises with the columns:

'''
id,name,muscle_group
${exercisePrompt}
'''

User prompt:

'''
${userPrompt}
'''

Create a workout plan with up to 5 exercises based on the user prompt using the provided exercises.

Return the workout in the following JSON format:

'''
{
  "name": "example workout",
  "exercises": [
    {
      "id": "ID of the exercise from the comma separated table",
      "name": "name of the exercise from the comma separated table",
      "muscle": "muscle of the exercise from the comma separated table",
      "sets": "number of sets",
      "reps": "number of reps"
    }
  ]
}
'''
`;

    const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: prompt }],
            n: 1,
            stop: null,
            temperature: 0.7,
            response_format: { type: "json_object" },
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
        },
    );

    return response.data.choices[0].message.content;
}

export default function AiWorkout({ navigation }) {
    const [prompt, setPrompt] = useState("");
    const [workout, setWorkout] = useState(null);
    const [exercises, setExercises] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let ignore = false;
        getManyExercises().then((result) => {
            if (!ignore && result.length > 0) {
                setExercises(result);
            }
        });
    }, []);

    const exercisePrompt = useMemo(
        () =>
            exercises
                .map(
                    (exercise) =>
                        `${exercise.id},${exercise.name},${exercise.muscle}`,
                )
                .join("\n"),
        [exercises],
    );

    const fetchWorkout = async () => {
        setLoading(true);
        const workout = await generateWorkout(exercisePrompt, prompt);
        navigation.navigate("AiWorkoutSubmission", {
            workout: workout,
        });
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.placeholderText}>AI Generated Workout</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your prompt"
                    value={prompt}
                    onChangeText={setPrompt}
                />
                <TouchableOpacity style={styles.button} onPress={fetchWorkout}>
                    <Text style={styles.buttonText}>Generate Workout</Text>
                </TouchableOpacity>
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderText: {
        fontSize: 30,
        fontWeight: "bold",
    },
    content: {
        alignItems: "center",
        width: "80%",
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: "100%",
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
    workoutText: {
        marginTop: 20,
        fontSize: 16,
        textAlign: "center",
    },
});
