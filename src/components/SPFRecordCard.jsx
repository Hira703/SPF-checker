// src/components/SPFRecordCard.jsx
import React, { useState } from "react";

export default function SPFRecordCard({ record }) {
  const [expanded, setExpanded] = useState(false);
  const [includedDomains, setIncludedDomains] = useState([]);
  const [loading, setLoading] = useState(false);

  // Parse 'include:' directives
  const includes = [...record.matchAll(/include:([^\s]+)/g)].map(m => m[1]);
  const redirects = [...record.matchAll(/redirect=([^\s]+)/g)].map(m => m[1]);

  const handleExpand = async () => {
    if (expanded) return setExpanded(false);

    if (includes.length === 0) return;
    setLoading(true);

    const results = [];
    for (let domain of includes) {
      try {
        const res = await fetch(`https://dns.google/resolve?name=${domain}&type=TXT`);
        const data = await res.json();
        if (data.Answer) {
          const spf = data.Answer.map(a => a.data.replace(/"/g, "")).filter(txt => txt.startsWith("v=spf1"));
          results.push({ domain, spf });
        } else {
          results.push({ domain, spf: ["No SPF found"] });
        }
      } catch {
        results.push({ domain, spf: ["Error fetching SPF"] });
      }
    }
    setIncludedDomains(results);
    setLoading(false);
    setExpanded(true);
  };

  return (
    <div className="p-4 mb-3 rounded-lg shadow bg-green-100 text-green-700">
      <p className="break-words">
        {record.split(" ").map((word, idx) => {
          if (word.startsWith("include:")) return <span key={idx} className="text-blue-600 font-semibold">{word} </span>;
          if (word.startsWith("redirect=")) return <span key={idx} className="text-purple-600 font-semibold">{word} </span>;
          return word + " ";
        })}
      </p>

      {includes.length > 0 && (
        <button
          onClick={handleExpand}
          className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {expanded ? "Hide Included Domains" : "Show Included Domains"}
        </button>
      )}

      {loading && <p className="mt-2 text-gray-500">Loading included domains...</p>}

      {expanded && includedDomains.map((d, i) => (
        <div key={i} className="mt-2 p-2 bg-green-200 rounded">
          <p className="font-semibold">{d.domain}</p>
          {d.spf.map((r, idx) => (
            <p key={idx} className="text-sm break-words">{r}</p>
          ))}
        </div>
      ))}

      {redirects.length > 0 && (
        <div className="mt-2 p-2 bg-purple-200 rounded">
          <p className="font-semibold">Redirects:</p>
          {redirects.map((r, idx) => <p key={idx} className="text-sm">{r}</p>)}
        </div>
      )}
    </div>
  );
}
