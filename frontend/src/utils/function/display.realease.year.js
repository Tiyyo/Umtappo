export const displayReleaseYear = (content) => {
  if (content.first_air_date) {
    return content.first_air_date.substring(0, 4);
  }
  if (content.release_date) {
    return content.release_date.substring(0, 4);
  }
};
