const cards = [
  "two", "three", "four", "five", "six",
  "seven", "eight", "nine", "ten",
  "jack", "queen", "king", "ace"
] as const;

type CardType = typeof cards[number];

type OutcomeType = "blackjack" | "above" | "below";

type ResultType = `${OutcomeType} ${CardType}`;

const cardSet = new Set<CardType>(cards); // Use set for quick type guard lookup

const cardValues: Record<CardType, number> = {
  two: 2, three: 3, four: 4, five: 5,
  six: 6, seven: 7, eight: 8, nine: 9,
  ten: 10, jack: 10, queen: 10, king: 10, ace: 11
}

const priorityValues: Record<CardType, number> = {
  ace: 1, two: 2, three: 3, four: 4, five: 5,
  six: 6, seven: 7, eight: 8, nine: 9,
  ten: 10, jack: 11, queen: 12, king: 13
}


/**
 * Main function to handle dealed cards.
 * @param dealedCards - string[]
 * @returns 
 */
export const blackjackHighest = (dealtCards: string[]): ResultType => {
  // Ensure the untrusted dealedCards string array are indeed of CardType at runtime
  // Filter away all strings which are not a part of CardType 
  const validCards: CardType[] = dealtCards.filter(isCard);

  if (validCards.length === 0) {
    throw new Error("No valid cards provided");
  }

  let aces: number = validCards.filter((value) => value === "ace").length;

  let totalSum: number = validCards.reduce((sum, currentCard) => sum + cardValues[currentCard], 0);

  // If the totalSum is above 21 and there are any aces in the array, 
  // then turn the aces value from 11 to 1 one by one.
  while (totalSum > 21 && aces > 0) {
    totalSum = totalSum - 10;
    aces--;
  }

  let highestCard: CardType = validCards[0];

  // Find the highest card based on the rankings in the priorityValues record 
  for (let card of validCards) {
    if (calculatePriority(card, aces) > calculatePriority(highestCard, aces)) {
      highestCard = card;
    }
  }

  if (totalSum === 21) return `blackjack ${highestCard}`;
  else if (totalSum > 21) return `above ${highestCard}`;
  return `below ${highestCard}`;
}


/**
 * Get the value of the card from the priorityValues record. \
 * If the card is an ace and the aces count is above 0 return 14 as the ace value.
 * @param card - CardType
 * @param aces - number
 * @returns priority value of CardType
 */
const calculatePriority = (card: CardType, aces: number): number => {
  if (card === "ace" && aces > 0) {
    return 14;
  }

  return priorityValues[card];
}


/**
 * Type Guard to with a type predicate to check if the provided value is of CardType. \
 * Use to check if the provided value is indeed a part of CardType at runtime.
 * @param value - CardType
 * @returns value is CardType
 */
const isCard = (value: string): value is CardType => cardSet.has(value as CardType);
