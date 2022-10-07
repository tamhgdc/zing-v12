const ConvertTotalDuration = (totalDuration) => {
  const totalTime = Math.floor(totalDuration / 3600);
  return `${totalTime}`;
};

export default ConvertTotalDuration;
