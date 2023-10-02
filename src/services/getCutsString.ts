export const getCutsString = (description: string, symbolAmount: number) =>
  description.length > symbolAmount
    ? description.substring(0, symbolAmount) + '...'
    : description;
