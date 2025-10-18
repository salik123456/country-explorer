import { create } from "zustand";
import { fetchAllCountries, fetchCountryByName, fetchCountriesByRegion } from "../services/countriesApi";
import { saveItem, getItem } from "../utils/storage";

export type Country = {
  name: string;
  cca3: string;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  region: string;
  borders?: string[];
};

export type CountryStore = {
  countryList: Country[];
  page: number;
  perPage: number;
  loading: boolean;
  error: string | null;
  favorites: string[];
 loadCountries: (name?: string, region?: string) => Promise<void>;
  searchByName: (name: string) => Promise<void>;
  setPage: (page: number) => void;
  toggleFavorite: (code: string) => void;
  loadFromStorage: () => void;
};

export const useCountryStore = create<CountryStore>((set, get) => ({
  countryList: [],
  page: 1,
  perPage: 20,
  loading: false,
  error: null,
  favorites: getItem("favorites") || [],

 loadCountries: async (name?: string, region?: string) => {
  set({ loading: true, error: null });
  try {
    let data: Country[] = [];

    if (name) {
      data = await fetchCountryByName(name);
    } else if (region) {
      data = await fetchCountriesByRegion(region);
    } else {
      data = await fetchAllCountries();
    }

    set({ countryList: data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load countries";
    set({ error: message, countryList: [] });
  } finally {
    set({ loading: false });
  }
},


  searchByName: async (name) => {
    set({ loading: true, error: null });
    try {
      if (!name.trim()) {
        await get().loadCountries();
        return;
      }
      const data = await fetchCountryByName(name);
      console.log("🔍 Search results:", data);
      set({ countryList: data });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Search failed";
      set({ error: message, countryList: [] });
    } finally {
      set({ loading: false });
    }
  },

  setPage: (page) => set({ page }),

  toggleFavorite: (code) => {
    const favs = get().favorites || [];
    const exists = favs.includes(code);
    const next = exists ? favs.filter((c) => c !== code) : [...favs, code];
    saveItem("favorites", next);
    set({ favorites: next });
  },

  loadFromStorage: () => {
    const stored = getItem("favorites") || [];
    set({ favorites: stored });
  },
}));
