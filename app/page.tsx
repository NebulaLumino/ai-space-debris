"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const APP_NAME = "Space Debris Tracker";
const TAGLINE = "AI-powered collision risk assessment & avoidance maneuver recommendations";
const ACCENT = "hsl(45, 70%, 55%)";
const ACCENT_MID = "hsl(45, 60%, 45%)";

export default function SpaceDebrisPage() {
  const [altitude, setAltitude] = useState("");
  const [missionLifetime, setMissionLifetime] = useState("");
  const [inclination, setInclination] = useState("");
  const [satelliteClass, setSatelliteClass] = useState("");
  const [maneuverability, setManeuverability] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!altitude || !missionLifetime) { setOutput("Please fill in altitude and mission lifetime."); return; }
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are an expert space situational awareness analyst and orbital debris scientist. Generate a comprehensive space debris collision risk assessment and mitigation plan for the following satellite mission.

**Satellite Parameters:**
- Orbital Altitude (km): ${altitude}
- Mission Lifetime (years): ${missionLifetime}
- Orbital Inclination (deg): ${inclination || "Not specified"}
- Satellite Class: ${satelliteClass || "Not specified"} (e.g., LEO smallsat, GEO communications, MEO navigation)
- Maneuver Capability: ${maneuverability || "Unknown"} (e.g., fully maneuverable, limited maneuvering, non-maneuverable)

Please provide:

## 🛰️ Orbital Environment Assessment
Analyze the debris environment at this altitude:
- Catalogued object density (objects >10cm by altitude band)
- Debris flux estimate (encounters per year above certain miss distance thresholds)
- Spatial density of debris by object type (rocket bodies, defunct satellites, fragmentation debris)
- Altitude-specific considerations (LEO hotspot regions like 800-850 km for Sun-synchronous, GEO arc)
- Natural debris sources (micrometeoroid flux)

## 📊 Collision Probability Analysis
Calculate collision probability over the mission lifetime:
- Average close approach frequency (CAC, conjunction events per year)
- Probability of collision with catalogued objects (>10 cm)
- Probability of collision with uncatalogued debris (>1 cm, lethal to satellites)
- Sensitivity to altitude and inclination
- Comparison to reference missions (ISS, Starlink, Sentinel satellites)

## ⚠️ Conjunction Warning Assessment
Assess conjunction risk specifically:
- JSC SDA conjunction database insights for this orbital region
- Typical TCA (Time of Closest Approach) uncertainty windows
- PC (Probability of Collision) threshold discussions
- Notable historical conjunctions in similar orbits

## 🛡️ Avoidance Maneuver Recommendations
Provide practical recommendations:
- Pre-positioning strategy for maneuverable satellites
-_delta-V budget for avoidance maneuvers (estimate per maneuver)
- Collision avoidance maneuver threshold (when to maneuver vs. monitor)
- Ground-track maintenance cost vs. collision avoidance cost trade-off
- Post-maneuver disposal planning

## 🗑️ Debris Mitigation Compliance
Assess compliance with debris mitigation guidelines:
- NASA ODMSP (Orbital Debris Mitigation Standard Practices)
- ESA debris guidelines
- UN Committee on Peaceful Uses of Outer Space (COPUOS) guidelines
- Post-mission disposal requirements (25-year rule for LEO)
- Passivation requirements

## 🛰️ Long-Term Sustainability
Discuss orbital carrying capacity and Kessler Syndrome risk for this altitude and inclination region.

