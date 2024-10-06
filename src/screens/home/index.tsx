import React from "react";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.textTitle}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
