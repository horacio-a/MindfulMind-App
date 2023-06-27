import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './sreens/Main';
import RoutineScreen from './sreens/Routine';
import CalendarScreen from './sreens/Calendar';
import TextScreen from './sreens/Texts';
import SettingScreen from './sreens/Settings';
import { View, Text, Button } from 'react-native';
import Loading from './sreens/Loading';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import Login from './sreens/Login';
import { SesionGlobalState } from './context/SesionGlobalState';
import { RoutineDateGlobalState, CalendarDateGlobalState, TextDateGlobalState } from './context/DataGlobalState';
const Stack = createNativeStackNavigator();
import { EventProvider } from 'react-native-outside-press';

import axios from 'axios';
export default function App({ navigation }) {
  const [session, setsession] = useState(false);

  const [isSignedIn, setisSignedIn] = useState()
  const [loading, setloading] = useState(true)

  const [routineData, SetRoutineData] = useState([])
  const [CalendarData, SetCalendarData] = useState([])
  const [TextData, SetTextData] = useState([])

  useEffect(() => {
    const getAllData = async () => {
      let user = JSON.parse(await SecureStore.getItemAsync('userToken'))
      const response = await axios.post('http://31.220.17.121:3500/mainDataInitial', {
        "obj": {
          "Calendar": {
            "user": user.user,
            "idCalendar": "Calendario Principal"
          },
          "Tasks": {
            "user": user.user
          },
          "Text": {
            "user": user.user
          }
        }
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      SetCalendarData(response.data.CalendarData)
      SetRoutineData(response.data.TasksData)
      SetTextData(response.data.TextData)
      setloading(false)
    }
    // Fetch the token from storage then navigate to our appropriate place
    const IsUserRegister = async () => {
      const userToken = await SecureStore.getItemAsync('userToken')
      if (userToken) {
        getAllData()
        setsession(true)

      } else {
        setTimeout(() => {
          setsession(false)
          setloading(false)
        }, 1000);

      }
    };

    IsUserRegister();
  }, []);


  const forFade = ({ current, next }) => {
    const opacity = Animated.add(
      current.progress,
      next ? next.progress : 0
    ).interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0],
    });

    return {
      leftButtonStyle: { opacity },
      rightButtonStyle: { opacity },
      titleStyle: { opacity },
      backgroundStyle: { opacity },
    };
  };


  return (
    <>
      {
        loading
          ? (<Loading />)
          : (

            <SesionGlobalState.Provider value={{ session, setsession }} >
              <RoutineDateGlobalState.Provider value={{ routineData, SetRoutineData }}>
                <CalendarDateGlobalState.Provider value={{ CalendarData, SetCalendarData }}>
                  <TextDateGlobalState.Provider value={{ TextData, SetTextData }}>
                    <NavigationContainer>
                      <Stack.Navigator initialRouteName={"Signin"} >
                        {!session ? (
                          <>
                            <Stack.Screen name="SignIn" component={Login} options={{
                              headerShown: false, headerStyleInterpolator: forFade
                            }} />
                          </>

                        ) : (
                          <>
                            <Stack.Screen name="Home" component={Main} options={{
                              headerShown: false,
                              headerStyleInterpolator: forFade
                            }} />
                            <Stack.Screen name="RoutineScreen" component={RoutineScreen} options={{
                              headerShown: false, headerStyleInterpolator: forFade
                            }} />
                            <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={{
                              headerShown: false, headerStyleInterpolator: forFade
                            }} />
                            <Stack.Screen name="TextScreen" component={TextScreen} options={{
                              headerShown: false, headerStyleInterpolator: forFade
                            }} />
                            <Stack.Screen name="SettingScreen" component={SettingScreen} options={{
                              headerShown: false, headerStyleInterpolator: forFade
                            }} />

                          </>

                        )}
                      </Stack.Navigator>
                    </NavigationContainer >
                  </TextDateGlobalState.Provider>
                </CalendarDateGlobalState.Provider>
              </RoutineDateGlobalState.Provider>
            </SesionGlobalState.Provider>

          )

      }
    </>




  );
}




