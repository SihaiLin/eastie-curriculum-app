import type { LanguageCode } from "../../curriculum/types";

interface LanguageToggleProps {
  language: LanguageCode;
  onChange: (language: LanguageCode) => void;
}

export function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  return (
    <div className="language-toggle" aria-label="Language switcher">
      <button className={language === "en" ? "active" : ""} type="button" onClick={() => onChange("en")}>
        EN
      </button>
      <button className={language === "zh" ? "active" : ""} type="button" onClick={() => onChange("zh")}>
        中文
      </button>
    </div>
  );
}
