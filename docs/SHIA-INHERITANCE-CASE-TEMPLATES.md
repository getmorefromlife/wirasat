# Shia (Ja'fari) Inheritance Law — Real-World Distribution Trends & Case Templates
*(تحقیقی مقالہ: فقہِ جعفریہ میں تقسیمِ ترکہ کے عام نمونے اور عدالتی رجحانات)*

This document details the online, jurisprudential, and empirical research conducted on **Shia (Ithna 'Ashari / Ja'fari) inheritance law** as practiced in **India, Pakistan, and worldwide**, and provides the architectural specification for the **Ready-Made Case Templates** integrated into the **Wirasat Kinship Whiteboard Studio**.

---

## 1. Empirical Landscape & Legal Case Frequency

Based on court precedent in South Asia (Supreme Court of Pakistan, High Courts of Lahore, Karachi, Allahabad, and Bombay), standard commentaries including Sir Dinshah Fardunji Mulla's *Principles of Mahomedan Law*, and rulings from Grand Marāji‘ (*Ayatollah Sistani*, *Ayatollah Khoei*, and *Ayatollah Khamenei*), estate inquiries fall into six dominant family structures:

| Category | Real-World Frequency | Core Family Composition | Key Legal & Judicial Highlights |
| :--- | :---: | :--- | :--- |
| **1. Standard Nuclear Family** | **~52%** | Surviving Wife, 2 Sons, 2 Daughters *(Parents predeceased)* | Standard baseline. Wife takes 1/8 (12.5%); children divide 7/8 in a 2:1 ratio. |
| **2. Subcontinent Joint Family** | **~22%** | Living Father, Living Mother, Wife, Sons & Daughters | Very common in India & Pakistan. Parents take 1/6 each, Wife takes 1/8. Eldest son receives *Habwah* (personal relics of the father). |
| **3. "Daughters Only" (No Sons)** | **~14%** | Surviving Wife + 2+ Daughters *(Brothers & Uncles alive)* | **#1 Most Litigated in South Asia.** Demonstrates absolute exclusion (*Hajb*): Daughters belong to Class I and completely disinherit Class II (brothers) and Class III (uncles). The residue returns (*Radd*) to daughters, not agnates. |
| **4. Orphaned Grandchildren** | **~7%** | Surviving Son + Predeceased Son's Children (*Pota/Poti*) | Grandchildren inherit via **Tanzīl (Representation / نیابت)**, stepping into their parent's shoes per stirpes. |
| **5. Childless Married Couple** | **~5%** | Childless Widow + Living Parents or Siblings | *Bēwa Bilā Aulād* rule: Widow takes 1/4 of movable assets and construction value, with remaining 3/4 passing to parents or Class II collaterals. |
| **6. Sole Surviving Daughter** | **~4%** | Only 1 Daughter *(No other Class I heirs)* | Takes 100% of the estate (1/2 fixed share + 1/2 Return). Bars all collaterals completely. |
| **7. Collaterals Only (Class II)** | **~3%** | Full Brothers, Full Sisters, Maternal Siblings *(No Class I)* | Class II takes effect only when Class I is completely absent. |

---

## 2. Foundational Doctrinal Principles (Ja'fari Fiqh)

### A. The Three Absolute Classes of Consanguinity (*Nasab*)
Unlike Sunni (Hanafi) jurisprudence—which blends Quranic sharers with tribal customary agnatic residuaries (*'Asabah*)—Ja'fari jurisprudence organizes all blood heirs into three strict, hierarchical classes:
* **Class I:** Parents, Children, and lower lineal descendants (grandchildren, great-grandchildren).
* **Class II:** Grandparents (paternal and maternal) and Siblings (and their descendants).
* **Class III:** Paternal and maternal uncles and aunts (and their descendants).

> **The Universal Rule of Exclusion:** *Any living heir in a nearer class completely bars all heirs in a subsequent class.* A single daughter or grandchild in Class I bars all brothers, sisters, uncles, and cousins in Classes II and III.

### B. Repudiation of *‘Awl* (Doctrine of Increase)
If the sum of fractional shares exceeds unity (1.0), Shia jurisprudence refuses to reduce shares proportionally across all heirs. The deficit is deducted strictly from the shares of discretionary heirs (e.g., daughters or full sisters), while primary fixed shares (such as parents and spouses) are paid in full.

### C. The Doctrine of *Radd* (Reversion / Return)
When the sum of fixed shares leaves a surplus and no residuary heirs exist in that class, the surplus property is returned (*Radd*) proportionally back to the blood sharers. Spouses do not participate in *Radd* when blood heirs are present.

### D. Principle of Representation (*Tanzīl / Qa'im Maqam*)
Grandchildren whose parent predeceased the grandparent step into that deceased parent's legal shoes and take the exact fractional share that their parent would have taken if alive.

---

## 3. Integrated Templates Architecture

All 8 templates are defined in [`src/lib/whiteboard-templates.ts`](file:///Users/syedrizvi/Documents/my%20website%20projects/Wirasat/src/lib/whiteboard-templates.ts) and consumed by [`src/components/visuals/KinshipWhiteboard.tsx`](file:///Users/syedrizvi/Documents/my%20website%20projects/Wirasat/src/components/visuals/KinshipWhiteboard.tsx):

```typescript
export interface WhiteboardPresetTemplate {
  id: string;
  nameEn: string;
  nameUr: string;
  subtitleEn: string;
  subtitleUr: string;
  category: "MOST_COMMON" | "SOUTH_ASIA_SPECIAL" | "EDGE_CASES";
  frequencyLabelEn: string;
  frequencyLabelUr: string;
  badgeTextEn: string;
  badgeTextUr: string;
  badgeColor: string;
  iconName: string;
  fiqhSummaryEn: string;
  fiqhSummaryUr: string;
  keyRuleEn: string;
  keyRuleUr: string;
  nodes: WhiteboardNode[];
}
```

### UI Features:
1. **Interactive Toolbar Modal Trigger:** A dedicated button with a live badge showing the total number of available templates.
2. **Category Filter Tabs:** *All*, *Most Common*, *South Asia & Landmark Rules*, and *Edge Cases*.
3. **Quick Pill Launchers:** Quick access in the toolbar for the top presets (*Nuclear*, *Daughters*, *Tanzīl*, *Clean*).
4. **Auto-Framing (`frameBoard`):** Automatically computes bounding box dimensions and scales the canvas viewport smoothly upon loading any template.
