import React from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const GetAllDataFuntion = async () => {

    let user = JSON.parse(await SecureStore.getItemAsync('userToken'))


    const respose = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/getData/mainDataInitial`,
        {
            obj: {
                Calendar: {
                    user: user.user,
                    idCalendar: 'Calendario Principal',
                },
                Tasks: {
                    user: user.user,
                },
                Text: {
                    user: user.user,
                },
            },
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return respose.data;
};
export { GetAllDataFuntion };
