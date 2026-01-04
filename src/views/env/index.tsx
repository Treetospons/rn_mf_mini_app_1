import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MINI_APP1_NAME, MINI_APP1_URL } from '../../utils/config'

const Env = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Env mini app1</Text>
            <Text style={styles.text}>Name: {MINI_APP1_NAME}</Text>
            <Text style={styles.text}>URL: {MINI_APP1_URL}</Text>
        </View>
    )
}

export default Env


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