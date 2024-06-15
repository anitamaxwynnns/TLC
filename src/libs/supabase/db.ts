import { supabase } from "./supabase";

export async function getManyExercises() {
    const { data, error } = await supabase
        .from("exercise_table")
        .select("name,muscle,first_letter,instructions");
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
