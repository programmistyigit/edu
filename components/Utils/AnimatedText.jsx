import React, { useEffect, useRef } from 'react';
import { Text, Animated } from 'react-native';

const AnimatedTextColor = ({text}) => {
  const colorValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateColor();
  }, []);

  const animateColor = () => {
    Animated.loop(
      Animated.timing(colorValue, {
        toValue: 2,
        duration: 2000,
        useNativeDriver: false,
      })
    ).start();
  };

  const interpolatedColor = colorValue.interpolate({
    inputRange: [0, 1 ,2],
    outputRange: ['red', 'yellow' , 'red'],
  });

  return (
    <Animated.Text style={{ color: interpolatedColor }}>
        {text}
    </Animated.Text>
  );
};

export default AnimatedTextColor;