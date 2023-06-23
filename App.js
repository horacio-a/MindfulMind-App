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
        console.log('hola')
        getAllData()
        setsession(true)

      } else {
        console.log('chau')
        setTimeout(() => {
          setsession(false)
          setloading(false)
        }, 1000);

      }
    };

    IsUserRegister();
  }, []);




  return (
    <>
      {
        loading
          ? (<Loading />)
          : (
            <EventProvider style={{ flex: 1 }}>

              <SesionGlobalState.Provider value={{ session, setsession }} >
                <RoutineDateGlobalState.Provider value={{ routineData, SetRoutineData }}>
                  <CalendarDateGlobalState.Provider value={{ CalendarData, SetCalendarData }}>
                    <TextDateGlobalState.Provider value={{ TextData, SetTextData }}>
                      <NavigationContainer>
                        <Stack.Navigator initialRouteName={"Signin"} >
                          {!session ? (
                            <>
                              <Stack.Screen name="SignIn" component={Login} options={{ headerShown: false }} />
                            </>

                          ) : (
                            <>
                              <Stack.Screen name="Home" component={Main} options={{ headerShown: false }} />
                              <Stack.Screen name="RoutineScreen" component={RoutineScreen} options={{ headerShown: false }} />
                              <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={{ headerShown: false }} />
                              <Stack.Screen name="TextScreen" component={TextScreen} options={{ headerShown: false }} />
                              <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false }} />

                            </>

                          )}
                        </Stack.Navigator>
                      </NavigationContainer >
                    </TextDateGlobalState.Provider>
                  </CalendarDateGlobalState.Provider>
                </RoutineDateGlobalState.Provider>
              </SesionGlobalState.Provider>
            </EventProvider>

          )

      }
    </>




  );
}




