import { k1LanguageUnit00 } from "./generated/k1LanguageUnit00";
import { k1LanguageUnit01 } from "./generated/k1LanguageUnit01";
import { k1LanguageUnit02 } from "./generated/k1LanguageUnit02";
import { k1LanguageUnit03 } from "./generated/k1LanguageUnit03";
import { k1LanguageUnit04 } from "./generated/k1LanguageUnit04";
import { k1LanguageUnit05 } from "./generated/k1LanguageUnit05";
import { k1LanguageUnit06 } from "./generated/k1LanguageUnit06";
import { k1LanguageUnit07 } from "./generated/k1LanguageUnit07";
import { k1LanguageUnit08 } from "./generated/k1LanguageUnit08";
import { k1LanguageUnit09 } from "./generated/k1LanguageUnit09";
import { k1NonLanguageUnit01 } from "./generated/k1Unit01NonLanguageUnit01";
import { k1NonLanguageUnit02 } from "./generated/k1Unit02NonLanguageUnit02";
import { k1NonLanguageUnit03 } from "./generated/k1Unit03NonLanguageUnit03";
import { k1NonLanguageUnit04 } from "./generated/k1Unit04NonLanguageUnit04";
import { k1NonLanguageUnit05 } from "./generated/k1Unit05NonLanguageUnit05";
import { k1NonLanguageUnit06 } from "./generated/k1Unit06NonLanguageUnit06";
import { k1NonLanguageUnit07 } from "./generated/k1Unit07NonLanguageUnit07";
import { k1NonLanguageUnit08 } from "./generated/k1Unit08NonLanguageUnit08";
import { k1NonLanguageUnit09 } from "./generated/k1Unit09NonLanguageUnit09";
import { k2LanguageUnit00 } from "./generated/k2LanguageUnit00";
import { k2LanguageUnit01 } from "./generated/k2LanguageUnit01";
import { k2LanguageUnit02 } from "./generated/k2LanguageUnit02";
import { k2LanguageUnit03 } from "./generated/k2LanguageUnit03";
import { k2LanguageUnit04 } from "./generated/k2LanguageUnit04";
import { k2LanguageUnit05 } from "./generated/k2LanguageUnit05";
import { k2LanguageUnit06 } from "./generated/k2LanguageUnit06";
import { k2LanguageUnit07 } from "./generated/k2LanguageUnit07";
import { k2LanguageUnit08 } from "./generated/k2LanguageUnit08";
import { k2LanguageUnit09 } from "./generated/k2LanguageUnit09";
import { k3LanguageUnit00 } from "./generated/k3LanguageUnit00";
import { k3LanguageUnit01 } from "./generated/k3LanguageUnit01";
import { k3LanguageUnit02 } from "./generated/k3LanguageUnit02";
import { k3LanguageUnit03 } from "./generated/k3LanguageUnit03";
import { k3LanguageUnit04 } from "./generated/k3LanguageUnit04";
import { k3LanguageUnit05 } from "./generated/k3LanguageUnit05";
import { k3LanguageUnit06 } from "./generated/k3LanguageUnit06";
import { k3LanguageUnit07 } from "./generated/k3LanguageUnit07";
import { k3LanguageUnit08 } from "./generated/k3LanguageUnit08";
import { k3LanguageUnit09 } from "./generated/k3LanguageUnit09";
import { pgNonLanguageUnit00 } from "./generated/pgUnit00NonLanguageUnit00";
import { pgNonLanguageUnit01 } from "./generated/pgUnit01NonLanguageUnit01";
import { pgNonLanguageUnit02 } from "./generated/pgUnit02NonLanguageUnit02";
import { pgNonLanguageUnit03 } from "./generated/pgUnit03NonLanguageUnit03";
import { pgNonLanguageUnit04 } from "./generated/pgUnit04NonLanguageUnit04";
import { pgNonLanguageUnit05 } from "./generated/pgUnit05NonLanguageUnit05";
import { pgNonLanguageUnit06 } from "./generated/pgUnit06NonLanguageUnit06";
import { pgNonLanguageUnit07 } from "./generated/pgUnit07NonLanguageUnit07";
import { pgNonLanguageUnit08 } from "./generated/pgUnit08NonLanguageUnit08";
import { pgNonLanguageUnit09 } from "./generated/pgUnit09NonLanguageUnit09";
import { pkNonLanguageUnit00 } from "./generated/pkUnit00NonLanguageUnit00";
import { pkNonLanguageUnit01 } from "./generated/pkUnit01NonLanguageUnit01";
import { pkNonLanguageUnit02 } from "./generated/pkUnit02NonLanguageUnit02";
import { pkNonLanguageUnit03 } from "./generated/pkUnit03NonLanguageUnit03";
import { pkNonLanguageUnit04 } from "./generated/pkUnit04NonLanguageUnit04";
import { pkNonLanguageUnit05 } from "./generated/pkUnit05NonLanguageUnit05";
import { pkNonLanguageUnit06 } from "./generated/pkUnit06NonLanguageUnit06";
import { pkNonLanguageUnit07 } from "./generated/pkUnit07NonLanguageUnit07";
import { pkNonLanguageUnit08 } from "./generated/pkUnit08NonLanguageUnit08";
import { pkNonLanguageUnit09 } from "./generated/pkUnit09NonLanguageUnit09";
import { pgLanguageUnit00 } from "./generated/pgLanguageUnit00";
import { pgLanguageUnit01 } from "./generated/pgLanguageUnit01";
import { pgLanguageUnit02 } from "./generated/pgLanguageUnit02";
import { pgLanguageUnit03 } from "./generated/pgLanguageUnit03";
import { pgLanguageUnit04 } from "./generated/pgLanguageUnit04";
import { pgLanguageUnit05 } from "./generated/pgLanguageUnit05";
import { pgLanguageUnit06 } from "./generated/pgLanguageUnit06";
import { pgLanguageUnit07 } from "./generated/pgLanguageUnit07";
import { pgLanguageUnit08 } from "./generated/pgLanguageUnit08";
import { pgLanguageUnit09 } from "./generated/pgLanguageUnit09";
import { pkLanguageUnit00 } from "./generated/pkLanguageUnit00";
import { pkLanguageUnit01 } from "./generated/pkLanguageUnit01";
import { pkLanguageUnit02 } from "./generated/pkLanguageUnit02";
import { pkLanguageUnit03 } from "./generated/pkLanguageUnit03";
import { pkLanguageUnit04 } from "./generated/pkLanguageUnit04";
import { pkLanguageUnit05 } from "./generated/pkLanguageUnit05";
import { pkLanguageUnit06 } from "./generated/pkLanguageUnit06";
import { pkLanguageUnit07 } from "./generated/pkLanguageUnit07";
import { pkLanguageUnit08 } from "./generated/pkLanguageUnit08";
import { pkLanguageUnit09 } from "./generated/pkLanguageUnit09";
import type { LanguageUnitData } from "../components/Curriculum/LanguageUnitPage";
import type { CourseType, CurriculumLevel, CurriculumUnit } from "./types";

