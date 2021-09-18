import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";
import Feed from "../screens/Feed";
import CreateStory from "../screens/CreateStory";
const Tab = createMaterialBottomTabNavigator();


export default class BottomTabNavigator extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      light_theme: true,
      is_updated: false
    }
  }

  changeUpdate = () => {
    this.setState({ is_updated: true })
  }

  removeUpdated = () => {
    this.setState({ is_updated: false })
  }

  fetchUser = async () => {
    let theme;
    await firebase.database().ref('/users/' + firebase.auth().currentUser.uid).on('value', (data) => {
      theme = data.val().current_theme
    })
    this.setState({
      light_theme: theme === 'light' ? true : false,
    })
  }

  componentDidMount = () => {
    this.fetchUser();
  }

  renderFeed = (props) => {
    return (
      <Feed setUpdatetofalse={this.removeUpdated} {...props} />
    )
  }

  renderStory = (props) => {
    return (
      <CreateStory setUpdatetotrue={this.changeUpdate} {...props} />
    )
  }

  render() {
    return (
      <Tab.Navigator
        labeled={false}
        barStyle={this.state.light_theme ? styles.bottomTabStyleLight : styles.bottomTabStyle}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Feed") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Create Story") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            }
            return (
              <Ionicons
                name={iconName}
                size={RFValue(25)}
                color={color}
                style={styles.icons}
              />
            );
          }
        })}
        activeColor={"#ee8249"}
        inactiveColor={"gray"}
      >
        <Tab.Screen name="Feed" component={this.renderFeed} options={{ unmountOnBlur: true }} />
        <Tab.Screen name="Create Story" component={this.renderStory} options={{ unmountOnBlur: true }} />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute"
  },
  bottomTabStyleLight: {
    backgroundColor: "#EAEAEA",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute"
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});

