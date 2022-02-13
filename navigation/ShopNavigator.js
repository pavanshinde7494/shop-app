import Colors from "../constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreens from "../screens/shop/OrdersScreens";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { Text } from "react-native";






let Stack = createStackNavigator();
let Drawer = createDrawerNavigator();





const config = {
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
}




const ProductsNavigator = ()=>{
    return (
        <Stack.Navigator
            initialRouteName="ProductsOverviewScreen"
            screenOptions={config}
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


const OrdersNavigator = ()=>{
    return (
        <Stack.Navigator
            screenOptions={config}

        >
            <Stack.Screen name="OrdersScreens"
                component={OrdersScreens}
                options={{
                    headerTitle : 'Your Orders'
                }}
            />
           
        </Stack.Navigator>
    )
}



const AdminNavigator = ()=>{
    return (
        <Stack.Navigator
            screenOptions={config}

        >
            <Stack.Screen 
                name="UserProducts"
                component={UserProductsScreen}
                options={{
                    headerTitle : 'Your Products'
                }}
            />
            <Stack.Screen 
                name="EditProduct"
                component={EditProductScreen}
                options={{
                    headerTitle : 'Edit Product'
                }}
            />  
        </Stack.Navigator>
    )
}

const ShopNavigator = ()=>{
    return (
    <Drawer.Navigator
        initialRouteName="Products"
        screenOptions={{
            headerShown : false,
            drawerActiveTintColor : 'white',
            drawerActiveBackgroundColor : Colors.primary,
            drawerLabelStyle : {
                fontFamily : 'open-sans-bold'
            }
        }}
    >
        <Drawer.Screen 
            name="Products" 
            component={ProductsNavigator}
            options = {{
                drawerIcon : (metaData)=>{
                    return (
                        <Feather 
                            name="package" 
                            size={24} 
                            color= { metaData.focused ? 'white' : "grey"}
                        />
                    )
                }
            }}
        />
        
        
        <Drawer.Screen 
            name="Orders" 
            component={OrdersNavigator}
            options = {{
                drawerIcon : (metaData)=>{
                    return (
                        <FontAwesome 
                            name="history" 
                            size={24} 
                            color= { metaData.focused ? 'white' : "grey"}
                        />
                    )
                }
            }}
        />


        <Drawer.Screen 
            name="Admin" 
            component={AdminNavigator}
            options = {{
                drawerIcon : (metaData)=>{
                    return (
                        <Ionicons 
                            name="ios-create" 
                            size={24} 
                            color= { metaData.focused ? 'white' : "grey"}
                        />
                    )
                }
            }}
        />
        
    </Drawer.Navigator>
    )
}

export default ShopNavigator