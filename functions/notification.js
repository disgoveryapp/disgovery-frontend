import { isDevice } from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

let firstRun = true;
let notificationGranted = false;

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export async function sendNotification(message, title, time) {
    console.log("sending notification", notificationGranted);

    if (firstRun) {
        await getNotificationPermission();
        firstRun = false;
    }

    if (notificationGranted) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: message,
            },
            trigger: {
                seconds: time,
            },
        });
    }
}

export async function getNotificationPermission() {
    console.log("requesting permission");

    if (isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== "granted") {
            alert("No notification permission.");
            return;
        } else {
            notificationGranted = true;
        }
    } else {
        alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }
}
