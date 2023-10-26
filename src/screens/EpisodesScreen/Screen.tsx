import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingComponent } from 'components/LoadingComponent';
import { useEpisodes } from 'context/EpisodesContext';
import { RootStackParamListType } from 'routes/index';
import Component from './EpisodesCard/Component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseScreenType = NativeStackScreenProps<
  RootStackParamListType,
  'Episodes'
>;
const Screen: React.FC<BaseScreenType> = () => {
  const { episodes, fetchEpisodes, isLoading, totalPages, currentPage } =
    useEpisodes();
  const [isFetching, setIsFetching] = useState(false);

  const onEndReached = useCallback(() => {
    if (currentPage < totalPages && !isFetching) {
      setIsFetching(true);
      fetchEpisodes(currentPage + 1).then(() => setIsFetching(false));
    }
  }, [currentPage, fetchEpisodes, isFetching, totalPages]);

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
          Episodes
        </Text>
      </View>
    ),
    [],
  );
  const Footer = useCallback(
    () => (currentPage < totalPages ? <LoadingComponent /> : undefined),
    [totalPages, currentPage],
  );

  useEffect(() => {
    fetchEpisodes(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#272b33' }}>
      {(!isLoading || episodes.length > 0) && (
        <FlatList
          data={episodes}
          renderItem={({ item }) => <Component episode={item} />}
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
