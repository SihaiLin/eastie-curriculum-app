import { useCallback, useEffect, useRef, useState } from "react";
import { searchYleWordBank, createExtension } from "../../curriculum/extensions/k2ExtensionClient";
import type { LanguageExtensionContext } from "../../curriculum/extensions/k2ExtensionClient";
import type { YleWordBankItem } from "../../curriculum/extensions/k2ExtensionTypes";
import type { ExtensionEntry } from "../../curriculum/extensions/k2ExtensionTypes";

interface YleWordBankDialogProps {
  lessonId: string;
  extensionContext: LanguageExtensionContext;
  currentVocabulary: ExtensionEntry[];
  currentUserId: string;
  onWordAdded: (entry: ExtensionEntry) => void;
  onClose: () => void;
}

const levelLabels: Record<string, string> = {
  S: "Starters",
  M: "Movers",
  F: "Flyers",
};

export function YleWordBankDialog({
  lessonId,
  extensionContext,
  currentVocabulary,
  currentUserId,
  onWordAdded,
  onClose,
}: YleWordBankDialogProps) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState<YleWordBankItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const addedWords = currentVocabulary
    .filter((e) => e.userId === currentUserId && e.source === "yle_word_bank")
    .map((e) => e.content.toLowerCase());

  const isAdded = (word: YleWordBankItem) => {
    const target = (word.display_item || word.item || "").toLowerCase();
    return addedWords.includes(target);
  };

  const doSearch = useCallback(async (q: string, lvl: string, cat: string) => {
    setLoading(true);
    try {
      const data = await searchYleWordBank(q || undefined, lvl || undefined, cat || undefined);
      setResults(data.records);

      const uniqueLevels = [...new Set(data.records.map((r) => r.yle_level).filter(Boolean))].sort(
        (a, b) => ["S", "M", "F"].indexOf(a) - ["S", "M", "F"].indexOf(b),
      );
      const uniqueCategories = [...new Set(data.records.map((r) => r.primary_category).filter(Boolean))].sort();
      if (!lvl && !cat) {
        setLevels(uniqueLevels);
        setCategories(uniqueCategories);
      }
    } catch {
      setResults([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    doSearch("", "", "");
  }, [doSearch]);

  const handleSearchChange = (value: string) => {
    setQuery(value);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => doSearch(value, level, category), 200);
  };

  const handleLevelChange = (value: string) => {
    setLevel(value);
    doSearch(query, value, category);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    doSearch(query, level, value);
  };

  const handleAdd = async (word: YleWordBankItem) => {
    const target = word.display_item || word.item;
    if (!target || isAdded(word)) return;

    setAddingId(word.id);
    try {
      const entry = await createExtension(extensionContext, lessonId, "vocabulary", target, "yle_word_bank");
      onWordAdded(entry);
    } catch {
      // silently fail
    }
    setAddingId(null);
  };

  return (
    <div className="auth-dialog-backdrop" onClick={onClose}>
      <div className="k2-dialog yle-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-body">
          <h2>YLE Word Bank</h2>
          <p className="muted">
            Search the YLE gap bank: words that fill gaps between the current Power Up language and YLE word lists.
          </p>
          <div className="yle-bank-controls">
            <input
              className="extension-input"
              type="search"
              placeholder="Search words"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <select
              className="yle-select"
              aria-label="YLE level filter"
              value={level}
              onChange={(e) => handleLevelChange(e.target.value)}
            >
              <option value="">All levels</option>
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>{levelLabels[lvl] || lvl}</option>
              ))}
            </select>
            <select
              className="yle-select"
              aria-label="YLE category filter"
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="">All categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="yle-result-list">
            {loading ? (
              <div className="yle-result-empty">Loading...</div>
            ) : results.length === 0 ? (
              <div className="yle-result-empty">No matching words found.</div>
            ) : (
              results.map((row) => {
                const added = isAdded(row);
                return (
                  <div className={`yle-result-item${added ? " yle-added-row" : ""}`} key={row.id}>
                    <span className="yle-result-main">
                      <strong>{row.display_item}</strong>
                      <span className="yle-result-meta">
                        {levelLabels[row.yle_level] || row.yle_level} · {row.primary_category}
                      </span>
                    </span>
                    <button
                      className={`yle-add-button${added ? " yle-added" : ""}`}
                      type="button"
                      onClick={() => handleAdd(row)}
                      disabled={added || addingId === row.id}
                    >
                      {addingId === row.id ? "..." : added ? "Added" : "Add"}
                    </button>
                  </div>
                );
              })
            )}
          </div>
          <div className="dialog-actions">
            <button className="dialog-button" type="button" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
