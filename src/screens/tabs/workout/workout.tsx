import ManualWorkout from "./manualworkout";
import ExerciseSubmission from "./exerciseSubmission";
import WorkoutHome from "./workouthome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackNavigatorParamsList = {
    manualworkout: undefined;
    exerciseSubmission: undefined;
    workouthome: undefined;
};

const Stack = createNativeStackNavigator<RootStackNavigatorParamsList>();

export default function Workout() {
    return (
        <Stack.Navigator initialRouteName="manualworkout">
            <Stack.Screen
                name="manualworkout"
                component={ManualWorkout}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="exerciseSubmission"
                component={ExerciseSubmission}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="workouthome"
                component={WorkoutHome}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
