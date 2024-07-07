import { Pressable } from "react-native";
import { supabase } from "./supabase";

export async function getManyExercises() {
    const { data, error } = await supabase
        .from("exercise_table")
        .select("id,name,muscle,first_letter,instructions");
    if (error) {
        console.error(error);
        return [];
    }
    return data;
}

export async function getOneExercise(name: string) {
    const { data, error } = await supabase
        .from("exercise_table")
        .select("name,muscle,first_letter,instructions")
        .eq("name", name);
    if (error) {
        console.error(error);
        throw error;
    }
    const exercise = data[0];
    const fileName = `${(exercise.name as string).toLowerCase().split(" ").join("-")}.gif`;
    const {
        data: { publicUrl },
    } = supabase.storage.from("exercisegifs").getPublicUrl(fileName);
    return {
        gifUrl: publicUrl,
        ...exercise,
    };
}

export function getExerciseGifUrl(name: string) {
    const fileName = `${name.toLowerCase().split(" ").join("-")}.gif`;
    const res = supabase.storage.from("exercisegifs").getPublicUrl(fileName);
    return res.data.publicUrl;
}

export function getProfilePicUrl(userId: string) {
    const res = supabase.storage.from("avatars").getPublicUrl(userId);
    return res.data.publicUrl;
}

export async function getManyWorkouts(userId: string) {
    const { data, error } = await supabase
        .from("workout")
        .select("name")
        .eq("user_id", userId);
    if (error) {
        console.error(error);
        throw error;
    }
    return data;
}

type Workout = {
    name: any;
    workout_exercise: {
        sets: any;
        reps: any;
        exercise_table: {
            name: any;
            muscle: any;
        };
    }[];
};

export async function getOneWorkout(workoutId: string): Promise<Workout> {
    const { data, error } = await supabase
        .from("workout")
        .select(
            "name, workout_exercise (sets, reps, exercise_table (name, muscle))",
        )
        .eq("id", workoutId);
    if (error) {
        console.error(error);
        throw error;
    }
    return data as any;
}
