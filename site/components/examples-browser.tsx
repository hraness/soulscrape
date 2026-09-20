"use client";

import { useId, useState } from "react";
import { ExampleIndexCard, type ExampleIndex } from "./example-index-card";

const normalize = (text: string) => text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase();

export function filterExamples(examples: readonly ExampleIndex[], query: string, category: string) {
  const needle = normalize(query.trim());
  return examples.filter(example => (category === "all" || example.category === category)
    && normalize(`${example.name} ${example.note} ${example.category}`).includes(needle));
}

export function ExamplesBrowser({ examples }: { examples: readonly ExampleIndex[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const searchId = useId();
  const categoryId = useId();
  const categories = [...new Set(examples.map(example => example.category))].sort();
  const visible = filterExamples(examples, query, category);
  return (
    <section aria-label="Browse examples">
      <div className="examples-controls">
        <div className="examples-search">
          <label htmlFor={searchId}>Find someone interesting</label>
          <input id={searchId} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search names, work, or ideas…" />
        </div>
        <div>
          <label htmlFor={categoryId}>Explore a field</label>
          <select id={categoryId} value={category} onChange={event => setCategory(event.target.value)}>
            <option value="all">All fields</option>
            {categories.map(value => <option key={value} value={value}>{value}</option>)}
          </select>
        </div>
      </div>
      <p className="examples-count" role="status">{visible.length} {visible.length === 1 ? "example" : "examples"}{visible.length !== examples.length ? ` of ${examples.length}` : " to explore"}</p>
      <ul className="example-index-grid examples-directory-grid">
        {visible.map(example => <li key={example.handle}><ExampleIndexCard index={example} number={examples.indexOf(example) + 1} /></li>)}
      </ul>
      {visible.length === 0 && (
        <div className="examples-empty">
          <p>No examples match that search. Try another name or idea.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("all"); }}>Clear filters</button>
        </div>
      )}
    </section>
  );
}
