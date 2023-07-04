import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AppleLogo, FacebookLogo, GoogleLogo } from '../components/common/Svgs'
import Body from '../components/common/Body'
import Button from '../components/common/Button'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/Header'
import Input from '../components/common/Input'
import { email, required } from '../utils/validators'
import { useDispatch, useSelector } from 'react-redux'
import { LoginAction } from '../../store/action/action'

export default function Login() {
    const safeAreaInsets = useSafeAreaInsets()
    const navigation = useNavigation()
    const [data,setData] = useState([
        {value:'',error:''},
        {value:'',error:''},
    ])
    const auth = useSelector((st:any)=>st.auth)
    const dispatch = useDispatch()
    const handelChnage = (i:number,value:string) =>{
        let item  = [...data]
        item[i].value = value
        setData(item)
    }
    const handelClick = () =>{
        let item = [...data]
        //@ts-ignore
        item[0].error = email(data[0].value)
        //@ts-ignore
        item[1].error = required(data[1].value) 
        if(item[0].error === '' && item[1].error === '' ){
            //@ts-ignore
            dispatch(LoginAction({email:item[0].value,password:item[1].value}))
        }
        setData(item)
    } 
    return (
        <View style={styles.container}>
            <Header title="Войти" />
            <Input 
                label="E-mail" 
                placeholder="Введите e-mail" 
                keyboardType="email-address" 
                position="top" 
                value = {data[0].value}
                error = {data[0].error}
                onChangeText = {(e:string)=>handelChnage(0,e)}
            />
            <Input 
                label="Пароль" 
                placeholder="Введите пароль" 
                secureTextEntry position="bottom" 
                value = {data[1].value}
                error = {data[1].error}
                onChangeText = {(e:string)=>handelChnage(1,e)}
            />

            <TouchableOpacity
                //@ts-ignore
                onPress={() => navigation.navigate('ResetPasswordEmail')}
                style={{ alignSelf: 'flex-end' }}>
                <Body style={styles.resetPassword} color="rgba(47, 128, 237, 1)">
                    Восстановить пароль
                </Body>
            </TouchableOpacity>
            <Body size={12} bold>
                {auth.errorLoading}
            </Body>
            {/*//@ts-ignore*/}
            <Button   onPress={() => handelClick()} text="ВОЙТИ" loading = {auth.loadingLogin} />
            <View style={styles.socialButtonsContainer}>
                <View style={styles.socialMediaButton}>
                    <FacebookLogo />
                </View>

                <View style={[styles.socialMediaButton, { marginHorizontal: 9 }]}>
                    <GoogleLogo />
                </View>

                <View style={styles.socialMediaButton}>
                    <AppleLogo />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    resetPassword: {
        marginTop: 12,
        marginBottom: 16,
    },
    socialMediaButton: {
        width: 86,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(0, 0, 0, 0.09)',
        borderWidth: 1,
        borderRadius: 5,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
})
