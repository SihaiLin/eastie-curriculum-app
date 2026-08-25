import { createContext, useContext } from "react";
import type { LanguageCode } from "../curriculum/types";

const LanguageContext = createContext<LanguageCode>("en");

export const LanguageProvider = LanguageContext.Provider;

export function useAppLanguage() {
  return useContext(LanguageContext);
}
