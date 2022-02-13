import React from 'react'
import {
    Button,
    Image,
    Text,
    View,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native'
import Colors from '../../constants/Colors'
import Card from '../UI/Card'

export default function ProductItem(props) {
  return (
        <Card style={styles.product} >
            <View style={styles.touchable}>
                <TouchableNativeFeedback onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image  style={styles.image} source={{uri : props.image}} />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title} >{props.title}</Text>
                            <Text style={styles.price}>${props.price}</Text>
                        </View>
                        <View style={styles.actions}>
                            {props.children}
                        </View>
                    </View>
               </TouchableNativeFeedback>
            </View>        
        </Card>
    
  )
}


const styles = StyleSheet.create({
    product : {
        height : 300,
        margin  : 20,
        
    },
    touchable : {
        borderRadius : 10,
        overflow : 'hidden'
    }
    ,
    imageContainer : {
        width : '100%',
        height : '60%',
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,
        overflow : 'hidden'
    },
    image : {
        width : '100%',
        height : '100%'
    },
    title : {
        fontSize : 18,
        fontFamily : 'open-sans-bold',
        // marginVertical :2
    },price:{
        fontSize : 14,
        color : '#888',
        fontFamily : 'open-sans'
    },
    actions : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        height : '25%',
        paddingHorizontal : 20
    },
    details:{
        alignItems : 'center',
        height : '15%',
        padding : 10
    }
})