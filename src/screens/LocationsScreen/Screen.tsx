import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingComponent } from 'components/LoadingComponent';
import { useLocal } from 'context/LocationContext';
import { RootStackParamListType } from 'routes/index';
import Component from './LocationCard/Component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseScreenType = NativeStackScreenProps<
  RootStackParamListType,
  'Locations'
>;
const Screen: React.FC<BaseScreenType> = () => {
  const { locations, fetchLocations, isLoading, totalPages, currentPage } =
    useLocal();
  const [isFetching, setIsFetching] = useState(false);

  const loadMoreLocations = useCallback(() => {
    if (currentPage < totalPages && !isFetching) {
      setIsFetching(true);
      fetchLocations(currentPage + 1).then(() => setIsFetching(false));
    }
  }, [currentPage, totalPages, isFetching, fetchLocations]);

  const onEndReached = useCallback(() => {
    if (!isFetching) {
      loadMoreLocations();
    }
  }, [isFetching, loadMoreLocations]);

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
          Locations
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
    fetchLocations(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#272b33' }}>
      {(!isLoading || locations.length > 0) && (
        <FlatList
          data={locations}
          renderItem={({ item }) => <Component location={item} />}
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
