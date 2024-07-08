import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamsList } from "./workout";
import { StackNavigationProp } from "@react-navigation/stack";

export default function AddWorkout() {
    const navigation =
        useNavigation<StackNavigationProp<RootStackNavigatorParamsList>>();

    const handleManualWorkout = () => {
        navigation.navigate("manualworkout");
    };

    const handleAiGeneratedWorkout = () => {
        navigation.navigate("AiWorkout");
    };

    return (
        <SafeAreaView style={styles.container}>
            <Pressable
                style={{ padding: 15 }}
                onPress={() => navigation.goBack()}
            >
                <Text style={{ fontSize: 15 }}>Back</Text>
            </Pressable>
            <View style={styles.content}>
                <Text style={styles.placeholderText}>Add Workout</Text>
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
    },
    placeholderText: {
        fontSize: 30,
        fontWeight: "bold",
    },
    content: {
        alignItems: "center",
        padding: 20,
        justifyContent: "center",
        flex: 1,
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
