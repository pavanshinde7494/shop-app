import React , { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import Colors from '../../constants/Colors'
import CartItem from './CartItem'
import Card from '../UI/Card'

export default function OrderItem(props) {
    const [showDetails , setShowDetails] = useState(false);
    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount} >${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button 
                color={Colors.primary} 
                title={ showDetails == false ? 'Show Details' : 'Hide Details'}
                onPress={()=>{setShowDetails(!showDetails)}}
            />
            {showDetails && <View style = {styles.detailItems}>
                {props.items.map(cartItem =>  
                    (<CartItem
                        key={cartItem.productId}
                        quantity = {cartItem.quantity}
                        amount = {cartItem.sum}
                        title = {cartItem.productTitle}
                    />))}
                </View>
            }
        </Card>
    )
}


const styles = StyleSheet.create({
    orderItem : {
        margin  : 20,
        padding:  10,
        alignItems : 'center'
    },
    summary : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between' ,
        width : '100%',
        marginBottom : 15
    } ,
    totalAmount : {
        fontFamily : 'open-sans-bold',
        fontSize : 16  
    },
    date : {
        fontSize : 16,
        fontFamily : 'open-sans',
        color : '#888'
    },
    detailItems : {
        width : '100%'
    }
})