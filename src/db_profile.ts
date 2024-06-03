import { supabase } from "./supabase";

export async function getUserInfo(): Promise<{ name: string } | undefined> {
	const { data, error } = await supabase.from("profile").select("name")

	if (error) {
		console.error(error)
		return undefined
	}
	return data[0]
}
