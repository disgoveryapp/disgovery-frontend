import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import ThemedText from "../../../../components/themed-text";
import ThemedTextMarquee from "../../../../components/themed-text-marquee";
import ExpandDownIcon18px from "../../../../assets/svgs/expand-down-icon-18px";
import { textAlign } from "@mui/system";

function Fares() {

    const { dark, colors } = useTheme();
    const size = "small";

    const styles = StyleSheet.create({
        // bottomCard: {
        //         height: 0.7 * Dimensions.get("screen").height,
        //         marginTop: 0.3 * Dimensions.get("screen").height,
        //         paddingHorizontal: 15,
        //         backgroundColor: colors.background,
        //         borderTopLeftRadius: 22,
        //         borderTopRightRadius: 22,
    
        //         shadowColor: "#000",
        //         shadowOffset: {
        //             width: 0,
        //             height: 5,
        //         },
        //         shadowOpacity: 0.34,
        //         shadowRadius: 6.27,
    
        //         elevation: 10,
        //     },
        fare_container: {
            // display: "flex",
            // flexDirection: "row",
            textAlign:"right",
        },
        text_container:{
            fontSize: size === "small" ? 16 : 18,
            fontWeight: size === "small" ? "500" : "600",
            marginLeft: size === "small" ? 22 : 0,
        },
        text:{
            flex: 1,
            fontSize: 18,
            fontWeight: size === "small" ? "500" : "600",
            color: "black",
        },
    });

    return(
        <View style={styles.bottomCard}>
            <View style={styles.fare_container}>
                <ThemedText style={styles.text}>Fares</ThemedText>
                <ThemedText style={styles.text}>63 THB</ThemedText>
            </View>
        </View>
    );
}

export default Fares;
    