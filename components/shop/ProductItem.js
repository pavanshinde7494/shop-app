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

export default function ProductItem(props) {
  return (
        <View style={styles.product} >
            <View style={styles.touchable}>
                <TouchableNativeFeedback onPress={props.onViewDetails} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image  style={styles.image} source={{uri : props.image}} />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title} >{props.title}</Text>
                            <Text style={styles.price}>${props.price}</Text>
                        </View>
                        
                        <View style={styles.actions}>
                            <Button color={Colors.primary} title='View Details' onPress={props.onViewDetails}/>
                            <Button color={Colors.primary} title='To Cart' onPress={props.onAddToCart}/>
                        </View>
                    </View>
               </TouchableNativeFeedback>
            </View>
                
            </View>
    
  )
}


const styles = StyleSheet.create({
    product : {
        margin  : 20,
        elevation : 5,
        backgroundColor : 'white',
        borderRadius : 10,
        overflow : 'hidden',
        height : 300
        
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