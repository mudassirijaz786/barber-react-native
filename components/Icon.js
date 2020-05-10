//importing
import React from "react";
import * as Font from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import { Icon } from "galio-framework";
import GalioConfig from "../assets/fonts/galioExtra";

//defining some constants
const GalioExtra = require("../assets/fonts/galioExtra.ttf");
const IconGalioExtra = createIconSetFromIcoMoon(GalioConfig, "GalioExtra");

//exporting IconExtra
export default class IconExtra extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({ GalioExtra: GalioExtra });
    this.setState({ fontLoaded: true });
  }

  //rendering
  render() {
    const { name, family, ...rest } = this.props;
    if (name && family && this.state.fontLoaded) {
      if (family === "GalioExtra") {
        return <IconGalioExtra name={name} family={family} {...rest} />;
      }
      return <Icon name={name} family={family} {...rest} />;
    }
    return null;
  }
}
