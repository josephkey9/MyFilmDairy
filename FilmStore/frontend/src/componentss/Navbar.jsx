import { PlusSquareIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Container, Flex, HStack, Text, useColorMode , Menu , MenuButton , MenuList , MenuItem } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useFilmStore } from '../store/film.js'

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { sortByRating } = useFilmStore();
  	

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'
          fontSize='3xl'
          fontWeight='extrabold'
          _hover={{ transform: 'scale(1.05)', transition: 'all 0.2s' }}
        >
          <Link to={"/"}>MY FILM DIARY 🎥</Link>
        </Text>

        <HStack spacing={3} alignItems="center" mt={{ base: 2, sm: 0 }}>
           <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Sort
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => sortByRating("desc")}>
                Top Rated
              </MenuItem>
              <MenuItem onClick={() => sortByRating("asc")}>
                Low Rated
              </MenuItem>
            </MenuList>
          </Menu>

          <Link to="/create">
            <Button>
              <PlusSquareIcon fontSize={20} /> Add Film
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? "🌚" : "🌞"}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar
