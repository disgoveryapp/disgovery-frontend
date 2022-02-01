import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image } from 'react-native';
import ThemedText from "../themed-text";

const DATA = [
    {
      id: '1',
      title: 'Victory Monument',
      line: '333',
      time: 10
    },
    {
      id: '2',
      title: 'Rangsit',
      line: '333',
      time: 10
    },
    {
      id: '3',
      title: 'Lam Lukka',
      line: '333',
      time: 10
    },
    {
        id: '4',
        title: 'Lam Lukka',
        line: '59',
        time: 10
      },
  ];
  
  const Item = ({ title, time, line }) => (
    <View style={styles.lower_container}>
        <View style={styles.sub_container}>
            <View style={styles.transport}>
                <Image
                    style={styles.icon}
                    source={require('../../assets/bus-icon.png')}
                    />
                <ThemedText style={styles.line}>{line}</ThemedText>
            </View>
            <Image
                source={require('../../assets/arrow_forward-icon.png')}
                style={styles.arrow}
            />
            <View style={styles.item}>
            <ThemedText style={styles.title}>{title}</ThemedText>
            </View>
        </View>
        <View style={styles.timeSection}>
            <ThemedText style={styles.time}>{time}</ThemedText>
            <ThemedText style={styles.time}>min</ThemedText>
        </View>
    </View>
  );


export default function BottomCardFlatList() {

    // const { colors } = useTheme();

    const renderItem = ({ item }) => (
        <Item title={item.title} time={item.time} line={item.line}/>
      );

    const ItemDivider = () => {
        return (
          <View style={styles.devider}/>
        );
      }
    
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={ItemDivider}
          />
        </SafeAreaView>
      );

};

const styles = StyleSheet.create({
    lower_container:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#282828",
        padding: 10,
        // marginVertical: 1,
        // marginHorizontal: 5,
    },
    sub_container:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    item: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      },
    container: {
    // height:300,
    //   flex: 1,
    //   marginTop: StatusBar.currentHeight || 0,
    },
    transport: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "white",
        width: 80,
        borderRadius:5,
    },
    icon: {
        width: 25,
        height: 25,
        // marginRight:8,
        marginLeft:4,
        marginTop:8,
        marginBottom:6,
    },
    line: {
      marginTop:4,
      fontSize: 25,
      color: "red",
    },
    arrow : {
        marginLeft:5,
        marginRight:5,
    },
    title: {
      fontSize: 18,
      color: "white",
    },
    timeSection:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    time: {
      fontSize: 25,
      marginRight:2,
      marginTop:3,
      color: "white",
      textAlign: "right"
    },
    devider: {
        height: 0.5,
        backgroundColor: "gray",
        // marginHorizontal: 5,
    }

  });