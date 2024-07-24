function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getFormattedType (type) {
  const formattedType = type[0].toUpperCase() + type.slice(1);
  return formattedType;
}

function updateItem (items, update) {
  return items.map((item) => item.uniqId === update.uniqId ? update : item);
}

export {getRandomArrayElement, getFormattedType,updateItem};
