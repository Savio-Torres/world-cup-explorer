const playerImages = import.meta.glob(
  "../assets/images/players/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

export function getPlayerImage(countryFolder, fileName, fallbackImage) {
  return (
    playerImages[`../assets/images/players/${countryFolder}/${fileName}`] ||
    fallbackImage
  );
}