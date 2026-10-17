export type DesignSystemId =
  | "trust_will"
  | "vanilla"
  | "farewill"
  | "halachic"
  | "ncf_christian"
  | "british_chancery"
  | "freewill"
  | "haute_arabesque"
  | "swiss_banking"
  | "apple_spatial";

export interface DesignSystemSpec {
  id: DesignSystemId;
  name: string;
  nameUr: string;
  category: "Legal-Tech SaaS" | "Private Wealth" | "Faith-Based Halacha" | "Faith-Based Christian" | "Judicial / Chancery" | "Architectural Luxury" | "Fintech / Banking" | "Spatial Minimalist";
  inspiration: string;
  tagline: string;
  description: string;
  fontHeading: string;
  fontBody: string;
  palette: {
    bg: string;
    card: string;
    border: string;
    primary: string;
    accent: string;
    textPrimary: string;
    textMuted: string;
  };
  keyFeatures: string[];
}

export const TOP_10_DESIGN_SYSTEMS: DesignSystemSpec[] = [
  {
    id: "trust_will",
    name: "Trust & Will (Modern Legal-Tech)",
    nameUr: "ٹرسٹ اینڈ ول (سلیکان ویلی لیگل ٹیک)",
    category: "Legal-Tech SaaS",
    inspiration: "Trust & Will (San Diego, CA) — #1 US D2C Estate Planning Platform",
    tagline: "The TurboTax of Estate Planning: Warm, Empathetic & Effortless",
    description: "Ultra-clean modern SaaS UI with warm slate surfaces, reassuring indigo/teal accents, progressive disclosure single-question cards, and friendly microcopy that eliminates legal intimidation.",
    fontHeading: "Plus Jakarta Sans / Inter",
    fontBody: "Plus Jakarta Sans",
    palette: {
      bg: "#F8FAFC",
      card: "#FFFFFF",
      border: "#E2E8F0",
      primary: "#4F46E5", // Indigo
      accent: "#0D9488",  // Teal
      textPrimary: "#0F172A",
      textMuted: "#64748B",
    },
    keyFeatures: [
      "Bite-sized progressive disclosure cards",
      "Soft ambient shadows and generous whitespace",
      "Trust-building security badges and progress pills",
      "Human-friendly financial summaries",
    ],
  },
  {
    id: "vanilla",
    name: "Vanilla Estate (High-Net-Worth Advisory)",
    nameUr: "وینیلا اسٹیٹ (ملین ڈالر ویلتھ مینجمنٹ)",
    category: "Private Wealth",
    inspiration: "Vanilla (JustVanilla.com) — Premier Estate Visualization Platform for Top RIAs & Morgan Stanley",
    tagline: "Enterprise Wealth Telemetry: Interactive Diagrams & High-Density Insights",
    description: "Sleek institutional midnight obsidian UI with brushed titanium borders, interactive multi-generational SVG family trees, high-density asset flow widgets, and crystal-clear data visualization.",
    fontHeading: "Geist / Plus Jakarta Sans",
    fontBody: "Geist / Inter",
    palette: {
      bg: "#0B0F19",
      card: "#111827",
      border: "#1F2937",
      primary: "#38BDF8", // Cyan / Electric Blue
      accent: "#10B981",  // Emerald
      textPrimary: "#F9FAFB",
      textMuted: "#9CA3AF",
    },
    keyFeatures: [
      "Dark-mode multi-generational family tree nodes",
      "Dynamic asset allocation waterfall bars",
      "Institutional wealth telemetry badges",
      "High-contrast financial data density",
    ],
  },
  {
    id: "farewill",
    name: "Farewill (Radical Scandinavian Simplicity)",
    nameUr: "فیئروِل (برٹش و اسکینڈینیوین جدید ڈیزائن)",
    category: "Legal-Tech SaaS",
    inspiration: "Farewill (London, UK) — Multi-Award Winning UK Wills & Probate Tech",
    tagline: "Radical Simplicity & Human-Centric Speed: Zero Clutter, 100% Clarity",
    description: "Warm pebble linen background, bold editorial typography, zero legal jargon, conversational card prompts, and delightful micro-interactions designed to make estate execution fast and comforting.",
    fontHeading: "Outfit / Syne",
    fontBody: "Plus Jakarta Sans",
    palette: {
      bg: "#FAF8F5",
      card: "#FFFFFF",
      border: "#EBE5DF",
      primary: "#18181B", // Deep Onyx
      accent: "#E11D48",  // Warm Coral
      textPrimary: "#18181B",
      textMuted: "#71717A",
    },
    keyFeatures: [
      "Warm tactile linen & pebble surfaces",
      "Conversational, jargon-free form inputs",
      "Large legible numbers with high contrast",
      "Pill-shaped touch targets and smooth steppers",
    ],
  },
  {
    id: "halachic",
    name: "Beth Din / Halachic Will (Jewish Rabbinic Law)",
    nameUr: "بیت دین و ہلاخا (یہودی ربیعی فقہ و جدید قانون)",
    category: "Faith-Based Halacha",
    inspiration: "Beth Din of America & Jewish Federation Endowments (Halachic Will Protocol)",
    tagline: "Reconciling Sacred Torah Law with Modern Civil Probate",
    description: "Regal sapphire blue and brushed silver, dual-column alignment with authentic Rabbinic seal badges, structured Talmudic legal codex layout, and solemn dignity balancing religious adherence with civil enforceability.",
    fontHeading: "Cinzel / Cormorant Garamond",
    fontBody: "Noto Sans / Inter",
    palette: {
      bg: "#F4F7FB",
      card: "#FFFFFF",
      border: "#CBD5E1",
      primary: "#0A2540", // Regal Navy
      accent: "#0284C7",  // Cerulean Blue
      textPrimary: "#0F172A",
      textMuted: "#475569",
    },
    keyFeatures: [
      "Dual-language biblical & civil clause reconciliation",
      "Official Rabbinic/Academic seal certification badges",
      "Crisp structured legal balance sheets",
      "Solemn, authoritative typography",
    ],
  },
  {
    id: "ncf_christian",
    name: "National Christian Foundation (Biblical Stewardship)",
    nameUr: "نیشنل کرسچن فاؤنڈیشن (بائبلی وارثت و اوقاف)",
    category: "Faith-Based Christian",
    inspiration: "National Christian Foundation (NCF Giving) & Barnabas Foundation ($15B+ Legacy Funds)",
    tagline: "Generational Legacy & Stewardship: Compassionate & Dignified",
    description: "Deep stately navy with warm amber and rich timber accents, family-heritage storyboards, compassionate serif headings, clear charitable and heir pathways, and peaceful generosity-driven aesthetics.",
    fontHeading: "Playfair Display / Merriweather",
    fontBody: "Plus Jakarta Sans",
    palette: {
      bg: "#F8FAFC",
      card: "#FFFFFF",
      border: "#E2E8F0",
      primary: "#1E3A8A", // Deep Classic Blue
      accent: "#D97706",  // Warm Amber
      textPrimary: "#0F172A",
      textMuted: "#64748B",
    },
    keyFeatures: [
      "Family tree generational legacy visualization",
      "Warm amber highlighting and classic serif headings",
      "Multi-asset deduction breakdown (Khums/Tithe/Wasiyyah)",
      "Clear, reassuring progress milestones",
    ],
  },
  {
    id: "british_chancery",
    name: "Lincoln's Inn / British High Chancery (Judicial Codex)",
    nameUr: "لنکنز اِن و برٹش ہائی کورٹ (شاہی عدالتی انداز)",
    category: "Judicial / Chancery",
    inspiration: "Inns of Court (London) & UK HM Courts Probate Registry",
    tagline: "Centuries of Common Law & Equity: The Prestigious Royal Barrister Codex",
    description: "Deep Oxford blue, antique vellum cream cards, wax seal stamps, formal numbered statutory clauses, crisp legal heraldry, and authoritative typography reminiscent of the finest legal libraries.",
    fontHeading: "Cinzel / Garamond",
    fontBody: "Amiri / Georgia",
    palette: {
      bg: "#0B132B",
      card: "#1C2541",
      border: "#3A506B",
      primary: "#C5A880", // Polished Brass
      accent: "#991B1B",  // Royal Crimson Wax
      textPrimary: "#F8FAFC",
      textMuted: "#94A3B8",
    },
    keyFeatures: [
      "Official court decree borders and wax insignia",
      "Formal numbered jurisprudential clauses",
      "Gold leaf and burgundy status indicators",
      "Archival quality certification layout",
    ],
  },
  {
    id: "freewill",
    name: "FreeWill & Ivy Endowments (Civic Philanthropy)",
    nameUr: "فری وِل و ہارورڈ انڈوومنٹ (عوامی و فلاحی شفافیت)",
    category: "Legal-Tech SaaS",
    inspiration: "FreeWill.com ($10B+ mobilized) & Harvard University Planned Giving",
    tagline: "Transparent, Highly-Accessible & Civic-Minded Estate Planning",
    description: "High-contrast crisp white surfaces, authoritative crimson accents, zero ambiguity, accessibility-first inputs, step checklist indicators, and crystal-clear breakdown tables.",
    fontHeading: "Plus Jakarta Sans",
    fontBody: "Plus Jakarta Sans",
    palette: {
      bg: "#F1F5F9",
      card: "#FFFFFF",
      border: "#CBD5E1",
      primary: "#991B1B", // Deep Crimson
      accent: "#2563EB",  // Royal Blue
      textPrimary: "#0F172A",
      textMuted: "#475569",
    },
    keyFeatures: [
      "Accessible high-contrast typography and buttons",
      "Checklist-style progress tracking with live checkmarks",
      "Simplified financial ledger with clear percentages",
      "Zero clutter with maximum legibility",
    ],
  },
  {
    id: "haute_arabesque",
    name: "Contemporary Islamic Architecture (Louvre Abu Dhabi)",
    nameUr: "لوور ابوظہبی و میوزیم آف فیوچر (عصری اسلامی فنِ تعمیر)",
    category: "Architectural Luxury",
    inspiration: "Louvre Abu Dhabi (Jean Nouvel) & Museum of the Future (Dubai)",
    tagline: "Satin Titanium, Basalt Stone & Precision Laser-Cut Sacred Geometry",
    description: "A radical departure from tacky green/yellow. Pure architectural luxury: matte basalt stone `#0D1117`, satin champagne titanium accents, delicate geometric light perforations, and minimalist Arabic & English typography.",
    fontHeading: "Cinzel / Reem Kufi",
    fontBody: "Noto Sans Arabic / Jakarta",
    palette: {
      bg: "#0D1117",
      card: "#161B22",
      border: "#30363D",
      primary: "#D4AF37", // Satin Champagne Gold
      accent: "#2DD4BF",  // Luminous Seafoam
      textPrimary: "#F0F6FC",
      textMuted: "#8B949E",
    },
    keyFeatures: [
      "Minimalist basalt stone cards with laser-cut geometric borders",
      "Satin champagne titanium typography gradients",
      "Architectural sacred Mihrab contours without visual noise",
      "Modern Kufic and Grotesque dual typography",
    ],
  },
  {
    id: "swiss_banking",
    name: "Swiss Private Banking (Pictet / Lombard Odier)",
    nameUr: "سوئس پرائیویٹ بینکنگ (جنیوا و زیورخ ویلتھ)",
    category: "Fintech / Banking",
    inspiration: "Geneva & Zurich Private Wealth Management & Succession Houses",
    tagline: "Mathematical Infallibility, Glacial Clarity & Alpine Discretion",
    description: "Cool titanium grey, glacial blue accents, ultra-crisp tabular monospace figures, mathematical balance sheet waterfalls, and understated European elegance built for generational family offices.",
    fontHeading: "Plus Jakarta Sans / Geist Mono",
    fontBody: "Plus Jakarta Sans",
    palette: {
      bg: "#0F172A",
      card: "#1E293B",
      border: "#334155",
      primary: "#0284C7", // Alpine Blue
      accent: "#10B981",  // Precision Green
      textPrimary: "#F8FAFC",
      textMuted: "#94A3B8",
    },
    keyFeatures: [
      "Glacial blue mathematical data telemetry",
      "Strict tabular alignment of monetary sums and fractions",
      "Waterfall distribution charts with zero decorative fluff",
      "Bespoke Swiss private ledger aesthetic",
    ],
  },
  {
    id: "apple_spatial",
    name: "Apple Spatial Studio (Cupertino Glassmorphism)",
    nameUr: "ایپل اسپیشل اسٹوڈیو (کیوپرٹینو گلاسمورفزم)",
    category: "Spatial Minimalist",
    inspiration: "Apple Design Award Winners & macOS Tahoe / visionOS Spatial UI",
    tagline: "Translucent Layered Glass, Ambient Depth & Haptic Precision",
    description: "Ultra-modern frosted glass cards with 32px backdrop blur, subtle multi-color ambient mesh gradient behind, floating rounded segmented pills, and buttery smooth micro-interactions.",
    fontHeading: "Plus Jakarta Sans",
    fontBody: "Plus Jakarta Sans",
    palette: {
      bg: "#0A0D14",
      card: "rgba(255, 255, 255, 0.05)",
      border: "rgba(255, 255, 255, 0.12)",
      primary: "#6366F1", // Indigo Violet
      accent: "#38BDF8",  // Sky Blue
      textPrimary: "#FFFFFF",
      textMuted: "#A1A1AA",
    },
    keyFeatures: [
      "32px frosted glass surfaces with specular highlights",
      "Ambient floating mesh lighting",
      "Seamless segmented pill selectors",
      "Ultra-fluid layout transitions",
    ],
  },
];
