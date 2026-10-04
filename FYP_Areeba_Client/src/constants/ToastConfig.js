import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StyleSheet, Text, View } from 'react-native';
import { scale } from '.';


export default ToastConfig = {
  success: ({ text2, props, ...rest }) => (
    <View style={{ ...styles.mainToastStyle }}>
      <View style={{ backgroundColor: 'green', width: '100%', height: '100%', borderRadius: 10 }}>
        <View style={{ paddingVertical: scale(22), backgroundColor: 'white', paddingLeft: 10, marginLeft: 4, marginBottom: 4, flexDirection: 'row', alignItems: 'center', borderRadius: 5 }}>
          <Ionicons name='checkmark-done-circle' size={30} color='green' style={{}} />
          <Text style={{ color: 'black', flex: 8, textAlign: 'left', marginHorizontal: 5, fontSize: 18 }}>{text2}</Text>
          <AntDesign name='closesquareo' size={scale(30)} color='green' style={{ marginRight: scale(20) }} onPress={() => rest.hide()} />
        </View>
      </View>
    </View>
  ),
  error: ({ text2, props, ...rest }) => (
    <View style={{ ...styles.mainToastStyle, }}>
      <View style={{ backgroundColor: 'red', width: '100%', height: '100%', borderRadius: 10 }}>
        <View style={{ paddingVertical: scale(22), backgroundColor: 'white', paddingLeft: 10, marginLeft: 4, marginBottom: 4, flexDirection: 'row', alignItems: 'center', borderRadius: 5 }}>
          <Ionicons name='checkmark-done-circle' size={30} color='red' style={{}} />
          <Text style={{ color: 'black', flex: 8, textAlign: 'left', marginHorizontal: 5, fontSize: 18 }}>{text2}</Text>
          <AntDesign name='closesquareo' size={scale(30)} color='red' style={{ marginRight: scale(20) }} onPress={() => rest.hide()} />
        </View>
      </View>
    </View>
  ),
  info: ({ text2, props, ...rest }) => (
    <View style={[styles.mainToastStyle]}>
      <View style={{ backgroundColor: 'black', width: '100%', height: '100%', borderRadius: 10 }}>
        <View style={{ paddingVertical: scale(22), backgroundColor: 'white', paddingLeft: 10, alignItems: 'center', marginLeft: 4, marginBottom: 4, flexDirection: 'row', borderRadius: 5 }}>
          <Ionicons name='checkmark-done-circle' size={30} color='black' style={{}} />
          <Text style={{ color: 'black', flex: 8, textAlign: 'left', marginHorizontal: 5, fontSize: 18 }}>{text2}</Text>
          <AntDesign name='closesquareo' size={scale(30)} color='black' style={{ marginRight: scale(20) }} onPress={() => rest.hide()} />
        </View>
      </View>
    </View>
  ),
  any_custom_type: () => { }
};

const styles = StyleSheet.create({
  mainToastStyle: {
    marginHorizontal: 18,
    width: '90%',
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    // paddingLeft: 15
  }
})