## 📋 Summary`,
        }),
      });
      const data = await res.json();
      setOutput(data.result || data.error || "No response received.");
    } catch { setOutput("Error generating debris assessment. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #111 0%, #0a0a0a 50%, #111 100%)", color: "#e5e7eb", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <header style={{ borderBottom: `1px solid ${ACCENT}33`, padding: "1.5rem 2rem", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: ACCENT, boxShadow: `0 0 12px ${ACCENT}` }} />
            <span style={{ color: ACCENT, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>AI x Astronomy</span>
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.5rem", color: "#f9fafb", letterSpacing: "-0.02em" }}>{APP_NAME}</h1>
          <p style={{ color: "#9ca3af", fontSize: "0.9rem", marginTop: "0.25rem" }}>{TAGLINE}</p>
        </div>
      </header>
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem" }}>
        <div style={{ height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${ACCENT_MID}, ${ACCENT}, ${ACCENT_MID})`, marginBottom: "2rem" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.75rem" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#f3f4f6", marginBottom: "1.25rem" }}>Satellite Parameters</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={labelStyle}>Orbital Altitude (km) *</label>
                    <input type="text" value={altitude} onChange={(e) => setAltitude(e.target.value)} placeholder="e.g., 550 (ISS), 1200 (Starlink), 35786 (GEO)" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Mission Lifetime (years) *</label>
                    <input type="text" value={missionLifetime} onChange={(e) => setMissionLifetime(e.target.value)} placeholder="e.g., 5, 15, 30" style={inputStyle} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={labelStyle}>Inclination (deg)</label>
                    <input type="text" value={inclination} onChange={(e) => setInclination(e.target.value)} placeholder="e.g., 51.6 (ISS), 0 (GEO)" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Satellite Class</label>
                    <input type="text" value={satelliteClass} onChange={(e) => setSatelliteClass(e.target.value)} placeholder="e.g., LEO smallsat, GEO comsat" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Maneuver Capability</label>
                  <select value={maneuverability} onChange={(e) => setManeuverability(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="">Select...</option>
                    <option value="fully">Fully Maneuverable</option>
                    <option value="limited">Limited Maneuvering</option>
                    <option value="non-maneuverable">Non-Maneuverable</option>
                  </select>
                </div>
                <button onClick={handleGenerate} disabled={loading} style={{ ...buttonStyle, background: loading ? "rgba(180,140,0,0.3)" : ACCENT, cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : `0 0 20px ${ACCENT}55` }}>
                  {loading ? "Analyzing..." : "Assess Collision Risk"}
                </button>
              </div>
            </div>
            <div style={{ marginTop: "1rem", background: "rgba(180,140,0,0.05)", border: `1px solid ${ACCENT}22`, borderRadius: 12, padding: "1rem 1.25rem" }}>
              <p style={{ fontSize: "0.78rem", color: "#9ca3af", lineHeight: 1.6 }}>
                <span style={{ color: ACCENT, fontWeight: 600 }}>ISS Note:</span> The ISS performs collision avoidance maneuvers roughly 1-2 times per year on average, avoiding objects with Pc greater than 10-4. It has performed over 30 debris avoidance maneuvers since 1999.
              </p>
            </div>
          </div>
          <div>
            {output ? (
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.75rem", minHeight: 400 }}>
                <h2 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#d1d5db", marginBottom: "1.25rem" }}>Debris Risk Assessment</h2>
                <div style={{ color: "#d1d5db", fontSize: "0.875rem", lineHeight: 1.75, overflowY: "auto", maxHeight: "calc(100vh - 380px)" }}>
                  <ReactMarkdown>{output}</ReactMarkdown>
                </div>
              </div>
            ) : (
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "1.75rem", minHeight: 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", border: `2px solid ${ACCENT}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>☄️</div>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", textAlign: "center" }}>Enter orbital altitude and lifetime<br /><strong style={{ color: "#9ca3af" }}>for collision risk assessment</strong></p>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer style={{ borderTop: `1px solid ${ACCENT}22`, padding: "1.25rem 2rem", textAlign: "center", color: "#4b5563", fontSize: "0.75rem", marginTop: "2rem" }}>AI x Astronomy · Cycle 67 · Powered by DeepSeek · For educational and research purposes</footer>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#9ca3af", marginBottom: "0.35rem", letterSpacing: "0.04em", textTransform: "uppercase" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "0.6rem 0.85rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#f3f4f6", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" };
const buttonStyle: React.CSSProperties = { width: "100%", padding: "0.75rem 1rem", borderRadius: 10, border: "none", color: "#fff", fontSize: "0.875rem", fontWeight: 700, transition: "all 0.2s", marginTop: "0.5rem" };
