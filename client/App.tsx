import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  useColorScheme,
  Platform,
} from 'react-native';
import {
  configureFonts,
  MD3LightTheme,
  PaperProvider,
  customText,
  useTheme,
} from 'react-native-paper';
import { BottomNav } from './src/components';
import { Colors } from 'react-native/Libraries/NewAppScreen';
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

const Stack = createNativeStackNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [fontsLoaded] = useFonts({
    Quicksand_Book: require('./assets/fonts/Quicksand_Book.otf'),
    Ubuntu: require('./assets/fonts/Ubuntu-Regular.ttf'),
    'Ubuntu-Medium': require('./assets/fonts/Ubuntu-Medium.ttf'),
    'Ubuntu-Bold': require('./assets/fonts/Ubuntu-Bold.ttf'),
    'Ubuntu-Italic': require('./assets/fonts/Ubuntu-Italic.ttf'),
    'Ubuntu-BoldItalic': require('./assets/fonts/Ubuntu-BoldItalic.ttf'),
  });

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
          <NavigationContainer>
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
              <Stack.Screen
                name='CreateItem'
                component={CreateItemScreen}
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
