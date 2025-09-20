// src/components/DomainInput.jsx
import React, { useState } from "react";

export default function DomainInput({ onSearch, loading }) {
  const [domain, setDomain] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (domain.trim()) {
      onSearch(domain.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-2 w-full max-w-lg"
    >
      <input
        type="text"
        placeholder="Enter domain (e.g., example.com)"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Checking..." : "Check"}
      </button>
    </form>
  );
}
