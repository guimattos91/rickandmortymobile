import { AntDesign, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { EpisodesScreen } from 'screens/EpisodesScreen';
import { LocationsScreen } from 'screens/LocationsScreen';

import HomeRouter, { HomeRouterParamListType } from './homeRoute';

export type RootStackParamListType = {
  Home: NavigatorScreenParams<HomeRouterParamListType>;
  Episodes: undefined;
  Locations: undefined;
};

interface ITabProps {
  color: string;
  size: number;
}

const Tab = createBottomTabNavigator<RootStackParamListType>();
const HomeTab: React.FC<ITabProps> = ({ color, size }) => (
  <Ionicons name="person" color={color} size={size} />
);

const EpisodesTab: React.FC<ITabProps> = ({ color, size }) => (
  <AntDesign name="play" color={color} size={size} />
);

const LocationsTab: React.FC<ITabProps> = ({ color, size }) => (
  <Ionicons name="planet" color={color} size={size} />
);

const Routes: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopColor: '#00b5cc',
          borderTopWidth: 5,
          height: 70,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#00b5cc',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeRouter}
        options={{
          tabBarIcon: HomeTab,
          tabBarLabel: 'Characters',
          tabBarLabelPosition: 'beside-icon',
        }}
      />
      <Tab.Screen
        name="Episodes"
        component={EpisodesScreen}
        options={{
          tabBarIcon: EpisodesTab,
          tabBarLabelPosition: 'beside-icon',
        }}
      />
      <Tab.Screen
        name="Locations"
        component={LocationsScreen}
        options={{
          tabBarIcon: LocationsTab,
          tabBarLabelPosition: 'beside-icon',
        }}
      />
    </Tab.Navigator>
  );
};

export default Routes;
