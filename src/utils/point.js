function getOffersForPoint (point, offers) {

  const pointTypeOffer = offers.find((offer) => offer.type === point.type);

  if (!pointTypeOffer) {
    return '';
  }
  return pointTypeOffer;
}

function getDestinationForPoint (point, destinations) {

  const destinationData = destinations.find((destination) => destination.id === point.destination);

  if (!destinationData) {
    return '';
  }
  return destinationData;
}

export {getOffersForPoint, getDestinationForPoint};
