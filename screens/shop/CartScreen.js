import React from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../store/actions/cart'
import { addOrder } from '../../store/actions/orders'



import CartItem from '../../components/shop/CartItem'
import Card from '../../components/UI/Card'

import Colors from '../../constants/Colors'
import orders from '../../store/reducers/orders'
export default function CartScreen(props) {

    const dispatch = useDispatch();

    const cartTotalAmount = useSelector((state) => state.cart.totalAmount)
    const cartItems = useSelector((state) => {
        // console.log(state);
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
        return transformedCartItems.sort((a,b)=>{
            return a.productId > b.productId
        });
    })
    // console.log(cartItems);

    return (
        <View style={styles.screen}>
            {/* Summary */}
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total : <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2)*100)/100}</Text>
                </Text>
                <Button 
                    color={Colors.accent} 
                    title='Order Now' 
                    disabled={ cartItems.length == 0 }
                    onPress = {()=>{
                        dispatch(addOrder(cartItems,cartTotalAmount));
                        props.navigation.navigate('Orders');
                    }}
                />
            </Card>
            
            <FlatList
                data={cartItems}
                renderItem = {(itemData)=>{
                                        // console.log(itemData.item);
                                        return <CartItem 
                                            title = {itemData.item.productTitle} 
                                            quantity = {itemData.item.quantity}
                                            amount = {itemData.item.sum} 
                                            deletable = {true}
                                            onRemove = {()=>{
                                                // console.log(itemData.item.productId);
                                                dispatch(removeFromCart(itemData.item.productId))
                                            }}
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
    },
    summaryText : {
        fontFamily : 'open-sans-bold',
        fontSize: 18
     },
    amount : {
        color :  Colors.primary
    }
})
