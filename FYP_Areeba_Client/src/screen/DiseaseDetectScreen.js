// DiseaseDetect.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Pressable, ScrollView,   Linking,Image ,ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { apiPostModal } from '../api';
import { MODAL_BASEE_URL } from '../constants';

const DiseaseDetectScreen = ({navigation}) => {

  const [loading,setLoading]=useState(false)
  
  const DetectDiseaseByImage = async () => {
    try {
      // Ask for camera permissions
      // const permissionResult = await ImagePicker.launchImageLibraryAsync();
  
      // if (permissionResult.granted === false) {
      //   alert("You've refused to allow this app to access your camera!");
      //   return;
      // }
  setLoading(true)
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      base64:true,
      aspect: [4, 3],
      quality: 1,
    });
  
      // Explore the result
      if (!result.cancelled) {
        console.log(result.uri);
        // You can use the uri to display the image or upload it
      }
      // else{
        console.log('image',result)
        const formData = new FormData();
        formData.append('image', {
            uri: result.uri,
            type: 'image/jpeg',
            name: 'photo.jpg',
        });
        
        try {
          const response = await fetch(`${MODAL_BASEE_URL}/predict_image`, {
              method: 'POST',
              body: formData,
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });

          const data = await response.json();
          setLoading(false)
          console.log("response",data);
          if(data?.prediction){
            navigation.navigate('DiseasePredictedScreen',{diagnosis:data.prediction})
          }
      
      } catch (error) {
        setLoading(false)
          console.error('Error uploading image:', error);
      }
      // const formData=new FormData()
      // formData.append('image', {

      // })
      //   const DATA={
      //     image:result.assets[0].base64,
      //   }
      //   const res=await apiPostModal('/predict_image',formData)
      //   console.log(res)
      // }
    } catch (error) {
      console.error("Error taking a photo: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
       <Text style={styles.header}>Disease Detection</Text>
    <ScrollView >
   
      {/* <Text style={styles.subHeader}>Choose your pet</Text> */}
      
      {/* Pet Selection */}
      <View style={styles.petSelection}>
        <Image source={require('../assets/HomeDog1.png')} style={styles.petImage} />
        <Image source={require('../assets/HOmeCat.png')} style={styles.petImage} />
        <Image source={require('../assets/HomeDog2.png')} style={styles.petImage} />
      </View>
      
      <Text style={styles.subHeader}>Choose checkup method</Text>
      
      {/* Checkup Method Selection */}
      <View style={styles.methodSelection}>
        <TouchableOpacity 
        disabled={loading}
        style={styles.methodButton} 
        onPress={DetectDiseaseByImage}
        >
          {loading ? 
          <ActivityIndicator />
          :
          <Icon name="camera" size={60} color="white" />
          }
        </TouchableOpacity>
        <TouchableOpacity style={styles.methodButton}
        onPress={() => navigation.navigate("SymptomsScreen")}>
          <Icon name="format-list-bulleted" size={60} color="white" />
         
        </TouchableOpacity>
      </View>
      <View style={styles.methodSelection}>
        
      <Text>  Upload Image</Text>
      <Text>Through symptoms</Text>
      </View>
      
      {/* Tips Section */}
      <Text style={styles.tipsHeader}>Tips:</Text>
      <Text style={styles.tip}>Hold your camera steady to avoid blurry images.</Text>
      <Text style={styles.tip}>Take close-up shots of the area of concern on your pet.</Text>
      <Text style={styles.tip}>Capture photos in the highest resolution your device allows.</Text>
      <Text style={styles.tip}>Remove any distractions to focus on the pet's condition.</Text>
      <Text style={styles.tip}>Hold your camera steady to avoid blurry images.</Text>
      
      {/* Help Section */}
      {/* <TouchableOpacity style={styles.helpButton}>
        <Text style={styles.helpText}>Need help?</Text>
      </TouchableOpacity> */}

      <Pressable
                onPress={() => Linking.canOpenURL('https://www.dogster.com/dog-training/how-to-train-a-dog')
                  && Linking.openURL('https://www.dogster.com/dog-training/how-to-train-a-dog')}
                style={styles.helpButton}>
                <Text style={styles.helpText}> Need help? </Text>
              </Pressable>
    </ScrollView>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 26,
    color:'black',
    fontWeight: 'bold',
    marginBottom:20 ,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 0,
  },
  petSelection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  petImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  methodSelection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  
  },
  methodButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#00ADEF',
    width:80,
    height:80,
    borderRadius: 50,
  },
  tipsHeader: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  tip: {
    fontSize: 16,
    marginTop: 5,
  },
  helpButton: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  helpText: {
    fontSize: 18,
    color: '#007bff',
  },
  // ... other styles
});

export default DiseaseDetectScreen;

// import React from 'react';
// import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

// const DiseaseDetect = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Disease Detection</Text>
      
//       <Text style={styles.choosePetText}>Choose your pet</Text>
//       <View style={styles.petChoices}>
//         <Image source={require('../assets/splash.png')} style={styles.petImage} />
//         <Image source={require('../assets/splash.png')} style={styles.petImage} />
//         <Image source={require('../assets/splash.png')} style={styles.petImage} />
//       </View>
      
//       <Text style={styles.chooseMethodText}>Choose checkup method</Text>
//       <View style={styles.methodChoices}>
//         <TouchableOpacity style={styles.methodButton}>
//           <Image source={require('../assets/splash.png')} style={styles.methodIcon} />
//           <Text>Through camera</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.methodButton}>
//           <Image source={require('../assets/splash.png')} style={styles.methodIcon} />
//           <Text>Through symptoms</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.tipsContainer}>
//         <Text style={styles.tipsHeader}>Tips:</Text>
//         <Text style={styles.tip}>Hold your camera steady to avoid blurry images.</Text>
//         {/* ... other tips */}
//       </View>

//       <TouchableOpacity style={styles.helpButton}>
//         <Text style={styles.helpButtonText}>Need help?</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   choosePetText: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginTop: 20,
//   },
//   petChoices: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 20,
//   },
//   petImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   chooseMethodText: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginTop: 20,
//   },
//   methodChoices: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 20,
//   },
//   methodButton: {
//     alignItems: 'center',
//   },
//   methodIcon: {
//     width: 50,
//     height: 50,
//   },
//   tipsContainer: {
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     borderRadius: 10,
//   },
//   tipsHeader: {
//     fontWeight: 'bold',
//   },
//   tip: {
//     marginTop: 5,
//   },
//   helpButton: {
//     marginTop: 20,
//     backgroundColor: '#blue',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   helpButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default DiseaseDetect;