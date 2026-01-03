import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Camera as RNCamera, useCameraDevice, useCameraPermission, useMicrophonePermission } from 'react-native-vision-camera'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useIsFocused } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Camera = ({ navigation }: Props) => {
    const device = useCameraDevice('back')
    const isFocused = useIsFocused()
    const { hasPermission, requestPermission } = useCameraPermission()

    useEffect(() => {
        const initPermissions = async () => {
            await requestPermission()
        }
        initPermissions()
    }, [])

    if (!hasPermission) return <View style={styles.center}><Text>Camera permission denied</Text></View>
    if (device == null) return <View style={styles.center}><Text>No camera device found</Text></View>

    return (
        <View style={styles.container}>
            <RNCamera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={isFocused}
            />
            {/* Overlay UI can go here */}
            <View style={styles.overlay}>
                <Text style={styles.text}>Camera Active</Text>
            </View>
        </View>
    )
}

export default Camera

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
    },
    text: {
        color: 'white',
        fontSize: 14,
        opacity: 0.8
    }
})