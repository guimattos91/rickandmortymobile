/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import { View, Text, ScrollView, Image } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCharacters } from 'context/CharactersContext';
import { RootStackParamListType } from 'routes/index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseScreenType = NativeStackScreenProps<
  RootStackParamListType,
  'Character'
>;

const imageWidth = Dimensions.get('screen').width * 0.8;

const Screen: React.FC<BaseScreenType> = ({ route }) => {
  const { character, fetchCharacter } = useCharacters()
  const { id } = route.params.character

  useEffect(() => {
    if (id) fetchCharacter(id)
  }, [fetchCharacter, id])


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#272b33' }}>

      {character && <ScrollView>
        <View>
          <Text color='white' paddingTop={50} marginLeft={20} fontSize={30}>
            {character?.name}
          </Text>
          <Image
            source={{ uri: character.image }}
            alt={character.name}
            width={imageWidth}
            height={imageWidth}
            alignSelf='center'
          />
        </View>
      </ScrollView>
      }
    </SafeAreaView>
  );
};

export default memo(Screen);
