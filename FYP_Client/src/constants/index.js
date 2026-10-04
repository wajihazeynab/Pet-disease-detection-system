import { Dimensions } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { updateUserModal } from "../reducer/user_reducer";
import { io } from "socket.io-client"
// import * as Network from 'expo-network';

// let IP_ADDRESs = await Network.getIpAddressAsync();

export let AXIOS_CONFIG = (token) => {
  return ({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '' // Customer Token
    }
  });
}

export let AXIOS_CONFIG_FORM = (token) => {
  return ({
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': token ? `Bearer ${token}` : ''
    }
  })
}

export const SERVER_BASE_URL = 'http://10.73.16.155:1000'
export const MODAL_BASEE_URL = 'http://10.73.16.155:3000'

export function showToast(message, type = 'error', position = 'bottom') {
  Toast.show({
    type: type,
    position: position,
    text1: '',
    text2: message,
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 30,
    props: {
      height: 500,
    },
    bottomOffset: 40,
    onShow: () => { },
    onHide: () => { },
    onPress: () => { },
  });
}

export const AVATAR_IMG = require('../assets/images/avatar.png');

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;

export const scale = size =>
  width > 600
    ? (width / guidelineBaseWidth) * size * 0.61
    : (width / guidelineBaseWidth) * size;


export function isEmailInvalid(email) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export const socket = io(SERVER_BASE_URL);
