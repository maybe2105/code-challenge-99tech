import { HStack, Image, Text } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";

interface Token {
  currency: string;
  date: string;
  price: number;
}

interface PriceTickerProps {
  tokens: Token[];
}

export function PriceTicker({ tokens }: PriceTickerProps) {
  // Duplicate tokens to create a seamless loop
  const tickerTokens = [...tokens, ...tokens];

  return (
    <div className="ticker-container">
      <div className="ticker">
        {tickerTokens.map((token, index) => {
          const priceChange = Math.random() > 0.5 ? 1 : -1; // Simulated price change
          const changePercent = (Math.random() * 5).toFixed(2);
          const isPositive = priceChange > 0;

          return (
            <div
              key={`${token.currency}-${index}`}
              className={`ticker-item ${isPositive ? "positive" : "negative"}`}
            >
              <HStack spacing={2}>
                <Image
                  src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`}
                  alt={token.currency}
                  boxSize="20px"
                  fallbackSrc="https://via.placeholder.com/20"
                />
                <Text>{token.currency}</Text>
                <Text>${token.price.toFixed(2)}</Text>
                {isPositive ? (
                  <TriangleUpIcon color="green.500" w={3} h={3} />
                ) : (
                  <TriangleDownIcon color="red.500" w={3} h={3} />
                )}
                <Text>
                  {isPositive ? "+" : "-"}
                  {changePercent}%
                </Text>
              </HStack>
            </div>
          );
        })}
      </div>
    </div>
  );
}
