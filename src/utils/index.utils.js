export const getAssetsImageUrl = pathName => {
  console.log(
    "import(`@/assets/images/${pathName}.png`)",
    import(`@/assets/images/${pathName}.png`).default
  );
  return import(`@/assets/images/${pathName}.png`).default;
};
