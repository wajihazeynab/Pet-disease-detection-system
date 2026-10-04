import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

import HomeScreen from "../screen/HomeScreen";
import InboxScreen from "../screen/InboxScreen";
import Notify from "../components/Notify";
import Favourite from "../screen/FavouriteScreen";
import ProfileScreen from "../screen/ProfileScreen";
import { usePreventRemoveContext } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AppointmentReceiveScreen from "../screen/AppointmentReceiveScreen";
import HomeIcon from "../assets/svg/HomeIcon";
import ChatIcon from "../assets/svg/ChatIcon";
import NotiIcon from "../assets/svg/NotiIcon";
import ProfileIcon from "../assets/svg/ProfileIcon";
import AppointmentIcon from "../assets/svg/AppointmentIcon";

const Tab = createBottomTabNavigator();

export default function MainTabs() {

  const userModal = useSelector(e => e.user_reducer.userModal)

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "stethoscope" : "stethoscope";
          } else if (route.name === "Inbox") {
            iconName = focused ? "hospital-o" : "hospital-o";
          } else if (route.name === "Notification") {
            iconName = focused ? "medkit" : "medkit";
          } else if (route.name === "Favourite") {
            iconName = focused ? "paw" : "paw";
          } else if (route.name === "UserProfile") {
            iconName = focused ? "paw" : "paw";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6CB0E6",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <HomeIcon color={color} />
          )
        }}
      />
      <Tab.Screen
        name="InboxScreen"
        component={InboxScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <ChatIcon color={color} />
          )
        }}
      />
      {/* <Tab.Screen
        name="Notify"
        component={Notify}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <NotiIcon color={color} />
          )
        }}
      /> */}
      <Tab.Screen
        name="AppointmentReceiveScreen"
        component={AppointmentReceiveScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AppointmentIcon color={color} />
          )
        }}
      />
      {userModal?.type == 'customer' &&

        <Tab.Screen
          name="Favourite"
          component={Favourite}
          options={{ headerShown: false }}
        />

      }
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <ProfileIcon color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
