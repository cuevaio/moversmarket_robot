import { DATA } from './data';

const nearbyStationsType = new Set<string>();
const tenureType = new Set<string>();

for (let i = 0; i < DATA.length; i++) {
  const listing = DATA[i];

  for (let j = 0; j < listing.nearbyStations.length; j++) {
    const nearbyStation = listing.nearbyStations[j];
    nearbyStationsType.add(nearbyStation.type);
  }

  tenureType.add(listing.tenureType);
}

console.log(nearbyStationsType);
console.log(tenureType);
