import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import server from './helpers/connection/server';
import Auth from './components/Auth';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './stories';
import { NativeBaseProvider } from 'native-base';
import Context from './contexts/Contex';
import { setCityList } from './stories/cityList';
import { setSpaceList } from './stories/spaceList';
import { replaceWhoami } from './stories/template/whoami';
import _ from "lodash"
import MainPage from './components/MainPage';
import 'react-native-gesture-handler';
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { setUserData } from './stories/template/user_data';
import Spinner from 'react-native-loading-spinner-overlay';

function App() {
  const [isLogin, setIsLogin] = useState(null);
  const distpach = useDispatch()
  const whoami = useSelector(e => e.whoami)
  useEffect(() => {
      LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
    const addCityList = async () => {
      const data = await server.getCityList()
      distpach(setCityList(data.data))
    }

    const addSpaceList = async () => {
      const data = await server.getSpaceList()
      console.log(data, "hello");
      distpach(setSpaceList(data.data))
    }

    addSpaceList()
    addCityList()
  }, [])

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await server.isLogin();
      setIsLogin(loginStatus.data.isLogin);
      if (loginStatus.status == "success") return distpach(replaceWhoami(_.pick(loginStatus.data, ["_id", "role"])))
    };

    checkLoginStatus();
  }, [isLogin]);

  useEffect(() => {
    if (!whoami.role) return;
    const setUserDataf = async () => {
      const payload = await server.getDataMe[whoami.role]()
      distpach(setUserData(payload.data))
    }
    setUserDataf()
  }, [whoami])

  const logOut = async () => {
    await server.logOut()
    setIsLogin(false)
  }

  if (isLogin === null) {
    // Handle loading state if needed
    return <Spinner overlayColor='black' textContent='"Loading...' visible={true} textStyle={{color:"#fff"}} />;
  }
  const theme = {
    dark: true,
    colors: {
      background: '#000', // Set the background color to a dark color
      primary: '#fff', // Set the primary color to a light color
      // Add more color values as needed
    },
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Context.Provider value={{ setIsLogin, logOut }}>
        <BottomSheetModalProvider thema={theme}>
          <NativeBaseProvider>
            <NavigationContainer theme={DarkTheme}>
              {
                !isLogin
                  ? <Auth />
                  : <MainPage />
              }
            </NavigationContainer>
          </NativeBaseProvider>
        </BottomSheetModalProvider>
        <StatusBar style='light' />
      </Context.Provider>
    </GestureHandlerRootView>
  );
}

export default function CreateApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

