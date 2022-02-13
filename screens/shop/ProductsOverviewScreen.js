import React from 'react'
import { FlatList , Text , View , Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import ProductItem from '../../components/shop/ProductItem'

import { useSelector , useDispatch } from 'react-redux'

import { addToCart } from '../../store/actions/cart';

import Colors from '../../constants/Colors';


export default function ProductsOverviewScreen(props) {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.availableProducts) 
    
    const selectItemHandler = (id) => {
        props.navigation.navigate('ProductDetail',
        {
            productId : id
        })
    }

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
        },
        headerLeft : ()=>{
            return <Ionicons 
                name="ios-menu" 
                size={24} 
                color="white" 
                style={{
                    marginLeft : 15
                }}
                onPress= {()=>{
                    props.navigation.toggleDrawer();
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
                                onSelect={()=>{
                                    selectItemHandler(itemData.item.id);
                                }}
                            >
                                <Button 
                                    color={Colors.primary} 
                                    title='View Details' 
                                    onPress={()=>{
                                        selectItemHandler(itemData.item.id);
                                    }}
                                />
                                <Button 
                                    color={Colors.primary} 
                                    title='To Cart' 
                                    onPress={()=>{
                                        dispatch(addToCart(itemData.item));
                                    }}
                                />
                            </ProductItem>
            }
        />
    )
}
