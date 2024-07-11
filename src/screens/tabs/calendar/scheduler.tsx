import { FontAwesome6 } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamsList } from "App";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    SafeAreaView,
    Text,
    View,
} from "react-native";
import { useAuth } from "src/libs/auth/auth_provider";
import { supabase } from "src/libs/database/supabase";
import { Dropdown } from "react-native-element-dropdown";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

function RenderEvent({ event }: { event: any }) {
    return <View></View>;
}

function RenderDay({
    day,
    workouts,
    userId,
}: {
    day: string;
    workouts: any[];
    userId: string;
}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [events, setEvents] = useState<any[]>([]);
    const [workoutdropdown, setWorkoutdropdown] = useState("");
    const [time, setTime] = useState<any>(null);

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
        <>
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
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {day}
                    </Text>
                    <Pressable onPress={() => setModalVisible(true)}>
                        <FontAwesome6 name="add" size={24} color="black" />
                    </Pressable>
                </View>
                <FlatList
                    data={events}
                    renderItem={({ item }) => <RenderEvent event={item} />}
                />
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView>
                    <View
                        style={{
                            backgroundColor: "rgba(52, 52, 52, 0.8)",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 20,
                            paddingTop: 70,
                            paddingBottom: 80,
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: "white",
                                borderRadius: 20,
                                width: "100%",
                                height: "100%",
                                padding: 30,
                                gap: 30,
                            }}
                        >
                            <View style={{ alignSelf: "flex-start" }}>
                                <Pressable
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text>Back</Text>
                                </Pressable>
                            </View>
                            <Text style={{ fontSize: 20, fontWeight: 500 }}>
                                Select Workout
                            </Text>
                            <Dropdown
                                data={workouts}
                                labelField="name"
                                valueField="id"
                                onChange={(item) => {
                                    setWorkoutdropdown(item.value);
                                }}
                                value={workoutdropdown}
                                placeholder="Select"
                                style={{
                                    borderWidth: 1,
                                    padding: 15,
                                    borderRadius: 10,
                                    borderColor: "grey",
                                }}
                            />
                            <Text style={{ fontSize: 20, fontWeight: 500 }}>
                                Choose Time
                            </Text>
                            <RNDateTimePicker
                                mode="time"
                                value={new Date()}
                                style={{ alignSelf: "center", width: 100 }}
                                display="compact"
                                onChange={(time) => setTime(time)}
                            />
                            <Pressable
                                onPress={() => setModalVisible(false)}
                                style={{
                                    alignSelf: "center",
                                    borderRadius: 15,
                                    borderWidth: 1,
                                    padding: 10,
                                    backgroundColor: "black",
                                }}
                            >
                                <Text style={{ fontSize: 15, color: "white" }}>
                                    Submit
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        </>
    );
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
                        console.log(workouts);
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
