import React, { useEffect, useState } from "react";
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import { persist, store } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "react-native-toast-message";
import ToastConfig from "./src/constants/ToastConfig";
import { Text, View, LogBox } from "react-native";
import { persistStore } from "redux-persist";
// import PushNotification from "./src/components/PushNotfication";

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        {/* <PushNotification /> */}
        <Navigation />
        <Toast config={ToastConfig} refs={re => Toast.setRef(re)} />
      </PersistGate>
    </Provider>
  )
}

export default App;
