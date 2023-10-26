import React, { memo } from 'react';
import { View, Text } from '@gluestack-ui/themed';

import { LocalType } from 'types/LocalType';

interface ICharacterCardtProps {
  location: LocalType;
}

const Component: React.FC<ICharacterCardtProps> = ({ location }) => {
  return (
    <View
      flexDirection="row"
      bg="#3c3e44"
      borderTopEndRadius={15}
      borderBottomEndRadius={15}
      borderLeftColor="#00b5cc"
      borderLeftWidth={5}
      marginBottom={8}
      width="85%"
      minWidth={190}
      alignItems="center"
      alignSelf="center"
    >
      <View flexDirection="column" paddingLeft={20} paddingVertical={20}>
        <Text color="white" bold marginBottom={10}>
          {location.name}
        </Text>
        <Text color="white" bold>
          Type:
        </Text>
        <Text color="#98a2ab" marginBottom={10}>
          {location.type}
        </Text>
        <Text color="white" bold>
          Dimension
        </Text>
        <Text color="#98a2ab">{location.dimension}</Text>
      </View>
    </View>
  );
};

export default memo(Component);
