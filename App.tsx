/* eslint-disable react/style-prop-object */
import { GluestackUIProvider, config } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { CharactersProvider } from 'context/CharactersContext';
import { EpisodesProvider } from 'context/EpisodesContext';
import { LocationProvider } from 'context/LocationContext';
import Routes from 'routes/index';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <GluestackUIProvider config={config.theme}>
        <StatusBar style="light" />
        <CharactersProvider>
          <LocationProvider>
            <EpisodesProvider>
              <Routes />
            </EpisodesProvider>
          </LocationProvider>
        </CharactersProvider>
      </GluestackUIProvider>
    </NavigationContainer>
  );
};

export default App;
