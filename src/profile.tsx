import { supabase } from "./supabase";
import { View, Text, Image, StyleSheet } from 'react-native'
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from "react";
import { getUserInfo } from "./db_profile";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const navigation = useNavigation()
  const [user, setUser] = useState<any>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    getUserInfo().then(result => {
      if (result === undefined) {
        setUser("Error")
      }
      if (!ignore) {
        setUser(result)
        setLoading(false)
      }
    })
    return () => {
      ignore = true
    }
  }, [])

  if (loading) {
    return <View>
      <Text>{"Loading"}</Text>
    </View>
  }
  return (
    <View style={styles.container}>
      <Image source={require('../assets/profile.png')} style={styles.image} />
      <Text style={styles.text}>{user.name}</Text>
      <Button mode="contained" theme={{ colors: { primary: 'black' } }} style={styles.button} onPress={() => (navigation as any).navigate("StartScreen")}>{"Log Out"}</Button>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  image: {
    marginTop: 100,
  },
  text: {
    fontSize: 35,
    marginTop: 10
  },
  button: {
    marginTop: 130,
  }
})
