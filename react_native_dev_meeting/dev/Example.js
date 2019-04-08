import React from "react";
import { Text, StyleSheet } from "react-native";

class Example extends React.Component {
  render() {
    return <Text style={styles.text}>aabaaa</Text>;
  }
}

const styles = StyleSheet.create({
  text: { marginTop: 20, fontSize: 50 }
});

export default Example;
