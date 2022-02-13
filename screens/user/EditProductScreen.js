import { Ionicons } from '@expo/vector-icons';

import React , {useEffect, useState} from 'react'
import { View ,
    Text,
    ScrollView,
    TextInput,
    StyleSheet ,
    Alert
} from 'react-native'

import { useSelector , useDispatch } from 'react-redux'
import { createProduct , updateProduct } from '../../store/actions/products';

export default function EditProductScreen(props) {

    const dispatch = useDispatch();
    
    let prodId;
    let editedProduct;

  
    if(props.route.params){
        prodId = props.route.params.productId;
        editedProduct = useSelector(state => 
            state.products.userProducts.find(prod => prod.id === prodId)
        )
    }

    


    const [title , setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl,setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price,setPrice] = useState('');
    const [description , setDescription] = useState(editedProduct ? editedProduct.description : '');


    
    

    const submitHandler = ()=>{
        if(editedProduct){
            dispatch(updateProduct(prodId,title,description,imageUrl));
        }
        else{
            dispatch(createProduct(title,description,imageUrl, +price));
        }
        props.navigation.navigate('UserProducts');
    }

    props.navigation.setOptions({
        headerTitle : (props.route.params == undefined || props.route.params == null) ? 'Add Product' : 'Edit Product',
        headerRight : () => {
            return <Ionicons 
                name="ios-checkmark" 
                size={24} 
                color="white"
                style={{marginRight : 15}} 
                onPress = {submitHandler}
            />
        }
    })
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style = {styles.label}>Title</Text>
                    <TextInput style={styles.input} onChangeText={(text)=>setTitle(text)} value={title} />
                </View>
                <View style={styles.formControl}>
                    <Text style = {styles.label}>Image URL</Text>
                    <TextInput style={styles.input} onChangeText={(text)=>setImageUrl(text)} value={imageUrl}/>
                </View>
                { editedProduct ? null : <View style={styles.formControl}>
                    <Text style = {styles.label}>Price</Text>
                    <TextInput style={styles.input} onChangeText={(text)=>setPrice(text)} value={price} />
                </View>
                }
                <View style={styles.formControl}>
                    <Text style = {styles.label}>Description</Text>
                    <TextInput  style={styles.input} onChangeText={(text)=>setDescription(text)} value={description} />
                </View>
            </View>
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    form : {
        margin : 20
    },
    formControl : {
        width : '100%' 
    },
    label : {
        fontFamily : 'open-sans-bold',
        marginVertical : 8
    } ,
    input : {
        marginBottom : 5,
        paddingHorizontal : 2,
        paddingVertical : 5,
        borderBottomColor : '#ccc' ,
        borderBottomWidth : 1 ,
        fontFamily : 'open-sans',
        fontSize : 15
    }
})