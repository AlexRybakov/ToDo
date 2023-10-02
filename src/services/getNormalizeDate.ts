const getNormalizeDate = (durationSec: number) => {
  switch (true) {
    case durationSec < 60:
      return durationSec + 'сек';
    case durationSec < 3600:
      return Math.floor(durationSec / 60) + 'мин';
    case durationSec < 86400:
      return Math.floor(durationSec / 3600) + 'час';
    default:
      return Math.floor(durationSec / 86400) + 'д';
  }
};

export default getNormalizeDate;
