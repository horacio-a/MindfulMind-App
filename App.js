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
import Main from './screen/MainScreens/Main';
import RoutineScreen from './screen/MainScreens/Routine';
import CalendarScreen from './screen/MainScreens/Calendar';
import TextScreen from './screen/MainScreens/Texts';
import SettingScreen from './screen/MainScreens/Settings';
import CreateCalendarTask from './screen/CreateCalendarTask';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Loading from './screen/Loading';
import Login from './screen/Login';
import ForgetPassword from './screen/ForgetPassword';
import AdministraRoutine from './screen/AdmistarRoutine';
import CreateText from './screen/CreateText';
import EditText from './screen/EditText';
import EditarCalendar from './screen/EditCalendar';
import TutorialForNewUser from './screen/TutorialForNewUser';
import ForgetUser from './screen/ForgetUser';


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
  lightColor: '#1E1E1E',
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

    const IsUserRegister = async () => {
      let stopLoading = true
      const userToken = await SecureStore.getItemAsync('userToken')
      if (userToken) {
        const response = (await GetAllDataFuntion())
        SetCalendarData(response.CalendarData)
        SetRoutineData(response.TasksData)
        SetTextData(response.TextData)
        stopLoading = false
        setloading(false)
        setsession(true)

      } else {
        setTimeout(() => {
          stopLoading = false
          setsession(false)
          setloading(false)
        }, 1000);

      }
      setTimeout(() => {
        if (stopLoading) {
          SecureStore.deleteItemAsync('userToken')
          setsession(false)
          setloading(false)
        }
      }, 6500);
    };

    IsUserRegister();
  }, []);





  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };


  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });


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

                                <NavigationContainer>
                                  <Stack.Navigator initialRouteName={"SignIn"} >
                                    {!session ? (
                                      <>
                                        <Stack.Screen name="TutorialForNewUser"
                                          component={TutorialForNewUser} options={{ headerShown: false, forFade }} />

                                        <Stack.Screen name="SignIn"
                                          component={Login} options={{ headerShown: false, forFade }} />

                                        <Stack.Screen name="ForgetPassword"
                                          component={ForgetPassword} options={{ headerShown: false, forFade }} />

                                        <Stack.Screen name="ForgetUser"
                                          component={ForgetUser} options={{ headerShown: false, forFade }} />
                                      </>
                                    ) : (
                                      <>
                                        <Stack.Screen name="Home"
                                          component={Main} options={{ headerShown: false, forFade }} />

                                        <Stack.Screen name="AdminRoutine"
                                          component={AdministraRoutine} options={{ headerShown: false, forFade }} />

                                        <Stack.Screen name="RoutineScreen"
                                          component={RoutineScreen} options={{ headerShown: false, forFade }} />

                                        <Stack.Screen name="CalendarScreen"
                                          component={CalendarScreen} options={{ headerShown: false, forFade }} />

                                        <Stack.Screen name="EditarCalendar"
                                          component={EditarCalendar} options={{ headerShown: false, forFade }} />

                                        <Stack.Screen name="TextScreen"
                                          component={TextScreen} options={{ headerShown: false, forFade }} />

                                        <Stack.Screen name="SettingScreen"
                                          component={SettingScreen} options={{ headerShown: false, forFade }} />

                                        <Stack.Screen name="CreateCalendarTask"
                                          component={CreateCalendarTask} options={{ headerShown: false, forFade }} />

                                        <Stack.Screen name="CreateText"
                                          component={CreateText} options={{ headerShown: false, forFade }} />

                                        <Stack.Screen name="EditText"
                                          component={EditText} options={{ headerShown: false, forFade }} />
                                      </>
                                    )}
                                  </Stack.Navigator>
                                </NavigationContainer >
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
  try {

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
  } catch (error) {
    return error
  }
}