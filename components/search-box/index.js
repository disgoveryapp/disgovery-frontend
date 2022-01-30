import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ThemedText from "../../components/themed-text";
import SearchIcon from "../../assets/svgs/search-icon";
import StarBorderIcon from "../../assets/svgs/star-border-icon";

const App = () => {

  return (
    <TouchableOpacity style={styles.theTest}>
      <View style={styles.searchTest}>
        <SearchIcon/>
      </View>
      <ThemedText style={styles.textTest}>Search destination</ThemedText>
      <View style={styles.starTest}>
        <StarBorderIcon/>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  theTest: {
    position: "absolute",
    width: 309,
    height: 44,
    right: 66,
    bottom: 32,
    backgroundColor: "#444444",
    borderRadius: 12
  },
  textTest: {
    position: "absolute",
    width: 121.62,
    height: 17,
    right: 155.38,
    bottom: 14,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    color: "#ffffff"
  },
  searchTest: {
    top: 13,
    left: 10
  },
  starTest: {
    left: 273,
    bottom: 8
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#444444",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});

export default App;