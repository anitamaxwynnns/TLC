import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Alert,
    AppState,
    Button,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Settings from "./settings";
import { RootStackNavigatorParamsList } from "./workout";
import { StackNavigationProp } from "@react-navigation/stack";

export default function WorkoutHome() {
    const navigation =
        useNavigation<StackNavigationProp<RootStackNavigatorParamsList>>();

    const handleManualWorkout = () => {
        navigation.navigate("manualworkout");
    };

    const handleAiGeneratedWorkout = () => {
        navigation.navigate("Settings");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.placeholderText}>Workout</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleManualWorkout}
                >
                    <Text style={styles.buttonText}>Manual Workout</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAiGeneratedWorkout}
                >
                    <Text style={styles.buttonText}>AI Generated Workout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderText: {
        fontSize: 30,
        fontWeight: "bold",
    },
    content: {
        alignItems: "center",
        width: "80%",
    },
    button: {
        backgroundColor: "#000000",
        padding: 15,
        borderRadius: 30,
        marginVertical: 10,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

