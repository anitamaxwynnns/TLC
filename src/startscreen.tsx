import { View, Text, ImageBackground, Button, StyleSheet, Image } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function StartScreen() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/background.png')} style={styles.image}>
          <Image source={require('../assets/background2.png')} style={styles.image2}></Image>
          <Text style={styles.text}>{"Track.Lift.Connect"}</Text>
        </ImageBackground>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image2: {
    justifyContent: 'center',
    resizeMode: 'contain',
    marginRight: 18,
    marginLeft: 1,
  },
  text: {
    fontSize: 50,
  }
})

