import ManualWorkout from "./manualworkout";
import ExerciseSubmission from "./exerciseSubmission";
import WorkoutHome from "./workouthome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AiWorkout from "./aiworkout";
import AiWorkoutSubmission from "./aiworkoutSubmission";
import AddWorkout from "./addworkout";
import WorkoutContent from "./workout-content";
import TrackWorkout from "./track-workout";
import FinishWorkout from "./finish-workout";
import WorkoutHistory from "./workout-history";

export type WorkoutStackNavigatorParamsList = {
    manualworkout: undefined;
    ExerciseSubmission: undefined;
    workouthome: any;
    AiWorkout: undefined;
    AiWorkoutSubmission: undefined;
    AddWorkout: undefined;
    WorkoutContent: { workoutId: string };
    TrackWorkout: { workoutId: number };
    FinishWorkout: undefined;
};

const Stack = createNativeStackNavigator<WorkoutStackNavigatorParamsList>();

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
            <Stack.Screen
                name="TrackWorkout"
                component={TrackWorkout}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="FinishWorkout"
                component={FinishWorkout}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
