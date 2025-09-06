import { Box, Heading, HStack, IconButton, useColorModeValue, Text, useToast, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, Button , ModalBody  } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useFilmStore } from '../store/film'
import { FilmForm } from './FilmForm'
import { useState } from 'react'

function FilmCard({ film }) {
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const bgColor = useColorModeValue('white', 'gray.800');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteFilm, updateFilm } = useFilmStore();
  const toast = useToast();

  const handleDeleteFilm = async (id) => {
    const { success, message } = await deleteFilm(id);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const [editFilm, setEditFilm] = useState(film);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFilm((prev) => ({ ...prev, [name]: value }));
  };
  const handleStarClick = (rating) => setEditFilm((prev) => ({ ...prev, rating }));
  const handleUpdate = async () => {
    const { success, message } = await updateFilm(film._id, editFilm);
    toast({
      title: success ? "Success" : "Error",
      description: success ? "Film başarıyla güncellendi." : message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
    if (success) onClose();
  };

  return (
    <Box
      maxW="sm"
      w="full"
      bg={bgColor}
      shadow="2xl"
      rounded="2xl"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "scale(1.05) rotate(-1deg)", shadow: "dark-lg" }}
    >
      <Box position="relative">
        <img
          src={film.image}
          alt={film.name}
          style={{
            width: "100%",
            height: "280px",
            objectFit: "cover",
            borderBottomLeftRadius: "2xl",
            borderBottomRightRadius: "2xl",
          }}
        />
        <Box
          position="absolute"
          top={3}
          right={3}
          bg="rgba(0,0,0,0.6)"
          color="white"
          px={3}
          py={1}
          rounded="full"
          fontWeight="bold"
        >
          {film.rating} ⭐
        </Box>
      </Box>

      <Box p={5}>
        <Heading size="md" mb={2} color={textColor}>
          {film.name}
        </Heading>
        <Text fontSize="sm" color="gray.400" noOfLines={3}>
          {film.explain}
        </Text>

        <HStack mt={4} spacing={2}>
          <IconButton
            icon={<EditIcon />}
            colorScheme="blue"
            _hover={{ transform: "scale(1.1)" }}
            onClick={onOpen}  
          />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            _hover={{ transform: "scale(1.1)" }}
            onClick={() => handleDeleteFilm(film._id)}
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Film</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FilmForm
              filmData={editFilm}
              onInputChange={handleInputChange}
              onStarClick={handleStarClick}
              onSubmit={handleUpdate}
              buttonText="Save Changes"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" w="full" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default FilmCard;