type DynamicUnitBase = {
  level: CurriculumLevel;
  courseType: CourseType;
  unitNumber: number;
  path: string;
  label: string;
  status: "active-reference" | "active-prototype";
};

export type NonLanguageDynamicUnitEntry = DynamicUnitBase & {
  renderer: "non-language";
  unit: CurriculumUnit;
};

export type PgPkLanguageDynamicUnitEntry = DynamicUnitBase & {
  renderer: "pg-pk-language";
  unit: LanguageUnitData;
};

export type KLanguageDynamicUnitEntry = DynamicUnitBase & {
  renderer: "k-language";
  unit: LanguageUnitData;
};

export type DynamicUnitEntry =
  | NonLanguageDynamicUnitEntry
  | PgPkLanguageDynamicUnitEntry
  | KLanguageDynamicUnitEntry;

function unitPath(level: CurriculumLevel, courseType: CourseType, unitNumber: number) {
  const unitSlug = unitNumber === 0 ? "unit-uh" : `unit-${String(unitNumber).padStart(2, "0")}`;
  return `/curriculum/${level.toLowerCase()}/${courseType}/${unitSlug}`;
}

export const dynamicUnitManifest: DynamicUnitEntry[] = [
  {
    level: "K1",
    courseType: "non-language",
    unitNumber: 1,
    path: unitPath("K1", "non-language", 1),
    label: "K1 Non-Language Unit 1 Self-Care",
    renderer: "non-language",
    status: "active-prototype",
    unit: k1NonLanguageUnit01,
  },
  {
    level: "K1",
    courseType: "non-language",
    unitNumber: 2,
    path: unitPath("K1", "non-language", 2),
    label: "K1 Non-Language Unit 2 Self-Care",
    renderer: "non-language",
    status: "active-prototype",
    unit: k1NonLanguageUnit02,
  },
  {
    level: "K1",
    courseType: "non-language",
    unitNumber: 3,
    path: unitPath("K1", "non-language", 3),
    label: "K1 Non-Language Unit 3 Self-Care",
    renderer: "non-language",
    status: "active-prototype",
    unit: k1NonLanguageUnit03,
  },
  {
    level: "K1",
    courseType: "non-language",
    unitNumber: 4,
    path: unitPath("K1", "non-language", 4),
    label: "K1 Non-Language Unit 4 Self-Care",
    renderer: "non-language",
    status: "active-prototype",
    unit: k1NonLanguageUnit04,
  },
  {
    level: "K1",
    courseType: "non-language",
    unitNumber: 5,
    path: unitPath("K1", "non-language", 5),
    label: "K1 Non-Language Unit 5 Self-Care",
    renderer: "non-language",
    status: "active-prototype",
    unit: k1NonLanguageUnit05,
  },
  {
    level: "K1",
    courseType: "non-language",
    unitNumber: 6,
    path: unitPath("K1", "non-language", 6),
    label: "K1 Non-Language Unit 6 Self-Care",
    renderer: "non-language",
    status: "active-prototype",
    unit: k1NonLanguageUnit06,
  },
  {
    level: "K1",
    courseType: "non-language",
    unitNumber: 7,
    path: unitPath("K1", "non-language", 7),
    label: "K1 Non-Language Unit 7 Self-Care",
    renderer: "non-language",
    status: "active-prototype",
    unit: k1NonLanguageUnit07,
  },
  {
    level: "K1",
    courseType: "non-language",
    unitNumber: 8,
    path: unitPath("K1", "non-language", 8),
    label: "K1 Non-Language Unit 8 Self-Care",
    renderer: "non-language",
    status: "active-prototype",
    unit: k1NonLanguageUnit08,
  },
  {
    level: "K1",
    courseType: "non-language",
    unitNumber: 9,
    path: unitPath("K1", "non-language", 9),
    label: "K1 Non-Language Unit 9 Self-Care",
    renderer: "non-language",
    status: "active-prototype",
    unit: k1NonLanguageUnit09,
  },
  {
    level: "PG",
    courseType: "non-language",
    unitNumber: 0,
    path: unitPath("PG", "non-language", 0),
    label: "PG Non-Language Unit Hello",
    renderer: "non-language",
    status: "active-prototype",
    unit: pgNonLanguageUnit00,
  },
  {
    level: "PG",
    courseType: "non-language",
    unitNumber: 1,
    path: unitPath("PG", "non-language", 1),
    label: "PG Non-Language Unit 1",
    renderer: "non-language",
    status: "active-prototype",
    unit: pgNonLanguageUnit01,
  },
  {
    level: "PG",
    courseType: "non-language",
    unitNumber: 2,
    path: unitPath("PG", "non-language", 2),
    label: "PG Non-Language Unit 2",
    renderer: "non-language",
    status: "active-prototype",
    unit: pgNonLanguageUnit02,
  },
  {
    level: "PG",
    courseType: "non-language",
    unitNumber: 3,
    path: unitPath("PG", "non-language", 3),
    label: "PG Non-Language Unit 3",
    renderer: "non-language",
    status: "active-prototype",
    unit: pgNonLanguageUnit03,
  },
  {
    level: "PG",
    courseType: "non-language",
    unitNumber: 4,
    path: unitPath("PG", "non-language", 4),
    label: "PG Non-Language Unit 4",
    renderer: "non-language",
    status: "active-prototype",
    unit: pgNonLanguageUnit04,
  },
  {
    level: "PG",
    courseType: "non-language",
    unitNumber: 5,
    path: unitPath("PG", "non-language", 5),
    label: "PG Non-Language Unit 5",
    renderer: "non-language",
    status: "active-prototype",
    unit: pgNonLanguageUnit05,
  },
  {
    level: "PG",
    courseType: "non-language",
    unitNumber: 6,
    path: unitPath("PG", "non-language", 6),
    label: "PG Non-Language Unit 6",
    renderer: "non-language",
    status: "active-prototype",
    unit: pgNonLanguageUnit06,
  },
  {
    level: "PG",
    courseType: "non-language",
    unitNumber: 7,
    path: unitPath("PG", "non-language", 7),
    label: "PG Non-Language Unit 7",
    renderer: "non-language",
    status: "active-prototype",
    unit: pgNonLanguageUnit07,
  },
  {
    level: "PG",
    courseType: "non-language",
    unitNumber: 8,
    path: unitPath("PG", "non-language", 8),
    label: "PG Non-Language Unit 8",
    renderer: "non-language",
    status: "active-reference",
    unit: pgNonLanguageUnit08,
  },
  {
    level: "PG",
    courseType: "non-language",
    unitNumber: 9,
    path: unitPath("PG", "non-language", 9),
    label: "PG Non-Language Unit 9",
    renderer: "non-language",
    status: "active-prototype",
    unit: pgNonLanguageUnit09,
  },
  {
    level: "PK",
    courseType: "non-language",
    unitNumber: 0,
    path: unitPath("PK", "non-language", 0),
    label: "PK Non-Language Unit Hello",
    renderer: "non-language",
    status: "active-prototype",
    unit: pkNonLanguageUnit00,
  },
  {
    level: "PK",
    courseType: "non-language",
    unitNumber: 1,
    path: unitPath("PK", "non-language", 1),
    label: "PK Non-Language Unit 1",
    renderer: "non-language",
    status: "active-prototype",
    unit: pkNonLanguageUnit01,
  },
  {
    level: "PK",
    courseType: "non-language",
    unitNumber: 2,
    path: unitPath("PK", "non-language", 2),
    label: "PK Non-Language Unit 2",
    renderer: "non-language",
    status: "active-prototype",
    unit: pkNonLanguageUnit02,
  },
  {
    level: "PK",
    courseType: "non-language",
    unitNumber: 3,
    path: unitPath("PK", "non-language", 3),
    label: "PK Non-Language Unit 3",
    renderer: "non-language",
    status: "active-prototype",
    unit: pkNonLanguageUnit03,
  },
  {
    level: "PK",
    courseType: "non-language",
    unitNumber: 4,
    path: unitPath("PK", "non-language", 4),
    label: "PK Non-Language Unit 4",
    renderer: "non-language",
    status: "active-prototype",
    unit: pkNonLanguageUnit04,
  },
  {
    level: "PK",
    courseType: "non-language",
    unitNumber: 5,
    path: unitPath("PK", "non-language", 5),
    label: "PK Non-Language Unit 5",
    renderer: "non-language",
    status: "active-prototype",
    unit: pkNonLanguageUnit05,
  },
  {
    level: "PK",
    courseType: "non-language",
    unitNumber: 6,
    path: unitPath("PK", "non-language", 6),
    label: "PK Non-Language Unit 6",
    renderer: "non-language",
    status: "active-prototype",
    unit: pkNonLanguageUnit06,
  },
  {
    level: "PK",
    courseType: "non-language",
    unitNumber: 7,
    path: unitPath("PK", "non-language", 7),
    label: "PK Non-Language Unit 7",
    renderer: "non-language",
    status: "active-prototype",
    unit: pkNonLanguageUnit07,
  },
  {
    level: "PK",
    courseType: "non-language",
    unitNumber: 8,
    path: unitPath("PK", "non-language", 8),
    label: "PK Non-Language Unit 8",
    renderer: "non-language",
    status: "active-reference",
    unit: pkNonLanguageUnit08,
  },
  {
    level: "PK",
    courseType: "non-language",
    unitNumber: 9,
    path: unitPath("PK", "non-language", 9),
    label: "PK Non-Language Unit 9",
    renderer: "non-language",
    status: "active-prototype",
    unit: pkNonLanguageUnit09,
  },
  {
    level: "PG",
    courseType: "language",
    unitNumber: 0,
    path: unitPath("PG", "language", 0),
    label: "PG Language Unit Hello",
    renderer: "pg-pk-language",
    status: "active-prototype",
    unit: pgLanguageUnit00,
  },
  {
    level: "PG",
    courseType: "language",
    unitNumber: 1,
    path: unitPath("PG", "language", 1),
    label: "PG Language Unit 1",
    renderer: "pg-pk-language",
    status: "active-prototype",
    unit: pgLanguageUnit01,
  },
  {
    level: "PG",
    courseType: "language",
    unitNumber: 2,
    path: unitPath("PG", "language", 2),
    label: "PG Language Unit 2",
    renderer: "pg-pk-language",
    status: "active-prototype",
    unit: pgLanguageUnit02,
  },
  {
    level: "PG",
    courseType: "language",
    unitNumber: 3,
    path: unitPath("PG", "language", 3),
    label: "PG Language Unit 3",
    renderer: "pg-pk-language",
    status: "active-prototype",
    unit: pgLanguageUnit03,
  },
  {
    level: "PG",
    courseType: "language",
    unitNumber: 4,
    path: unitPath("PG", "language", 4),
    label: "PG Language Unit 4",
    renderer: "pg-pk-language",
    status: "active-prototype",
    unit: pgLanguageUnit04,
  },
  {
    level: "PG",
    courseType: "language",
    unitNumber: 5,
    path: unitPath("PG", "language", 5),
    label: "PG Language Unit 5",
    renderer: "pg-pk-language",
    status: "active-prototype",
    unit: pgLanguageUnit05,
  },
  {
    level: "PG",
    courseType: "language",
    unitNumber: 6,
    path: unitPath("PG", "language", 6),
    label: "PG Language Unit 6",
    renderer: "pg-pk-language",
    status: "active-prototype",
    unit: pgLanguageUnit06,
  },
  {
    level: "PG",
    courseType: "language",
    unitNumber: 7,
    path: unitPath("PG", "language", 7),
    label: "PG Language Unit 7",
    renderer: "pg-pk-language",
    status: "active-prototype",
    unit: pgLanguageUnit07,
  },
  {
    level: "PG",
    courseType: "language",
    unitNumber: 8,
    path: unitPath("PG", "language", 8),
    label: "PG Language Unit 8",
    renderer: "pg-pk-language",
    status: "active-prototype",
    unit: pgLanguageUnit08,
  },
  {
    level: "PG",
    courseType: "language",
    unitNumber: 9,
    path: unitPath("PG", "language", 9),
    label: "PG Language Unit 9",
    renderer: "pg-pk-language",
    status: "active-prototype",
    unit: pgLanguageUnit09,
  },
  {
    level: "PK",
    courseType: "language",
    unitNumber: 0,
    path: unitPath("PK", "language", 0),
    label: "PK Language Unit Hello",
    renderer: "k-language",
    status: "active-prototype",
    unit: pkLanguageUnit00,
  },
  {
    level: "PK",
    courseType: "language",
    unitNumber: 1,
    path: unitPath("PK", "language", 1),
    label: "PK Language Unit 1",
    renderer: "k-language",
    status: "active-prototype",
    unit: pkLanguageUnit01,
  },
  {
    level: "PK",
    courseType: "language",
    unitNumber: 2,
    path: unitPath("PK", "language", 2),
    label: "PK Language Unit 2",
    renderer: "pg-pk-language",
    status: "active-prototype",
    unit: pkLanguageUnit02,
  },
  {
    level: "PK",
    courseType: "language",
    unitNumber: 3,
    path: unitPath("PK", "language", 3),
    label: "PK Language Unit 3",
    renderer: "pg-pk-language",
    status: "active-prototype",
    unit: pkLanguageUnit03,
  },
  {
    level: "PK",
    courseType: "language",
    unitNumber: 4,
    path: unitPath("PK", "language", 4),
    label: "PK Language Unit 4",
    renderer: "pg-pk-language",
    status: "active-prototype",
    unit: pkLanguageUnit04,
  },
  {
    level: "PK",
    courseType: "language",
    unitNumber: 5,
    path: unitPath("PK", "language", 5),
    label: "PK Language Unit 5",
    renderer: "pg-pk-language",
    status: "active-prototype",
    unit: pkLanguageUnit05,
  },
  {
    level: "PK",
    courseType: "language",
    unitNumber: 6,
    path: unitPath("PK", "language", 6),
    label: "PK Language Unit 6",
    renderer: "pg-pk-language",
    status: "active-prototype",
    unit: pkLanguageUnit06,
  },
  {
    level: "PK",
    courseType: "language",
    unitNumber: 7,
    path: unitPath("PK", "language", 7),
    label: "PK Language Unit 7",
    renderer: "pg-pk-language",
    status: "active-prototype",
    unit: pkLanguageUnit07,
  },
  {
    level: "PK",
    courseType: "language",
    unitNumber: 8,
    path: unitPath("PK", "language", 8),
    label: "PK Language Unit 8",
    renderer: "pg-pk-language",
    status: "active-prototype",
    unit: pkLanguageUnit08,
  },
  {
    level: "PK",
    courseType: "language",
    unitNumber: 9,
    path: unitPath("PK", "language", 9),
    label: "PK Language Unit 9",
    renderer: "pg-pk-language",
    status: "active-prototype",
    unit: pkLanguageUnit09,
  },
  {
    level: "K1",
    courseType: "language",
    unitNumber: 0,
    path: unitPath("K1", "language", 0),
    label: "K1 Language Unit Hello",
    renderer: "k-language",
    status: "active-prototype",
    unit: k1LanguageUnit00,
  },
  {
    level: "K1",
    courseType: "language",
    unitNumber: 1,
    path: unitPath("K1", "language", 1),
    label: "K1 Language Unit 1",
    renderer: "k-language",
    status: "active-prototype",
    unit: k1LanguageUnit01,
  },
  {
    level: "K1",
    courseType: "language",
    unitNumber: 2,
    path: unitPath("K1", "language", 2),
    label: "K1 Language Unit 2",
    renderer: "k-language",
    status: "active-prototype",
    unit: k1LanguageUnit02,
  },
  {
    level: "K1",
    courseType: "language",
    unitNumber: 3,
    path: unitPath("K1", "language", 3),
    label: "K1 Language Unit 3",
    renderer: "k-language",
    status: "active-prototype",
    unit: k1LanguageUnit03,
  },
  {
    level: "K1",
    courseType: "language",
    unitNumber: 4,
    path: unitPath("K1", "language", 4),
    label: "K1 Language Unit 4",
    renderer: "k-language",
    status: "active-prototype",
    unit: k1LanguageUnit04,
  },
  {
    level: "K1",
    courseType: "language",
    unitNumber: 5,
    path: unitPath("K1", "language", 5),
    label: "K1 Language Unit 5",
    renderer: "k-language",
    status: "active-prototype",
    unit: k1LanguageUnit05,
  },
  {
    level: "K1",
    courseType: "language",
    unitNumber: 6,
    path: unitPath("K1", "language", 6),
    label: "K1 Language Unit 6",
    renderer: "k-language",
    status: "active-prototype",
    unit: k1LanguageUnit06,
  },
  {
    level: "K1",
    courseType: "language",
    unitNumber: 7,
    path: unitPath("K1", "language", 7),
    label: "K1 Language Unit 7",
    renderer: "k-language",
    status: "active-prototype",
    unit: k1LanguageUnit07,
  },
  {
    level: "K1",
    courseType: "language",
    unitNumber: 8,
    path: unitPath("K1", "language", 8),
    label: "K1 Language Unit 8",
    renderer: "k-language",
    status: "active-prototype",
    unit: k1LanguageUnit08,
  },
  {
    level: "K1",
    courseType: "language",
    unitNumber: 9,
    path: unitPath("K1", "language", 9),
    label: "K1 Language Unit 9",
    renderer: "k-language",
    status: "active-prototype",
    unit: k1LanguageUnit09,
  },
  {
    level: "K3",
    courseType: "language",
    unitNumber: 0,
    path: unitPath("K3", "language", 0),
    label: "K3 Language Unit Hello",
    renderer: "k-language",
    status: "active-prototype",
    unit: k3LanguageUnit00,
  },
  {
    level: "K3",
    courseType: "language",
    unitNumber: 1,
    path: unitPath("K3", "language", 1),
    label: "K3 Language Unit 1",
    renderer: "k-language",
    status: "active-prototype",
    unit: k3LanguageUnit01,
  },
  {
    level: "K3",
    courseType: "language",
    unitNumber: 2,
    path: unitPath("K3", "language", 2),
    label: "K3 Language Unit 2",
    renderer: "k-language",
    status: "active-prototype",
    unit: k3LanguageUnit02,
  },
  {
    level: "K3",
    courseType: "language",
    unitNumber: 3,
    path: unitPath("K3", "language", 3),
    label: "K3 Language Unit 3",
    renderer: "k-language",
    status: "active-prototype",
    unit: k3LanguageUnit03,
  },
  {
    level: "K3",
    courseType: "language",
    unitNumber: 4,
    path: unitPath("K3", "language", 4),
    label: "K3 Language Unit 4",
    renderer: "k-language",
    status: "active-prototype",
    unit: k3LanguageUnit04,
  },
  {
    level: "K3",
    courseType: "language",
    unitNumber: 5,
    path: unitPath("K3", "language", 5),
    label: "K3 Language Unit 5",
    renderer: "k-language",
    status: "active-prototype",
    unit: k3LanguageUnit05,
  },
  {
    level: "K3",
    courseType: "language",
    unitNumber: 6,
    path: unitPath("K3", "language", 6),
    label: "K3 Language Unit 6",
    renderer: "k-language",
    status: "active-prototype",
    unit: k3LanguageUnit06,
  },
  {
    level: "K3",
    courseType: "language",
    unitNumber: 7,
    path: unitPath("K3", "language", 7),
    label: "K3 Language Unit 7",
    renderer: "k-language",
    status: "active-prototype",
    unit: k3LanguageUnit07,
  },
  {
    level: "K3",
    courseType: "language",
    unitNumber: 8,
    path: unitPath("K3", "language", 8),
    label: "K3 Language Unit 8",
    renderer: "k-language",
    status: "active-prototype",
    unit: k3LanguageUnit08,
  },
  {
    level: "K3",
    courseType: "language",
    unitNumber: 9,
    path: unitPath("K3", "language", 9),
    label: "K3 Language Unit 9",
    renderer: "k-language",
    status: "active-prototype",
    unit: k3LanguageUnit09,
  },
  {
    level: "K2",
    courseType: "language",
    unitNumber: 0,
    path: unitPath("K2", "language", 0),
    label: "K2 Language Unit Hello",
    renderer: "k-language",
    status: "active-prototype",
    unit: k2LanguageUnit00,
  },
  {
    level: "K2",
    courseType: "language",
    unitNumber: 1,
    path: unitPath("K2", "language", 1),
    label: "K2 Language Unit 1",
    renderer: "k-language",
    status: "active-prototype",
    unit: k2LanguageUnit01,
  },
  {
    level: "K2",
    courseType: "language",
    unitNumber: 2,
    path: unitPath("K2", "language", 2),
    label: "K2 Language Unit 2",
    renderer: "k-language",
    status: "active-prototype",
    unit: k2LanguageUnit02,
  },
  {
    level: "K2",
    courseType: "language",
    unitNumber: 3,
    path: unitPath("K2", "language", 3),
    label: "K2 Language Unit 3",
    renderer: "k-language",
    status: "active-prototype",
    unit: k2LanguageUnit03,
  },
  {
    level: "K2",
    courseType: "language",
    unitNumber: 4,
    path: unitPath("K2", "language", 4),
    label: "K2 Language Unit 4",
    renderer: "k-language",
    status: "active-prototype",
    unit: k2LanguageUnit04,
  },
  {
    level: "K2",
    courseType: "language",
    unitNumber: 5,
    path: unitPath("K2", "language", 5),
    label: "K2 Language Unit 5",
    renderer: "k-language",
    status: "active-prototype",
    unit: k2LanguageUnit05,
  },
  {
    level: "K2",
    courseType: "language",
    unitNumber: 6,
    path: unitPath("K2", "language", 6),
    label: "K2 Language Unit 6",
    renderer: "k-language",
    status: "active-prototype",
    unit: k2LanguageUnit06,
  },
  {
    level: "K2",
    courseType: "language",
    unitNumber: 7,
    path: unitPath("K2", "language", 7),
    label: "K2 Language Unit 7",
    renderer: "k-language",
    status: "active-prototype",
    unit: k2LanguageUnit07,
  },
  {
    level: "K2",
    courseType: "language",
    unitNumber: 8,
    path: unitPath("K2", "language", 8),
    label: "K2 Language Unit 8",
    renderer: "k-language",
    status: "active-prototype",
    unit: k2LanguageUnit08,
  },
  {
    level: "K2",
    courseType: "language",
    unitNumber: 9,
    path: unitPath("K2", "language", 9),
    label: "K2 Language Unit 9",
    renderer: "k-language",
    status: "active-prototype",
    unit: k2LanguageUnit09,
  },
];

export function getDynamicUnitEntry(
  level: string,
  courseType: string,
  unitNumber: number,
) {
  return dynamicUnitManifest.find(
    (entry) =>
      entry.level.toLowerCase() === level.toLowerCase() &&
      entry.courseType === normalizeManifestCourseType(courseType) &&
      entry.unitNumber === unitNumber,
  );
}

export function getDynamicUnitPath(
  level: string,
  courseType: string,
  unitNumber: number,
) {
  if (
    ["k1", "k2", "k3"].includes(level.toLowerCase()) &&
    courseType === "non-language" &&
    unitNumber >= 1 &&
    unitNumber <= 9
  ) {
    return `/curriculum/${level.toLowerCase()}/non-language/unit-${String(unitNumber).padStart(2, "0")}`;
  }
  return getDynamicUnitEntry(level, courseType, unitNumber)?.path ?? null;
}

function normalizeManifestCourseType(courseType: string): CourseType {
  return courseType.toLowerCase() === "language" ? "language" : "non-language";
}
