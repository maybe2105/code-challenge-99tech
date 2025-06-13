import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  useToast,
  Container,
  IconButton,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { TokenSelect } from "./components/TokenSelect";
import { PriceTicker } from "./components/PriceTicker";
import { RepeatIcon } from "@chakra-ui/icons";
import axios from "axios";
import "./App.css";

interface Token {
  currency: string;
  date: string;
  price: number;
}

function App() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const toast = useToast();

  const inputBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.200");

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get<Token[]>(
          "https://interview.switcheo.com/prices.json"
        );
        // Remove duplicate tokens and sort by currency
        const uniqueTokens = Array.from(
          new Map(response.data.map((item) => [item.currency, item])).values()
        ).sort((a, b) => a.currency.localeCompare(b.currency));

        setTokens(uniqueTokens);
        if (uniqueTokens.length > 0) {
          setFromToken(uniqueTokens[0].currency);
          setToToken(uniqueTokens[1]?.currency || uniqueTokens[0].currency);
        }
      } catch (error) {
        console.error("Error fetching tokens:", error);
        toast({
          title: "Error fetching tokens",
          description: "Please try again later",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchTokens();
  }, []);

  const handleSwap = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Swap successful",
        description: `Swapped ${amount} ${fromToken} to ${toToken}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Swap failed",
        description: "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  if (isInitialLoading) {
    return (
      <Container maxW="container.sm" py={8} centerContent>
        <Spinner size="xl" color="blue.500" />
      </Container>
    );
  }

  return (
    <Box minH="100vh" bgGradient="linear(to-br, blue.50, purple.50)">
      <Box maxW="1280px" mx="auto" p={8}>
        <Container maxW="container.sm">
          <VStack spacing={8}>
            <Box textAlign="center">
              <Text
                fontSize="4xl"
                fontWeight="extrabold"
                bgGradient="linear(to-r, blue.500, purple.500)"
                bgClip="text"
                letterSpacing="tight"
                mb={2}
              >
                Token Swap
              </Text>
              <Text fontSize="sm" color="gray.600" fontWeight="medium">
                Trade tokens instantly with zero fees
              </Text>
            </Box>

            <PriceTicker tokens={tokens} />

            <Box w="full" position="relative">
              <HStack mb={3} align="center">
                <Text
                  fontSize="sm"
                  bgGradient="linear(to-r, blue.600, purple.600)"
                  bgClip="text"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  From
                </Text>
                <Box
                  flex={1}
                  h="1px"
                  bgGradient="linear(to-r, blue.100, purple.100)"
                />
              </HStack>
              <HStack
                spacing={4}
                bg={inputBg}
                p={4}
                borderRadius="2xl"
                backdropFilter="blur(8px)"
                boxShadow="sm"
                _hover={{
                  boxShadow: "md",
                  transform: "translateY(-1px)",
                }}
                transition="all 0.2s"
                position="relative"
                zIndex={1}
              >
                <TokenSelect
                  value={fromToken}
                  onChange={setFromToken}
                  tokens={tokens}
                />
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  size="lg"
                  w="60%"
                  bg="transparent"
                  border="none"
                  fontSize="2xl"
                  fontWeight="semibold"
                  _hover={{ bg: "transparent" }}
                  _focus={{
                    border: "none",
                    ring: 2,
                    ringColor: "blue.500",
                  }}
                  sx={{
                    "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                  }}
                />
              </HStack>
            </Box>

            <Box
              position="relative"
              w="full"
              display="flex"
              justifyContent="center"
              my={-2}
              zIndex={2}
            >
              <IconButton
                aria-label="Swap tokens"
                icon={<RepeatIcon />}
                onClick={handleTokenSwap}
                size="lg"
                bgGradient="linear(to-r, blue.500, purple.500)"
                color="white"
                isRound
                _hover={{
                  transform: "rotate(180deg) scale(1.1)",
                  bgGradient: "linear(to-r, blue.600, purple.600)",
                }}
                _active={{
                  transform: "rotate(180deg) scale(0.95)",
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                boxShadow="lg"
              />
            </Box>

            <Box w="full" position="relative">
              <HStack mb={3} align="center">
                <Text
                  fontSize="sm"
                  bgGradient="linear(to-r, purple.600, pink.600)"
                  bgClip="text"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  To
                </Text>
                <Box
                  flex={1}
                  h="1px"
                  bgGradient="linear(to-r, purple.100, pink.100)"
                />
              </HStack>
              <HStack
                spacing={4}
                bg={inputBg}
                p={4}
                borderRadius="2xl"
                backdropFilter="blur(8px)"
                boxShadow="sm"
                _hover={{
                  boxShadow: "md",
                  transform: "translateY(-1px)",
                }}
                transition="all 0.2s"
                position="relative"
                zIndex={1}
              >
                <TokenSelect
                  value={toToken}
                  onChange={setToToken}
                  tokens={tokens}
                />
                <Input
                  type="number"
                  value={
                    amount
                      ? (
                          (Number(amount) *
                            tokens.find((t) => t.currency === fromToken)!
                              .price) /
                          tokens.find((t) => t.currency === toToken)!.price
                        ).toFixed(6)
                      : ""
                  }
                  isReadOnly
                  placeholder="0.0"
                  size="lg"
                  w="60%"
                  bg="transparent"
                  border="none"
                  fontSize="2xl"
                  fontWeight="semibold"
                  _hover={{ bg: "transparent" }}
                  _focus={{ border: "none" }}
                  sx={{
                    "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                  }}
                />
              </HStack>
            </Box>

            <Button
              size="lg"
              w="full"
              h="60px"
              onClick={handleSwap}
              isLoading={isLoading}
              loadingText="Swapping..."
              bgGradient="linear(to-r, blue.500, purple.500)"
              color="white"
              fontSize="lg"
              fontWeight="bold"
              _hover={{
                bgGradient: "linear(to-r, blue.600, purple.600)",
                transform: "translateY(-2px)",
                boxShadow: "xl",
              }}
              _active={{
                transform: "translateY(0)",
                boxShadow: "md",
              }}
              transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
              borderRadius="2xl"
              position="relative"
              zIndex={1}
            >
              Swap Tokens
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
