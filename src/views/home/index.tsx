import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Mini App 1</Text>
            <Button title="Open Camera" onPress={() => navigation.navigate('Camera')} />
            <Button title="Open Env" onPress={() => navigation.navigate('Env')} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})