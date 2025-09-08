export const getVideoId = (url: string) => {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : url;
};
