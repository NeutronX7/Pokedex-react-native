import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootStackParams } from '../navigator/Navigator'
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import PokemonDetail from '../components/PokemonDetail';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

const PokemonScreen = ( { navigation, route }: Props ) => {

  const { simplePokemon, color } = route.params
  const { top } = useSafeAreaInsets();

  const { isLoading, pokemon } = usePokemon( simplePokemon.id );
  console.log(pokemon);
  
  return (
    <View style={{ flex: 1 }}>
      <View style={{
        ...styles.headerContainer,
        backgroundColor: color,
      }}>
        <TouchableOpacity
          onPress={() => navigation.pop() }
          activeOpacity={ 0.8 }
          style={{ 
            ...styles.backButton,
            top: top + 5
          }}
        >
          <Icon
            name='arrow-back-outline'
            color='white'
            size={ 35 }
          />
        </TouchableOpacity>

        {/** Nombre del pokemon */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 40
          }}
        >
          { simplePokemon.name+'\n' } # { simplePokemon.id }
        </Text>

        {/** Pokebola */}
        <Image
          source={ require('../assets/pokebola-blanca.png') }
          style={ styles.pokeball }
        />

        <FadeInImage
          uri={ simplePokemon.picture }
          style={ styles.pokemonImage }
        />

      </View>

      {/** Detalles y loading */}

      {
        isLoading ? (
          <View style={ styles.loadingIndicator }>
            <ActivityIndicator
              color={ color }
              size={ 50 }
            />
          </View>
        )
        :  <PokemonDetail pokemon={ pokemon }/>
      }
      
      
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 999,
    height: 370,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000
  },
  backButton: {
    position: 'absolute',
    left: 20
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default PokemonScreen
