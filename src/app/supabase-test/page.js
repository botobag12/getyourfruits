"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function SupabaseTest() {
  const [status, setStatus] = useState("Not tested yet");

  async function testConnection() {
    setStatus("Testing...");

    try {
      const { data, error } = await supabase
        .from("articles")
        .select("id")
        .limit(1);

      if (error) {
        console.log("Supabase response:", error);

        setStatus(
          "Supabase is reachable, but the articles table does not exist yet."
        );

        return;
      }

      console.log("Supabase data:", data);
      setStatus("✅ Supabase connection is successful!");
    } catch (error) {
      console.error(error);
      setStatus("❌ Connection failed.");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "50px",
        background: "#fffdf7",
        color: "#173f2a",
      }}
    >
      <h1>Supabase Connection Test</h1>

      <p>{status}</p>

      <button
        onClick={testConnection}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          background: "#245b3b",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Test Connection
      </button>
    </main>
  );
}