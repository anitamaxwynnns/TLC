import ManualWorkout from "./manualworkout";
import ExerciseSubmission from "./exerciseSubmission";
import WorkoutHome from "./workouthome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AiWorkout from "./aiworkout";
import AiWorkoutSubmission from "./aiworkoutSubmission";
import AddWorkout from "./addworkout";
import WorkoutContent from "./workout-content";

export type RootStackNavigatorParamsList = {
    manualworkout: undefined;
    ExerciseSubmission: undefined;
    workouthome: undefined;
    AiWorkout: undefined;
    AiWorkoutSubmission: undefined;
    AddWorkout: undefined;
    WorkoutContent: { workoutId: string };
};

const Stack = createNativeStackNavigator<RootStackNavigatorParamsList>();

export default function Workout() {
    return (
        <Stack.Navigator initialRouteName="workouthome">
            <Stack.Screen
                name="manualworkout"
                component={ManualWorkout}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ExerciseSubmission"
                component={ExerciseSubmission}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="workouthome"
                component={WorkoutHome}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AiWorkout"
                component={AiWorkout}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AiWorkoutSubmission"
                component={AiWorkoutSubmission}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddWorkout"
                component={AddWorkout}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="WorkoutContent"
                component={WorkoutContent}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
