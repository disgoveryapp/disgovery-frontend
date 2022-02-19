import {
    useFonts,
    Barlow_500Medium,
    Barlow_500Medium_Italic,
    Barlow_600SemiBold,
    Barlow_600SemiBold_Italic,
    Barlow_700Bold,
    Barlow_700Bold_Italic,
    Barlow_800ExtraBold,
    Barlow_800ExtraBold_Italic,
} from "@expo-google-fonts/barlow";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Text, useColorScheme, View } from "react-native";
import { darkTheme, lightTheme } from "./themes/themes";

import Home from "./pages/home";
<<<<<<< HEAD
import Search from "./pages/search";
=======
import TripDetails from "./pages/trip-details";
>>>>>>> origin/dev

export default function App() {
    const scheme = useColorScheme();
    const [fontLoaded] = useFonts({
        Barlow_500Medium,
        Barlow_500Medium_Italic,
        Barlow_600SemiBold,
        Barlow_600SemiBold_Italic,
        Barlow_700Bold,
        Barlow_700Bold_Italic,
        Barlow_800ExtraBold,
        Barlow_800ExtraBold_Italic,
    });

    const Stack = createNativeStackNavigator();

    if (!fontLoaded) return <AppLoading />;
    else
        return (
            <>
                <NavigationContainer theme={scheme === "dark" ? darkTheme : lightTheme}>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
<<<<<<< HEAD
                        <Stack.Screen name="Search" component={Search} />
=======
                        {/* <Stack.Screen name="Home" component={Home} /> */}
                        <Stack.Screen name="TripDetails" component={TripDetails} />
>>>>>>> origin/dev
                    </Stack.Navigator>
                </NavigationContainer>
            </>
        );
}
