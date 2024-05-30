import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import StartScreen from './src/StartScreen'
import Signup from './src/signup'
type RootStackNavigatorParamsList = {
  StartScreen: undefined
  SignUp: undefined
}

const Stack = createStackNavigator<RootStackNavigatorParamsList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='StartScreen'>
        <Stack.Screen name='StartScreen' component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name='SignUp' component={Signup} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}





