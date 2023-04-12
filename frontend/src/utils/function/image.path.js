export const imagePath = (config, imageFormat, content, size) => {
  if (!config || !imageFormat || !content) {
    return;
  }
  if (imageFormat === "poster") {
    return config.base_url + config.poster_sizes[size] + content.poster_path;
  } else if (imageFormat === "logo") {
    return config.base_url + config.logo_sizes[size] + content.poster_path;
  } else if (imageFormat === "backdrop") {
    return (
      config.base_url + config.backdrop_sizes[size] + content.backdrop_path
    );
  }
};
