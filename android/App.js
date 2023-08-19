import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import server from './helpers/connection/server';
import Auth from './components/Auth';

export default function App() {
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await server.isLogin();
      setIsLogin(loginStatus);
    };

    checkLoginStatus();
  }, []);

  if (isLogin === null) {
    // Handle loading state if needed
    return null;
  }

  if (!isLogin) {
    return <Auth />;
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
