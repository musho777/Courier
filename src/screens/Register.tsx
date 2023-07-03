import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { AppleLogo, FacebookLogo, GoogleLogo } from '../components/common/Svgs'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/Header'
import { IRegistr } from '../types/data'
import { FormButton } from '../components/common/FormButton/FormButton'
import { Space } from '../components/common/Space'
import useAppDispatch from '../hooks/useAppDispatch'
import { registerAction } from '../state/user/action'
import R from '../res'
import { requir, validator, email, tel } from '../utils/validators'
import Body from '../components/common/Body'
import Input from '../components/common/Input'

export default function Register() {
    const [error, setError] = useState('')
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const [data,setData] = useState([
        {
            label:"E-mail*",
            placeholder:"Введите e-mail",
            keyboardType:"email-address",
            position:"top",
            name:"email",
            error:'',
        },
        {
            label:"Номер телефона*",
            placeholder:"Введите номер телефона",
            keyboardType:"phone-pad",
            position:"center",
            name:"phone",
            error:'',
            maxLength:11
        },
        {
            value:'',
            label:"Пароль*",
            placeholder:"Введите пароль",
            secureTextEntry:true,
            position:"center",
            name:"password",
            error:'',
        },
        {
            label:"Повторите пароль*",
            placeholder:"Повторите пароль",
            secureTextEntry:true,
            position:"bottom",
            name:"passwordConfirmation",
            error:'',
            value:''
        }
    ])
    const initialValues: IRegistr = {
        email: '',
        phone: '',
        password: '',
        passwordConfirmation: '',
    }

    const submit = (data: IRegistr) => {
        dispatch(
            registerAction({
                data,
                onSuccess: () => {
                    //@ts-ignore
                    navigation.navigate(R.routes.CONFIRM_EMAIL)
                },
                onError: async () => {
                    setError('Предоставленный код не совпадает или истек срок действия')
                },
            }),
        )
    }
    const handelChange = (value:string,index:any) =>{
        console.log(value,index)
        let item = [...data]
        //@ts-ignore
        item[index].value = value
        setData(item)
    }

    return (
                <View style={styles.container}>
                    <Header title="Регистрация" />
                    {data.map((elm,i)=>{
                        return <Input 
                            label = {elm.label}
                            placeholder = {elm.placeholder}
                            keyboardType = {elm.keyboardType}
                            position = {elm.position}
                            name = {elm.name}
                            maxLength = {elm.maxLength}
                            value = {elm.value}
                            error = {elm.error}
                            onChangeText = {(e:any)=>handelChange(e,i)}
                        />
                    })

                    }
                    <Body size={12} bold>
                        {error}
                    </Body>

                    <Space height={20} />
                    <FormButton text="ЗАРЕГИСТРИРОВАТЬСЯ"  />
                    <Space height={20} />

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
