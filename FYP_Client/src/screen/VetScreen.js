// import React from 'react';
// import { View, Text, Image, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';

// const vets = [
//   // Dummy data - replace with real data
//   { id: '1', name: 'Dr Sara', distance: '15km', rating: 150, imageUrl: 'url-to-image' },
//   { id: '2', name: 'Pet Hospital', distance: '15km', rating: 150, imageUrl: 'url-to-image' },
//   // Add more entries...
// ];

// const Vet = () => {
//   const renderItem = ({ item }) => (
//     <View style={styles.listItem}>
//       <Image source={{ uri: item.imageUrl }} style={styles.listItemImage} />
//       <View style={styles.listItemInfo}>
//         <Text style={styles.listItemTitle}>{item.name}</Text>
//         <Text style={styles.listItemDistance}>{item.distance}</Text>
//       </View>
//       <TouchableOpacity style={styles.favoriteButton}>
//         {/* Favorite icon image or use some icon library */}
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <TextInput style={styles.searchInput} placeholder="Search by name" />
//       <FlatList
//         data={vets}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   searchInput: {
//     height: 40,
//     margin: 10,
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 20,
//   },
//   listItem: {
//     flexDirection: 'row',
//     padding: 10,
//     alignItems: 'center',
//   },
//   listItemImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//   },
//   listItemInfo: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   listItemTitle: {
//     fontWeight: 'bold',
//   },
//   listItemDistance: {
//     fontSize: 12,
//     color: '#666',
//   },
//   favoriteButton: {
//     padding: 8,
//   },
//   // Add styles for your favorite icon button
// });

// export default Vet;


import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { apiDelete, apiGet, apiPost } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AVATAR_IMG, SERVER_BASE_URL, showToast } from '../constants';
import { updateFavorite } from '../reducer/user_reducer';

const VetScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const userModal = useSelector(e => e.user_reducer.userModal)
  const favorite = useSelector(e => e.user_reducer.favorite)

  // const initialVetServices = [

  //   {
  //     id: '1',
  //     name: 'Dr Sara',
  //     distance: '15km',
  //     rating: 4.5,
  //     image: require('../assets/HomeDog2.png'), // Replace with your image paths or URIs
  //     favourite: false,
  //   },

  //   {
  //     id: '2',
  //     name: 'Dr Areeba',
  //     distance: '15km',
  //     rating: 4.5,
  //     image: require('../assets/HomeDog2.png'), // Replace with your image paths or URIs
  //     favourite: false,
  //   },
  //   {
  //     id: '3',
  //     name: 'Dr Wajiha',
  //     distance: '15km',
  //     rating: 4.5,
  //     image: require('../assets/HomeDog2.png'), // Replace with your image paths or URIs
  //     favourite: false,
  //   },
  //   {
  //     id: '4',
  //     name: 'Dr Zahira',
  //     distance: '15km',
  //     rating: 4.5,
  //     image: require('../assets/HomeDog2.png'), // Replace with your image paths or URIs
  //     favourite: false,
  //   },
  //   // ... other items
  // ];

  // State for vet services
  const [vetServices, setVetServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favLoading, setFavLoading] = useState('false');

  useEffect(() => {
    getVet()
  }, [])

  const getVet = async () => {
    setLoading(true)
    const res = await apiGet('/vet/all',)
    if (res.check) {
      setVetServices(res.data)
    }
    setLoading(false)
  }

  // Function to toggle favourite status
  const makeFavourite = async (id) => {
    setFavLoading(id)

    const DATA = {
      vet: id
    }
    const res = await apiPost('/fav/add', DATA, userModal.accessToken)
    if (res.check) {
      showToast('Vet Added Favorite Successfully', 'success')
      getFavorite()
    }
    else {
      showToast(res.message)
    }
    setFavLoading('false')
  };

  const deleteFav = async (id, fid) => {
    setFavLoading(fid)
    const res = await apiDelete(`/fav/delete/${id}`, userModal.accessToken)
    if (res.check) {
      showToast('Deleted Successfully', 'success')
      getFavorite()
    }
    setFavLoading('false')
  }

  const getFavorite = async () => {
    const res = await apiGet('/fav/get', userModal.accessToken)
    console.log(res)
    if (res.check) {
      dispatch(updateFavorite(res.data))
    }
  }

  // Render Item
  const renderItem = ({ item }) => {
    let flag = favorite.find(e => e.vet == item._id)
    return (
      <TouchableOpacity style={styles.itemContainer}
        onPress={() => navigation.navigate("VetDetailScreen", { data: item })}>
        <Image source={item.image ? { uri: `${SERVER_BASE_URL}/images/${item.image}` } : AVATAR_IMG} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.detailsContainer}>
            {/* <Ionicons name="star" size={18} color="gold" /> */}
            <Text style={styles.detailsText}>{item.rating}</Text>
            {/* <Ionicons name="location-outline" size={18} color="gray" /> */}
            {/* <Text style={styles.detailsText}>{item.distance}</Text> */}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            flag ?
              deleteFav(flag._id, item._id)
              : makeFavourite(item._id)
          }}>
          {favLoading == item._id ?
            <ActivityIndicator color={'lightblue'} />
            :
            <Ionicons
              name={flag ? "heart" : "heart-outline"}
              size={24}
              color={flag ? "lightblue" : "black"}
            />
          }
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  // Component return
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Veterinary</Text>
      </View>
      {/* <TextInput placeholder="Search by name" style={styles.searchBar} /> */}
      <FlatList
        data={vetServices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl loading={loading} onRefresh={getVet} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60, // Adjust as needed for status bar
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 30,
    width: 150,
    fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 10,
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  detailsText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'gray',
  },
});


export default VetScreen;
