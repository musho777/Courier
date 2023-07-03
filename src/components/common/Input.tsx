import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Body from './Body'

const Input: React.FC<any> = ({
    placeholder,
    name,
    validate,
    secureTextEntry,
    keyboardType,
    label,
    containerStyle,
    maxLength,
    hideError,
    position = '',
    onChangeText,
    value,
    error,
    ...attributes
}) => {
    const [leftFocus, setLeftFocus] = useState(false)

    const containerStyles = [
        styles.inputBox,
        {
            backgroundColor: !leftFocus ? '#FAFAFA' : 'transparent',
            borderTopLeftRadius: ['bottom', 'center'].includes(position) ? 0 : 10,
            borderTopRightRadius: ['bottom', 'center'].includes(position) ? 0 : 10,
            borderTopWidth: ['bottom', 'center'].includes(position) ? 0 : 1,

            borderBottomLeftRadius: ['top', 'center'].includes(position) ? 0 : 10,
            borderBottomRightRadius: ['top', 'center'].includes(position) ? 0 : 10,
        },
        containerStyle,
    ]
    return (
        <View style={containerStyles}>
            {label && (
                <Body
                    size={13}
                    color={leftFocus ? 'rgba(161, 173, 191, 1)' : 'rgba(87, 87, 87, 1)'}
                    medium
                    style={styles.label}>
                    {label}
                </Body>
            )}

            <TextInput
                // onFocus={onFocus}
                // onBlur={onBlur}
                style={styles.input}
                value={value}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
                placeholderTextColor="rgba(0, 0, 0, 0.46)"
                keyboardType={keyboardType}
                onChangeText={(e)=>onChangeText(e)}
                maxLength={maxLength}
                {...attributes}
            />
            {error ? (
                <View style={{ position: 'absolute', bottom: 0 }}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    inputBox: {
        width: '100%',
        height: 76,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E8E8F0',
    },
    inputBox2: {
        width: '100%',
        height: 76,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: 'gray',
    },
    input: {
        fontSize: 15,
        color: 'rgba(36, 55, 87, 1)',
        width: '100%',
        height: '100%',
        paddingTop: 36,
        paddingBottom: 18,
        paddingHorizontal: 31,
        fontFamily: 'Gilroy-Light',
    },
    label: {
        position: 'absolute',
        left: 31,
        top: 10,
    },
    errorText: {
        marginTop: 10,
        color: 'red',
        marginHorizontal: 16,
        fontFamily: 'Gilroy-Light',
        fontSize: 13,
    },
})

export default Input
