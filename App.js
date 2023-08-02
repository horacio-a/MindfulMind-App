import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './screen/MainScreens/Main';
import RoutineScreen from './screen/MainScreens/Routine';
import CalendarScreen from './screen/MainScreens/Calendar';
import TextScreen from './screen/MainScreens/Texts';
import SettingScreen from './screen/MainScreens/Settings';
import CreateCalendarTask from './screen/CreateCalendarTask';
import { View, Text, Button, Platform, BackHandler, Alert } from 'react-native';
import Loading from './screen/Loading';
import { useEffect, useState, useRef } from 'react';
import * as SecureStore from 'expo-secure-store';
import Login from './screen/Login';
import { SesionGlobalState } from './context/SesionGlobalState';
import { RoutineDateGlobalState, CalendarDateGlobalState, TextDateGlobalState } from './context/DataGlobalState';
import { DayNewTasks } from './context/DayNewTasks';
import { BackPageState } from './context/BackPageState';
const Stack = createNativeStackNavigator();
import ForgetPassword from './screen/ForgetPassword';
import AdministraRoutine from './screen/AdmistarRoutine';
import { GetAllDataFuntion } from './context/GetAllData';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import CreateText from './screen/CreateText';
import EditText from './screen/EditText';
import { TextSelect } from './context/TextSelect';
import TutorialForNewUser from './screen/TutorialForNewUser';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function App({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  }, []);

  const [session, setsession] = useState(false);
  const [SelectedText, setSelectedText] = useState('')
  const [BackPage, setBackPage] = useState('')
  const [DayTasks, setDayTasks] = useState('')

  const [isSignedIn, setisSignedIn] = useState()
  const [loading, setloading] = useState(true)

  const [routineData, SetRoutineData] = useState([])
  const [CalendarData, SetCalendarData] = useState([])
  const [TextData, SetTextData] = useState([])

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


  useEffect(() => {
    const backAction = () => {
      Alert.alert('Espera', '¿Estas seguro que quieres salir?', [
        { text: 'Si', onPress: () => BackHandler.exitApp() },
        {
          text: 'No',
          onPress: () => null,
          style: 'cancel',
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      {
        loading
          ? (<Loading />)
          : (

            <BackPageState.Provider value={{ BackPage, setBackPage }}>
              <TextSelect.Provider value={{ SelectedText, setSelectedText }}>
                <SesionGlobalState.Provider value={{ session, setsession }} >
                  <RoutineDateGlobalState.Provider value={{ routineData, SetRoutineData }}>
                    <CalendarDateGlobalState.Provider value={{ CalendarData, SetCalendarData }}>
                      <TextDateGlobalState.Provider value={{ TextData, SetTextData }}>
                        <DayNewTasks.Provider value={{ DayTasks, setDayTasks }}>
                          <NavigationContainer>
                            <Stack.Navigator initialRouteName={"SignIn"} >
                              {!session ? (
                                <>
                                  <Stack.Screen name="TutorialForNewUser" component={TutorialForNewUser} options={{
                                    headerShown: false, cardStyleInterpolator: config
                                  }} />
                                  <Stack.Screen name="SignIn" component={Login} options={{
                                    headerShown: false, cardStyleInterpolator: config
                                  }} />
                                  <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{
                                    headerShown: false, cardStyleInterpolator: config
                                  }} />

                                </>

                              ) : (
                                <>
                                  <Stack.Screen name="Home" component={Main} options={{
                                    headerShown: false, cardStyleInterpolator: config
                                  }} />
                                  <Stack.Screen name="AdminRoutine" component={AdministraRoutine} options={{
                                    headerShown: false, cardStyleInterpolator: config
                                  }} />

                                  <Stack.Screen name="RoutineScreen" component={RoutineScreen} options={{
                                    headerShown: false, cardStyleInterpolator: config
                                  }} />
                                  <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={{
                                    headerShown: false, cardStyleInterpolator: config
                                  }} />
                                  <Stack.Screen name="TextScreen" component={TextScreen} options={{
                                    headerShown: false, cardStyleInterpolator: config
                                  }} />
                                  <Stack.Screen name="SettingScreen" component={SettingScreen} options={{
                                    headerShown: false, cardStyleInterpolator: config
                                  }} />
                                  <Stack.Screen name="CreateCalendarTask" component={CreateCalendarTask} options={{
                                    headerShown: false, cardStyleInterpolator: config
                                  }} />
                                  <Stack.Screen name="CreateText" component={CreateText} options={{
                                    headerShown: false, cardStyleInterpolator: config
                                  }} />
                                  <Stack.Screen name="EditText" component={EditText} options={{
                                    headerShown: false, cardStyleInterpolator: config
                                  }} />
                                </>

                              )}
                            </Stack.Navigator>
                          </NavigationContainer >
                        </DayNewTasks.Provider>
                      </TextDateGlobalState.Provider>
                    </CalendarDateGlobalState.Provider>
                  </RoutineDateGlobalState.Provider>
                </SesionGlobalState.Provider>
              </TextSelect.Provider>
            </BackPageState.Provider>
          )

      }
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