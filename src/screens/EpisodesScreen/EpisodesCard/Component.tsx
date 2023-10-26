import React, { memo } from 'react';
import { View, Text } from '@gluestack-ui/themed';
import { EpisodeType } from 'types/EpisodeType';

interface IEpisodeCardtProps {
  episode: EpisodeType;
}

const Component: React.FC<IEpisodeCardtProps> = ({ episode }) => {
  return (
    <View
      flexDirection="row"
      bg="#3c3e44"
      borderRadius={15}
      marginBottom={8}
      width="85%"
      minWidth={190}
      alignItems="center"
      alignSelf="center"
    >
      <View flexDirection="column" paddingLeft={20} paddingVertical={20}>
        <Text color="white" bold marginBottom={10}>
          {episode.name}
        </Text>
        <Text color="white" bold>
          Air Date:
        </Text>
        <Text color="#98a2ab" marginBottom={10}>
          {episode.air_date}
        </Text>
        <Text color="white" bold>
          Episode
        </Text>
        <Text color="#98a2ab">{episode.episode}</Text>
      </View>
    </View>
  );
};

export default memo(Component);
