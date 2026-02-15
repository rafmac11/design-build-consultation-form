import { useState, useEffect } from "react";

// ─── ENV-DRIVEN CONFIG ──────────────────────────────────────────────────────
// Set these as Railway environment variables (prefixed VITE_ so Vite bundles them)
const CONFIG = {
  FORM_ID: import.meta.env.VITE_FORM_ID || "your-form-uuid-here",
  WEBHOOK_URL: import.meta.env.VITE_WEBHOOK_URL || "https://your-webhook-url",
  API_KEY: import.meta.env.VITE_API_KEY || "",
};
// ─────────────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "landscape-design",
    label: "Landscape\nDesign",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 58V34" stroke="currentColor" strokeWidth="2" />
        <path d="M32 34c-7-9-20-11-20 3s14 6 20-3z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M32 34c7-9 20-11 20 3s-14 6-20-3z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M32 25c-4-11-15-15-11-4s11 9 11 4z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M32 25c4-11 15-15 11-4s-11 9-11 4z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 58h16" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "outdoor-patios",
    label: "Outdoor\nPatios",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="28" width="48" height="26" rx="2" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
        <line x1="8" y1="37" x2="56" y2="37" stroke="currentColor" strokeWidth="1.5" />
        <line x1="8" y1="46" x2="56" y2="46" stroke="currentColor" strokeWidth="1.5" />
        <line x1="24" y1="28" x2="24" y2="54" stroke="currentColor" strokeWidth="1.5" />
        <line x1="40" y1="28" x2="40" y2="54" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 28V15a2 2 0 012-2h28a2 2 0 012 2v13" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 15h32" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: "pool-construction",
    label: "Pool\nConstruction",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="32" cy="38" rx="24" ry="13" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 38v5c0 7.2 10.7 13 24 13s24-5.8 24-13v-5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 34c4 3 9-2 14 1s9-2 14 1s9-3 14 0" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <circle cx="46" cy="16" r="5" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <line x1="46" y1="21" x2="46" y2="30" stroke="currentColor" strokeWidth="1.5" />
        <line x1="40" y1="12" x2="52" y2="12" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "retaining-walls",
    label: "Retaining\nWalls",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="42" width="22" height="14" rx="1.5" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1.5" />
        <rect x="28" y="42" width="22" height="14" rx="1.5" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.5" />
        <rect x="12" y="28" width="20" height="14" rx="1.5" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.5" />
        <rect x="32" y="28" width="20" height="14" rx="1.5" fill="currentColor" opacity="0.16" stroke="currentColor" strokeWidth="1.5" />
        <rect x="18" y="14" width="18" height="14" rx="1.5" fill="currentColor" opacity="0.16" stroke="currentColor" strokeWidth="1.5" />
        <rect x="36" y="14" width="18" height="14" rx="1.5" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 56h52" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "outdoor-living",
    label: "Outdoor\nLiving",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 54V24l22-13 22 13v30" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 54h52" stroke="currentColor" strokeWidth="2" />
        <rect x="23" y="36" width="18" height="18" rx="1.5" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <line x1="32" y1="36" x2="32" y2="54" stroke="currentColor" strokeWidth="1.5" />
        <line x1="23" y1="45" x2="41" y2="45" stroke="currentColor" strokeWidth="1.5" />
        <path d="M27 19a5 5 0 0110 0" stroke="currentColor" strokeWidth="2" />
        <line x1="32" y1="14" x2="32" y2="11" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "softscape-planting",
    label: "Softscape &\nPlanting",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 54V40" stroke="currentColor" strokeWidth="2" />
        <path d="M20 40c-9-2-16-11-9-18s16 2 9 18z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 40c9-2 16-11 9-18s-16 2-9 18z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M44 54V36" stroke="currentColor" strokeWidth="2" />
        <path d="M44 36c-7-1-12-9-7-14s12 1 7 14z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M44 36c7-1 12-9 7-14s-12 1-7 14z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M44 28c5-7 3-14-2-11s-3 9 2 11z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 54h48" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "landscape-lighting",
    label: "Landscape\nLighting",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="26" r="12" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="32" cy="26" r="6" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1" />
        <path d="M32 6v4" stroke="currentColor" strokeWidth="2" />
        <path d="M16 12l3 3" stroke="currentColor" strokeWidth="2" />
        <path d="M10 26h4" stroke="currentColor" strokeWidth="2" />
        <path d="M48 12l-3 3" stroke="currentColor" strokeWidth="2" />
        <path d="M50 26h4" stroke="currentColor" strokeWidth="2" />
        <path d="M25 38h14" stroke="currentColor" strokeWidth="2" />
        <path d="M27 43h10" stroke="currentColor" strokeWidth="1.5" />
        <line x1="32" y1="43" x2="32" y2="54" stroke="currentColor" strokeWidth="2" />
        <path d="M26 54h12" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "full-transformation",
    label: "Full Property\nTransformation",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="12" width="52" height="40" rx="4" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 22h52" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="17" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="20" cy="17" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="26" cy="17" r="2" fill="currentColor" opacity="0.4" />
        <path d="M16 44l9-12 7 7 10-15 10 20" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="32" r="4" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const STEPS = ["service", "zip", "name", "contact", "project", "submitting"];
