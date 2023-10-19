import { ParamListBase } from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { CharacterScreen } from 'screens/CharacterScreen';
import { CharactersScreen } from 'screens/CharactersScreen';
import { EpisodesScreen } from 'screens/EpisodesScreen';
import { LocationsScreen } from 'screens/LocationsScreen';

import { CharactersType } from 'types/CharacterType';
import { EpisodeType } from 'types/EpisodeType';
import { LocalType } from 'types/LocalType';

export type RootStackParamListType = {
  Characters: NativeStackScreenProps<ParamListBase>;
  Character: { character: CharactersType };
  Episodes: { episodes: EpisodeType };
  Locations: { locations: LocalType };
};

const Stack = createNativeStackNavigator<RootStackParamListType>();

const Routes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Characters"
    >
      <Stack.Screen name="Characters" component={CharactersScreen} />
      <Stack.Screen name="Character" component={CharacterScreen} />
      <Stack.Screen name="Episodes" component={EpisodesScreen} />
      <Stack.Screen name="Locations" component={LocationsScreen} />
    </Stack.Navigator>
  );
};

export default Routes;
