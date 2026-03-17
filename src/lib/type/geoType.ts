export type GeoResponse = {
  ip: string;
  isp: string;
  location:{country:string;region:string;  timezone:string;city:string;lat:number;lng:number};

};
