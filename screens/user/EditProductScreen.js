import { Ionicons } from '@expo/vector-icons';

import React , {useEffect, useState,useReducer} from 'react'
import { View ,
    Text,
    ScrollView,
    TextInput,
    StyleSheet ,
    Alert
} from 'react-native'

import { useSelector , useDispatch } from 'react-redux'
import { createProduct , updateProduct } from '../../store/actions/products';



const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'
const formReducer = (state , action)=>{
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input] : action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input] : action.isValid
        }
        let formIsValid = true;
        for(const key in updatedValidities) {
            if(updatedValidities[key] == false){
                formIsValid = false;
                break;
            }
        }
        return {
            inputValues : updatedValues ,
            inputValidities : updatedValidities,
            formIsValid : formIsValid
        }
    }
    return state;
}

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

    const [formState , dispatchFormState] = useReducer(formReducer , {
        inputValues : {
            title : editedProduct ? editedProduct.title : '',
            imageUrl : editedProduct ? editedProduct.imageUrl : '',
            price : '',
            description : editedProduct ? editedProduct.description : '',            
        },
        inputValidities : {
            title : editedProduct ? true : false,
            imageUrl : editedProduct ? true : false,
            price : editedProduct ? true : false,
            description : editedProduct ? true : false,
        },
        formIsValid : editedProduct ? true : false 
    });
   

    const textChangeHandler = (inputIdentifier , text)=>{
        let isValid = false;
        if(text.trim().length > 0){
            isValid = true;
        }
        dispatchFormState({
            type : FORM_INPUT_UPDATE , 
            value : text , 
            isValid : isValid,
            input : inputIdentifier
        })
        
    }
    

    const submitHandler = ()=>{
        if(!formState.formIsValid){
            Alert.alert('Wrong Input!','Please check error in form.',[
                {text : 'Okay' }
            ]);
            return;
        }
        if(editedProduct){
            dispatch(updateProduct(
                prodId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl)
            );
        }
        else{
            dispatch(createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl, 
                +formState.inputValues.price)
            );
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
                    <TextInput 
                        style={styles.input} 
                        onChangeText={
                            textChangeHandler.bind(this,'title')
                        } 
                        value={formState.inputValues.title} 
                        keyboardType = 'default'
                        autoCapitalize='sentences'
                        autoCorrect={true}
                        returnKeyType='next'
                        // onEndEditing={()=>{
                        //     console.log('On ending editing');
                        // }}
                        // onSubmitEditing={()=>{
                        //     console.log('Editing');
                        // }}
                    />
                    {!formState.inputValidities.title && 
                        <Text
                            style={{fontFamily : 'open-sans' , fontSize : 10 , color:'red'}}
                        >Please Enter a Valid title !!
                        </Text>
                    }
                </View>
                <View style={styles.formControl}>
                    <Text style = {styles.label}>Image URL</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={
                            textChangeHandler.bind(this,'imageUrl')
                        } 
                        value={formState.inputValues.imageUrl}
                    />
                </View>
                {!formState.inputValidities.imageUrl && 
                        <Text
                            style={{fontFamily : 'open-sans' , fontSize : 10 , color:'red'}}
                        >Please Enter a Valid Image URL !!
                        </Text>
                    }
                { editedProduct ? null : <View style={styles.formControl}>
                        <Text style = {styles.label}>Price</Text>
                        <TextInput 
                            style={styles.input} 
                            onChangeText={
                                textChangeHandler.bind(this,'price')
                            } 
                            value={formState.inputValues.price} 
                            keyboardType='decimal-pad'
                        />
                    </View>
                }
                {!editedProduct && !formState.inputValidities.price && 
                        <Text
                            style={{fontFamily : 'open-sans' , fontSize : 10 , color:'red'}}
                        >Please Enter a Valid Price !!
                        </Text>
                    }
                <View style={styles.formControl}>
                    <Text style = {styles.label}>Description</Text>
                    <TextInput  
                        style={styles.input} 
                        onChangeText={
                            textChangeHandler.bind(this,'description')
                        } 
                        value={formState.inputValues.description} 
                        multiline
                        />
                </View>
                {!formState.inputValidities.description && 
                    <Text
                        style={{fontFamily : 'open-sans' , fontSize : 10 , color:'red'}}
                    >Please Enter a Valid description !!
                    </Text>
                }
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