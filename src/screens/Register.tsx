import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { AppleLogo, FacebookLogo, GoogleLogo } from '../components/common/Svgs'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/Header'
import { IRegistr } from '../types/data'
import { FormButton } from '../components/common/FormButton/FormButton'
import { Space } from '../components/common/Space'
import useAppDispatch from '../hooks/useAppDispatch'
import R from '../res'
import { requir, validator, email, tel, CheckPassword } from '../utils/validators'
import Body from '../components/common/Body'
import Input from '../components/common/Input'
import { RegAction } from '../../store/action/action'
import { useSelector } from 'react-redux'

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
            value:'',
        },
        {
            label:"Номер телефона*",
            placeholder:"Введите номер телефона",
            keyboardType:"phone-pad",
            position:"center",
            name:"phone",
            error:'',
            maxLength:11,
            value:'',
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
            value:'',
        }
    ])

    const auth = useSelector((st:any)=>st.auth)
    const handelChange = (value:string,index:any) =>{
        let item = [...data]
        //@ts-ignore
        item[index].value = value
        setData(item)
    }
    const handelSubmit = () =>{
        let send = false
        //@ts-ignore
        let item = [...data]
        //@ts-ignore
        item[0].error = email(data[0].value) 
        //@ts-ignore
        item[1].error = tel(data[1].value)
        //@ts-ignore
        item[2].error = requir(data[2].value)
        //@ts-ignore
        item[3].error = requir(data[3].value)
        //@ts-ignore
        if(item[3].error === ''){
            //@ts-ignore
            item[3].error = CheckPassword(data[2].value,data[3].value)
        }
        if(item[0].error === '' && item[1].error === '' && item[2].error === '' && item[3].error === ''){
            dispatch(RegAction({
                email:item[0].value,
                phone:item[1].value,
                password:item[2].value,
                password_confirmation:item[3].value,
            }))
        }
        setData(item)
    }
    useEffect(()=>{
        if(auth.success){
            //@ts-ignore
            navigation.navigate('ConfirmEmail',{
                email:data[0].value
            })
        }
    },[auth.success])
    return (
                <View style={styles.container}>
                    <Header title="Регистрация" />
                    {data.map((elm,i)=>{
                        return <Input
                            key = {i} 
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
                    })}
                    <Body size={12} bold>
                        {auth.error}
                    </Body>

                    <Space height={20} />
                    <FormButton text="ЗАРЕГИСТРИРОВАТЬСЯ" onPress={()=>handelSubmit()} loading = {auth.loading}/>
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
