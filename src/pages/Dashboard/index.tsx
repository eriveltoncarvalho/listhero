import React, { useEffect, useState } from 'react';
import Icon  from 'react-native-vector-icons/FontAwesome';

import api from '../../services/api';
import { Image, Text, TextInput } from 'react-native';
import SearchInput from '../../components/SearchInput';
const customData = require('./../../../server.json');


import {
  Container,
  Header,
  Title,
  TitleSearch,
  FilterContainer,
  HeroContainer,
  TitleContainer,
  HeroesList,
  Hero,
  HeroImageContainer,
  HeroContent,
  HeroTitle,
  Paginator,
  ButtonPage,
  ButtonPageTitle
} from './styles';

interface Character {
  id: number;
  name: string;
  thumbnail: string;
}

const Dashboard: React.FC = () => {
  const [isFocused, setIsFocused] = useState('left');
  const [searchValue, setSearchValue] = useState('');
  const [charactersSearch, setCharactersSearch] = useState<Character[]>([]);
  const [charactersSearchOld, setCharactersSearchOld] = useState<Character[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  
  const [buttonPageLeft, setButtonPageLeft] = useState(1);
  const [buttonPageCenter, setButtonPageCenter] = useState(2);
  const [buttonPageRight, setButtonPageRight] = useState(3);

  const [itemTotal, setItemTotal] = useState(0);
  const [minItem, setMinItem] = useState(0);
  const [maxItem, setMaxItem] = useState(0);
  const [pageTotal, setPageTotal] = useState(0);

  const { data } = customData;
 

  useEffect(() => {
    async function loadCharacters() {
      api.get(`characters`).then((response) => {
          const { data } = response.data
         
          const page = Math.floor(data.count / 4) + 1; 
    
          setItemTotal(data.count);
          setMinItem(0);
          setMaxItem(4);
          setPageTotal(page);

          const newItems = data.results.map((result: any) => {
            const {
              id, name, series, events
            } = result

            return {
              id,
              name,
              thumbnail: `${result.thumbnail.path}.${result.thumbnail.extension}`,
              series: series.items.map((item: any) => item.name),
              events: events.items.map((item: any) => item.name),
            }
          })

          setCharacters(newItems)
          console.log(newItems)
        }) 
    }

    loadCharacters();
  }, []);
 
 
  useEffect(() => {
     if (characters) {
       CurrentPage();
     }
    
  }, [characters]);

   
   async function CurrentPage() {
     
    const currentPage = characters;
    const newItems =  await currentPage.slice(minItem, maxItem).map((result: any) => {
      const {
        id, name, series, events, thumbnail
      } = result
      return {
        id,
        name,
        thumbnail,
        series,
        events
      }
    })

    setCharactersSearch(newItems);
    setCharactersSearchOld(newItems)
  }

  function HandleNextPage(){
    if (maxItem <= itemTotal) {
      setMinItem(minItem+4);
      setMaxItem(maxItem+4);
   
      if (buttonPageRight <= pageTotal ) {
        setButtonPageLeft(buttonPageLeft + 1);
        setButtonPageCenter(buttonPageCenter + 1);
        setButtonPageRight(buttonPageRight + 1);
      }
    }
    CurrentPage();
  }  

  function HandlePreviousPage(){
    if (minItem > 0) {
      setMinItem(minItem-4);
      setMaxItem(maxItem-4);

      if (buttonPageLeft > 1) {
        setButtonPageLeft(buttonPageLeft - 1);
        setButtonPageCenter(buttonPageCenter - 1);
        setButtonPageRight(buttonPageRight - 1);
      }
    }
    CurrentPage();
  }  

  function Search(searchValue: string) {       
    const SearchList = charactersSearch.filter((character) => {
      const itemSearch = character.name ? character.name.toUpperCase() : ''.toUpperCase();
      const newText = searchValue.toUpperCase();
      return itemSearch.indexOf(newText) > -1;
    });
    
    if (searchValue === '') {
      setCharactersSearch(charactersSearchOld)
    } else {
      setCharactersSearch(SearchList)
    }
  
    setSearchValue(searchValue)
  }   

 
  function handleFocus(type: string, page: number){
    const itemMax = page * 4; 

    setIsFocused(type);
    setMinItem(itemMax-4);
    setMaxItem(itemMax);

    CurrentPage();
  } 

  return (
    <>
    <Container>
      <Header>
        <Title>
          <Text style={{fontFamily: 'Roboto-Black', textDecorationLine: 'underline' }}>BUSCA</Text>
          <Text style={{fontFamily: 'Roboto-Black'}}> MARVEL</Text>
          <Text style={{fontFamily: 'Roboto-Light'}}> TESTE FRONT-END</Text>
        </Title>
      </Header>
      
      <FilterContainer>
        <TitleSearch> Nome do Personagem</TitleSearch>
        <SearchInput
          value={searchValue}
          onChangeText={(t)=>Search(t)} 
        />
      </FilterContainer>
      
     
      <HeroContainer>
          <TitleContainer>Nome</TitleContainer>
          <HeroesList>
            {charactersSearch.map(character => (
              <Hero
                key={character.id}
                // onPress={() => handleNavigate(character.id)}
                activeOpacity={0.6}
              >
                <HeroImageContainer>
                  <Image
                    style={{ width: 58, height: 58, borderRadius:100 }}
                    source={{ uri: character.thumbnail }}
                  />
                </HeroImageContainer>
                <HeroContent>
                  <HeroTitle>{character.name}</HeroTitle>     
                </HeroContent>
              </Hero>
            ))}
          </HeroesList>
       
        </HeroContainer>    
   </Container>
   <Paginator>
      <Icon
         style={{ width: 50, height: 50, marginRight: 10, marginLeft: 20}}
         name="caret-left"
         size={50}
         color="#D42026"
         onPress={() => HandlePreviousPage()}
       />
       <ButtonPage 
         isFocused={isFocused==='left'}
         onPress={() => handleFocus('left', buttonPageLeft)}
       >
         <ButtonPageTitle isFocused={isFocused==='left'}>
           {buttonPageLeft}
         </ButtonPageTitle>
       </ButtonPage>
       
       <ButtonPage 
         isFocused={isFocused==='center'} 
         onPress={() => handleFocus('center', buttonPageCenter)}
       >
         <ButtonPageTitle isFocused={isFocused==='center'}> 
           {buttonPageCenter}
         </ButtonPageTitle>  
       </ButtonPage>
       
       <ButtonPage 
         isFocused={isFocused==='right'}
         onPress={() => handleFocus('right', buttonPageRight)}
       >
         <ButtonPageTitle isFocused={isFocused==='right'}>
           {buttonPageRight}
         </ButtonPageTitle>  
       </ButtonPage>
       <Icon
         style={{ width: 50, height: 50, marginLeft: 40, marginRight: 20}}
         name="caret-right"
         size={50}
         color="#D42026"
         onPress={() => HandleNextPage()}
       />
   </Paginator>
   
   </>
  )

}

export default Dashboard;
