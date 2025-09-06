import { Box, Button, Container, Heading, HStack, Input, useColorModeValue, VStack , Icon} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { useFilmStore } from '../store/film';
import { useToast } from '@chakra-ui/react'

function CreatePage() {
  const[newFilm , setNewFilm] = useState({
    name :"",
    explain:"",
    rating:"",
  });


const {createFilm} = useFilmStore();

  const handleAddFilm = async () => {
    const {success , message} = await createFilm(newFilm);
    if(!success){
      toast({
        title:"error",
        description: message ,
        status:"error",
        isClosable: true
      })
    }else{
      toast({
        title:"Success",
        description: message,
        status:"success",
        isClosable: true
      });
    }
  };

  const handleStarClick = (star) => {
    setNewFilm({ ...newFilm, rating: star });
  };


  const toast = useToast();


  return (
    <Container maxW={"container.sm"}>
      <VStack
        spacing={8}
      >
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
            Create New Film
        </Heading>

        <Box w={'full'} bg={useColorModeValue("white" , "gray.800")} p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack spacing={4}>
            <Input placeholder='Film Name'
            name='name'
            value={newFilm.name}
            onChange={(e)=> setNewFilm({...newFilm, name : e.target.value})}
            />
            <Input placeholder='What do you think about the film'
            name='explain'
            value={newFilm.explain}
            onChange={(e)=> setNewFilm({...newFilm, explain : e.target.value})}
            />
            <HStack spacing={1}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon
              as={FaStar}
              key={star}
              cursor="pointer"
              color={star <= newFilm.rating ? "yellow.400" : "gray.300"}
              onClick={() => handleStarClick(star)}
              boxSize={6}
              _hover={{ color: "yellow.500" }}
              transition="color 0.2s"
              aria-label={`${star} star`}
               />
              ))}
             </HStack>
              <Button colorScheme='blue' onClick={handleAddFilm} w={'full'}>Add Film</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage