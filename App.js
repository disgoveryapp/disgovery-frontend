import "react-native-reanimated";
import { useEffect } from "react";
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
import * as Location from "expo-location";

import Home from "./pages/home";

import TripDetails from "./pages/trip-details";
import Search from "./pages/search";
import SearchOrigin from "./pages/search-origin";
import StationDetails from "./pages/station-details";
import Navigation from "./pages/navigation";

import RouteDetails from "./pages/route-details";
import RouteSelection from "./pages/route-selection";

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

    useEffect(() => {
        const requestPermissions = async () => {
            const foreground = await Location.requestForegroundPermissionsAsync();
        };
        requestPermissions();
    }, []);

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
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="RouteSelection" component={RouteSelection} />

                        <Stack.Screen name="RouteDetails" component={RouteDetails} />
                        <Stack.Screen name="TripDetails" component={TripDetails} />
                        <Stack.Screen
                            name="Search"
                            component={Search}
                            options={{ animation: "fade", gestureEnabled: false }}
                        />
                        <Stack.Screen
                            name="SearchOrigin"
                            component={SearchOrigin}
                            options={{ animation: "fade" }}
                        />
                        <Stack.Screen
                            name="StationDetails"
                            component={StationDetails}
                            options={{ animation: "fade" }}
                        />
                        <Stack.Screen name="Navigation" component={Navigation} />
                    </Stack.Navigator>
                </NavigationContainer>
            </>
        );
}
