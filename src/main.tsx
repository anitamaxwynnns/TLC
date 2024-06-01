import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from 'react-native'
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from './home'
const Tab = createBottomTabNavigator()

export default function Main() {
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
  </Tab.Navigator>
}
