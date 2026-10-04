import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../constants";
import CustomBtn from "../components/CustomBtn";

export default function ConfirmBooking() {
  const handleSubmit = () => { };
  return (
    <SafeAreaView style={{ padding: scale(10) }}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ ...styles.backbutton, }}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Book Appointment</Text>
      </View>

      <View style={styles.Card}>
        <Image
          source={require("../assets/ConfirmBookingImage.png")}
          style={{
            width: 320,
            height: 160,
            resizeMode: "contain",
            alignSelf: "center",
          }}
        />
        <Text style={{ ...styles.title, fontSize: 25 }}>
          Thanks for booking
        </Text>

        <Text style={{ fontSize: 15, color: "#727272", alignSelf: "center" }}>
          Hope you will be on time
        </Text>
        <CustomBtn
          title={"Got it"}
          onPress={handleSubmit}
          btnStyle={{
            width: "90%",
            alignSelf: "center",
            borderRadius: 15,
            marginTop: 10,
          }}
        />
      </View>
    </SafeAreaView>
  );
} const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  title: {
    paddingTop: 10,
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  Card: {
    backgroundColor: "#F2F2F2",
    marginVertical: scale(10),
    padding: scale(20),
    alignItems: "center",
    justifyContent: "center",
  },
});
