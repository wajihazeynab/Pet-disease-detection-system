import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../components/SplashScreen";
import SignUpScreen from "../screen/SignUpScreen";
import SignInScreen from "../screen/SignInScreen";
import HomeScreen from "../screen/HomeScreen";// Assuming Home.js is in the same directory
import ChatScreen from "../screen/ChatScreen"; // Assuming Chat.js is in the same directory
// import Inbox from "../screen/InboxScreen"; // Assuming Inbox.js is in the same directory
import FavouriteScreen from "../screen/FavouriteScreen";
import Notify from "../components/Notify";
import DiseaseDetectScreen from "../screen/DiseaseDetectScreen"; // Make sure the path is correct for your project structure
import ProfileScreen from "../screen/ProfileScreen";
import SymptomsScreen from "../screen/SymptomsScreen";
import MedicineScreen from "../screen/MedicineScreen";
import AddMedicineScreen from "../screen/AddMedicineScreen";
import EditMedicine from "../components/EditMedicine";
import MyPetScreen from "../screen/MyPetScreen";
import PetDetailScreen from "../screen/PetDetailScreen";
import EditVetProfile from "../components/EditVetProfile";
import AddPetScreen from "../screen/AddPetScreen";
import VetScreen from "../screen/VetScreen";
import VetDetailScreen from "../screen/VetDetailScreen";
import DiseasePredictedScreen from "../screen/DiseasePredictedScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainTabs from "./BottomNav";
import { useSelector } from "react-redux";
import AppointmentScreen from "../screen/AppointmentScreen";

const Stack = createStackNavigator();

const Navigation = () => {

    const userModal = useSelector(e => e.user_reducer.userModal)
    console.log("userModa", userModal)
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={userModal == null ? "Splash" : "MainTabs"}>
                {userModal == null ?
                    <>
                        <Stack.Screen
                            name="Splash"
                            component={SplashScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="SignUp"
                            component={SignUpScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="SignIn"
                            component={SignInScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                    :
                    <>
                        <Stack.Screen
                            name="MainTabs"
                            component={MainTabs}
                            options={{ headerShown: false }}
                        />
                        {/* <Stack.Screen
                            name="HomeScreen"
                            component={HomeScreen}
                            options={{ headerShown: false }}
                        /> */}
                        <Stack.Screen
                            name="DiseaseDetectScreen"
                            component={DiseaseDetectScreen}
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="Notify"
                            component={Notify}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="ChatScreen"
                            component={ChatScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="MedicineScreen"
                            component={MedicineScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="EditVet"
                            component={EditVetProfile}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="MyPetScreen"
                            component={MyPetScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="PetDetailScreen"
                            component={PetDetailScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="AddMedicineScreen"
                            component={AddMedicineScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="EditMedicine"
                            component={EditMedicine}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="AddPetScreen"
                            component={AddPetScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="VetScreen"
                            component={VetScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="AppointmentScreen"
                            component={AppointmentScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="VetDetailScreen"
                            component={VetDetailScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="FavouriteScreen"
                            component={FavouriteScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="DiseasePredictedScreen"
                            component={DiseasePredictedScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="SymptomsScreen"
                            component={SymptomsScreen}
                            options={{ headerShown: false }}
                        />
                        {/* <Stack.Screen
                            name="ProfileScreen"
                            component={ProfileScreen}
                            options={{ headerShown: false }}
                        /> */}
                    </>
                }

            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default Navigation;