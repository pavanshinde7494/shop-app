import React from 'react'
import { 
  StyleSheet,
  Text, 
  View 
} from 'react-native';
import AppLoading  from 'expo-app-loading'
import * as Font from 'expo-font'

import ShopNavigator from './navigation/ShopNavigator'
import { NavigationContainer } from '@react-navigation/native'


import { createStore , combineReducers } from 'redux'
import { Provider } from 'react-redux'
import productsReducers from './store/reducers/products';
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/orders';
import { useState } from 'react';

const rootReduces = combineReducers({
  products : productsReducers,
  cart : cartReducer,
  orders : ordersReducer
});
const store = createStore(rootReduces);

const fetchFont = ()=>{
  return Font.loadAsync({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const[fontLoaded , setFontLoaded] =  useState(false);
  if(!fontLoaded){
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={()=>{setFontLoaded(true)}}
        onError={(err)=>{console.log(err);}}
      />
    )
  }
  return (
    <Provider store={store} >
      <NavigationContainer>
        <ShopNavigator/>
      </NavigationContainer>

    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
