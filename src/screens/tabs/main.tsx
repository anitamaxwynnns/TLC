import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./exercise/home";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Profile from "./profile/profile";
import Workout from "./workout/workout";
import Forum from "./forum/forum";
const Tab = createBottomTabNavigator();

export default function Main() {
    return (
        <Tab.Navigator initialRouteName="Profile">
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarLabel: "Profile",
                    tabBarLabelStyle: { fontSize: 13 },
                    tabBarIcon: () => (
                        <AntDesign name="user" size={24} color="black" />
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarLabel: "Exercises",
                    tabBarLabelStyle: { fontSize: 13 },
                    tabBarIcon: () => (
                        <FontAwesome5 name="dumbbell" size={24} color="black" />
                    ),
                }}
            />
            <Tab.Screen
                name="Workout"
                component={Workout}
                options={{
                    headerShown: false,
                    tabBarLabel: "Workout",
                    tabBarLabelStyle: { fontSize: 13 },
                    tabBarIcon: () => (
                        <FontAwesome5 name="running" size={24} color="black" />
                    ),
                }}
            />
            <Tab.Screen
                name="Forum"
                component={Forum}
                options={{
                    headerShown: false,
                    tabBarLabel: "Forum",
                    tabBarLabelStyle: { fontSize: 13 },
                    tabBarIcon: () => (
                    <Ionicons name="chatbubbles-outline" size={24} color="black" />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 30,
        color: "black",
    },
});
