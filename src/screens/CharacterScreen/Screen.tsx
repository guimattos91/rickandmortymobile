/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import { View, Text, Image } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCharacters } from 'context/CharactersContext';
import { HomeRouterParamListType } from 'routes/homeRoute/index';



// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseScreenType = NativeStackScreenProps<
  HomeRouterParamListType,
  'Character'
>;

const imageWidth = Dimensions.get('screen').width * 0.8;

const Screen: React.FC<BaseScreenType> = ({ route, navigation }) => {
  const { character, fetchCharacter } = useCharacters()
  const { id } = route.params.character
  const insets = useSafeAreaInsets();


  useEffect(() => {
    if (id) fetchCharacter(id)
  }, [fetchCharacter, id])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#272b33' }}>
      {character &&
        <View paddingTop={insets.top}>
          <View flexDirection='row' alignItems='center' justifyContent='center' paddingBottom={20} paddingTop={20}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo name="chevron-left" size={30} color='white' />
            </TouchableOpacity>
            <Text color='white' fontSize={30} lineHeight={30} textAlign='center' bold>
              {character?.name}
            </Text>
          </View>
          <Image
            source={{ uri: character.image }}
            alt={character.name}
            width={imageWidth}
            height={imageWidth}
            alignSelf='center'
          />
          <View flexDirection="row" alignItems="center" justifyContent='center' marginTop={20}>
            <FontAwesome name="circle" size={10} color={character.status === 'Alive' ? 'green' : 'red'} />
            <Text color="#98a2ab" paddingLeft={7} fontSize='$2xl' lineHeight='$2xl'>
              {character.status}
            </Text>
          </View>
          <View alignItems="center">
            <Text color="white" bold marginTop={5} fontSize='$2xl' lineHeight='$2xl'>
              Species:
            </Text>
            <Text color="#98a2ab" fontSize='$xl' lineHeight='$xl' >
              {character.species}
            </Text>
            <Text color="white" bold marginTop={5} fontSize='$2xl' lineHeight='$2xl'>
              Gender:
            </Text>
            <View flexDirection="row" alignItems="center" justifyContent='center'>
              <Ionicons name={character.gender === 'Male' ? 'male' : 'female'} size={15} color="#98a2ab" />
              <Text color="#98a2ab" fontSize='$xl' lineHeight='$xl' paddingLeft={7}>
                {character.gender}
              </Text>
            </View>
            <Text color="white" bold marginTop={5} fontSize='$2xl' lineHeight='$2xl'>
              Origin:
            </Text>
            <Text color="#98a2ab" fontSize='$xl' lineHeight='$xl' >
              {character.origin.name}
            </Text>
          </View>
        </View>
      }
    </SafeAreaView >
  );
};

export default memo(Screen);
