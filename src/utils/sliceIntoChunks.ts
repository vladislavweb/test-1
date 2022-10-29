export const sliceIntoChunks = <T>(data: T[], chunkSize = 10) => {
  const res = [];

  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    res.push(chunk);
  }

  return res;
};
