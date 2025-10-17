import { apiClient } from "./apiClient";
import type { Country } from "../store/countryStore";

const BASE = "https://restcountries.com/v3.1";
const FIELDS = "name,cca3,flags,region,borders";

const normalizeCountry = (c: Record<string, any>): Country => ({
  name: c.name?.common || "Unknown",
  cca3: c.cca3 || "",
  flags: {
    png: c.flags?.png || "",
    svg: c.flags?.svg || "",
    alt: c.flags?.alt || "",
  },
  region: c.region || "N/A",
  borders: Array.isArray(c.borders) ? c.borders : [],
});

export const fetchAllCountries = async (): Promise<Country[]> => {
  const response = await apiClient.get(`${BASE}/all?fields=${FIELDS}`);
  console.log("🌍 Fetched countries:", response.data?.length);
  return Array.isArray(response.data) ? response.data.map(normalizeCountry) : [];
};

export const fetchCountryByName = async (name: string): Promise<Country[]> => {
  const response = await apiClient.get(`${BASE}/name/${name}?fields=${FIELDS}`);
  return Array.isArray(response.data)
    ? response.data.map(normalizeCountry)
    : [normalizeCountry(response.data)];
};

export const fetchCountryByCode = async (code: string): Promise<Country[]> => {
  const response = await apiClient.get(`${BASE}/alpha/${code}?fields=${FIELDS}`);
  const data = Array.isArray(response.data) ? response.data : [response.data];
  console.log("📦 Fetched by code:", data);
  return data.map(normalizeCountry);
};

export const fetchCountriesByRegion = async (region: string): Promise<Country[]> => {
  const response = await apiClient.get(`${BASE}/region/${region}?fields=${FIELDS}`);
  return Array.isArray(response.data)
    ? response.data.map(normalizeCountry)
    : [normalizeCountry(response.data)];
};

