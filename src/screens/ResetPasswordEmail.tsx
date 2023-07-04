import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Button from '../components/common/Button'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/Header'
import Input from '../components/common/Input'
import { email } from '../utils/validators'
import { useDispatch, useSelector } from 'react-redux'
import { ResetPasswordAction } from '../../store/action/action'
import Body from '../components/common/Body'

export default function ResetPasswordEmail() {
    const navigation = useNavigation()
    const [data,setData] = useState({value:'',error:''})
    const dispatch = useDispatch()
    const {resetPassword} = useSelector((st:any)=>st)
    const handelChange = (e:string) =>{
        let item = {...data}
        item.value = e
        setData(item) 
    }
    const handelPress = () =>{
        let item = {...data}
        item.error = email(item.value)
        if(item.error === ''){
            //@ts-ignore
           dispatch(ResetPasswordAction(item.value))
        }
        setData(item)
    }
    return (
        <View style={styles.container}>
            <Header title="Восстановить пароль" />

            <Input
                containerStyle={{ marginBottom: 17 }}
                label="E-mail"
                placeholder="Введите e-mail"
                keyboardType="email-address"
                value = {data.value}
                error = {data.error}
                onChangeText = {(e:string)=>handelChange(e)}
            />
            <Body size={12} bold>
                {resetPassword.error}
            </Body>
            <Button loading = {resetPassword.loading} onPress={() => handelPress()} text="ВОССТАНОВИТЬ ПАРОЛЬ" />
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
