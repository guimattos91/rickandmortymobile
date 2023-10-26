import React, { memo, useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, Image } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';
import { CharactersType } from 'types/CharacterType';

interface ICharacterCardtProps {
  character: CharactersType;
  onPress: () => void;
}

const Component: React.FC<ICharacterCardtProps> = ({ character, onPress }) => {
  const [colorCircle, setColorCircle] = useState('red');

  useEffect(() => {
    if (character.status === 'Alive') {
      setColorCircle('green');
    }
  }, [character.status]);

  return (
    <TouchableOpacity
      style={{ flex: 1, alignItems: 'center' }}
      onPress={onPress}
    >
      <View
        flexDirection="row"
        bg="#3c3e44"
        paddingVertical={3}
        borderRadius={15}
        marginBottom={8}
        width="85%"
        minWidth={190}
        alignItems="center"
      >
        <Image
          source={{ uri: character.image }}
          alt={character.name}
          width={100}
          height={100}
          borderBottomLeftRadius={15}
          borderTopLeftRadius={15}
        />

        <View flexDirection="column" paddingLeft={10}>
          <Text color="white" bold>
            {character.name}
          </Text>
          <View flexDirection="row" alignItems="center">
            <FontAwesome name="circle" size={7} color={colorCircle} />
            <Text color="#98a2ab" size="xs" paddingLeft={3}>
              {character.status} - {character.species}
            </Text>
          </View>

          <Text color="white" bold size="xs" marginTop={5}>
            Origin:
          </Text>
          <Text color="#98a2ab" size="sm">
            {character.origin.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Component);
