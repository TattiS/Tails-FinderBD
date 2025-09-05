import axios from 'axios';

export const reverseGeocode = async (lat, lng) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=uk`;

  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'tailsfinder-app' },
    });

    const data = response.data.address;

    return {
      city: data.city || data.town || data.village || '',
      district: data.suburb || data.county || '',
      address: data.road || data.neighbourhood || '',
    };
  } catch (error) {
    console.error('Reverse geocode failed:', error.message);
    return {};
  }
};
