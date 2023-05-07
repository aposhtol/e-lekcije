const timeSince = (date) => {
  const seconds = Math.floor(
    (new Date(Date.now() - 2 * 60 * 60 * 1000) - date) / 1000
  );
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return `prije ${interval} godin${interval > 4 ? 'a' : 'e'}`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `prije ${interval} mjesec${
      interval > 1 ? 'a' : interval > 4 ? 'i' : ''
    }`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `prije ${interval} dan${interval > 1 ? 'a' : ''}`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `prije ${interval} sat${
      interval > 4 ? 'i' : interval > 1 ? 'a' : ''
    }`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `prije ${interval} minut${interval > 4 ? 'a' : 'e'}`;
  }
  return `prije ${Math.floor(seconds)} sekund${seconds > 4 ? 'i' : 'e'}`;
};

export default timeSince;
