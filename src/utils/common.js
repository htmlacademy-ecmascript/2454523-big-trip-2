function getFormattedType (type) {
  const formattedType = type[0].toUpperCase() + type.slice(1);
  return formattedType;
}

export {getFormattedType};
