import { FontAwesome6 } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamsList } from "App";
import React, { useEffect, useState } from "react";
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
import { useAuth } from "src/libs/auth/auth_provider";
import { supabase } from "src/libs/database/supabase";

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

function renderEvent() {}

function RenderDay({
    day,
    workouts,
    userId,
}: {
    day: string;
    workouts: any[];
    userId: string;
}) {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        let ignore = false;
        supabase
            .from("calendar")
            .select("day, workout (name), time")
            .eq("user_id", userId)
            .then((result) => {
                if (!ignore) {
                    if (result !== undefined && result.data) {
                        setEvents(result.data);
                    }
                }
                return () => {
                    ignore = true;
                };
            });
    }, []);

    return (
        <View
            style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                gap: 20,
                justifyContent: "space-between",
                overflow: "visible",
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingBottom: 40,
                }}
            >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{day}</Text>
                <Pressable onPress={handleAddEvent}>
                    <FontAwesome6 name="add" size={24} color="black" />
                </Pressable>
            </View>
        </View>
    );
}

function handleAddEvent(day: string) {
    return;
}

export default function WeekScheduler() {
    const { session } = useAuth();
    const navigation =
        useNavigation<NavigationProp<RootStackNavigatorParamsList>>();
    const [workouts, setWorkouts] = useState<any[]>([]);

    if (session === null) {
        return <View />;
    }

    useEffect(() => {
        let ignore = false;
        supabase
            .from("workout")
            .select("id, name")
            .eq("user_id", session.user.id)
            .then((result) => {
                if (!ignore) {
                    if (result !== undefined && result.data) {
                        setWorkouts(result.data);
                    }
                }
            });
        return () => {
            ignore = true;
        };
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, overflow: "visible" }}>
            <View
                style={{ flex: 1, paddingHorizontal: 20, overflow: "visible" }}
            >
                <Pressable
                    style={{ gap: 20, padding: 20 }}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={{ fontSize: 15 }}>Back</Text>
                </Pressable>
                <FlatList
                    data={daysOfWeek}
                    renderItem={({ item }) => (
                        <RenderDay
                            day={item}
                            workouts={workouts}
                            userId={session.user.id}
                        />
                    )}
                    keyExtractor={(item) => item}
                    contentContainerStyle={{ gap: 30 }}
                />
            </View>
        </SafeAreaView>
    );
}
