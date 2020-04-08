/*!

 =========================================================
 * Material Kit React Native - v1.4.0
 =========================================================
 * Product Page: https://demos.creative-tim.com/material-kit-react-native/
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-kit-react-native/blob/master/LICENSE)
 =========================================================
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import { Platform, StatusBar, Image, NetInfo, Text } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";

import AppContainer from "./navigation/Screens";
import { materialTheme } from "./constants/";
import FlashMessage from "react-native-flash-message";

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    connection_Status: "",
  };
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this._handleConnectivityChange
    );

    NetInfo.isConnected.fetch().done((isConnected) => {
      if (isConnected == false) {
        this.setState({
          connection_Status: `You are offline, Please check your internet connection 😔️`,
        });
      } else {
        this.setState({
          connection_Status: "",
        });
      }
    });
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this._handleConnectivityChange
    );
  }
  _handleConnectivityChange = (isConnected) => {
    if (isConnected == false) {
      this.setState({
        connection_Status: `You are offline, Please check your internet connection 😔️`,
      });
    } else {
      this.setState({
        connection_Status: "",
      });
    }
  };
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <GalioProvider theme={materialTheme}>
          <Block flex>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <AppContainer />
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                marginBottom: 20,
                color: "red",
              }}
            >
              {this.state.connection_Status}
            </Text>
            <FlashMessage position="top" />
          </Block>
        </GalioProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([...cacheImages(assetImages)]);
  };

  _handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
