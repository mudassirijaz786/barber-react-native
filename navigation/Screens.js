import React from "react";
import { Block, Text } from "galio-framework";
import Cart from "../screens/Cart";
import SalonsScreen from "../screens/SalonsScreen";
import TokenSignupScreen from "../screens/TokenSignupScreen";
import StartScreen from "../screens/LoginScreen";
import Logout from "../screens/Logout";
import MapandServicesScreen from "../screens/MapandServicesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import UpdatePasswordScreen from "../screens/UpdatePasswordScreen";
import ForgetPasswordScreen from "../screens/ForgetPasswordScreen";
import AppointmentScreen from "../screens/AppointmentScreen";
import Schedules from "../screens/Schedules";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";
import TokenForgetPasswordScreen from "../screens/TokenForgetPasswordScreen";
import Menu from "./Menu";
import { Drawer } from "../components/";
import OneServiceScreen from "../screens/OneServiceScreen";
import AppointedServicesScreen from "../screens/AppointedServicesScreen";
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  createAppContainer,
} from "react-navigation";

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
    },
    UpdateProfile: {
      screen: UpdateProfileScreen,
    },
    ResetPassword: {
      screen: UpdatePasswordScreen,
    },
  },
  {
    cardStyle: { backgroundColor: "#EEEEEE" },
  }
);

const SlotsAvailingStack = createStackNavigator(
  {
    SlotsAvailing: {
      screen: AppointedServicesScreen,
    },
  },
  {
    cardStyle: { backgroundColor: "#EEEEEE" },
  }
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: SalonsScreen,
    },

    MapandServices: {
      screen: MapandServicesScreen,
    },
    Service: {
      screen: OneServiceScreen,
    },
    TimePick: {
      screen: AppointmentScreen,
    },
  },
  {
    cardStyle: {
      backgroundColor: "#EEEEEE",
    },
  }
);

const CartStack = createStackNavigator(
  {
    Cart: {
      screen: Cart,
    },
  },
  {
    cardStyle: { backgroundColor: "#EEEEEE" },
  }
);

const AppStack = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="SalonsScreen" title="Salons" />
        ),
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: () => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Profile" title="Profile" />
        ),
      }),
    },
    SlotsAvailing: {
      screen: SlotsAvailingStack,
      navigationOptions: () => ({
        drawerLabel: ({ focused }) => (
          <Drawer
            focused={focused}
            screen="SlotsAvailing"
            title="Slots Availing"
          />
        ),
      }),
    },
    Cart: {
      screen: CartStack,
      navigationOptions: () => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Cart" title="Customer Cart" />
        ),
      }),
    },
    Schedules: {
      screen: Schedules,
      navigationOptions: () => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Schedules" title="Schedules" />
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

    Logout: {
      screen: Logout,
      navigationOptions: () => ({
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
      screen: StartScreen,
    },
    Registration: {
      screen: RegistrationScreen,
    },
    TokenSignup: {
      screen: TokenSignupScreen,
    },

    ForgetPassword: {
      screen: ForgetPasswordScreen,
    },
    TokenForgetPassword: {
      screen: TokenForgetPasswordScreen,
    },
  },
  {
    initialRouteName: "Login",
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
