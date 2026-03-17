
import type { GeoResponse } from '$lib/type/geoType';


export const geoApi = async (ipAddressKey : string|null): Promise<GeoResponse> => {
  const res = await fetch( `https://geo.ipify.org/api/v2/country,city?apiKey=at_RRRxBNQ8h3ufJgc6Z6lmOuyNdtOJW&ipAddress=${ipAddressKey}`);
  if (!res.ok) throw new Error("Failed to fetch geo data");
  return res.json();
};
   
