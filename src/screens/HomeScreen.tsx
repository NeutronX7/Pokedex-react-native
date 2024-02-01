import React from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import { styles } from '../theme/appTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePokemonPaginated } from '../hooks/usePokemonPaginated'
import { FadeInImage } from '../components/FadeInImage'
import PokemonCard from '../components/PokemonCard'

const HomeScreen = () => {

  const { top } = useSafeAreaInsets();
  const { simplePokemonList, loadPokemon } = usePokemonPaginated();
  
  return (
    <>
      <Image
        source={ require('../assets/pokebola.png') }
        style={styles.pokebolaBG}
      />

      <View
        style={{ alignItems: 'center' }}
      >

        <FlatList
          data={ simplePokemonList }
          keyExtractor={ (pokemon) => pokemon.id }
          showsVerticalScrollIndicator={ false }
          numColumns={ 2 }
          renderItem={({ item }) => (
            <PokemonCard pokemon={ item }/>
          )}
          onEndReached={ loadPokemon }
          onEndReachedThreshold={ 0.4 }
          ListHeaderComponent={(
            <Text style={{
              ...styles.title,
              ...styles.globalMargin,
              top: top + 20,
              marginBottom: top + 20,
              paddingBottom: 10
            }}>Pokedex</Text>
          )}
          ListFooterComponent={ 
            <ActivityIndicator 
              style={{ 
                height: 100
              }}
              size={ 20 }
              color='grey' 
            />
          }
        />

      </View>
      {/*<Text style={{
        ...styles.title,
        ...styles.globalMargin,
        top: top + 20
      }}>Pokedex</Text>*/}
    </>
  )
}

export default HomeScreen
