import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Button, TextInput } from 'react-native-paper'
import { supabase } from './supabase'

export default function Signup() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/background.png')} style={styles.image} blurRadius={2}></ImageBackground>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  }
})
