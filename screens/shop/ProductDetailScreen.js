import React from 'react'
import { 
    Text,
    View,
    ScrollView,
    Image,
    Button,
    StyleSheet
    
} from 'react-native'

import { useSelector , useDispatch } from 'react-redux'
import * as CartActions from '../../store/actions/cart'

import Colors from '../../constants/Colors';



export default function ProductDetailScreen(props) {
    
    const dispatch = useDispatch();
    
    const productId = props.route.params.productId;
    const selectedProduct = useSelector((state) => state.products.availableProducts.find((prod)=>prod.id == productId));

    props.navigation.setOptions({
        headerTitle : selectedProduct.title
    })
    return (
        <ScrollView>
            <Image style={styles.image} source={{uri : selectedProduct.imageUrl}}/>
            <View style={styles.actions}>
                <Button 
                    color={Colors.primary} 
                    title='Add To Cart' 
                    onPress={
                        ()=>{
                            dispatch(CartActions.addToCart(selectedProduct))
                        }} 
                />
            </View>
            <Text style={styles.price} >${selectedProduct.price}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    image : {
        width : '100%',
        height : 300
    },
    price:{
        fontSize : 22,
        color : '#888',
        textAlign : 'center',
        marginVertical : 20,
        fontFamily : 'open-sans-bold'
    },
    description : {
        fontFamily : 'open-sans',
        fontSize : 14,
        textAlign : 'center',
        marginHorizontal : 20
    },
    actions : {
        marginVertical : 20,
        alignItems : 'center'
    }
})
