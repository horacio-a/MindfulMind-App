import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useContext, useEffect, useState } from 'react';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import Header from '../../componets/Header';
import NavBar from '../../componets/navBar';
import { SesionGlobalState } from '../../context/SesionGlobalState';
import { Icon } from '@rneui/themed';
import { BackPageState } from '../../context/BackPageState';
import ProfileSelect from '../../componets/util/profileSelect';
import axios from 'axios';
import ChangePass from '../../componets/util/ChangePass';
import ChangeUsername from '../../componets/util/ChangeUsername';


export default function SettingScreen({ navigation }) {
    const { BackPage, setBackPage } = useContext(BackPageState)
    const { session, setsession } = useContext(SesionGlobalState);
    const [user, setUser] = useState('')
    const [profilePicture, setprofilePicture] = useState()
    const [profilSelectcontent, setprofilSelectcontent] = useState(false)
    const [ChangePassContent, setChangePassContent] = useState(false)
    const [ChangeUsernameContent, setChangeUsernameContent] = useState(false)

    useEffect(() => {
        const funtionUser = async () => {
            const respose = JSON.parse(await SecureStore.getItemAsync('userToken'))
            setUser(respose.user)

            switch (respose.profilePicture) {
                case 'mindfulmindLogo':
                    setprofilePicture(require('../../assets/profilePictures/s-white.png'))
                    break;
                case 'mindfulmindLogoBlack':
                    setprofilePicture(require('../../assets/profilePictures/s-black.png'))
                    break;
                default:
                    break;
            }
        }

        funtionUser()
    }, [])


    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });

    useEffect(() => {
        setBackPage('SettingScreen')
    }, [])

    const script = () => {
        Redirect('Home')
    }
    const Redirect = (url) => {
        navigation.navigate(url)
    }
    const ExitSession = async () => {
        await SecureStore.deleteItemAsync('userToken')
        setsession(false)
    }

    const CuestionExitSession = () => {
        Alert.alert('Espera', '¿Estas seguro que quieres cerrar sesion?', [
            { text: 'Si', onPress: () => ExitSession() },
            {
                text: 'No',
                onPress: () => null,
                style: 'cancel',
            },
        ]);
    }

    const ChangeProfilePicture = async (newImg) => {
        switch (newImg) {
            case 'mindfulmindLogo':
                setprofilePicture(require('../../assets/profilePictures/s-white.png'))
                break;
            case 'mindfulmindLogoBlack':
                setprofilePicture(require('../../assets/profilePictures/s-black.png'))
                break;
            default:
                break;
        }
        setprofilSelectcontent(false)
        const data = JSON.parse(await SecureStore.getItemAsync('userToken'))
        data.profilePicture = newImg
        await SecureStore.setItemAsync('userToken', JSON.stringify(data))

        await axios.post('http://31.220.17.121:3500/changeprofilepicture', { data }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }


    if (!fontsLoaded) {
        return (
            <></>

        )
    } else {
        return (
            <>
                <Header back={true} script={script} />

                <View style={styles.MainConteiner}>
                    <View style={{ width: '85%', height: '90%', display: 'flex', alignItems: 'center' }}>

                        <TouchableOpacity onPress={() => setprofilSelectcontent(true)}>
                            <Image style={{ width: 200, height: 200, borderRadius: 500 }} source={profilePicture}></Image>

                        </TouchableOpacity>

                        <Text style={{ width: '100%', color: '#1E1E1E', textAlign: 'center', fontSize: 26, fontFamily: 'Lato_700Bold', marginVertical: '5%' }}>
                            {user}
                        </Text>
                        <TouchableOpacity onPress={() => setChangeUsernameContent(true)} style={{ width: '100%', height: 50, backgroundColor: '#1e1e1e', marginTop: 15, borderRadius: 5, display: 'flex', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontFamily: 'Lato_700Bold', fontSize: 16, marginLeft: 10 }}>Cambiar tu nombre</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setChangePassContent(true)} style={{ width: '100%', height: 50, backgroundColor: '#1e1e1e', marginTop: 15, borderRadius: 5, display: 'flex', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontFamily: 'Lato_700Bold', fontSize: 16, marginLeft: 10 }}>Cambiar contraseña</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { CuestionExitSession() }} style={styles.exitButton}>
                            <Icon
                                name={'logout'}
                                color={'#fff'}
                                style={{ marginLeft: 25 }} />
                            <Text style={{ color: '#fff', fontSize: 16, marginLeft: 10 }}>
                                Cerrar Session
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View >
                {
                    profilSelectcontent
                        ? <ProfileSelect setprofilSelectcontent={setprofilSelectcontent} ChangeProfilePicture={ChangeProfilePicture} />
                        : <></>
                }
                {
                    ChangePassContent
                        ? <ChangePass setChangePassContent={setChangePassContent} />
                        : <></>
                }
                {
                    ChangeUsernameContent
                        ? <ChangeUsername setChangeUsernameContent={setChangeUsernameContent} setUser={setUser} />
                        : <></>
                }

                {/* 
            <NavBar
                Redirect={Redirect}
                home={false}
                routine={false}
                calendar={false}
                text={false}
                settings={true} /> */}
            </>
        )
    }
}

const styles = StyleSheet.create({
    MainConteiner: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    bigblock: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',

    },
    Width100: {
        width: '100%',
    },
    exitButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#D01B13',
        color: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 150
    }
});
