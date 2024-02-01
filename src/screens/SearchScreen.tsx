import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SearchInput from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { styles as globalStyles } from '../theme/appTheme';
import PokemonCard from '../components/PokemonCard';
import Loading from '../components/Loading';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isfetching, simplePokemonList } = usePokemonSearch();

    const [ pokemonFiltered, setPokemonFiltered ] = useState<SimplePokemon[]>([]);

    const [ term, setTerm ] = useState('');

    useEffect(() => {

        if( term.length === 0 ) {
            return setPokemonFiltered([]);
        }
        
        if( isNaN(Number( term )) ) {
            setPokemonFiltered(
                simplePokemonList.filter( (poke) => poke.name.toLocaleLowerCase().includes( term.toLocaleLowerCase() ) )
            )
        } else {
            [simplePokemonList.find((poke) => poke.id === term)]
        }
        
    }, [ term ])

    if( isfetching ) {
        return <Loading/>
    }
    
    return (
        <View style={{ flex: 1, marginHorizontal: 20 }}>
            <SearchInput
                onDebounce={( value ) => setTerm( value ) }
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth - 40,
                    top: (Platform.OS === 'ios') ? top : top + 30
                }}
            />

            <FlatList
                data={ pokemonFiltered }
                keyExtractor={ (pokemon) => pokemon.id }
                showsVerticalScrollIndicator={ false }
                numColumns={ 2 }
                renderItem={({ item }) => (
                    <PokemonCard pokemon={ item }/>
                )}

                ListHeaderComponent={(
                <Text style={{
                    ...globalStyles.title,
                    ...globalStyles.globalMargin,
                    marginTop: (Platform.OS === 'ios') ? top + 60 : top + 80,
                    paddingBottom: 10
                }}>{ term }</Text>
                )}
            />

        </View>
    )
}

export default SearchScreen
