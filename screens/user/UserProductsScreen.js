
import { Ionicons } from '@expo/vector-icons';

import React from 'react'
import { FlatList , Button , Alert} from 'react-native'

import { useSelector , useDispatch } from 'react-redux'
import { deleteProduct } from '../../store/actions/products';


import ProductItem from '../../components/shop/ProductItem'
import Colors from '../../constants/Colors';

export default function UserProductsScreen(props) {
    const dispatch = useDispatch();


    const deleteHandler = (id)=>{
        Alert.alert('Are You Sure?','Do You Really Want to Delete This item?',[
            {text : 'No' , style : 'default'},
            {text : 'Yes',style:'destructive',
                onPress : ()=>{
                    dispatch(deleteProduct(id));
                }
            }
        ])
    }

    const userProducts = useSelector(state => state.products.userProducts);
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
                    props.navigation.toggleDrawer();
                }}
            />
        },
        headerRight : ()=>{
            return (
                <Ionicons 
                    name="add" 
                    size={30} 
                    color="white" 
                    style={{
                        marginRight : 15
                    }}
                    onPress = {()=>{
                        props.navigation.navigate('EditProduct');
                    }}
                />
            )
        }
    })
    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={
                (itemData) => {
                    return (
                        <ProductItem 
                            image = {itemData.item.imageUrl}
                            title = {itemData.item.title}
                            price = {itemData.item.price}
                            onSelect = {()=>{
                                props.navigation.navigate('EditProduct',{
                                    productId : itemData.item.id
                                });
                            }}
                        >
                                <Button 
                                    color={Colors.primary} 
                                    title='Edit' 
                                    onPress={ ()=> {
                                        props.navigation.navigate('EditProduct',{
                                            productId : itemData.item.id
                                        });
                                    }}
                                />
                                <Button 
                                    color={Colors.primary} 
                                    title='Delete' 
                                    onPress={deleteHandler.bind(this, itemData.item.id)}
                                />
                        </ProductItem>
                    )
                }
            }
        />
    )
}
