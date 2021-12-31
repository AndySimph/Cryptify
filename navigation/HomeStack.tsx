import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ColorSchemeName, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import PortfolioScreen from '../screens/PortfolioScreen';
import ExploreScreen from '../screens/ExploreScreen';
import HistoryScreen from '../screens/HistoryScreen';
import CoinScreen from '../screens/CoinScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import RecommendedScreen from '../screens/RecommendedScreen'
import LinkingConfiguration from './LinkingConfiguration';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';

import Firebase from '../services/firebase'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      independent={true}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <HomeStack />
    </NavigationContainer>
  );
}

const auth = Firebase.auth();
db = Firebase.firestore();

const handleSignOut = async () => {
  try {
      await auth.signOut();
  } catch (error) {
      console.log(error)
  }
};

const Stack = createStackNavigator<RootStackParamList>();
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Coin" component={CoinScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'card' }}>
        <Stack.Screen name="Recommended" component={RecommendedScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();
function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Portfolio"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={({ navigation }: RootTabScreenProps<'Portfolio'>) => ({
          title: 'Portfolio',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={handleSignOut}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="sign-out"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      {/* added things on option= line inside () and headerRight: */}
      <BottomTab.Screen
        name="Explore"
        component={ExploreScreen}
        options={({ navigation }: RootTabScreenProps<'Explore'>) => ({
          title: 'Explore',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Recommended')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}