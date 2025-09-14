// app/page.tsx
"use client";

import { useState } from "react";
import { callPerplexityAPI } from "../../server/ai";
import Link from "next/link";
import BottomNavigation from "@/components/bottomnav";


export default function Perplex() {
    const [response, setResponse] = useState("");
    const testAPI = async () => {
        setResponse("Loading...");
        try {
            const data = await callPerplexityAPI();
            setResponse(data.choices[0].message.content);
        } catch (error: any) {
            setResponse(`Error: ${error.message}`);
        }
    };
    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
            <h1 style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}>Perplexity API Test</h1>
            <button
                onClick={testAPI}
                disabled={response === "Loading..."}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: response === "Loading..." ? "#ccc" : "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: response === "Loading..." ? "not-allowed" : "pointer",
                }}
            >
                {response === "Loading..." ? "Loading..." : "Get Answer"}
            </button>
            <div style={{ marginTop: "20px", fontSize: "18px", color: "#333", fontWeight: "normal" }}>
                {response ? <span>{response}</span> : <span style={{ color: "#666" }}>Click the button to get an answer.</span>}
            </div>
            <Link href="/itineraries">
                <button className="bg-pink-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Above
                </button></Link>
            <BottomNavigation />
        </div>


    );
}