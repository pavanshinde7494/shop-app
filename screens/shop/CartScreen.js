import React from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'

import { removeFromCart } from '../../store/actions/cart'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../../components/shop/CartItem'
import Colors from '../../constants/Colors'
export default function () {

    const cartTotalAmount = useSelector((state) => state.cart.totalAmount)
    const cartItems = useSelector((state) => {
        console.log(state);
        let transformedCartItems = [];
        for(const key in state.cart.items) {
            transformedCartItems.push({
                productId : key,
                productTitle : state.cart.items[key].productTitle,
                productPrice : state.cart.items[key].productPrice,
                quantity : state.cart.items[key].quantity,
                sum : state.cart.items[key].sum
            });
        }
        return transformedCartItems;
    })
    console.log(cartItems);

    return (
        <View style={styles.screen}>
            {/* Summary */}
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total : <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
                </Text>
                <Button 
                    color={Colors.accent} 
                    title='Order Now' 
                    disabled={ cartItems.length == 0 }
                />
            </View>
            
            <FlatList
                data={cartItems}
                renderItem = {(itemData)=>{
                                        console.log(itemData.item);
                                        return <CartItem 
                                            title = {itemData.item.productTitle} 
                                            quantity = {itemData.item.quantity}
                                            amount = {itemData.item.sum} 
                                            onRemove = {(itemData)=>{useDispatch(removeFromCart(itemData.item))}}
                                        />}}
                keyExtractor = {(item)=>item.productId}
            />
        </View>
        
    )
}

const styles = StyleSheet.create({
    screen : {
        margin : 20
    },
    summary : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        marginBottom :  20,
        padding : 10,
        elevation : 5,
        borderRadius : 10,
        backgroundColor : 'white'
    },
    summaryText : {
        fontFamily : 'open-sans-bold',
        fontSize: 18
     },
    amount : {
        color :  Colors.primary
    }
})
