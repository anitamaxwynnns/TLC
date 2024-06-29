import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackNavigatorParamsList } from 'App'


export default function StartScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackNavigatorParamsList>>()
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ImageBackground source={require('assets/background.png')} style={styles.image} blurRadius={2}>
          <Image source={require('assets/background2.png')} style={styles.image2}></Image>
          <Text style={styles.text}>{"Track.Lift.Connect"}</Text>
          <Button mode='contained' theme={{ colors: { primary: 'black' } }} style={styles.button} onPress={() => navigation.navigate('SignUp')}>Get Started</Button>
          <Button mode='contained' theme={{ colors: { primary: 'black' } }} style={styles.button} onPress={() => navigation.navigate('SignIn')}>Sign In</Button>
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
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image2: {
    justifyContent: 'center',
    resizeMode: 'contain',
    marginRight: 30,
    marginLeft: 1,
  },
  text: {
    fontSize: 50,
    color: 'black',
  },
  button: {
    marginTop: 30,
    justifyContent: 'center',
    marginRight: 15,
    width: 200,
  }
})

