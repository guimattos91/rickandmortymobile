import React, { memo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamListType } from 'routes/index';
import { CharacterScreen } from 'screens/CharacterScreen';
import { CharactersScreen } from 'screens/CharactersScreen';
import { EpisodesScreen } from 'screens/EpisodesScreen';
import { LocationsScreen } from 'screens/LocationsScreen';

const Tab = createBottomTabNavigator<RootStackParamListType>();

const BottomTabComponent: React.FC = () => (
  <Tab.Navigator>
    <Tab.Screen name="Characters" component={CharactersScreen} />
    <Tab.Screen name="Character" component={CharacterScreen} />
    <Tab.Screen name="Episodes" component={EpisodesScreen} />
    <Tab.Screen name="Locations" component={LocationsScreen} />
  </Tab.Navigator>
);

export default memo(BottomTabComponent);
