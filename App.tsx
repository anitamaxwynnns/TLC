import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import StartScreen from './src/StartScreen'
import Signup from './src/signup'
import Home from './src/home'
import Signin from "./src/signin"

export type RootStackNavigatorParamsList = {
  StartScreen: undefined
  SignUp: undefined
  Home: undefined
  SignIn: undefined
}

const Stack = createStackNavigator<RootStackNavigatorParamsList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='StartScreen'>
        <Stack.Screen name='StartScreen' component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name='SignUp' component={Signup} options={{ headerShown: true, headerTransparent: true, headerTitle: '', headerBackTitle: 'Back', }} />
        <Stack.Screen name='SignIn' component={Signin} options={{ headerShown: true, headerTransparent: true, headerTitle: '', headerBackTitle: 'Back', }} />
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}





