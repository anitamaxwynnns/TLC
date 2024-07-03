import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import StartScreen from "src/screens/startscreen";
import Signup from "src/screens/auth/signup";
import Signin from "src/screens/auth/signin";
import Main from "src/screens/tabs/main";
import AuthProvider from "src/libs/auth/auth_provider";
import ProfilePic from "src/screens/auth/profile-pic";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CreatePost from "src/screens/tabs/forum/createpostscreen";
import ImageSelector from "src/screens/tabs/forum/ImageSelector";
import ExerciseSubmission from "src/screens/tabs/workout/exerciseSubmission";
import Aiworkout from "./src/aiworkout";
import AiWorkoutSubmission from "./src/aiworkoutSubmission";

export type RootStackNavigatorParamsList = {
    StartScreen: undefined;
    SignUp: undefined;
    Home: undefined;
    SignIn: undefined;
    Main: undefined;
    Profile: undefined;
    ProfilePic: undefined;
    Forum: any;
    CreatePost: { imageUrl: string };
    ImageSelector: undefined;
    ExerciseSubmission: { selectedExercises: any[] };
    AiWorkout: undefined;
    AiWorkoutSubmission: undefined;
};

const Stack = createStackNavigator<RootStackNavigatorParamsList>();

export default function App() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="StartScreen">
                        <Stack.Screen
                            name="StartScreen"
                            component={StartScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="SignUp"
                            component={Signup}
                            options={{
                                headerShown: true,
                                headerTransparent: true,
                                headerTitle: "",
                                headerBackTitle: "Back",
                            }}
                        />
                        <Stack.Screen
                            name="ProfilePic"
                            component={ProfilePic}
                            options={{
                                headerShown: true,
                                headerTransparent: true,
                                headerTitle: "",
                                headerBackTitle: "Back",
                            }}
                        />
                        <Stack.Screen
                            name="SignIn"
                            component={Signin}
                            options={{
                                headerShown: true,
                                headerTransparent: true,
                                headerTitle: "",
                                headerBackTitle: "Back",
                            }}
                        />
                        <Stack.Screen
                            name="Main"
                            component={Main}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="CreatePost"
                            component={CreatePost}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="ImageSelector"
                            component={ImageSelector}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="ExerciseSubmission"
                            component={ExerciseSubmission}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="AiWorkout"
                            component={Aiworkout}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="AiWorkoutSubmission"
                            component={AiWorkoutSubmission}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthProvider>
        </SafeAreaProvider>
    );
}
