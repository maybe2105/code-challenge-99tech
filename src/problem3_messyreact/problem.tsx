// PROBLEM: Missing blockchain property in interface but used in code
interface WalletBalance {
  currency: string;
  amount: number;
}
// PROBLEM: Should extend WalletBalance but doesn't, creating type inconsistency if anything added to the WalletBalance interface

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

// PROBLEM: Empty interface extension
interface Props extends BoxProps {}

// PROBLEM: Using React.FC is anti-pattern, children prop destructured but never used
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  // PROBLEM: Missing type definitions for these hooks
  const balances = useWalletBalances();
  const prices = usePrices();

  // PROBLEM 1: Using 'any' type, function defined inside component (recreated every render)
  // PROBLEM 2: Magic numbers in switch cases should be constants
  // PROBLEM 3: This can also be a map, and we can use the map to get the priority like PRIORITY_MAP
  // PROBLEM 4: this get re-created every render, should move it outside the component
  const getPriority = (blockchain: Blockchain): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  // PROBLEM 1: useMemo includes prices in deps but doesn't use it
  // PROBLEM 2: Filter logic is incorrect - returns true for negative balances
  // PROBLEM 3: Using undefined variable lhsPriority instead of balancePriority
  // PROBLEM 4: Sort function missing return for equal case
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]);

  // PROBLEM: Unused variable - calculated but never used, and we dont have to create a new additional array to store the formatted amount additonally to the balance object, if we use it anywhere else just put it in the balance object is

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  // PROBLEM 1: Using array index as key (anti-pattern)
  // PROBLEM 2: No error handling for price calculation
  // PROBLEM 3: Using undefined classes variable
  // PROBLEM 4: This also get re-rendered every time the component re-renders even if the balance object and the prices are the same, we can use useMemo to memoize the rows
  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;

      // PROBLEM: this should just be calculated here, formattedAmount={balance.amount.toFixed()}
      // const formattedAmount = balance.amount.toFixed();

      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          // PROBLEM: this should use the formattedAmount calculated above
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  // PROBLEM: Props spreading without type checking
  return <div {...rest}>{rows}</div>;
};
