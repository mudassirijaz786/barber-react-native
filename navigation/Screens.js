import React from "react";
import { Easing, Animated, Platform } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";

import { Block, Text, theme } from "galio-framework";

import ComponentsScreen from "../screens/Components";
import HomeScreen from "../screens/Home";
import OnboardingScreen from "../screens/Login";
import ProfileScreen from "../screens/Profile";
import ProScreen from "../screens/Pro";
import Registration from "../screens/Registration";
import Login from "../screens/Login";
import ResetPassword from "../screens/ResetPassword";
import ForgetPassword from "../screens/ForgetPassword";
import SettingsScreen from "../screens/Settings";
import TimePick from "../screens/TimePick";
import Landing from "../screens/Landing";
import Logout from "../screens/Logout";
import UpdateProfile from "../screens/UpdateProfile";
import ServicesScreen from "../screens/ServicesScreen";

import Menu from "./Menu";
import Header from "../components/Header";
import { Drawer } from "../components/";
import ServiceScreen from "../screens/ServiceScreen";

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = "Search";

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header white transparent title="Profile" navigation={navigation} />
        ),
        headerTransparent: true
      })
    },
    UpdateProfile: {
      screen: UpdateProfile,
      navigationOptions: {
        drawerLabel: () => {}
      }
    }
  },
  {
    cardStyle: { backgroundColor: "#EEEEEE" },
    transitionConfig
  }
);

const SelectingServicesStack = createStackNavigator(
  {
    Services: {
      screen: ServicesScreen,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header search title="Select services" navigation={navigation} />
        )
      })
    },
    Service: {
      screen: ServiceScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Service" navigation={navigation} />
      })
    },
    TimePick: {
      screen: TimePick,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Appointment" navigation={navigation} />
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#EEEEEE" },
    transitionConfig
  }
);

const SettingsStack = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Settings" navigation={navigation} />
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#EEEEEE" },
    transitionConfig
  }
);

const ComponentsStack = createStackNavigator(
  {
    Components: {
      screen: ComponentsScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Components" navigation={navigation} />
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#EEEEEE" },
    transitionConfig
  }
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header search tabs title="Home" navigation={navigation} />
      })
    },
    Landing: {
      screen: Landing,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header
            back
            white
            transparent
            title="Landing"
            navigation={navigation}
          />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#EEEEEE" //this is the backgroundColor for the app
    },
    transitionConfig
  }
);

const AppStack = createDrawerNavigator(
  {
    Onboarding: {
      screen: OnboardingScreen,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Home: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Home" title="Home" />
        )
      }
    },
    Service: {
      screen: SelectingServicesStack,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Woman: {
      screen: Landing,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Landing" title="Woman" />
        )
      })
    },
    Man: {
      screen: Landing,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Landing" title="Man" />
        )
      })
    },
    Kids: {
      screen: Landing,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Landing" title="Kids" />
        )
      })
    },
    NewCollection: {
      screen: Landing,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Pro" title="New Collection" />
        )
      })
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Profile" title="Profile" />
        )
      })
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Settings" title="Settings" />
        )
      })
    },
    Components: {
      screen: ComponentsStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Components" title="Components" />
        )
      })
    },
    MenuDivider: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: () => (
          <Block style={{ marginVertical: 8 }}>
            <Text>{` `}</Text>
          </Block>
        )
      }
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <Drawer
            focused={focused}
            screen="ResetPassword"
            title="Reset Password"
          />
        )
      })
    },
    ForgetPassword: {
      screen: ForgetPassword,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Logout: {
      screen: Logout,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Logout" title="Logout" />
        )
      })
    },
    SignIn: {
      screen: Login,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Registration: {
      screen: Registration,
      navigationOptions: {
        drawerLabel: () => {}
      }
    }
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
