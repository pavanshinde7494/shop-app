import Colors from "../constants/Colors";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from '../screens/shop/CartScreen'

import { createStackNavigator } from '@react-navigation/stack'
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";






let Stack = createStackNavigator();

const ProductsNavigator = ()=>{
    return (
        <Stack.Navigator
            initialRouteName="ProductsOverviewScreen"
            screenOptions={{
                headerTintColor : 'white',
                headerStyle : {
                    backgroundColor : Colors.primary,
                },
                headerTitleStyle : {
                    fontFamily : 'open-sans-bold'
                },
                headerBackTitleStyle :{ 
                    fontFamily : 'open-sans'
                }
            }}
        >
            <Stack.Screen
                name="ProductsOverview"
                component={ProductsOverviewScreen}
                options={{
                    headerTitle : 'All Products' 
                }}
            />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
            />
            <Stack.Screen
                name="Cart"
                component={CartScreen}
            />
        </Stack.Navigator>
    )
}

export default ProductsNavigator