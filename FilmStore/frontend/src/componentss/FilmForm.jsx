
import { VStack, Input, HStack, Icon, Button } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

export const FilmForm = ({ filmData, onInputChange, onStarClick, onSubmit, buttonText, isLoading }) => {
  return (
    <VStack spacing={4}>
      <Input
        placeholder="Film Adı"
        name="name"
        value={filmData.name}
        onChange={onInputChange}
      />
      <Input
        placeholder="Film Açıklaması"
        name="explain"
        value={filmData.explain}
        onChange={onInputChange}
      />
      <HStack spacing={1}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            as={FaStar}
            key={star}
            cursor="pointer"
            color={star <= filmData.rating ? "yellow.400" : "gray.300"}
            onClick={() => onStarClick(star)}
            boxSize={6}
            _hover={{ color: "yellow.500" }}
            transition="color 0.2s"
            aria-label={`${star} star`}
          />
        ))}
      </HStack>
      <Button
        colorScheme="blue"
        onClick={onSubmit}
        w={'full'}
        isLoading={isLoading}
      >
        {buttonText}
      </Button>
    </VStack>
  );
};