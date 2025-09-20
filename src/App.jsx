// src/App.jsx
import React, { useState } from "react";
import DomainInput from "./components/DomainInput";
import SPFRecordCard from "./components/SPFRecordCard"; 

export default function App() {
  const [loading, setLoading] = useState(false);
  const [spfRecords, setSpfRecords] = useState([]);
  const [error, setError] = useState(null);

  const fetchSPF = async (domain) => {
    if (!domain) return;
    setLoading(true);
    setError(null);
    setSpfRecords([]);

    try {
      // Using Google's DNS-over-HTTPS API
      const res = await fetch(`https://dns.google/resolve?name=${domain}&type=TXT`);
      const data = await res.json();

      if (!data.Answer) {
        setError("No DNS TXT records found for this domain.");
        setLoading(false);
        return;
      }

      // Extract SPF records (start with v=spf1)
      const spf = data.Answer
        .map((a) => a.data.replace(/"/g, ""))
        .filter((txt) => txt.startsWith("v=spf1"));

      if (spf.length > 0) {
        setSpfRecords(spf);
      } else {
        setError("No SPF record found.");
      }
    } catch {
      setError("Error fetching SPF record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">SPF Checker</h1>

      <DomainInput onSearch={fetchSPF} loading={loading} />

      <div className="mt-6 w-full max-w-lg">
        {loading && <p className="text-gray-500">Checking...</p>}
        {error && (
          <div className="p-4 mb-3 rounded-lg shadow bg-red-100 text-red-700">
            {error}
          </div>
        )}
        {spfRecords.map((record, idx) => (
          <SPFRecordCard key={idx} record={record} />
        ))}
      </div>
    </div>
  );
}
