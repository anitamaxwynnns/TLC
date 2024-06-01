import { supabase } from "./supabase";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getExercises } from "./db";
import { useState, useEffect } from "react";
import { FlatList, View, Text } from "react-native"

function ExerciseComponent({ exercise }: { exercise: any }) {
  return <View>
    <Text>{exercise.name}</Text>
    <Text>{exercise.muscle}</Text>
  </View>
}

export default function Home() {
  const [exercises, setExercises] = useState<any[]>()

  useEffect(() => {
    let ignore = false
    getExercises().then(result => {
      if (!ignore) {
        setExercises(result)
      }
    })
    return () => {
      ignore = true
    }
  }, [])

  return (
    <SafeAreaView>
      <FlatList data={exercises} renderItem={({ item }) => <ExerciseComponent exercise={item} />} keyExtractor={item => item.name} />
    </SafeAreaView>
  )
}


