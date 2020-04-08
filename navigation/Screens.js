import React from "react";
import { Easing, Animated } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
} from "react-navigation";
import { Block, Text } from "galio-framework";
import Cart from "../screens/Cart";
import HomeScreen from "../screens/Home";
import OnboardingScreen from "../screens/ServiceScreen";
import MapandServices from "../screens/MapandServices";
import ProfileScreen from "../screens/Profile";
import Registration from "../screens/Registration";
import ResetPassword from "../screens/ResetPassword";
import ForgetPassword from "../screens/ForgetPassword";
import SettingsScreen from "../screens/Settings";
import TimePick from "../screens/TimePick";
import Landing from "../screens/Landing";
import Logout from "../screens/Logout";
import UpdateProfile from "../screens/UpdateProfile";
import ViewAppointment from "../screens/ViewAppointment";
import Menu from "./Menu";
import Header from "../components/Header";
import { Drawer } from "../components/";
import ServiceScreen from "../screens/ServiceScreen";
import SlotsAvailing from "../screens/SlotsAvailing";

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  screenInterpolator: (sceneProps) => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1],
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0],
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
  },
});

// ProfileStack working fine it has 2 screens Profile to Update Profile
const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header white transparent title="Profile" navigation={navigation} />
        ),
        headerTransparent: true,
      }),
    },
    UpdateProfile: {
      screen: UpdateProfile,
      navigationOptions: {
        drawerLabel: () => {},
      },
    },
  },
  {
    cardStyle: { backgroundColor: "#EEEEEE" },
    transitionConfig,
  }
);

const MapandServicesStack = createStackNavigator(
  {
    MapandServices: {
      screen: MapandServices,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Map and Services" navigation={navigation} />,
      }),
    },
    Service: {
      screen: ServiceScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Service" navigation={navigation} />,
      }),
    },
    TimePick: {
      screen: TimePick,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Appointment" navigation={navigation} />,
      }),
    },
    ViewAppointment: {
      screen: ViewAppointment,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header title="View your Appointment" navigation={navigation} />
        ),
      }),
    },
  },
  {
    cardStyle: { backgroundColor: "#EEEEEE" },
    transitionConfig,
  }
);

const SettingsStack = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Settings" navigation={navigation} />,
      }),
    },
  },
  {
    cardStyle: { backgroundColor: "#EEEEEE" },
    transitionConfig,
  }
);

const CartStack = createStackNavigator(
  {
    Cart: {
      screen: Cart,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Your Cart" navigation={navigation} />,
      }),
    },
  },
  {
    cardStyle: { backgroundColor: "#EEEEEE" },
    transitionConfig,
  }
);

const SlotsAvailingStack = createStackNavigator(
  {
    SlotsAvailing: {
      screen: SlotsAvailing,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Slots History" navigation={navigation} />,
      }),
    },
  },
  {
    cardStyle: { backgroundColor: "#EEEEEE" },
    transitionConfig,
  }
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Home" navigation={navigation} />,
      }),
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
        headerTransparent: true,
      }),
    },
  },
  {
    cardStyle: {
      backgroundColor: "#EEEEEE", //this is the backgroundColor for the app
    },
    transitionConfig,
  }
);

const AppStack = createDrawerNavigator(
  {
    Onboarding: {
      screen: OnboardingScreen,
      navigationOptions: {
        drawerLabel: () => {},
      },
    },
    Home: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Home" title="Home" />
        ),
      },
    },
    MapWithServices: {
      screen: MapandServicesStack,
      navigationOptions: {
        drawerLabel: () => {},
      },
    },
    Cart: {
      screen: CartStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Cart" title="Customer Cart" />
        ),
      }),
    },

    SlotsAvailing: {
      screen: SlotsAvailingStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer
            focused={focused}
            screen="SlotsAvailing"
            title="Slots Availing"
          />
        ),
      }),
    },

    Profile: {
      screen: ProfileStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Profile" title="Profile" />
        ),
      }),
    },

    MenuDivider: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: () => (
          <Block style={{ marginVertical: 30 }}>
            <Text>{` `}</Text>
          </Block>
        ),
      },
    },

    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer
            focused={focused}
            screen="ResetPassword"
            title="Reset Password"
          />
        ),
      }),
    },
    ForgetPassword: {
      screen: ForgetPassword,
      navigationOptions: {
        drawerLabel: () => {},
      },
    },
    Logout: {
      screen: Logout,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Logout" title="Logout" />
        ),
      }),
    },
    Registration: {
      screen: Registration,
      navigationOptions: {
        drawerLabel: () => {},
      },
    },
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
