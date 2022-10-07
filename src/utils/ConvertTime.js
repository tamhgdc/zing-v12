const ConvertDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.round(duration - minutes * 60);
  if (minutes < 10 && seconds < 10) {
    return `0${minutes}:0${seconds}`;
  } else if (seconds > 10) {
    return `0${minutes}:${seconds}`;
  }
};

export default ConvertDuration;
