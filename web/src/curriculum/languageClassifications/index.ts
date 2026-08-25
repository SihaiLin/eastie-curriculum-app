import { k1LanguageUnit00Classifications } from "./k1LanguageUnit00";
import { k1LanguageUnit01Classifications } from "./k1LanguageUnit01";
import { k1LanguageUnit02Classifications } from "./k1LanguageUnit02";
import { k1LanguageUnit03Classifications } from "./k1LanguageUnit03";
import { k1LanguageUnit04Classifications } from "./k1LanguageUnit04";
import { k1LanguageUnit05Classifications } from "./k1LanguageUnit05";
import { k1LanguageUnit06Classifications } from "./k1LanguageUnit06";
import { k1LanguageUnit07Classifications } from "./k1LanguageUnit07";
import { k1LanguageUnit08Classifications } from "./k1LanguageUnit08";
import { k1LanguageUnit09Classifications } from "./k1LanguageUnit09";
import { k2LanguageUnit00Classifications } from "./k2LanguageUnit00";
import { k2LanguageUnit01Classifications } from "./k2LanguageUnit01";
import { k2LanguageUnit02Classifications } from "./k2LanguageUnit02";
import { k2LanguageUnit03Classifications } from "./k2LanguageUnit03";
import { k2LanguageUnit04Classifications } from "./k2LanguageUnit04";
import { k2LanguageUnit05Classifications } from "./k2LanguageUnit05";
import { k2LanguageUnit06Classifications } from "./k2LanguageUnit06";
import { k2LanguageUnit07Classifications } from "./k2LanguageUnit07";
import { k2LanguageUnit08Classifications } from "./k2LanguageUnit08";
import { k2LanguageUnit09Classifications } from "./k2LanguageUnit09";
import { k3LanguageUnit00Classifications } from "./k3LanguageUnit00";
import { k3LanguageUnit01Classifications } from "./k3LanguageUnit01";
import { k3LanguageUnit02Classifications } from "./k3LanguageUnit02";
import { k3LanguageUnit03Classifications } from "./k3LanguageUnit03";
import { k3LanguageUnit04Classifications } from "./k3LanguageUnit04";
import { k3LanguageUnit05Classifications } from "./k3LanguageUnit05";
import { k3LanguageUnit06Classifications } from "./k3LanguageUnit06";
import { k3LanguageUnit07Classifications } from "./k3LanguageUnit07";
import { k3LanguageUnit08Classifications } from "./k3LanguageUnit08";
import { k3LanguageUnit09Classifications } from "./k3LanguageUnit09";
import type { LessonLanguageClassification, UnitLanguageClassificationMap } from "./types";

const languageClassificationRegistry: Record<string, UnitLanguageClassificationMap> = {
  "k1-language-unit-00": k1LanguageUnit00Classifications,
  "k1-language-unit-01": k1LanguageUnit01Classifications,
  "k1-language-unit-02": k1LanguageUnit02Classifications,
  "k1-language-unit-03": k1LanguageUnit03Classifications,
  "k1-language-unit-04": k1LanguageUnit04Classifications,
  "k1-language-unit-05": k1LanguageUnit05Classifications,
  "k1-language-unit-06": k1LanguageUnit06Classifications,
  "k1-language-unit-07": k1LanguageUnit07Classifications,
  "k1-language-unit-08": k1LanguageUnit08Classifications,
  "k1-language-unit-09": k1LanguageUnit09Classifications,
  "k2-language-unit-00": k2LanguageUnit00Classifications,
  "k2-language-unit-01": k2LanguageUnit01Classifications,
  "k2-language-unit-02": k2LanguageUnit02Classifications,
  "k2-language-unit-03": k2LanguageUnit03Classifications,
  "k2-language-unit-04": k2LanguageUnit04Classifications,
  "k2-language-unit-05": k2LanguageUnit05Classifications,
  "k2-language-unit-06": k2LanguageUnit06Classifications,
  "k2-language-unit-07": k2LanguageUnit07Classifications,
  "k2-language-unit-08": k2LanguageUnit08Classifications,
  "k2-language-unit-09": k2LanguageUnit09Classifications,
  "k3-language-unit-00": k3LanguageUnit00Classifications,
  "k3-language-unit-01": k3LanguageUnit01Classifications,
  "k3-language-unit-02": k3LanguageUnit02Classifications,
  "k3-language-unit-03": k3LanguageUnit03Classifications,
  "k3-language-unit-04": k3LanguageUnit04Classifications,
  "k3-language-unit-05": k3LanguageUnit05Classifications,
  "k3-language-unit-06": k3LanguageUnit06Classifications,
  "k3-language-unit-07": k3LanguageUnit07Classifications,
  "k3-language-unit-08": k3LanguageUnit08Classifications,
  "k3-language-unit-09": k3LanguageUnit09Classifications,
};

export function getLessonLanguageClassification(
  unitId: string,
  lessonId: string,
): LessonLanguageClassification | undefined {
  return languageClassificationRegistry[unitId]?.[lessonId];
}

export type {
  ClassifiedLanguageItem,
  LanguageClassificationSource,
  LessonLanguageClassification,
  UnitLanguageClassificationMap,
} from "./types";
