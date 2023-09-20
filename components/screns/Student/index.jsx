import React, { useEffect, useMemo, useRef } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Main from './components/main'
import SearchScrenn from './components/SearchScrenn'
import HeaderRight from './header/welcome/Right'
import HeaderLeft from './header/welcome/Left'
import Drawer from './Drawer'
import StudentSearchContext from '../../../contexts/search/student'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useNavigationState } from '@react-navigation/native'
const DrawerNavigator = createDrawerNavigator()

const StudentMainComponent = () => {
  const BottomSheetRef = useRef(null)
  const bottomShetRef = useRef(null)
  const snapPoints = useMemo(() => ["75%" , "50%"] , [])
  const navigationState = useNavigationState(state => state);
  const isDrawerOpen = navigationState?.history[1]?.status
  console.log(navigationState);

  useEffect(() => {
    if (!isDrawerOpen && bottomShetRef.current) {
      bottomShetRef.current.close();
      console.log("hello");
    }
  }, [isDrawerOpen]);
  return (
    <StudentSearchContext.Provider value={{ BottomSheetRef , bottomShetRef }}>
      <DrawerNavigator.Navigator drawerContent={Drawer}>
        <DrawerNavigator.Screen
          name='Welcome'
          component={Main}
          options={
            {
              headerRight: () => <HeaderRight />,
              headerLeft: () => <HeaderLeft />,
            }
          }
        />
        <DrawerNavigator.Screen 
          name='Search'
          component={SearchScrenn}
          options={{headerShown: false}}
        />
      </DrawerNavigator.Navigator>
      <BottomSheetModal
        index={1}
        snapPoints={snapPoints}
        ref={bottomShetRef}
      />
    </StudentSearchContext.Provider>
  )
}

export default StudentMainComponent