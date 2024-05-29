import { View, Text, ImageBackground, Button, StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function StartScreen() {
  return (
    <View>
      <ImageBackground source={require('../assets/background.png')} style={styles.image} >
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  }
})

