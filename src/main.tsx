import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from 'react-native'
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from './home'
import Ionicons from '@expo/vector-icons'
const Tab = createBottomTabNavigator()

export default function Main() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}
