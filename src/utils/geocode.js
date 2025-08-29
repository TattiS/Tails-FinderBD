import axios from 'axios';

export const reverseGeocode = async (lat, lng) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

  const response = await axios.get(url, {
    headers: { 'User-Agent': 'tailsfinder-app' },
  });

  const data = response.data.address;

  return {
    city: data.city || data.town || data.village || '',
    district: data.suburb || data.county || '',
    address: data.road || data.neighbourhood || '',
  };
};
