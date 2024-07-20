import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { WorkoutStackNavigatorParamsList } from "./workout";

export default function FinishWorkout() {
    const navigation =
        useNavigation<NavigationProp<WorkoutStackNavigatorParamsList>>();
    return (
        <SafeAreaView>
            <View
                style={{
                    alignItems: "center",
                    paddingTop: 250,
                    paddingBottom: 50,
                }}
            >
                <FontAwesome name="check-circle" size={100} color="black" />
            </View>
            <View style={{ alignItems: "center", gap: 30 }}>
                <Text style={{ fontSize: 20 }}>
                    Congrats on finishing your workout!
                </Text>
                <Pressable
                    onPress={() => navigation.navigate("workouthome")}
                    style={{
                        backgroundColor: "black",
                        borderWidth: 2,
                        borderRadius: 20,
                        padding: 10,
                        paddingHorizontal: 15,
                    }}
                >
                    <Text style={{ color: "white", fontSize: 15 }}>
                        Go Home
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
