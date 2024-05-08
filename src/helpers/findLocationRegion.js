import { citiesData } from "../components/city-card/citiesDatabase";

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function findLocationRegion(userLat, userLng) {
  let closestRegion = null;
  let minDistance = Infinity;

  citiesData.forEach((city) => {
    const distance = getDistanceFromLatLonInKm(
      userLat,
      userLng,
      city.province_lat,
      city.province_lng
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestRegion = city;
    }
  });

  return closestRegion;
}