const MN_ZIPS = /^(55|56)\d{3}$/;

function ProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
      <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #4a7a5a, #8ab89a)" }} />
    </div>
  );
}

function StepIndicator({ label, sublabel }) {
  return (
    <div className="text-center mb-10 animate-fadeUp">
      <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(168,197,160,0.7)", letterSpacing: "0.25em" }}>
        {sublabel}
      </p>
      <h2 className="text-2xl md:text-3xl font-light leading-snug" style={{ color: "#e8efe8", fontFamily: "'Cormorant Garamond', serif" }}>
        {label}
      </h2>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    service: "", zip: "", firstName: "", lastName: "",
    email: "", phone: "", projectDescription: "", timeline: "", budget: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const totalVisible = STEPS.filter((s) => s !== "submitting").length;

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => { if (step > 0) setStep((s) => s - 1); };

  const update = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const selectService = (id) => { update("service", id); setTimeout(goNext, 350); };

  // Auto-advance zip
  useEffect(() => {
    if (step === 1 && formData.zip.length === 5 && MN_ZIPS.test(formData.zip)) {
      const t = setTimeout(goNext, 600);
      return () => clearTimeout(t);
    }
  }, [formData.zip, step]);

  const validateStep = () => {
    const e = {};
    if (step === 1 && (!formData.zip || !MN_ZIPS.test(formData.zip))) e.zip = "Please enter a valid Minnesota zip code";
    if (step === 2) {
      if (!formData.firstName.trim()) e.firstName = "Required";
      if (!formData.lastName.trim()) e.lastName = "Required";
    }
    if (step === 3) {
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Valid email required";
      if (!formData.phone.trim() || formData.phone.replace(/\D/g, "").length < 10) e.phone = "Valid phone required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => { if (validateStep()) goNext(); };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    goNext();

    const serviceLabelMap = {};
    SERVICES.forEach((s) => { serviceLabelMap[s.id] = s.label.replace("\n", " "); });

    const payload = {
      form_id: CONFIG.FORM_ID,
      source: "website",
      lead: {
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        zip_code: formData.zip,
      },
      meta: {
        service_interest: serviceLabelMap[formData.service] || formData.service,
        project_description: formData.projectDescription || null,
        timeline: formData.timeline || null,
        budget: formData.budget || null,
        submitted_at: new Date().toISOString(),
        page_url: window.location.href,
      },
    };

    try {
      const headers = { "Content-Type": "application/json" };
      if (CONFIG.API_KEY) headers["Authorization"] = `Bearer ${CONFIG.API_KEY}`;

      const res = await fetch(CONFIG.WEBHOOK_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      console.error("Submission error:", err);
    }
    setSubmitted(true);
  };

  const formatPhone = (val) => {
    const d = val.replace(/\D/g, "").slice(0, 10);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  };

  const inputBase = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "15px 18px",
    color: "#e8efe8",
    fontSize: "16px",
    outline: "none",
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
    transition: "border-color 0.3s, box-shadow 0.3s, background 0.3s",
  };

  const btnPrimary = {
    background: "linear-gradient(135deg, #3d6b4f 0%, #2d5240 100%)",
    color: "#d4e4d4",
    border: "1px solid rgba(90,138,106,0.3)",
    borderRadius: "10px",
    padding: "16px 44px",
    fontSize: "13px",
    fontWeight: "500",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
  };

  const renderStep = () => {
    if (submitted) {
      return (
        <div key="done" className="text-center py-10 animate-fadeUp">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ background: "rgba(90,138,106,0.15)", border: "2px solid rgba(90,138,106,0.5)", boxShadow: "0 0 40px rgba(90,138,106,0.15)" }}>
            <svg className="w-10 h-10" fill="none" stroke="#6aaa7a" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl mb-3" style={{ color: "#e8efe8", fontFamily: "'Cormorant Garamond', serif" }}>
            Consultation Requested
          </h2>
          <p className="text-base mb-2" style={{ color: "#8aab8a" }}>
            Thank you, {formData.firstName}. We've received your request.
          </p>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            Our design team will reach out within 24 hours to schedule<br />your complimentary consultation.
          </p>
        </div>
      );
    }

    switch (STEPS[step]) {
      case "service":
        return (
          <div key="svc" className="animate-fadeUp">
            <StepIndicator sublabel="Step 1 of 5" label="What can we help you with?" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {SERVICES.map((s, i) => {
                const active = formData.service === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => selectService(s.id)}
                    className="svc-card group relative flex flex-col items-center justify-center text-center rounded-2xl"
                    style={{
                      padding: "28px 10px 22px",
                      background: active
                        ? "linear-gradient(160deg, rgba(90,138,106,0.25), rgba(90,138,106,0.08))"
                        : "rgba(255,255,255,0.025)",
                      border: active
                        ? "1.5px solid rgba(90,138,106,0.55)"
                        : "1.5px solid rgba(255,255,255,0.06)",
                      cursor: "pointer",
                      animationDelay: `${i * 50}ms`,
                      boxShadow: active
                        ? "0 0 30px rgba(90,138,106,0.15), inset 0 1px 0 rgba(255,255,255,0.06)"
                        : "inset 0 1px 0 rgba(255,255,255,0.02)",
                    }}
                  >
                    <div
                      className="icon-box relative mb-4 flex items-center justify-center"
                      style={{
                        width: "60px", height: "60px", borderRadius: "16px",
                        background: active ? "rgba(90,138,106,0.22)" : "rgba(255,255,255,0.04)",
                        border: active ? "1px solid rgba(138,187,138,0.35)" : "1px solid rgba(255,255,255,0.06)",
                        color: active ? "#b0dca8" : "rgba(200,220,200,0.5)",
                        boxShadow: active ? "0 0 24px rgba(90,138,106,0.2)" : "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div className="w-9 h-9">{s.icon}</div>
                    </div>
                    <span
                      className="svc-label font-medium whitespace-pre-line"
                      style={{
                        color: active ? "#e8f4e4" : "rgba(210,225,210,0.65)",
                        fontSize: "12.5px", letterSpacing: "0.03em", lineHeight: "1.45",
                        transition: "color 0.3s",
                      }}
                    >
                      {s.label}
                    </span>
                    {active && (
                      <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: "#5a8a6a", boxShadow: "0 2px 8px rgba(90,138,106,0.5)" }}>
                        <svg className="w-3 h-3" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case "zip":
        return (
          <div key="zip" className="max-w-sm mx-auto animate-fadeUp">
            <StepIndicator sublabel="Step 2 of 5" label="Where is your project located?" />
            <div className="relative">
              <input type="text" inputMode="numeric" maxLength={5} placeholder="ZIP Code"
                value={formData.zip} onChange={(e) => update("zip", e.target.value.replace(/\D/g, ""))} autoFocus
                className="form-input"
                style={{ ...inputBase, textAlign: "center", fontSize: "32px", letterSpacing: "0.35em", padding: "22px", fontWeight: "300" }}
              />
              {formData.zip.length === 5 && MN_ZIPS.test(formData.zip) && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-fadeUp" style={{ color: "#6aaa7a" }}>
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            {errors.zip && <p className="text-center mt-3 text-sm" style={{ color: "#cf7070" }}>{errors.zip}</p>}
            <p className="text-center mt-5 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              Serving the Twin Cities Metro &amp; greater Minnesota
            </p>
          </div>
        );

      case "name":
        return (
          <div key="name" className="max-w-md mx-auto animate-fadeUp">
            <StepIndicator sublabel="Step 3 of 5" label="Who should we prepare this for?" />
            <div className="space-y-5">
              <div>
                <label className="form-label">First Name *</label>
                <input type="text" placeholder="First name" value={formData.firstName}
                  onChange={(e) => update("firstName", e.target.value)} autoFocus className="form-input" style={inputBase} />
                {errors.firstName && <p className="mt-1.5 text-xs" style={{ color: "#cf7070" }}>{errors.firstName}</p>}
              </div>
              <div>
                <label className="form-label">Last Name *</label>
                <input type="text" placeholder="Last name" value={formData.lastName}
                  onChange={(e) => update("lastName", e.target.value)} className="form-input" style={inputBase} />
                {errors.lastName && <p className="mt-1.5 text-xs" style={{ color: "#cf7070" }}>{errors.lastName}</p>}
              </div>
            </div>
            <div className="mt-9 flex justify-center">
              <button onClick={handleContinue} style={btnPrimary} className="form-btn">Continue</button>
            </div>
          </div>
        );

      case "contact":
        return (
          <div key="contact" className="max-w-md mx-auto animate-fadeUp">
            <StepIndicator sublabel="Step 4 of 5" label="Best way to reach you?" />
            <div className="space-y-5">
              <div>
                <label className="form-label">Email Address *</label>
                <input type="email" placeholder="your@email.com" value={formData.email}
                  onChange={(e) => update("email", e.target.value)} autoFocus className="form-input" style={inputBase} />
                {errors.email && <p className="mt-1.5 text-xs" style={{ color: "#cf7070" }}>{errors.email}</p>}
              </div>
              <div>
                <label className="form-label">Phone Number *</label>
                <input type="tel" placeholder="(651) 555-0123" value={formData.phone}
                  onChange={(e) => update("phone", formatPhone(e.target.value))} className="form-input" style={inputBase} />
                {errors.phone && <p className="mt-1.5 text-xs" style={{ color: "#cf7070" }}>{errors.phone}</p>}
              </div>
            </div>
            <div className="mt-9 flex justify-center">
              <button onClick={handleContinue} style={btnPrimary} className="form-btn">Continue</button>
            </div>
          </div>
        );

      case "project":
        return (
          <div key="proj" className="max-w-md mx-auto animate-fadeUp">
            <StepIndicator sublabel="Step 5 of 5" label="Tell us about your vision" />
            <div className="space-y-5">
              <div>
                <label className="form-label">Project Description</label>
                <textarea placeholder="Describe your dream outdoor space..." value={formData.projectDescription}
                  onChange={(e) => update("projectDescription", e.target.value)} autoFocus rows={4}
                  className="form-input" style={{ ...inputBase, resize: "vertical", minHeight: "110px" }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Timeline</label>
                  <select value={formData.timeline} onChange={(e) => update("timeline", e.target.value)} className="form-input form-select" style={{ ...inputBase, cursor: "pointer" }}>
                    <option value="">Select...</option>
                    <option value="asap">As soon as possible</option>
                    <option value="1-3months">1–3 months</option>
                    <option value="3-6months">3–6 months</option>
                    <option value="6-12months">6–12 months</option>
                    <option value="planning">Just planning</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Budget Range</label>
                  <select value={formData.budget} onChange={(e) => update("budget", e.target.value)} className="form-input form-select" style={{ ...inputBase, cursor: "pointer" }}>
                    <option value="">Select...</option>
                    <option value="15-25k">$15k – $25k</option>
                    <option value="25-50k">$25k – $50k</option>
                    <option value="50-100k">$50k – $100k</option>
                    <option value="100k+">$100k+</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-9 flex justify-center">
              <button onClick={handleSubmit} style={{ ...btnPrimary, padding: "16px 48px" }} className="form-btn">
                Request Consultation
              </button>
            </div>
          </div>
        );

      case "submitting":
        return (
          <div key="loading" className="text-center py-16 animate-fadeUp">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full" style={{ border: "2px solid rgba(90,138,106,0.15)" }} />
              <div className="absolute inset-0 rounded-full animate-spin" style={{ border: "2px solid transparent", borderTopColor: "#5a8a6a" }} />
            </div>
            <p style={{ color: "#8aab8a", fontFamily: "'Cormorant Garamond', serif", fontSize: "20px" }}>
              Submitting your request...
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation: fadeUp 0.5s ease forwards; }

        .form-container input::placeholder,
        .form-container textarea::placeholder { color: rgba(255,255,255,0.2); }

        .form-input:focus {
          border-color: rgba(90,138,106,0.6) !important;
          box-shadow: 0 0 0 3px rgba(90,138,106,0.12) !important;
          background: rgba(255,255,255,0.06) !important;
        }

        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(168,197,160,0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
        }
        .form-select option { background: #1a2e22; color: #e8efe8; }

        .form-label {
          display: block; font-size: 11px; text-transform: uppercase;
          letter-spacing: 0.18em; margin-bottom: 8px;
          color: rgba(168,197,160,0.6); font-family: 'DM Sans', sans-serif;
        }

        .form-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08) !important;
        }
        .form-btn:active { transform: translateY(0); }

        .svc-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .svc-card:hover {
          background: rgba(255,255,255,0.055) !important;
          border-color: rgba(90,138,106,0.3) !important;
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04) !important;
        }
        .svc-card:hover .icon-box {
          border-color: rgba(138,187,138,0.3) !important;
          background: rgba(90,138,106,0.12) !important;
          color: rgba(176,220,168,0.85) !important;
          box-shadow: 0 0 16px rgba(90,138,106,0.1);
        }
        .svc-card:hover .svc-label { color: rgba(232,239,232,0.85) !important; }
        .svc-card:active { transform: translateY(0); }

        .back-btn {
          color: rgba(255,255,255,0.3); cursor: pointer; background: none;
          border: none; font-size: 12px; letter-spacing: 0.12em;
          text-transform: uppercase; font-family: 'DM Sans', sans-serif;
          display: flex; align-items: center; gap: 5px; transition: color 0.3s;
        }
        .back-btn:hover { color: rgba(255,255,255,0.65); }
      `}</style>

      <div className="form-container min-h-screen flex items-center justify-center p-4"
        style={{ background: "linear-gradient(165deg, #0e1c14 0%, #142419 30%, #182d20 60%, #0e1c14 100%)", fontFamily: "'DM Sans', sans-serif" }}>

        {/* Ambient glow */}
        <div className="fixed inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 25% 15%, rgba(90,138,106,0.05) 0%, transparent 55%), radial-gradient(ellipse at 75% 85%, rgba(90,138,106,0.03) 0%, transparent 55%)",
        }} />

        <div className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden" style={{
          background: "rgba(18,34,24,0.7)",
          border: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 50px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02) inset",
        }}>

          {/* Header */}
          <div className="px-8 pt-8 pb-3">
            <div className="flex items-center justify-between mb-5">
              <p style={{ color: "#b8ccb8", fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: "500", letterSpacing: "0.1em" }}>
                DESIGN BUILD.
              </p>
              {step > 0 && step < STEPS.length - 1 && !submitted && (
                <button className="back-btn" onClick={goBack}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  Back
                </button>
              )}
            </div>
            {!submitted && step < STEPS.length - 1 && <ProgressBar current={step} total={totalVisible} />}
          </div>

          {/* Content */}
          <div className="px-8 py-8">{renderStep()}</div>

          {/* Footer */}
          {!submitted && STEPS[step] !== "submitting" && (
            <div className="px-8 pb-7">
              <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>
                Your information is confidential and will only be used to prepare your consultation.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
