import Loading from './screen/Loading';
import { View, Text, Button, Platform } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import * as SecureStore from 'expo-secure-store';
import { SesionGlobalState } from './context/SesionGlobalState';
import { RoutineDateGlobalState, CalendarDateGlobalState, TextDateGlobalState } from './context/DataGlobalState';
import { ExpoPushToken } from './context/ExpoPushTokenState';
import { DayNewTasks } from './context/DayNewTasks';
import { BackPageState } from './context/BackPageState';
import { GetAllDataFuntion } from './context/GetAllData';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { TextSelect } from './context/TextSelect';
import { CalendarSelect } from './context/CalendarSelect';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from "@env"
import { CaledarCardSelect } from './context/CalendarCardSelect';
import { StatusBar } from 'expo-status-bar';
import Navigation from './Navigation';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

Notifications.setNotificationChannelAsync('default', {
  name: 'default',
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: '#FF231F7C',
});


export default function App({ navigation }) {
  const [ExpoToken, setExpoToken] = useState('');

  const [session, setsession] = useState(false);
  const [SelectedText, setSelectedText] = useState('')
  const [SelectedCalendar, setSelectedCalendar] = useState('')

  const [BackPage, setBackPage] = useState('')
  const [DayTasks, setDayTasks] = useState('')

  const [loading, setloading] = useState(true)

  const [routineData, SetRoutineData] = useState([])
  const [CalendarData, SetCalendarData] = useState([])
  const [TextData, SetTextData] = useState([])
  const [dataForCalendarCard, setdateForCalendarCard] = useState('')


  useEffect(() => {
    if (session === true) {
      registerForPushNotificationsAsync().then(token => setExpoToken(token));
    }
  }, [session]);

  useEffect(() => {
    async function saveToken() {
      const userToken = JSON.parse(await SecureStore.getItemAsync('userToken'))
      const res = userToken.notificationTokens.filter((element) => element === ExpoToken)
      if (res[0] === undefined) {
        axios.post(`https://api.mindfulmind.com.ar/setNotificationToken`, { user: userToken.user, NotificationToken: ExpoToken })
        let user = userToken
        user.notificationTokens.push(ExpoToken)
        await SecureStore.setItemAsync('userToken', JSON.stringify(user))

      }
    }
    if (session === true) {
      saveToken()
    }

  }, [ExpoToken])

  useEffect(() => {

    // Fetch the token from storage then navigate to our appropriate place
    const IsUserRegister = async () => {
      const userToken = await SecureStore.getItemAsync('userToken')
      if (userToken) {
        const response = (await GetAllDataFuntion())
        SetCalendarData(response.CalendarData)
        SetRoutineData(response.TasksData)
        SetTextData(response.TextData)
        setloading(false)
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






  return (
    <>
      {
        loading
          ? (<Loading />)
          : (
            <CaledarCardSelect.Provider value={{ dataForCalendarCard, setdateForCalendarCard }}>
              <ExpoPushToken.Provider value={{ ExpoToken, setExpoToken }}>
                <BackPageState.Provider value={{ BackPage, setBackPage }}>
                  <TextSelect.Provider value={{ SelectedText, setSelectedText }}>
                    <CalendarSelect.Provider value={{ SelectedCalendar, setSelectedCalendar }}>
                      <SesionGlobalState.Provider value={{ session, setsession }} >
                        <RoutineDateGlobalState.Provider value={{ routineData, SetRoutineData }}>
                          <CalendarDateGlobalState.Provider value={{ CalendarData, SetCalendarData }}>
                            <TextDateGlobalState.Provider value={{ TextData, SetTextData }}>
                              <DayNewTasks.Provider value={{ DayTasks, setDayTasks }}>

                                <Navigation />

                              </DayNewTasks.Provider>
                            </TextDateGlobalState.Provider>
                          </CalendarDateGlobalState.Provider>
                        </RoutineDateGlobalState.Provider>
                      </SesionGlobalState.Provider>
                    </CalendarSelect.Provider>
                  </TextSelect.Provider>
                </BackPageState.Provider>
              </ExpoPushToken.Provider>
            </CaledarCardSelect.Provider>

          )

      }
      <StatusBar style="dark" />

    </>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: '49a4d4a0-80f7-4e53-ae42-d34494b9c746',
    })).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}