import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './screen/Main';
import RoutineScreen from './screen/Routine';
import CalendarScreen from './screen/Calendar';
import TextScreen from './screen/Texts';
import SettingScreen from './screen/Settings';
import CreateCalendarTask from './screen/CreateCalendarTask';
import { View, Text, Button } from 'react-native';
import Loading from './screen/Loading';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import Login from './screen/Login';
import { SesionGlobalState } from './context/SesionGlobalState';
import { RoutineDateGlobalState, CalendarDateGlobalState, TextDateGlobalState } from './context/DataGlobalState';
import { DayNewTasks } from './context/DayNewTasks';
import { BackPageState } from './context/BackPageState';
const Stack = createNativeStackNavigator();
import axios from 'axios';
import EndOfDay from './context/EndOfDay';
import ForgetPassword from './screen/ForgetPassword';


export default function App({ navigation }) {
  const [session, setsession] = useState(false);

  const [BackPage, setBackPage] = useState('')
  const [DayTasks, setDayTasks] = useState('')

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

  useEffect(() => {

    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 24 && now.getMinutes() === 0) {
        // Lógica de la función que deseas ejecutar a las 12:00
        console.log('Es mediodía!');
      }
    }, 60000); // Intervalo de verificación cada 1 minuto (ajusta según tus necesidades)

    // Limpieza del intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [])


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

            <BackPageState.Provider value={{ BackPage, setBackPage }}>
              <SesionGlobalState.Provider value={{ session, setsession }} >
                <RoutineDateGlobalState.Provider value={{ routineData, SetRoutineData }}>
                  <CalendarDateGlobalState.Provider value={{ CalendarData, SetCalendarData }}>
                    <TextDateGlobalState.Provider value={{ TextData, SetTextData }}>
                      <DayNewTasks.Provider value={{ DayTasks, setDayTasks }}>
                        <NavigationContainer>
                          <Stack.Navigator initialRouteName={"Signin"} >
                            {!session ? (
                              <>
                                <Stack.Screen name="SignIn" component={Login} options={{
                                  headerShown: false, cardStyleInterpolator: forFade
                                }} />
                                <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{
                                  headerShown: false, cardStyleInterpolator: forFade
                                }} />
                              </>

                            ) : (
                              <>
                                <Stack.Screen name="Home" component={Main} options={{
                                  headerShown: false, cardStyleInterpolator: forFade
                                }} />
                                <Stack.Screen name="RoutineScreen" component={RoutineScreen} options={{
                                  headerShown: false, cardStyleInterpolator: forFade
                                }} />
                                <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={{
                                  headerShown: false, cardStyleInterpolator: forFade
                                }} />
                                <Stack.Screen name="TextScreen" component={TextScreen} options={{
                                  headerShown: false, cardStyleInterpolator: forFade
                                }} />
                                <Stack.Screen name="SettingScreen" component={SettingScreen} options={{
                                  headerShown: false, cardStyleInterpolator: forFade
                                }} />
                                <Stack.Screen name="CreateCalendarTask" component={CreateCalendarTask} options={{
                                  headerShown: false, cardStyleInterpolator: forFade
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
            </BackPageState.Provider>
          )

      }
    </>




  );
}




