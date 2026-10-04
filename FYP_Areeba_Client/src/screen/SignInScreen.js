import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MainTabs from '../navigation/BottomNav';
import { apiPost } from '../api';
import CustomBtn from '../components/CustomBtn';
import { useDispatch } from 'react-redux';
import { showToast } from '../constants';
import Entypo from 'react-native-vector-icons/Entypo'
import { updateUserModal } from '../reducer/user_reducer';
// import Constants from 'expo-constants';

const SignInScreen = ({ navigation }) => {

  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const validation = () => {
    if (email == '' || password == '') {
      return true
    }
    else {
      return false
    }
  }
  // console.log('cons', Constants.manifest)
  const signIn = async () => {
    setLoading(true)
    console.log(email, password)
    const DATA = {
      email: email,
      password: password
    }
    const data = await apiPost('/user/login', DATA)

    if (data.check) {
      console.log('data', data)
      dispatch(updateUserModal(data.data))
      navigation.navigate('MainTabs')

    }
    else {
      showToast(data.message, 'error')
    }
    setLoading(false)

  }
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/SignInDog.png')} // replace with your image path
        style={styles.logo}
      />
      <Text style={styles.title}>Let's sign you in</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={e => setEmail(e)}
        value={email}
      />
      <View style={{ ...styles.input, padding: 0, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextInput
          style={{ flex: 1, paddingVertical: 10 }}
          placeholder="Enter your password"
          secureTextEntry={!showPassword}
          onChangeText={e => setPassword(e)}
          value={password}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Entypo size={20} name={showPassword ? 'eye' : 'eye-with-line'} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.SignupText} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.TText}>Don't have an account?</Text>
        <Text style={styles.linkText}>Signup</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => signIn()}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity> */}
      <CustomBtn
        disabled={validation() || loading}
        loading={loading}
        title={'Sign In'}
        btnStyle={{ width: '80%', borderRadius: 30, marginTop: 15 }}
        onPress={() => signIn()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
  title: {
    alignSelf: 'flex-start',
    paddingLeft: 40,
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    width: '80%',
  },
  SignupText: {
    flexDirection: 'row',
  },
  TText: {
    color: 'black',
    marginVertical: 10,
  },
  linkText: {
    marginLeft: 5,
    color: '#00ADEF',
    marginVertical: 10,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#00ADEF',
    padding: 15,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SignInScreen;
// import React from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

// const SignInScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('../assets/splash.png')} // replace with your image path
//         style={styles.image}
//       />
//       <Text style={styles.title}>Let's sign you in</Text>
//       <TextInput style={styles.input} placeholder="Enter your email" />
//       <TextInput
//         style={[styles.input, styles.inputPassword]}
//         placeholder="Enter your password"
//         secureTextEntry
//       />
//       <TouchableOpacity>
//         <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button}
//       onPress={() => navigation.navigate('Home')}>
//         <Text style={styles.buttonText}>Sign In</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: '60%',
//     height: '30%',
//     resizeMode: 'contain',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '80%',
//     padding: 15,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     backgroundColor: '#fff',
//   },
//   inputPassword: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   signUpText: {
//     color: '#00ADEF',
//     marginBottom: 10,
//   },
//   button: {
//     width: '80%',
//     backgroundColor: '#00ADEF',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default SignInScreen;