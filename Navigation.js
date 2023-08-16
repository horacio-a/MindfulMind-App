import { useEffect, useState, useRef, useContext } from 'react';

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

import { SesionGlobalState } from './context/SesionGlobalState';




export default function Navigation() {
    const { session, setsession } = useContext(SesionGlobalState);


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
    )
}