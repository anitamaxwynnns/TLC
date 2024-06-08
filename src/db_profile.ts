import { supabase } from "./supabase";
import { useAuth } from "./auth_provider";

export async function getUserInfo(): Promise<{ name: string } | undefined> {
	const { data, error } = await supabase.from("profile").select("name")

	if (error) {
		console.error(error)
		return undefined
	}
	console.log(data)
	return data[0]
}
