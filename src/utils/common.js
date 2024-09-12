function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getFormattedType (type) {
  const formattedType = type[0].toUpperCase() + type.slice(1);
  return formattedType;
}

export {getRandomArrayElement, getFormattedType};
