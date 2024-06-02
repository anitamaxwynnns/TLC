import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from './home'
import { FontAwesome5 } from '@expo/vector-icons';
const Tab = createBottomTabNavigator()

export default function Main() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} options={{
        headerShown: false, tabBarLabel: 'Exercises', tabBarLabelStyle: { fontSize: 13, color: 'black', }, tabBarInactiveTintColor: 'grey', tabBarActiveTintColor: 'white', tabBarStyle: { backgroundColor: 'dimgrey', shadowOpacity: 2 }, tabBarIcon: () => (
          <FontAwesome5 name="dumbbell" size={24} color="black" />
        )
      }} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 30,
    color: "black",
  }
})
