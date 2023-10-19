import { memo, useEffect, useCallback } from 'react';
import { Text, View } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCharacters } from 'context/CharactersContext';
import { RootStackParamListType } from 'routes/index';
import { CharacterCard } from './CharacterCard';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CharactersScreenType = NativeStackScreenProps<
  RootStackParamListType,
  'Characters'
>;

const Screen: React.FC<CharactersScreenType> = ({ navigation }) => {
  const { characters, fetchCharacters, isLoading, totalPages } =
    useCharacters();

  const Header = useCallback(
    () => (
      <View my={40}>
        <Text
          fontSize={24}
          bold
          lineHeight={31.2}
          color="white"
          textAlign="center"
        >
          Characters
        </Text>
      </View>
    ),
    [],
  );
  const Footer = useCallback(
    () =>
      totalPages ? (
        <View flex={1} justifyContent="center" alignItems="center" my={16}>
          <Text>Loading...</Text>
        </View>
      ) : undefined,
    [totalPages],
  );

  useEffect(() => {
    fetchCharacters(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#272b33' }}>
      <View
        flexDirection="row"
        bgColor="#272b33"
        borderBottomEndRadius={24}
        borderBottomStartRadius={24}
        alignItems="flex-end"
      >
        {isLoading && <Text>Loading...</Text>}
        {!isLoading && characters && (
          <FlatList
            data={characters}
            renderItem={({ item }) => (
              <CharacterCard
                character={item}
                onPress={() =>
                  navigation.navigate('Character', { character: item })
                }
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            ListHeaderComponent={Header}
            ListFooterComponent={Footer}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default memo(Screen);
