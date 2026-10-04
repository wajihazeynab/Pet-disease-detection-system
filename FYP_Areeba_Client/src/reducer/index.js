import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistCombineReducers } from "redux-persist";
import user_reducer from "./user_reducer";

const whitelist = ['user'];

const config = {
    key: 'primary',
    storage: AsyncStorage,
    whitelist
}
export default persistCombineReducers(config, {
    user_reducer
})