import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Card(props) {
    return (
        <View style={{...styles.card , ...props.style}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card : {
        elevation : 5,
        backgroundColor : 'white',
        borderRadius : 10,
        overflow : 'hidden',
    }
})  
