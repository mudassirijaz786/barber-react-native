import React from "react";
import { Easing, Animated } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  createAppContainer,
} from "react-navigation";
import { Block, Text } from "galio-framework";
import Cart from "../screens/Cart";
import HomeScreen from "../screens/Home";
import TokenSignup from "../screens/TokenSignup";
import OnboardingScreen from "../screens/ForgetPasswordScreen";
import MapandServices from "../screens/MapandServices";
import ProfileScreen from "../screens/Profile";
import RegistrationScreen from "../screens/RegistrationScreen";
import ResetPassword from "../screens/ResetPassword";
import ForgetPasswordScreen from "../screens/ForgetPasswordScreen";
import SettingsScreen from "../screens/Settings";
import TimePick from "../screens/TimePick";
import Landing from "../screens/Landing";
import Logout from "../screens/Logout";
import Schedules from "../screens/Schedules";
import UpdateProfile from "../screens/UpdateProfile";
import TokenForgetPassword from "../screens/TokenForgetPassword";
import Menu from "./Menu";
import Header from "../components/Header";
import { Drawer } from "../components/";
import OneServiceScreen from "../screens/OneService";
import SlotsAvailing from "../screens/SlotsAvailing";
import ServicesScreen from "../screens/ServicesScreen";

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
});

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
      navigationOptions: ({ navigation }) => ({
        title: "Update Profile",
        headerStyle: {
          backgroundColor: "orange",
          alignSelf: "center",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTransparent: true,
      }),
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
        title: "Maps and services",
      }),
    },
    Service: {
      screen: OneServiceScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Service",
      }),
      // navigationOptions: ({ navigation }) => ({
      //   // header: <Header title="Service" navigation={navigation} />,
      //   drawerLabel: () => {},
      // }),
    },
    TimePick: {
      screen: TimePick,
      navigationOptions: ({ navigation }) => ({
        title: "time picker",
      }),
      // navigationOptions: ({ navigation }) => ({
      //   // header: <Header title="Appointment" navigation={navigation} />,
      //   drawerLabel: () => {},
      // }),
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

    MapandServices: {
      screen: MapandServices,
      navigationOptions: ({ navigation }) => ({
        title: "Maps and services",
      }),
    },
    Service: {
      screen: OneServiceScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Service",
      }),
      // navigationOptions: ({ navigation }) => ({
      //   // header: <Header title="Service" navigation={navigation} />,
      //   drawerLabel: () => {},
      // }),
    },
    TimePick: {
      screen: TimePick,
      navigationOptions: ({ navigation }) => ({
        title: "time picker",
      }),
      // navigationOptions: ({ navigation }) => ({
      //   // header: <Header title="Appointment" navigation={navigation} />,
      //   drawerLabel: () => {},
      // }),
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
    Home: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Home" title="Home" />
        ),
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
    Schedules: {
      screen: Schedules,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Schedules" title="Schedules" />
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

    Logout: {
      screen: Logout,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Logout" title="Logout" />
        ),
      }),
    },
  },
  Menu
);

const AppNavigator = createSwitchNavigator(
  {
    App: AppStack,
    Login: {
      screen: OnboardingScreen,
    },
    Registration: {
      screen: RegistrationScreen,
      navigationOptions: {
        drawerLabel: () => {},
      },
    },
    TokenSignup: {
      screen: TokenSignup,
      navigationOptions: {
        drawerLabel: () => {},
      },
    },

    ForgetPassword: {
      screen: ForgetPasswordScreen,
      navigationOptions: {
        drawerLabel: () => {},
      },
    },
    TokenForgetPassword: {
      screen: TokenForgetPassword,
      // navigationOptions: ({ navigation }) => ({
      //   header: (
      //     <Header title="View your Appointment" navigation={navigation} />
      //   ),
      // }),
    },
  },
  {
    initialRouteName: "Login",
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
