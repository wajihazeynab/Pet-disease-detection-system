import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as colors from "../styles";
import { SCREEN_WIDTH } from "../constants";
import { scale } from '../constants'
const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.Divv}>
        <Text style={styles.ttitle}>Pawscheck</Text>
        <Image
          source={require("../assets/SplashDog.png")}
          style={styles.logo}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>Take Care of Your Pet</Text>
        <Text style={styles.subtitle}>
          Make your bonding relationship between pets & humans
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "space-around",
    paddingBottom: 80,
  },
  Divv: {
    backgroundColor: colors.APP_BTN_COLOR,
    alignItems: "center",
    width: SCREEN_WIDTH,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: scale(30)
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  ttitle: {
    paddingTop: 50,
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
  },
  title: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: scale(50)
  },
  subtitle: {
    color: "darkgrey",
    fontSize: 16,
    paddingHorizontal: 30,
    textAlign: "center",
    marginVertical: scale(5)
  },
  button: {
    backgroundColor: colors.APP_BTN_COLOR,
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: scale(50)
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default SplashScreen;