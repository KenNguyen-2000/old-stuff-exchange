import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, StatusBar } from 'react-native';
import { configureFonts, PaperProvider, useTheme } from 'react-native-paper';
import { BottomNav } from './src/components';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ItemDetailScreen,
  LoginScreen,
  RegisterScreen,
  WelcomeScreen,
} from './src/screens';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/redux/store';
import { View } from 'react-native';
import CreateItemScreen from './src/screens/CreateItemScreen';
import ItemListScreen from './src/screens/ItemListScreen';
import OrderDetailScreen from './src/screens/OrderDetailScreen';
import { ICategory, IItemDto } from './src/interfaces/dtos';
import { setNavigationRef } from './src/helpers/navigation.service';
import { IOrderDto } from './src/interfaces/dtos/order.dto';
import EditItemScreen from './src/screens/EditItemScreen';
import ChatDetailScreen from './src/screens/ChatDetailScreen';
import useUserInfo from './src/hooks/useUserInfo';

type RootStackParamList = {
  Home: undefined;
  ItemDetail: { item: IItemDto };
  bottom: undefined;
  Welcome: undefined;
  Register: undefined;
  Login: undefined;
  ItemList: { category: ICategory };
  OrderDetail: {
    order: IOrderDto;
  };
  CreateItem: any;
  EditItem: {
    item: IItemDto;
  };
  ChatDetail: any;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_Book: require('./assets/fonts/Quicksand_Book.otf'),
    Ubuntu: require('./assets/fonts/Ubuntu-Regular.ttf'),
    'Ubuntu-Medium': require('./assets/fonts/Ubuntu-Medium.ttf'),
    'Ubuntu-Bold': require('./assets/fonts/Ubuntu-Bold.ttf'),
    'Ubuntu-Italic': require('./assets/fonts/Ubuntu-Italic.ttf'),
    'Ubuntu-BoldItalic': require('./assets/fonts/Ubuntu-BoldItalic.ttf'),
  });
  const userInfo = useUserInfo();

  const baseFont = {
    fontFamily: 'Ubuntu',
  } as const;

  const baseVariants = configureFonts({ config: baseFont });

  // Then, define custom fonts for different variants

  const customVariants = {
    // Customize individual base variants:
    displayMedium: {
      ...baseVariants.displayMedium,
      fontFamily: 'Ubuntu-Medium',
    },

    // Add own tokens if required:
    bold: {
      ...baseVariants.bodyMedium,
      fontFamily: 'Ubuntu-Bold',
    },
    italic: {
      ...baseVariants.bodyMedium,
      fontFamily: 'Ubuntu-Italic',
    },
    boldItalic: {
      ...baseVariants.bodyMedium,
      fontFamily: 'Ubuntu-BoldItalic',
    },
    medium: {
      ...baseVariants.bodyMedium,
      fontFamily: 'Ubuntu-Medium',
    },
    bodyMedium: {
      ...baseVariants.bodyMedium,
      fontFamily: 'Ubuntu-Medium',
    },
  } as const;

  // Finally, merge base variants with your custom tokens
  // and apply custom fonts to your theme.

  const fonts = configureFonts({
    config: {
      ...baseVariants,
      ...customVariants,
    },
  });

  const theme = useTheme();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={{ ...theme, ...fonts }}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <NavigationContainer ref={setNavigationRef}>
            <Stack.Navigator initialRouteName='bottom'>
              <Stack.Screen name='Welcome' component={WelcomeScreen} />
              <Stack.Screen
                name='bottom'
                component={BottomNav}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name='Register' component={RegisterScreen} />
              <Stack.Screen name='Login' component={LoginScreen} />
              <Stack.Screen name='ItemDetail' component={ItemDetailScreen} />
              <Stack.Screen name='ItemList' component={ItemListScreen} />
              <Stack.Screen name='OrderDetail' component={OrderDetailScreen} />
              <Stack.Screen name='ChatDetail' component={ChatDetailScreen} />
              <Stack.Screen
                name='CreateItem'
                component={CreateItemScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name='EditItem'
                component={EditItemScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar
            animated={true}
            barStyle={'dark-content'}
            backgroundColor={'transparent'}
            translucent={true}
          />
        </View>
      </PaperProvider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
