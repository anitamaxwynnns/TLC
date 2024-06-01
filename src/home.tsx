import { supabase } from "./supabase";
import { SafeAreaProvider } from "react-native-safe-area-context";

async function getExercises() {
  const { data, error } = await supabase
    .from("exercise_table")
    .select()

  if (error) {
    console.error("Error", error)
    return []
  }
  console.log(data)
  return data
}


export default function Home() {
  return (getExercises())
}
