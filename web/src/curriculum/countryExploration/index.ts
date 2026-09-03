import { countryExplorationCountries } from "./generated";
import type { CountryExplorationCountry, CountryExplorationLevel } from "./types";

export { countryExplorationCountries };
export type { CountryExplorationCountry, CountryExplorationLevel };

export function getCountryExplorationCountry(slug: string) {
  return countryExplorationCountries.find((country) => country.slug === slug) ?? null;
}

export function isCountryExplorationLevel(level: string): level is CountryExplorationLevel {
  return level === "K1" || level === "K2" || level === "K3";
}
