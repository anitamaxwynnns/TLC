import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import StartScreen from "src/screens/startscreen";
import Signup from "src/screens/auth/signup";
import Signin from "src/screens/auth/signin";
import Main from "src/screens/tabs/main";
import AuthProvider from "src/libs/auth/auth_provider";

export type RootStackNavigatorParamsList = {
    StartScreen: undefined;
    SignUp: undefined;
    Home: undefined;
    SignIn: undefined;
    Main: undefined;
    Profile: undefined;
};

const Stack = createStackNavigator<RootStackNavigatorParamsList>();

export default function App() {
    return (
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
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}
