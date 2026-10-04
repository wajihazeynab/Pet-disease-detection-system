// // Favourite.js
// import React from 'react';
// import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';



// const favourites = [
//   // Add your favourite items here with the proper structure
// ];

// const Favourite = () => {
//   return (
//     <View style={styles.container}>
//       <TextInput style={styles.searchInput} placeholder="Search" />
//       <ScrollView style={styles.list}>
//         {favourites.map((favourite, index) => (
//           <View key={index} style={styles.favouriteItem}>
//             <Image source={favourite.image} style={styles.image} />
//             <View style={styles.info}>
//               <Text style={styles.title}>{favourite.title}</Text>
//               <Text style={styles.distance}>{favourite.distance}</Text>
//               <Text style={styles.price}>{favourite.price}</Text>
//               {/* Implement star rating based on favourite.rating */}
//             </View>
//             <TouchableOpacity>
//               <Icon name="heart" size={24} color="#000" />
//             </TouchableOpacity>
//           </View>
//         ))}
//       </ScrollView>
//       {/* <Navig /> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   searchInput: {
//     fontSize: 16,
//     padding: 10,
//     margin: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 20,
//   },
//   list: {
//     margin: 10,
//   },
//   favouriteItem: {
//     flexDirection: 'row',
//     padding: 10,
//     marginBottom: 10,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 10,
//   },
//   image: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     marginRight: 10,
//   },
//   info: {
//     justifyContent: 'center',
//     flex: 1,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   distance: {
//     fontSize: 14,
//   },
//   price: {
//     fontSize: 14,
//   },
//   // Add styles for star rating
// });

// export default Favourite;
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'; // Make sure you have @expo/vector-icons installed
import { apiDelete, apiGet } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { updateFavorite } from '../reducer/user_reducer';
import { AVATAR_IMG, SERVER_BASE_URL, showToast } from '../constants';

const FavouriteScreen = () => {

  const dispatch = useDispatch()
  const userModal = useSelector(e => e.user_reducer.userModal)
  const favorite = useSelector(e => e.user_reducer.favorite)
  // Example data
  // const favouritePlaces = [
  //   {
  //     id: '1',
  //     name: 'Canine Hospital',
  //     distance: '15km',
  //     rating: 5,
  //     image: require('../assets/HomeDog2.png'), // Replace with your image paths or URIs
  //   },
  //   {
  //     id: '2',
  //     name: 'Canine Hospital',
  //     distance: '15km',
  //     rating: 5,
  //     image: require('../assets/HomeDog2.png'), // Replace with your image paths or URIs
  //   },
  //   {
  //     id: '3',
  //     name: 'Canine Hospital',
  //     distance: '15km',
  //     rating: 4.5,
  //     image: require('../assets/HomeDog2.png'), // Replace with your image paths or URIs
  //   },
  //   // Add more items...
  // ];

  // const [favoriteList, setFavoriteList] = useState([])
  const [loading, setLoading] = useState(false)
  const [delLoading, setDelLoading] = useState('false')

  useEffect(() => {
    getFavorite()
  }, [])

  const getFavorite = async () => {
    setLoading(true)
    const res = await apiGet('/fav/get', userModal.accessToken)
    console.log(res)
    if (res.check) {
      dispatch(updateFavorite(res.data))
    }
    setLoading(false)
  }

  const deleteFav = async (id) => {
    setDelLoading(id)
    const res = await apiDelete(`/fav/delete/${id}`, userModal.accessToken)
    if (res.check) {
      showToast('Deleted Successfully', 'success')
      getFavorite()
    }
    setDelLoading('false')
  }

  // Replace with your own search handling logic
  const handleSearch = (text) => {
    console.log('Searching for:', text);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item?.VetData[0]?.image ? { uri: `${SERVER_BASE_URL}/images/${item.VetData[0].image}` } : AVATAR_IMG} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item?.VetData[0]?.name}</Text>
        <Text style={styles.distance}>{item.distance}</Text>
        <View style={styles.ratingContainer}>
          {/* Render rating stars based on the rating value */}
          {/* {[...Array(5)].map((_, index) => (
            <FontAwesome
              key={index}
              name={index < item.rating ? 'star' : 'star-o'}
              size={24}
              color="gold"
            />
          ))} */}
        </View>
      </View>
      <TouchableOpacity
        disabled={delLoading == item._id}
        onPress={() => deleteFav(item._id)}
      >
        {delLoading == item._id ?
          <ActivityIndicator color={'lightblue'} />
          :
          <Ionicons name="heart" size={30} color="lightblue" />
        }
      </TouchableOpacity>
    </View>
  );
console.log(favorite)
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favourite</Text>
      {/* <TextInput
        placeholder="Search"
        style={styles.searchBar}
        onChangeText={handleSearch}
      /> */}
      <FlatList
        data={favorite}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl loading={loading} onRefresh={getFavorite} />}
      />
      {/* Bottom navigation placeholder */}


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Adjust according to your status bar height
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 30,
    width: 150,
    fontWeight: 'bold',
    //  marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    padding: 10,
    margin: 10,
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  distance: {
    fontSize: 14,
    color: 'gray',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
  },
});

export default FavouriteScreen;