import React, { useState, useEffect }from "react";
import { StyleSheet, View, Dimensions, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";
import ThemedText from "../../../../../components/themed-text";
import ThemedTextMarquee from "../../../../../components/themed-text-marquee";
import CollapseIcon from "../../../../../assets/svgs/collapse-icon";
import ExpandDownIcon from "../../../../../assets/svgs/expand-down-icon";
import TransitLine from "../../../../../components/transit-line";
import axios from "axios";
import { configs } from "../../../../../configs/configs";

export default function TransitLineForFares(props) {

    const DATA = props.data
    const linename = props.linename

    const [loading, setLoading] = useState(formatRoutesAvailable);
    const [loadError, setLoadError] = useState(false);
    const [routesAvailable, setRoutesAvailable] = useState([]);
    const [stationData, setStationData] = useState({});

    const STATION_ID = DATA.to.station.id;

    function fetchStationDetails() {
        setLoading(true);

        axios
            .get(`${configs.API_URL}/station/id/${STATION_ID}`, {
                headers: {
                    Authorization: `Bearer ${configs.PERSISTENT_JWT}`,
                },
            })
            .then(async (response) => {
                if (response.data.status) {
                    if (response.data.status.status !== 200) setLoadError(true);
                    else {
                        setStationData(response.data.data);
                        formatRoutesAvailable(response.data.data);
                        
                        if (response.data.data.coordinates) {
                            await recenter(
                                parseFloat(response.data.data.coordinates.lat),
                                parseFloat(response.data.data.coordinates.lng),
                            );

                            setMarker({
                                latitude: parseFloat(response.data.data.coordinates.lat),
                                longitude: parseFloat(response.data.data.coordinates.lng),
                            });
                        }
                    }
                }

                setLoading(false);
            })
            .catch((error) => {
                if (error) setLoadError(true);
                setLoading(false);
            });
    }

    function formatRoutesAvailable(data) {
        if (!data) return;

        let tempRoutesAvailable = [];

        Object.keys(data.routes).map((key) => {
            tempRoutesAvailable.push({
                id: data.routes[key].route_id,
                name: data.routes[key].route_name,
                color: data.routes[key].route_color,
            });
        });

        setRoutesAvailable([...tempRoutesAvailable]);
    }

    useEffect(() => {
            fetchStationDetails();
    }, []);

    useEffect(() => {
            if(stationData.lines !== undefined){
        console.log("--------------------------");
        console.log(stationData.lines[0]);
    };
    },[stationData]);

    

    return(
        <>
            {stationData.lines !== undefined ? <TransitLine
                line={{
                    name: {
                        short_name: linename,
                        long_name: stationData.lines[0].route_name.long_name,
                        // long_name: "BTS SkhunvitLine",
                    },
                    color: stationData.lines[0].route_color,
                    // color: "7FBF3A",
                }}
                fontSize={14}
            /> : <> 
            <ActivityIndicator />
            </>
            }
        </>
    );

}