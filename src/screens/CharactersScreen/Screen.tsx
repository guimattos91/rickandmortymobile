import React, { memo, useEffect, useCallback, useState } from 'react';
import { Text, View } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingComponent } from 'components/LoadingComponent';
import { useCharacters } from 'context/CharactersContext';
import { HomeRouterParamListType } from 'routes/homeRoute/index';
import { CharacterCard } from './CharacterCard';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CharactersScreenType = NativeStackScreenProps<
  HomeRouterParamListType,
  'Characters'
>;

const Screen: React.FC<CharactersScreenType> = ({ navigation }) => {
  const { characters, isLoading, currentPage, totalPages, fetchCharacters } =
    useCharacters();

  const [isFetching, setIsFetching] = useState(false);

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
    () => (currentPage < totalPages ? <LoadingComponent /> : undefined),
    [totalPages, currentPage],
  );

  const onEndReached = useCallback(async () => {
    if (currentPage < totalPages && !isFetching) {
      setIsFetching(true);
      await fetchCharacters(currentPage + 1);
      setIsFetching(false);
    }
  }, [currentPage, fetchCharacters, isFetching, totalPages]);
  useEffect(() => {
    fetchCharacters(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#272b33' }}>
      {(!isLoading || characters.length > 0) && (
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
          onEndReached={onEndReached}
        />
      )}
    </SafeAreaView>
  );
};

export default memo(Screen);
