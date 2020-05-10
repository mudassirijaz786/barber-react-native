//importing
import React from "react";
import { StyleSheet } from "react-native";
import { Block, Text, theme } from "galio-framework";
import Icon from "./Icon";
import materialTheme from "../constants/Theme";

//class DrawerItem
class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;
    switch (title) {
      case "Salons":
        return (
          <Icon
            size={16}
            name="shop"
            family="GalioExtra"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Profile":
        return (
          <Icon
            size={16}
            name="circle-10"
            family="GalioExtra"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );

      case "Appointed Services":
        return (
          <Icon
            size={16}
            name="ios-timer"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Logout":
        return (
          <Icon
            size={16}
            name="ios-log-out"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      default:
        return null;
    }
  };

  //rendering
  render() {
    const { focused, title } = this.props;
    return (
      <Block
        flex
        row
        style={[
          styles.defaultStyle,
          focused ? [styles.activeStyle, styles.shadow] : null,
        ]}
      >
        <Block middle flex={0.1} style={{ marginRight: 28 }}>
          {this.renderIcon()}
        </Block>
        <Block row center flex={0.9}>
          <Text size={18} color={focused ? "white" : "blueviolet"}>
            {title}
          </Text>
        </Block>
      </Block>
    );
  }
}

//exporting DrawerItem
export default DrawerItem;

//styling
const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeStyle: {
    backgroundColor: "blueviolet",
    borderRadius: 60,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
});
