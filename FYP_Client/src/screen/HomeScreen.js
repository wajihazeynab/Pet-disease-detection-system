import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { apiGet } from "../api";
import { updateFavorite } from "../reducer/user_reducer";

const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const userModal = useSelector(e => e.user_reducer.userModal)

  console.log(userModal)
  useEffect(() => {
    if (userModal?.type == 'customer') {
      getFavorite()
    }
  }, [userModal])

  const getFavorite = async () => {
    const res = await apiGet('/fav/get', userModal.accessToken)
    console.log(res)
    if (res.check) {
      dispatch(updateFavorite(res.data))
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.welcomeText}>Welcome {userModal?.name},</Text>
        <Text style={styles.heading}>What are you looking for?</Text>

        {userModal?.type == 'customer' &&
          <View style={styles.menu}>
            <TouchableOpacity
              onPress={() => navigation.navigate("DiseaseDetectScreen")}
            >
              <View style={styles.menuItem}>
                <Icon name="stethoscope" size={40} color="white" />
              </View>
              <Text style={styles.menuText}>Checkup</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("VetScreen")}
            >
              <View style={styles.menuItem}>
                <Icon name="hospital-o" size={40} color="white" />
              </View>
              <Text style={styles.menuText}>Veterinary</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("MedicineScreen")}
            >
              <View style={styles.menuItem}>
                <Icon name="medkit" size={40} color="white" />
              </View>
              <Text style={styles.menuText}>Medicine</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("MyPetScreen")}
            >
              <View style={styles.menuItem}>
                <Icon name="paw" size={40} color="white" />
              </View>
              <Text style={styles.menuText}>My Pet</Text>
            </TouchableOpacity>
          </View>
        }
        <Text style={styles.Explore}>Explore</Text>
        <View style={styles.exploreSection}>
          <TouchableOpacity style={styles.exploreItem1}>
            <View style={styles.A}>
              <Text style={styles.exploreText}>
                How to groom a dog at home?
              </Text>
              <Pressable
                onPress={() => Linking.canOpenURL('https://www.dogster.com/dog-training/how-to-train-a-dog')
                  && Linking.openURL('https://www.dogster.com/dog-training/how-to-train-a-dog')}
                style={styles.Readmore}>
                <Text style={styles.ReadmoreText}> Read More </Text>
              </Pressable>
            </View>
            <Image
              source={require("../assets/Article1Dog.png")}
              style={styles.exploreImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.exploreItem2}>
            <View style={styles.A}>

              <Text style={styles.exploreText}>
                How to groom a cat at home?
              </Text>
              <Pressable
                onPress={() => Linking.canOpenURL('https://betterpet.com/cat-training/')
                  && Linking.openURL('https://betterpet.com/cat-training/')}
                style={styles.Readmore}>
                <Text style={styles.ReadmoreText}> Read More </Text>
              </Pressable>
            </View>
            <Image
              source={require("../assets/Article2Cat.png")}
              style={styles.exploreImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.exploreSection}>
          <TouchableOpacity style={{ ...styles.exploreItem2, backgroundColor: "#dda0dd", }}>
            <View style={styles.A}>
              <Text style={styles.exploreText}>
                How to make your pet happy and healthy?
              </Text>
              <Pressable onPress={() => Linking.canOpenURL('https://www.nationalgeographic.com/animals/article/how-to-make-pets-happy-healthy')
                && Linking.openURL('https://www.nationalgeographic.com/animals/article/how-to-make-pets-happy-healthy')}
                style={styles.Readmore}>
                <Text style={styles.ReadmoreText}> Read More </Text>
              </Pressable>
            </View>
            <Image
              source={require("../assets/Article1Dog.png")}
              style={styles.exploreImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.exploreItem1}>
            <View style={styles.A}>
              <Text style={styles.exploreText}>
                Why Pets Make Us Happy?
              </Text>
              <Pressable onPress={() => Linking.canOpenURL('https://www.thesprucepets.com/science-behind-why-pets-make-us-happy-7368492')
                && Linking.openURL('https://www.thesprucepets.com/science-behind-why-pets-make-us-happy-7368492')}
                style={styles.Readmore}>
                <Text style={styles.ReadmoreText}> Read More </Text>
              </Pressable>
            </View>
            <Image
              source={require("../assets/Article1Dog.png")}
              style={styles.exploreImage}
            />
          </TouchableOpacity>
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  welcomeText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#00ADEF",
    marginTop: 70,
    marginLeft: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6f6f6f",
    marginLeft: 20,
    marginBottom: 20,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 2,
    fontWeight: "bold",
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:'#00ADEF',
    backgroundColor: "#6CB0E6",
    width: 65,
    height: 65,

    borderRadius: 50,
  },
  A: {
    flexDirection: "column",
  },
  menuText: {
    marginTop: 8,
    color: "#333",
    fontWeight: "bold",
    textAlign: 'center',
  },
  Explore: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 25,
    marginLeft: 20,
    marginBottom: 0,
  },
  exploreSection: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  exploreItem1: {
    marginBottom: 15,
    alignItems: "center",
    // backgroundColor:'#a9a9a9',
    backgroundColor: "#F8D462",
    marginTop: 20,
    margin: 10,
    borderRadius: 10,
    flexDirection: "row",
    flex: 1,
    width: 200,
  },
  exploreItem2: {
    marginBottom: 15,
    alignItems: "center",
    // backgroundColor:'#a9a9a9',
    backgroundColor: "#6ECC81",

    marginTop: 20,
    margin: 10,
    borderRadius: 10,
    flexDirection: "row",
    flex: 1,
    width: 250,
  },
  exploreImage: {
    width: 80,
    height: 100,
    borderRadius: 10,
  },
  exploreText: {
    marginTop: 5,
    color: "white",
    fontWeight: "bold",
    width: 80,
    marginLeft: 10,
    textAlign: "left",
    marginBottom: 10,
  },
  Readmore: {
    backgroundColor: "black",
    width: 80,
    borderRadius: 10,
    marginLeft: 5,
    marginBottom: 10,
  },
  ReadmoreText: {
    color: "white",
  },
  nearbyVetSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  nearbyVetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  nearbyVetItem: {
    flexDirection: "row",
    backgroundColor: "#dda0dd",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    height: 150,
  },
  vetImage: {
    width: 150,
    height: 135,
    borderRadius: 30,
    backgroundColor: "#B885BD",
  },
  vetInfo: {
    marginLeft: 10,
  },
  vetName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  vetSpecialty: {
    color: "#6f6f6f",
    fontWeight: "bold",
  },
  vetDistance: {
    color: "#6f6f6f",
    fontWeight: "bold",
    fontSize: 18,
  },
  vetPrice: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default HomeScreen;