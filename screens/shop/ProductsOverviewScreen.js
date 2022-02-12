import React from 'react'
import { FlatList , Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import ProductItem from '../../components/shop/ProductItem'

import { useSelector , useDispatch } from 'react-redux'
import * as CartActions from '../../store/actions/cart'


export default function ProductsOverviewScreen(props) {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.availableProducts) 
    
    props.navigation.setOptions({
        headerRight : ()=>{
            return <Ionicons 
                name="cart" 
                size={30} 
                color="white" 
                style={{
                    marginHorizontal : 15
                }}
                onPress={()=>{
                    props.navigation.navigate('Cart')
                }}
            />
        }
    })

    return (
        <FlatList
            data  = {products}
            keyExtractor = {(item)=>item.id}
            renderItem = {
                itemData => <ProductItem
                                title={itemData.item.title}
                                image={itemData.item.imageUrl}
                                price={itemData.item.price}
                                onViewDetails={()=>{
                                    props.navigation.navigate('ProductDetail',
                                    {
                                        productId : itemData.item.id
                                    }
                                )}}
                                onAddToCart={()=>{
                                    // console.log(itemData.item);
                                    dispatch(CartActions.addToCart(itemData.item));
                                }}
                            />
            }
        />
    )
}
