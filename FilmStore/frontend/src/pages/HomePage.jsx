import { Container, Link, SimpleGrid, Text, VStack  } from '@chakra-ui/react'
import React from 'react'
import { useFilmStore } from '../store/film'
import { useEffect } from 'react';
import FilmCard from '../componentss/FilmCard'

function HomePage() {

  const { fetchFilm , films } = useFilmStore();
    useEffect(() => {
      fetchFilm();
    }, [fetchFilm]);

    console.log("films", films);


  return (
    <Container maxW={"4xl"}
    p={8}
    >
      <VStack>
        {films.length == 0 && (
          <Text 
        fontSize="6xl"
        fontWeight="bold"
        textAlign="center"
        bgGradient="linear(to-r, teal.500, red.500)"
        bgClip="text">
           🚀
        </Text>
        )}

        <SimpleGrid 
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={10}
        w="full">

          {films.map((film)=> (
            <FilmCard key={film._id} film = {film}/>
          ))}

        </SimpleGrid>
         
       {films.length == 0 && (  <Text>
          No films found 😥
          <Link href="/create" color="teal.500" fontWeight="bold">
            Click here to create your first film!
          </Link>
        </Text>)}
      </VStack>
    </Container>
  )
}

export default HomePage