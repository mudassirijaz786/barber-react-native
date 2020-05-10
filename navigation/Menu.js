//import
import React from "react";
import { DrawerItems } from "react-navigation";
import { Block, Text, theme } from "galio-framework";
const { width } = Dimensions.get("screen");
import {
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";

//Drawer
const Drawer = (props) => (
  <Block
    style={styles.container}
    forceInset={{ top: "always", horizontal: "never" }}
  >
    <Block flex={0.2} style={styles.header}>
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate("Profile")}
      >
        <Block style={styles.profile}>
          <Text h3 color="white">
            Customer
          </Text>
        </Block>
      </TouchableWithoutFeedback>
    </Block>
    <Block flex>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <DrawerItems {...props} />
      </ScrollView>
    </Block>
  </Block>
);

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
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: "center",
  },
  profile: {
    marginBottom: theme.SIZES.BASE / 2,
  },
});

//exporting Menu
export default Menu;
