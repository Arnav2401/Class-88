import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";

export default class Logout extends Component {
  componentDidMount() {
    firebase.auth().signOut();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Logout</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});




/*import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.mainview}>
        <SafeAreaView
          style={styles.safearea}
        />
        <View style={styles.view2}>
          <TextInput
            placeholder={'Calculate'}
            style={styles.input}
          />
        </View>
        <Text>hfou</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainview: {
    flex: 1
  },
  safearea: {
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : RFValue(35)

  },
  view2: {
    flex: .25
  },
  input: {
    backgroundColor: 'black',
    width: '100%',
  }
})*/