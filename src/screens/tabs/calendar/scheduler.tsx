import { FontAwesome6 } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamsList } from "App";
import React, { useState } from "react";
import {
    View,
    Text,
    Button,
    Alert,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Pressable,
    ScrollView,
} from "react-native";

type Events = {
    [key: string]: string[];
};

const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

export default function WeekScheduler() {
    const navigation =
        useNavigation<NavigationProp<RootStackNavigatorParamsList>>();
    const [events, setEvents] = useState<Events>({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
    });

    function handleAddEvent(day: string) {
    }

    function renderEvent(day: string) {
        return (
            <View
                key={day}
                style={{
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    gap: 20,
                    justifyContent: "space-between",
                }}
            >
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 40}}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {day}
                    </Text>
                    <Pressable onPress={handleAddEvent}>
                        <FontAwesome6 name="add" size={24} color="black" />
                    </Pressable>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Pressable
                    style={{ gap: 20, padding: 20 }}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={{ fontSize: 15 }}>Back</Text>
                </Pressable>
                <ScrollView contentContainerStyle={{ gap: 30 }}>
                    {daysOfWeek.map((day) => renderEvent(day))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    dayContainer: {},
    dayTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    eventItem: {
        fontSize: 16,
        marginVertical: 5,
    },
    emptyDate: {
        fontSize: 16,
        marginVertical: 5,
        color: "#999",
    },
});
