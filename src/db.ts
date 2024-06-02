import { supabase } from "./supabase"

export async function getExercises() {
	const { data, error } = await supabase
		.from("exercise_table")
		.select("name,muscle")


	if (error) {
		console.error(error)
		return []
	}
	return data
}
