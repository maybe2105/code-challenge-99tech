import React, { useMemo } from "react";

// Types
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

// Constants
const BLOCKCHAIN_PRIORITIES: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const DEFAULT_PRIORITY = -99;

// Utility functions
const getPriority = (blockchain: Blockchain): number => {
  return BLOCKCHAIN_PRIORITIES[blockchain] ?? DEFAULT_PRIORITY;
};

const WalletPage = ({ className, ...rest }: HTMLDivElement) => {
  // TODO: Implement these functions
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances: FormattedWalletBalance[] = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const priority = getPriority(balance.blockchain);
        return priority > DEFAULT_PRIORITY && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      });
  }, [balances]);

  const rows = useMemo(() => {
    return sortedBalances.map((balance: WalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={`${balance.currency}-${balance.blockchain}`}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.amount.toFixed()}
        />
      );
    });
  }, [sortedBalances, prices]);

  return (
    <div className={className} {...rest}>
      {rows}
    </div>
  );
};

export default WalletPage;
