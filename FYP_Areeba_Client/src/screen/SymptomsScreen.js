import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import CheckBox from "expo-checkbox"; // Make sure 'expo-checkbox' is installed
import { SafeAreaView } from "react-native-safe-area-context";
import CustomBtn from "../components/CustomBtn";
import { MODAL_BASEE_URL } from "../constants";

const SymptomsScreen = ({ navigation }) => {
  const [selectedPet, setSelectedPet] = useState("Cat");
  const [loading, setLoading] = useState(false);
  const [symptoms, setSymptoms] = useState({
    // "Abnormal Posture": 0,
    // "Abnormal Nail Color": 0,
    // "Bad odor": 0,
    // "Bad Breath": 0,
    // "Bleeding": 0,
    // "BleedingGums": 0,
    // "Bleed in Urine/Faces": 0,
    // "Squinting": 0,
    // "Seizures": 0,
    // "Unwillingness to Move": 0,
    "Abdominal Pain": 0,
    "Abnormal Elevation of Inner Eyelid": 0,
    "Abnormal Coloration of One or More Teeth": 0,
    "Abnormal Posture": 0,
    "Abnormal Nail Color": 0,
    "Bad Odor": 0,
    "Bad Breath": 0,
    "Bleeding": 0,
    "Bleeding Gums": 0,
    "Blood in Urine/Feses": 0,
    "Bruises": 0,
    "Crusty Skin": 0,
    "Constipation": 0,
    "Coughing": 0,
    "Crust in The Ear": 0,
    "Depression": 0,
    "Diarrhea": 0,
    "Dehydration": 0,
    "Difficult Urination": 0,
    "Difficulty Swallowing": 0,
    "Dilated Pupil": 0,
    "Discolored Urine": 0,
    "Dry Eye": 0,
    "Drainage": 0,
    "Drooling": 0,
    "Dropping Food": 0,
    "Ear Infection": 0,
    "Ear Redness": 0,
    "Ear Odor": 0,
    "Enlarged Bladder": 0,
    "Excessive Ear Wax": 0,
    "Ear Discharge": 0,
    "Ear Swelling": 0,
    "Ear Mite Infection": 0,
    "Ear Inflammation": 0,
    "Excessive Blinking": 0,
    "Eye Redness": 0,
    "Eye Swelling": 0,
    "Eye Inflammation": 0,
    "Eye Discharge": 0,
    "Eye Excessive Watering": 0,
    "Facial Swelling": 0,
    "Fever": 0,
    "Fractured Tooth": 0,
    "Frequent Thirst": 0,
    "Foul-smelling Urine": 0,
    "Greasy Skin": 0,
    "Grinding teeth": 0,
    "Hair Loss": 0,
    "Head Tilt": 0,
    "Hunched Posture": 0,
    "Impaired Vision": 0,
    "Infections on the face or neck area": 0,
    "Increased Frequency of Urination": 0,
    "Itching Ear": 0,
    "Itching Eye": 0,
    "Lameness": 0,
    "Licking Excessively": 0,
    "Licking at The Paws": 0,
    "Lethargy": 0,
    "Lesions Eye": 0,
    "Lesions Skin": 0,
    "Loose Teeth": 0,
    "Loss of Balance": 0,
    "Loss of Appetite": 0,
    "Lower Back Pain": 0,
    "Mucous Eye": 0,
    "Nasal Discharge": 0,
    "Noisy Breathing": 0,
    "Obesity": 0,
    "Pain": 0,
    "Panting": 0,
    "Protrusion": 0,
    "Runny Nose": 0,
    "Scratching": 0,
    "Smaller Size Pupil": 0,
    "Skin Infection": 0,
    "Skin Redness": 0,
    "Skin Odor": 0,
    "Skin Loose Around Eye": 0,
    "Sagging": 0,
    "Swollen Gums": 0,
    "Swelling": 0,
    "Squinting": 0,
    "Seizures": 0,
    "Unwillingness to Move": 0,
    "Vomiting": 0,
    "Vision Loss/Blindness": 0,
    "Weight Loss": 0,
    "Whitish-appearing Pupil": 0,
    "Yeasty Smell": 0,
    // "Animal Type": 0,
  });

  const toggleSymptom = (symptom) => {
    setSymptoms((currentSymptoms) => ({
      ...currentSymptoms,
      [symptom]: !currentSymptoms[symptom],
    }));
  };

  const detectBySymptoms = async () => {
    setLoading(true);
    try {
      // let arr = []
      // symptoms.map(item => {
      //   item.check && arr.push(item.title)
      // })
      // let myJson = JSON.stringify(arr)
      console.log("arr", JSON.stringify(symptoms));
      const res = await fetch(`${MODAL_BASEE_URL}/diagnose`, {
        method: "POST",
        body: JSON.stringify(symptoms),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("data", data);
      if (data?.diagnosis) {
        setLoading(false);
        navigation.navigate("DiseasePredictedScreen", {
          diagnosis: data.diagnosis,
        });
      }
    } catch (err) {
      setLoading(false);
      console.log("error", err);
    }
  };

  console.log(symptoms);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}> Symptoms</Text>

      <Text style={styles.title}>Symptoms for {selectedPet}</Text>
      <View style={styles.toggleButtons}>
        <TouchableOpacity
          onPress={() => setSelectedPet("Cat")}
          style={[
            styles.toggleButton,
            selectedPet === "Cat" ? styles.toggleButtonActive : {},
          ]}
        >
          <Text
            style={[
              styles.toggleButtonText,
              selectedPet === "Cat" ? styles.toggleButtonTextActive : {},
            ]}
          >
            Cat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedPet("Dog")}
          style={[
            styles.toggleButton,
            selectedPet === "Dog" ? styles.toggleButtonActive : {},
          ]}
        >
          <Text
            style={[
              styles.toggleButtonText,
              selectedPet === "Dog" ? styles.toggleButtonTextActive : {},
            ]}
          >
            Dog
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.symptomList}>
          {/* <FlatList
            data={symptoms}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View style={styles.symptomContainer}>
                <Text style={styles.symptomText}>
                  {item.title}
                </Text>
                <CheckBox
                  value={item.check == 1 ? true : false}
                  size={20}
                  onValueChange={() => {
                    let arr = symptoms

                    arr[index].check = item.check == 1 ? 0 : 1
                    // console.log('arr', arr[index].check)
                    setSymptoms([...arr])
                  }}
                  color={'lightblue'}
                />
              </View>
            )}
          /> */}
          {Object.keys(symptoms).map((sys) => (
            <View style={styles.symptomContainer}>
              <Text style={styles.symptomText}>{sys}</Text>
              <CheckBox
                value={symptoms[sys] == 1 ? true : false}
                size={20}
                onValueChange={() => {
                  let newObj = symptoms;
                  newObj[sys] = newObj[sys] == 1 ? 0 : 1;
                  setSymptoms({ ...newObj });
                }}
                color={"lightblue"}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <CustomBtn
        disabled={loading}
        loading={loading}
        title={"Submit"}
        onPress={detectBySymptoms}
      />
      {/* <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  toggleButtonTextActive: {},
  header: {
    marginTop: 0,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  toggleButtons: {
    alignSelf: "center",
    alignContent: "center",
    backgroundColor: "lightblue",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    width: 300,
    height: 53,
    borderRadius: 20,
  },
  toggleButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0)",
    borderRadius: 15,
    paddingVertical: 10,
    height: 45,
    paddingHorizontal: 30,
    color: "black",
    marginTop: 3.5,
    width: 120,
  },
  toggleButtonActive: {
    backgroundColor: "white",
  },
  toggleButtonText: {
    color: "black",
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 18,
    width: 100,
  },
  symptomList: {
    marginBottom: 20,
  },
  symptomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  symptomText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#87ceeb",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SymptomsScreen;
