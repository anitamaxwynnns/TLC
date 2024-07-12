import { Entypo, Feather, FontAwesome6 } from "@expo/vector-icons";
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
import DatePicker from "@react-native-community/datetimepicker";

const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

function RenderEvent({
    event,
    editable,
    handleRemove,
}: {
    event: any;
    editable: boolean;
    handleRemove: any;
}) {
    return (
        <View
            style={{
                paddingVertical: 15,
                flexDirection: "row",
                justifyContent: "space-between",
            }}
        >
            <Text style={{ fontSize: 15, fontWeight: 500 }}>
                {event.workout.name}
            </Text>
            {editable ? (
                <View
                    style={{
                        gap: 10,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontSize: 12, fontStyle: "italic" }}>
                        {new Date(
                            `1971-01-01T${event.time}`,
                        ).toLocaleTimeString(undefined, {
                            timeStyle: "short",
                        })}
                    </Text>
                    <Pressable onPress={handleRemove}>
                        <Entypo
                            name="squared-minus"
                            size={20}
                            color="darkred"
                        />
                    </Pressable>
                </View>
            ) : (
                <Text style={{ fontSize: 12, fontStyle: "italic" }}>
                    {new Date(`1971-01-01T${event.time}`).toLocaleTimeString(
                        undefined,
                        {
                            timeStyle: "short",
                        },
                    )}
                </Text>
            )}
        </View>
    );
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
    const [workoutdropdown, setWorkoutdropdown] = useState<any>(null);
    const [time, setTime] = useState<Date>(new Date());
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        let ignore = false;
        supabase
            .from("calendar")
            .select("id, day, workout (name), time")
            .eq("user_id", userId)
            .eq("day", day)
            .order("time", { ascending: true })
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

    function handleRemove(id: any) {
        return async () => {
            await supabase.from("calendar").delete().eq("id", id);
            supabase
                .from("calendar")
                .select("id, day, workout (name), time")
                .eq("user_id", userId)
                .eq("day", day)
                .order("time", { ascending: true })
                .then((result) => {
                    if (result !== undefined && result.data) {
                        setEvents(result.data);
                    }
                });
        };
    }

    async function handleSubmit() {
        await supabase.from("calendar").insert({
            time: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}.${time.getMilliseconds()}`,
            workout_id: workoutdropdown,
            day: day,
        });
        supabase
            .from("calendar")
            .select("id, day, workout (name), time")
            .eq("user_id", userId)
            .eq("day", day)
            .order("time", { ascending: true })
            .then((result) => {
                if (result !== undefined && result.data) {
                    setEvents(result.data);
                }
            });

        setModalVisible(false);
    }

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
                    }}
                >
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {day}
                    </Text>
                    <View style={{ gap: 20, flexDirection: "row" }}>
                        <Pressable onPress={() => setEditable((curr) => !curr)}>
                            <Feather name="edit-2" size={24} color="black" />
                        </Pressable>
                        <Pressable onPress={() => setModalVisible(true)}>
                            <FontAwesome6 name="add" size={24} color="black" />
                        </Pressable>
                    </View>
                </View>
                <FlatList
                    data={events}
                    renderItem={({ item }) => (
                        <RenderEvent
                            event={item}
                            editable={editable}
                            handleRemove={handleRemove(item.id)}
                        />
                    )}
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
                            <View style={{ flex: 1, gap: 30 }}>
                                <Text style={{ fontSize: 20, fontWeight: 500 }}>
                                    Select Workout
                                </Text>
                                <Dropdown
                                    data={workouts}
                                    labelField="name"
                                    valueField="id"
                                    onChange={(item) =>
                                        setWorkoutdropdown(item.id)
                                    }
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
                                <DatePicker
                                    mode="time"
                                    display="inline"
                                    value={time}
                                    onChange={(_, date) =>
                                        date && setTime(date)
                                    }
                                    style={{ alignSelf: "center" }}
                                />
                            </View>
                            <Pressable
                                onPress={handleSubmit}
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
