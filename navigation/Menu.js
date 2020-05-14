//import
import React, { useState, useEffect, useCallback } from "react";
import { DrawerItems } from "react-navigation";
import { ActivityIndicator } from "react-native-paper";
import { Block, Text, theme } from "galio-framework";
const { width } = Dimensions.get("screen");
import Axios from "axios";
import {
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  Dimensions,
} from "react-native";

//Drawer
const Drawer = (props) => {
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);

  const gettingCustomer = useCallback(async () => {
    const value = await AsyncStorage.getItem("x-auth-token");
    setLoad(true);
    await Axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/UserSignUp",
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": value,
      },
    })
      .then((response) => {
        setUsers(response.data);
        setLoad(false);
      })
      .catch((error) => {
        setLoad(false);
      });
  }, []);

  useEffect(() => {
    gettingCustomer();
  }, [gettingCustomer]);

  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      {load ? (
        <ActivityIndicator size="large" color="blueviolet" />
      ) : (
        users.map((user) => {
          return (
            <Block flex={0.2} style={styles.header} key={user.UserEmail}>
              <TouchableWithoutFeedback
                onPress={() => props.navigation.navigate("Profile")}
              >
                <Block style={styles.profile}>
                  <Text h2 color="white">
                    {user.UserName}
                  </Text>
                </Block>
              </TouchableWithoutFeedback>
              <Block flex>
                <Text size={18} style={{ color: "orange" }}>
                  {user.UserEmail}
                </Text>
                <Text size={16} style={{ color: "white" }}>
                  {user.phoneNumber}
                </Text>
              </Block>
            </Block>
          );
        })
      )}
      <Block flex>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <DrawerItems {...props} />
        </ScrollView>
      </Block>
    </Block>
  );
};

//Menu
const Menu = {
  contentComponent: (props) => <Drawer {...props} />,
  drawerBackgroundColor: "white",
  drawerWidth: width * 0.8,
  contentOptions: {
    activeTintColor: "white",
    inactiveTintColor: "blueviolet",
    activeBackgroundColor: "transparent",
    activeBackgroundColor: "blueviolet",

    itemStyle: {
      width: width * 0.7,
      backgroundColor: "transparent",
    },
    labelStyle: {
      fontSize: 18,
      marginLeft: 12,
      fontWeight: "normal",
    },
    itemsContainerStyle: {
      paddingVertical: 16,
      paddingHorizonal: 12,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
  },
};

//styling for menu
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "blueviolet",
    paddingHorizontal: 28,
    paddingTop: theme.SIZES.BASE * 5,
    justifyContent: "center",
  },
  profile: {
    marginBottom: theme.SIZES.BASE,
  },
});

//exporting Menu
export default Menu;
