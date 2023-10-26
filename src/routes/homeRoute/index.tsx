import { ParamListBase } from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { CharacterScreen } from 'screens/CharacterScreen';
import { CharactersScreen } from 'screens/CharactersScreen';

import { CharactersType } from 'types/CharacterType';

export type HomeRouterParamListType = {
  Characters?: NativeStackScreenProps<ParamListBase>;
  Character: { character: CharactersType };
};

const Stack = createNativeStackNavigator<HomeRouterParamListType>();

const HomeRouter: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Characters"
    >
      <Stack.Screen name="Characters" component={CharactersScreen} />
      <Stack.Screen name="Character" component={CharacterScreen} />
    </Stack.Navigator>
  );
};

export default HomeRouter;
