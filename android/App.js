import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import server from './helpers/connection/server';
import Auth from './components/Auth';
import { Provider, useDispatch } from 'react-redux';
import store from './stories';
import { NativeBaseProvider } from 'native-base';
import Context from './contexts/Contex';
import { setCityList } from './stories/cityList';
import { setSpaceList } from './stories/spaceList';

function App() {
  const [isLogin, setIsLogin] = useState(null);
  const distpach = useDispatch()

  useEffect(() => {
    const addCityList = async () => {
      const data = await server.getCityList()
      distpach(setCityList(data.data))
      console.log(data);
    }

    const addSpaceList = async () => {
      const data = await server.getSpaceList()
      console.log(data , "hello");
      distpach(setSpaceList(data.data))
    }

    addSpaceList()
    addCityList()
  } , [])

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await server.isLogin();
      setIsLogin(loginStatus);
      console.log(loginStatus);
    };

    checkLoginStatus();
  }, [isLogin]);

  if (isLogin === null) {
    // Handle loading state if needed
    return null;
  }

  const handleClick = async () => {
    await server.logOut()
    setIsLogin(false)
  }


  return (
    <Context.Provider value={{ setIsLogin }}>
      <NativeBaseProvider>

        {!isLogin ? <Auth />
          : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title='logOut' onPress={handleClick} />
          </View>
        }
      </NativeBaseProvider>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function CreateApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}