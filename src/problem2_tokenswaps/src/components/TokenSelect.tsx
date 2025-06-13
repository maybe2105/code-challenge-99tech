import {
  HStack,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useColorModeValue,
  Portal,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface Token {
  currency: string;
  date: string;
  price: number;
}

interface TokenSelectProps {
  value: string;
  onChange: (value: string) => void;
  tokens: Token[];
}

export function TokenSelect({ value, onChange, tokens }: TokenSelectProps) {
  const selectedToken = tokens.find((token) => token.currency === value);
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Menu gutter={0}>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        w="40%"
        h="48px"
        px={4}
        bg="white"
        border="1px"
        borderColor={borderColor}
        borderRadius="xl"
        _hover={{
          borderColor: "blue.500",
          bg: hoverBg,
          transform: "translateY(-1px)",
          boxShadow: "sm",
        }}
        _active={{
          borderColor: "blue.500",
          bg: hoverBg,
          transform: "translateY(0)",
        }}
        transition="all 0.2s"
        position="relative"
        zIndex={1000}
      >
        <HStack spacing={2}>
          <Image
            src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${selectedToken?.currency}.svg`}
            alt={selectedToken?.currency}
            boxSize="20px"
            fallbackSrc="https://via.placeholder.com/20"
          />
          <Text fontWeight="medium">{selectedToken?.currency}</Text>
        </HStack>
      </MenuButton>
      <Portal>
        <MenuList
          maxH="300px"
          overflowY="auto"
          borderRadius="xl"
          boxShadow="xl"
          border="1px solid"
          borderColor={borderColor}
          zIndex={1000}
          bg="white"
        >
          {tokens.map((token) => (
            <MenuItem
              key={token.currency}
              onClick={() => onChange(token.currency)}
              minH="40px"
              _hover={{ bg: hoverBg }}
              _focus={{ bg: hoverBg }}
            >
              <HStack spacing={2}>
                <Image
                  src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`}
                  alt={token.currency}
                  boxSize="20px"
                  fallbackSrc="https://via.placeholder.com/20"
                />
                <Text fontWeight="medium">{token.currency}</Text>
              </HStack>
            </MenuItem>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );
}
