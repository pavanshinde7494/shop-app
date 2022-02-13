import React from 'react'
import { FlatList, StyleSheet, View,Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { useSelector } from 'react-redux'
import OrderItem from '../../components/shop/OrderItem';

export default function OrdersScreens(props) {
    const orders = useSelector(state => state.orders.orders);

    props.navigation.setOptions({
        headerLeft : ()=>{
            return <Ionicons 
                name="ios-menu" 
                size={24} 
                color="white" 
                style={{
                    marginLeft : 15
                }}
                onPress= {()=>{
                    console.log(props.navigation.toggleDrawer());
                }}
            />
        }
    })
    if(orders.length == 0){
        return (
            <View 
                style={{flex : 1,alignItems : 'center',justifyContent : 'center' }}
            >
                <Text
                    style={{fontFamily : 'open-sans'}}
                >
                    You Haven't Ordered anything yet!!
                </Text>
            </View>
        
            )
    }
    return (
        <FlatList
            data={orders}
            keyExtractor = {(item)=>{
                return item.id
            }}
            renderItem = {(itemData)=>
                <OrderItem
                    amount = {itemData.item.totalAmount} 
                    date = {itemData.item.readableDate}
                    items = {itemData.item.items}
                />}
        />
    )
}

const styles = StyleSheet.create({

})
