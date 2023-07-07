import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import stylesHeader from '../Styles/HeaderStyle.js'
import { Icon } from '@rneui/themed';
import { BackPageState } from '../context/BackPageState';
import { useContext, useEffect } from 'react';


export default function Header({ back, Redirect }) {
    const { BackPage, setBackPage } = useContext(BackPageState)





    return (
        <View style={stylesHeader.header}>
            {
                back
                    ? <TouchableOpacity style={stylesHeader.conteinerMenuHeader} onPress={() => { Redirect(BackPage) }}>
                        <Icon
                            name='arrow-back-ios'
                            color='#fff'
                            size={18}
                        />
                    </TouchableOpacity>
                    : <View style={stylesHeader.conteinerMenuHeader}>
                    </View>
            }

            <View style={stylesHeader.conteinerImgHeader}>
                <Image source={require('../img/xswhite.png')} style={stylesHeader.imgHeader} />
            </View>
        </View>
    )
}