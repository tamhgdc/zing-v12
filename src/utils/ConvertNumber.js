const ConvertNumber = (value) => {
  if (value < 1000) {
    return value;
  } else if (value > 1000 && value < 1000000) {
    const newValue = Math.floor(value / 1000);
    return `${newValue}K`;
  } else if (value > 1000000) {
    const newFollow = Math.floor(value / 1000000);
    return `${newFollow}M`;
  }
};

export default ConvertNumber;
