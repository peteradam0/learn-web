export const calculateProgressBar = (
  numberOfTotalChapters: number,
  numberOfCompletedChapters: number
): number => {
  return (numberOfCompletedChapters * 100) / numberOfTotalChapters;
};
