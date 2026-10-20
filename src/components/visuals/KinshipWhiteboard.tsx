"use client";

import React, { useState, useRef, useMemo, useEffect, useCallback } from "react";
import {
  Plus,
  Minus,
  Maximize2,
  RotateCcw,
  Download,
  Trash2,
  Heart,
  User,
  Sparkles,
  ShieldAlert,
  HelpCircle,
  X,
  ChevronRight,
  Layers,
  ArrowRight,
  Split,
  Eye,
  Sliders,
  Check,
  Flame,
  Info,
  DollarSign,
  Scale,
  Compass,
  Zap,
} from "lucide-react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { calculateInheritance, calculateNamedTanzilBranches, calculateBalanceSheet } from "@/lib/fiqh-engine";
import { PersonNode, WifeProfile, HeirsInput, DeceasedInfo, EstateAssets, EstateDebts, BranchCalculationResult } from "@/types/fiqh";
import html2canvas from "html2canvas";

/* =========================================================================
   TYPES & INTERFACES FOR WHITEBOARD
   ========================================================================= */

export type WhiteboardRelation =
  | "DECEASED"
  | "SPOUSE"
  | "FATHER"
  | "MOTHER"
  | "SON"
  | "DAUGHTER"
  | "GRANDCHILD";

export interface WhiteboardNode {
  id: string;
  nameEn: string;
  nameUr: string;
  gender: "MALE" | "FEMALE";
  relation: WhiteboardRelation;
  isAlive: boolean;
  parentId?: string; // Direct parent in tree
  spouseOfId?: string; // Links wife/husband to deceased
  x: number;
  y: number;
  // Specific attributes
  unpaidMahr?: number; // For wives
  impediments?: {
    isKiller: boolean;
    isNonMuslim: boolean;
  };
}

interface BezierConnection {
  id: string;
  fromId: string;
  toId: string;
  type: "spouse" | "parent-child" | "tanzil-active" | "tanzil-blocked";
}

/* =========================================================================
   INITIAL PRESETS
   ========================================================================= */

const INITIAL_NODES_CLEAN: WhiteboardNode[] = [
  {
    id: "deceased-root",
    nameEn: "Deceased (Marhūm)",
    nameUr: "مرحوم (مورثِ اعلیٰ)",
    gender: "MALE",
    relation: "DECEASED",
    isAlive: false,
    x: 480,
    y: 200,
  },
];

const INITIAL_NODES_4_CHILDREN: WhiteboardNode[] = [
  {
    id: "deceased-root",
    nameEn: "Haji Ahmad (Deceased)",
    nameUr: "حاجی احمد (مرحوم)",
    gender: "MALE",
    relation: "DECEASED",
    isAlive: false,
    x: 480,
    y: 180,
  },
  {
    id: "wife-1",
    nameEn: "Fatima (Wife)",
    nameUr: "فاطمہ بی بی (زوجہ)",
    gender: "FEMALE",
    relation: "SPOUSE",
    isAlive: true,
    spouseOfId: "deceased-root",
    unpaidMahr: 200000,
    x: 740,
    y: 180,
  },
  {
    id: "son-1",
    nameEn: "Ali (Elder Son)",
    nameUr: "علی (بڑا بیٹا)",
    gender: "MALE",
    relation: "SON",
    isAlive: true,
    parentId: "deceased-root",
    x: 220,
    y: 360,
  },
  {
    id: "son-2",
    nameEn: "Hassan (Second Son)",
    nameUr: "حسن (دوسرا بیٹا)",
    gender: "MALE",
    relation: "SON",
    isAlive: true,
    parentId: "deceased-root",
    x: 400,
    y: 360,
  },
  {
    id: "daughter-1",
    nameEn: "Zainab (Daughter)",
    nameUr: "زینب (بیٹی)",
    gender: "FEMALE",
    relation: "DAUGHTER",
    isAlive: true,
    parentId: "deceased-root",
    x: 580,
    y: 360,
  },
  {
    id: "daughter-2",
    nameEn: "Kulsoom (Daughter)",
    nameUr: "کلثوم (بیٹی)",
    gender: "FEMALE",
    relation: "DAUGHTER",
    isAlive: true,
    parentId: "deceased-root",
    x: 760,
    y: 360,
  },
  // Grandchildren (under son-1 and daughter-1)
  {
    id: "gc-1",
    nameEn: "Haider (Pota - Son's Son)",
    nameUr: "حیدر (پوتا)",
    gender: "MALE",
    relation: "GRANDCHILD",
    isAlive: true,
    parentId: "son-1",
    x: 220,
    y: 520,
  },
  {
    id: "gc-2",
    nameEn: "Sakina (Nawasi - Daughter's Daughter)",
    nameUr: "سکینہ (نواسی)",
    gender: "FEMALE",
    relation: "GRANDCHILD",
    isAlive: true,
    parentId: "daughter-1",
    x: 580,
    y: 520,
  },
];

const INITIAL_NODES_ORPHANED_TANZIL: WhiteboardNode[] = [
  {
    id: "deceased-root",
    nameEn: "Syed Baqir (Deceased)",
    nameUr: "سید باقر (مرحوم)",
    gender: "MALE",
    relation: "DECEASED",
    isAlive: false,
    x: 480,
    y: 180,
  },
  {
    id: "son-predeceased",
    nameEn: "Late Kazim (Predeceased Son)",
    nameUr: "مرحوم کاظم (متوفیٰ بیٹا)",
    gender: "MALE",
    relation: "SON",
    isAlive: false, // Predeceased!
    parentId: "deceased-root",
    x: 320,
    y: 350,
  },
  {
    id: "daughter-predeceased",
    nameEn: "Late Masooma (Predeceased Daughter)",
    nameUr: "مرحومہ معصومہ (متوفیہ بیٹی)",
    gender: "FEMALE",
    relation: "DAUGHTER",
    isAlive: false, // Predeceased!
    parentId: "deceased-root",
    x: 640,
    y: 350,
  },
  // Grandchildren
  {
    id: "gc-pota-1",
    nameEn: "Taha (Pota - Kazim's Son)",
    nameUr: "طہٰ (پوتا - وارث تنزیل)",
    gender: "MALE",
    relation: "GRANDCHILD",
    isAlive: true,
    parentId: "son-predeceased",
    x: 240,
    y: 520,
  },
  {
    id: "gc-poti-1",
    nameEn: "Fatima (Poti - Kazim's Daughter)",
    nameUr: "فاطمہ (پوتی - وارث تنزیل)",
    gender: "FEMALE",
    relation: "GRANDCHILD",
    isAlive: true,
    parentId: "son-predeceased",
    x: 400,
    y: 520,
  },
  {
    id: "gc-nawasa-1",
    nameEn: "Mohammad (Nawasa - Masooma's Son)",
    nameUr: "محمد (نواسہ - وارث تنزیل)",
    gender: "MALE",
    relation: "GRANDCHILD",
    isAlive: true,
    parentId: "daughter-predeceased",
    x: 640,
    y: 520,
  },
];

const INITIAL_NODES_SIMULTANEOUS_ACCIDENT: WhiteboardNode[] = [
  {
    id: "deceased-root",
    nameEn: "Father (Victim A)",
    nameUr: "والد (مرحوم اول)",
    gender: "MALE",
    relation: "DECEASED",
    isAlive: false,
    x: 360,
    y: 220,
  },
  {
    id: "son-victim-b",
    nameEn: "Son (Victim B)",
    nameUr: "بیٹا (مرحوم دوم)",
    gender: "MALE",
    relation: "SON",
    isAlive: false,
    parentId: "deceased-root",
    x: 640,
    y: 220,
  },
  {
    id: "mother-survivor",
    nameEn: "Mother / Wife (Survivor)",
    nameUr: "والدہ / زوجہ (حیات)",
    gender: "FEMALE",
    relation: "MOTHER",
    isAlive: true,
    parentId: "deceased-root",
    x: 200,
    y: 380,
  },
  {
    id: "daughter-survivor",
    nameEn: "Daughter / Sister (Survivor)",
    nameUr: "بیٹی / بہن (حیات)",
    gender: "FEMALE",
    relation: "DAUGHTER",
    isAlive: true,
    parentId: "deceased-root",
    x: 800,
    y: 380,
  },
];

/* =========================================================================
   MAIN COMPONENT: KINSHIP WHITEBOARD STUDIO
   ========================================================================= */

export function KinshipWhiteboard() {
  const { language, assets, debts, updateAssets, updateDebts } = useInheritanceStore();
  const isUr = language === "ur";

  // Canvas Viewport State
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 40, y: 30 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Nodes & Selection
  const [nodes, setNodes] = useState<WhiteboardNode[]>(INITIAL_NODES_4_CHILDREN);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("deceased-root");
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Estate Amount on Canvas
  const [canvasEstateGross, setCanvasEstateGross] = useState<number>(10000000); // 10 Million PKR baseline

  // Catastrophe Simulation Modal
  const [showAccidentModal, setShowAccidentModal] = useState<boolean>(false);

  // Inspector Open State
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(true);

  // Canvas Reference for export
  const canvasRef = useRef<HTMLDivElement>(null);

  /* -------------------------------------------------------------------------
     NODE POSITION DRAGGING & PANNING HANDLERS
     ------------------------------------------------------------------------- */

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // If clicking background, start pan
    if ((e.target as HTMLElement).classList.contains("whiteboard-grid-surface")) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      setSelectedNodeId(null);
    }
  };

  const handleCanvasMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isPanning) {
        setPan({
          x: e.clientX - panStart.x,
          y: e.clientY - panStart.y,
        });
      } else if (draggingNodeId) {
        setNodes((prev) =>
          prev.map((node) => {
            if (node.id === draggingNodeId) {
              return {
                ...node,
                x: Math.round((e.clientX - pan.x) / zoom - dragOffset.x),
                y: Math.round((e.clientY - pan.y) / zoom - dragOffset.y),
              };
            }
            return node;
          })
        );
      }
    },
    [isPanning, panStart, draggingNodeId, pan.x, pan.y, zoom, dragOffset]
  );

  const handleCanvasMouseUp = () => {
    setIsPanning(false);
    setDraggingNodeId(null);
  };

  const startNodeDrag = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setSelectedNodeId(nodeId);
    setDraggingNodeId(nodeId);
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      const mouseXInCanvas = (e.clientX - pan.x) / zoom;
      const mouseYInCanvas = (e.clientY - pan.y) / zoom;
      setDragOffset({
        x: mouseXInCanvas - node.x,
        y: mouseYInCanvas - node.y,
      });
    }
  };

  /* -------------------------------------------------------------------------
     ADDING NODES FROM INTERACTIVE HANDLES (+)
     ------------------------------------------------------------------------- */

  const addRelativeNode = (targetNodeId: string, type: "parent" | "child" | "spouse") => {
    const parent = nodes.find((n) => n.id === targetNodeId);
    if (!parent) return;

    const newId = `node-${Date.now()}`;
    let newNode: WhiteboardNode;

    if (type === "parent") {
      const isFather = !nodes.some((n) => n.relation === "FATHER");
      newNode = {
        id: newId,
        nameEn: isFather ? "Father" : "Mother",
        nameUr: isFather ? "والد صاحب" : "والدہ محترمہ",
        gender: isFather ? "MALE" : "FEMALE",
        relation: isFather ? "FATHER" : "MOTHER",
        isAlive: true,
        x: parent.x + (isFather ? -90 : 90),
        y: Math.max(50, parent.y - 140),
      };
    } else if (type === "spouse") {
      const isWife = parent.gender === "MALE";
      newNode = {
        id: newId,
        nameEn: isWife ? "Wife" : "Husband",
        nameUr: isWife ? "زوجہ (بیوی)" : "شوہر",
        gender: isWife ? "FEMALE" : "MALE",
        relation: "SPOUSE",
        isAlive: true,
        spouseOfId: parent.id,
        unpaidMahr: isWife ? 100000 : 0,
        x: parent.x + 180,
        y: parent.y,
      };
    } else {
      // Child or Grandchild
      const isDirectChild = parent.relation === "DECEASED" || parent.relation === "SPOUSE";
      const siblingCount = nodes.filter((n) => n.parentId === targetNodeId).length;
      newNode = {
        id: newId,
        nameEn: isDirectChild ? (siblingCount % 2 === 0 ? "Son" : "Daughter") : "Grandchild",
        nameUr: isDirectChild
          ? siblingCount % 2 === 0
            ? "بیٹا"
            : "بیٹی"
          : parent.gender === "MALE"
          ? "پوتا / پوتی"
          : "نواسہ / نواسی",
        gender: siblingCount % 2 === 0 ? "MALE" : "FEMALE",
        relation: isDirectChild ? (siblingCount % 2 === 0 ? "SON" : "DAUGHTER") : "GRANDCHILD",
        isAlive: true,
        parentId: targetNodeId,
        x: parent.x - 90 + siblingCount * 120,
        y: parent.y + 160,
      };
    }

    setNodes((prev) => [...prev, newNode]);
    setSelectedNodeId(newId);
    setInspectorOpen(true);
  };

  const deleteNode = (nodeId: string) => {
    if (nodeId === "deceased-root") return; // cannot delete root deceased
    setNodes((prev) => prev.filter((n) => n.id !== nodeId && n.parentId !== nodeId));
    if (selectedNodeId === nodeId) {
      setSelectedNodeId("deceased-root");
    }
  };

  /* -------------------------------------------------------------------------
     FIQH ENGINE REAL-TIME CALCULATION INTEGRATION
     ------------------------------------------------------------------------- */

  const calculationData = useMemo(() => {
    const root = nodes.find((n) => n.relation === "DECEASED") || nodes[0];
    if (!root) return null;

    const deceasedInfo: DeceasedInfo = {
      gender: root.gender === "MALE" ? "male" : "female",
      name: isUr ? root.nameUr : root.nameEn,
      currency: "PKR",
      marja: "sistani",
      hasEldestSon: false,
      eldestSonIsSaneAndNonAqq: false,
      habwah: {
        quran: false,
        ring: false,
        swordOrDefensiveWeapon: false,
        clothes: false,
        estimatedValue: 0,
      },
    };

    // Synthesize Estate Assets & Debts
    const currentAssets: EstateAssets = {
      cash: canvasEstateGross,
      bankAccounts: 0,
      residentialLand: 0,
      agriculturalLand: 0,
      commercialLand: 0,
      buildingsAndFixtures: 0,
      movableProperty: 0,
    };

    // Calculate pending mahr from wives
    const wivesList: WifeProfile[] = nodes
      .filter((n) => n.relation === "SPOUSE" && n.gender === "FEMALE")
      .map((w) => ({
        id: w.id,
        name: isUr ? w.nameUr : w.nameEn,
        isAlive: w.isAlive && !w.impediments?.isKiller && !w.impediments?.isNonMuslim,
        marriageType: "PERMANENT",
        hasMahrPending: (w.unpaidMahr || 0) > 0,
        pendingMahrAmount: w.unpaidMahr || 0,
      }));

    const currentDebts: EstateDebts = {
      funeralExpenses: debts.funeralExpenses || 0,
      securedDebts: debts.securedDebts || 0,
      unsecuredDebts: debts.unsecuredDebts || 0,
      unpaidKhums: 0,
      unpaidZakat: 0,
      unfulfilledHajj: 0,
      kaffarat: 0,
      wasiyyahAmount: debts.wasiyyahAmount || 0,
      wasiyyahApprovedExceedingOneThird: false,
    };

    // Build Named Descendants Tree for Tanzīl
    const namedDescendants: PersonNode[] = [];
    const directChildren = nodes.filter(
      (n) => (n.relation === "SON" || n.relation === "DAUGHTER") && (n.parentId === root.id || !n.parentId)
    );

    directChildren.forEach((child) => {
      const grandchildren = nodes.filter((gc) => gc.relation === "GRANDCHILD" && gc.parentId === child.id);
      const childNode: PersonNode = {
        id: child.id,
        name: isUr ? child.nameUr : child.nameEn,
        gender: child.gender,
        isAlive: child.isAlive,
        relation: child.relation as "SON" | "DAUGHTER",
        impediments: {
          isKiller: child.impediments?.isKiller || false,
          isNonMuslim: child.impediments?.isNonMuslim || false,
          isLian: false,
        },
        children: grandchildren.map((gc) => ({
          id: gc.id,
          name: isUr ? gc.nameUr : gc.nameEn,
          gender: gc.gender,
          isAlive: gc.isAlive,
          relation: "GRANDCHILD",
          parentId: child.id,
          impediments: {
            isKiller: gc.impediments?.isKiller || false,
            isNonMuslim: gc.impediments?.isNonMuslim || false,
            isLian: false,
          },
        })),
      };
      namedDescendants.push(childNode);
    });

    // Check parents
    const fatherNode = nodes.find((n) => n.relation === "FATHER");
    const motherNode = nodes.find((n) => n.relation === "MOTHER");

    const heirsInput: HeirsInput = {
      wives: wivesList,
      spouseCount: wivesList.filter((w) => w.isAlive).length,
      fatherAlive: !!(fatherNode && fatherNode.isAlive && !fatherNode.impediments?.isKiller && !fatherNode.impediments?.isNonMuslim),
      fatherImpediment: !!(fatherNode?.impediments?.isKiller || fatherNode?.impediments?.isNonMuslim),
      motherAlive: !!(motherNode && motherNode.isAlive && !motherNode.impediments?.isKiller && !motherNode.impediments?.isNonMuslim),
      motherImpediment: !!(motherNode?.impediments?.isKiller || motherNode?.impediments?.isNonMuslim),
      sonsCount: directChildren.filter((c) => c.relation === "SON" && c.isAlive && !c.impediments?.isKiller && !c.impediments?.isNonMuslim).length,
      daughtersCount: directChildren.filter((c) => c.relation === "DAUGHTER" && c.isAlive && !c.impediments?.isKiller && !c.impediments?.isNonMuslim).length,
      deceasedSonsWithChildren: [],
      deceasedDaughtersWithChildren: [],
      namedDescendants,
      paternalGrandfatherAlive: false,
      paternalGrandmotherAlive: false,
      maternalGrandfatherAlive: false,
      maternalGrandmotherAlive: false,
      fullBrothersCount: 0,
      fullSistersCount: 0,
      paternalBrothersCount: 0,
      paternalSistersCount: 0,
      uterineBrothersCount: 0,
      uterineSistersCount: 0,
      deceasedSiblingsChildren: [],
      motherBlockingBrothers: 0,
      motherBlockingSisters: 0,
      paternalUnclesCount: 0,
      paternalAuntsCount: 0,
      maternalUnclesCount: 0,
      maternalAuntsCount: 0,
      paternalCousinsCount: 0,
      maternalCousinsCount: 0,
    };

    const calcResult = calculateInheritance(deceasedInfo, currentAssets, currentDebts, heirsInput);
    const balanceSheet = calculateBalanceSheet(currentAssets, currentDebts, deceasedInfo, heirsInput);

    // Calculate Tanzīl branches
    const livingDirectCount = directChildren.filter(
      (c) => c.isAlive && !c.impediments?.isKiller && !c.impediments?.isNonMuslim
    ).length;

    const tanzilOutput = calculateNamedTanzilBranches(
      namedDescendants,
      balanceSheet.netDistributableEstate,
      balanceSheet.netDistributableEstate,
      "PKR"
    );

    return {
      calcResult,
      balanceSheet,
      tanzilOutput,
      livingDirectCount,
      isTanzilActive: livingDirectCount === 0 && namedDescendants.some((c) => !c.isAlive && (c.children?.length || 0) > 0),
    };
  }, [nodes, canvasEstateGross, debts, isUr]);

  /* -------------------------------------------------------------------------
     CONNECTIONS & BEZIER CURVE GENERATION
     ------------------------------------------------------------------------- */

  const connections: BezierConnection[] = useMemo(() => {
    const list: BezierConnection[] = [];
    const root = nodes.find((n) => n.relation === "DECEASED");

    nodes.forEach((node) => {
      // Spouse link
      if (node.spouseOfId) {
        list.push({
          id: `conn-spouse-${node.id}`,
          fromId: node.spouseOfId,
          toId: node.id,
          type: "spouse",
        });
      }

      // Parent - Child link
      if (node.parentId) {
        const parentNode = nodes.find((n) => n.id === node.parentId);
        if (parentNode) {
          // If node is grandchild
          if (node.relation === "GRANDCHILD") {
            const isBlockedByLivingChild = (calculationData?.livingDirectCount || 0) > 0;
            list.push({
              id: `conn-gc-${node.id}`,
              fromId: node.parentId,
              toId: node.id,
              type: isBlockedByLivingChild ? "tanzil-blocked" : "tanzil-active",
            });
          } else {
            list.push({
              id: `conn-child-${node.id}`,
              fromId: node.parentId,
              toId: node.id,
              type: "parent-child",
            });
          }
        }
      }

      // Father/Mother to Root
      if ((node.relation === "FATHER" || node.relation === "MOTHER") && root) {
        list.push({
          id: `conn-parent-${node.id}`,
          fromId: node.id,
          toId: root.id,
          type: "parent-child",
        });
      }
    });

    return list;
  }, [nodes, calculationData]);

  /* -------------------------------------------------------------------------
     AUTO-ARRANGE ALGORITHM (HIERARCHICAL TREE RE-ALIGNMENT)
     ------------------------------------------------------------------------- */

  const handleAutoArrange = () => {
    const root = nodes.find((n) => n.relation === "DECEASED");
    if (!root) return;

    const parents = nodes.filter((n) => n.relation === "FATHER" || n.relation === "MOTHER");
    const spouses = nodes.filter((n) => n.relation === "SPOUSE");
    const children = nodes.filter((n) => n.relation === "SON" || n.relation === "DAUGHTER");

    const newNodes = nodes.map((node) => ({ ...node }));

    // Center root
    const rootIdx = newNodes.findIndex((n) => n.id === root.id);
    if (rootIdx !== -1) {
      newNodes[rootIdx].x = 540;
      newNodes[rootIdx].y = 200;
    }

    // Parents on top
    parents.forEach((p, idx) => {
      const idxNode = newNodes.findIndex((n) => n.id === p.id);
      if (idxNode !== -1) {
        newNodes[idxNode].x = 420 + idx * 240;
        newNodes[idxNode].y = 60;
      }
    });

    // Spouses to right
    spouses.forEach((s, idx) => {
      const idxNode = newNodes.findIndex((n) => n.id === s.id);
      if (idxNode !== -1) {
        newNodes[idxNode].x = 760 + idx * 160;
        newNodes[idxNode].y = 200;
      }
    });

    // Children in row
    const childSpacing = 160;
    const startX = 540 - ((children.length - 1) * childSpacing) / 2;
    children.forEach((c, idx) => {
      const childX = startX + idx * childSpacing;
      const childIdx = newNodes.findIndex((n) => n.id === c.id);
      if (childIdx !== -1) {
        newNodes[childIdx].x = childX;
        newNodes[childIdx].y = 370;
      }

      // Grandchildren under this child
      const grandchildren = newNodes.filter((g) => g.relation === "GRANDCHILD" && g.parentId === c.id);
      const gcSpacing = 110;
      const gcStartX = childX - ((grandchildren.length - 1) * gcSpacing) / 2;
      grandchildren.forEach((gc, gcIdx) => {
        gc.x = gcStartX + gcIdx * gcSpacing;
        gc.y = 540;
      });
    });

    setNodes(newNodes);
  };

  /* -------------------------------------------------------------------------
     EXPORT CANVAS TO PNG
     ------------------------------------------------------------------------- */

  const handleExportPNG = async () => {
    if (!canvasRef.current) return;
    try {
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: "#FAF8F5",
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = `Wirasat-Family-Whiteboard-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  /* -------------------------------------------------------------------------
     SELECTED NODE DETAILS FOR INSPECTOR
     ------------------------------------------------------------------------- */

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const updateSelectedNode = (partial: Partial<WhiteboardNode>) => {
    if (!selectedNodeId) return;
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === selectedNodeId) {
          return { ...n, ...partial };
        }
        return n;
      })
    );
  };

  /* -------------------------------------------------------------------------
     GET SHARE BADGE TEXT FOR A NODE
     ------------------------------------------------------------------------- */

  const getNodeShareBadge = (node: WhiteboardNode) => {
    if (!node.isAlive && node.relation !== "DECEASED") {
      return { text: isUr ? "متوفیٰ (قبل از مورث)" : "Predeceased", color: "bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300 border-stone-300" };
    }

    if (node.impediments?.isKiller) {
      return { text: isUr ? "محروم (قاتل مورث)" : "Disqualified (Homicide)", color: "bg-rose-100 text-rose-800 border-rose-300" };
    }
    if (node.impediments?.isNonMuslim) {
      return { text: isUr ? "محروم (غیر مسلم)" : "Disqualified (Non-Muslim)", color: "bg-amber-100 text-amber-900 border-amber-300" };
    }

    if (node.relation === "DECEASED") {
      return { text: isUr ? "اصلِ ترکہ" : "Estate Origin", color: "bg-[#245642] text-white border-[#245642]" };
    }

    // Check Tanzīl grandchild
    if (node.relation === "GRANDCHILD") {
      if ((calculationData?.livingDirectCount || 0) > 0) {
        return {
          text: isUr ? "محجوب (الاقرب یمنع الابعد)" : "Blocked by Living Children",
          color: "bg-stone-100 text-stone-600 border-stone-200 dark:bg-stone-800 dark:text-stone-400",
        };
      }
      const branchRes = calculationData?.tanzilOutput.branchResults.find((b) => b.person.id === node.id);
      if (branchRes) {
        return {
          text: `${branchRes.finalFraction} (${Math.round(branchRes.monetaryValue).toLocaleString()} PKR)`,
          color: "bg-emerald-600 text-white border-emerald-700 shadow-xs animate-pulse",
        };
      }
    }

    // Check Spouse
    if (node.relation === "SPOUSE") {
      const spouseShare = calculationData?.calcResult.heirShares.find((s) => s.relationKey === "wives" || s.relationKey === "husband");
      const mahrDeducted = node.unpaidMahr || 0;
      if (spouseShare) {
        const amount = spouseShare.sharePerIndividual + mahrDeducted;
        return {
          text: `${spouseShare.fractionString} (${Math.round(amount).toLocaleString()} PKR)`,
          color: "bg-amber-700 text-white border-amber-800",
        };
      }
    }

    // Check Sons/Daughters
    if (node.relation === "SON" || node.relation === "DAUGHTER") {
      const directShare = calculationData?.calcResult.heirShares.find(
        (s) => s.relationKey === (node.relation === "SON" ? "sons" : "daughters")
      );
      if (directShare) {
        return {
          text: `${directShare.fractionString} (${Math.round(directShare.sharePerIndividual).toLocaleString()} PKR)`,
          color: "bg-[#245642] text-white border-[#1c4333]",
        };
      }
    }

    // Parents
    if (node.relation === "FATHER" || node.relation === "MOTHER") {
      const parentShare = calculationData?.calcResult.heirShares.find(
        (s) => s.relationKey === (node.relation === "FATHER" ? "father" : "mother")
      );
      if (parentShare) {
        return {
          text: `${parentShare.fractionString} (${Math.round(parentShare.sharePerIndividual).toLocaleString()} PKR)`,
          color: "bg-emerald-800 text-white border-emerald-900",
        };
      }
    }

    return { text: isUr ? "زیرِ تدقیق" : "Calculating...", color: "bg-stone-100 text-stone-700" };
  };

  return (
    <div className="w-full flex flex-col bg-[#FAF8F5] dark:bg-[#0B1713] text-stone-800 dark:text-stone-100 min-h-[92vh] select-none">
      {/* -------------------------------------------------------------------
          TOP SACRED STUDIO HEADER & TOOLBAR
          ------------------------------------------------------------------- */}
      <div className="border-b border-stone-200/80 dark:border-stone-800 bg-white/90 dark:bg-[#0E1E18]/90 backdrop-blur-md px-4 py-3 sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        {/* Left: Studio Title & Botanical Badge */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#245642] to-[#16382a] flex items-center justify-center text-amber-300 shadow-sm">
            <Compass size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-[#245642] dark:text-emerald-400 tracking-tight">
                {isUr ? "تَخْطِيطُ الْعَائِلَة — اسٹوڈیو کنبہ وائٹ بورڈ" : "The Kinship Whiteboard Studio"}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50">
                {isUr ? "جعفری فقہ لائیو" : "Live Ja‘fari Fiqh"}
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {isUr
                ? "خاندان کے ارکان شامل کریں، وفات کی ترتیب تبدیل کریں اور تنزیل کے اثرات دیکھیں"
                : "Figma-style interactive family canvas. Add nodes, simulate predeceased children & catastrophic accidents"}
            </p>
          </div>
        </div>

        {/* Center: Scenario Presets */}
        <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800/70 p-1 rounded-xl border border-stone-200 dark:border-stone-700">
          <button
            onClick={() => {
              setNodes(INITIAL_NODES_CLEAN);
              setSelectedNodeId("deceased-root");
            }}
            className="px-2.5 py-1 text-xs font-medium rounded-lg text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700 transition-colors cursor-pointer"
            title="Clean Slate"
          >
            {isUr ? "نیا کینوس" : "Clean Slate"}
          </button>

          <button
            onClick={() => {
              setNodes(INITIAL_NODES_4_CHILDREN);
              setSelectedNodeId("deceased-root");
            }}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-stone-700 text-[#245642] dark:text-emerald-300 shadow-2xs transition-colors cursor-pointer"
            title="The 4 Children & Grandchildren Mystery"
          >
            {isUr ? "چار اولادیں و پوتے" : "4 Children Mystery"}
          </button>

          <button
            onClick={() => {
              setNodes(INITIAL_NODES_ORPHANED_TANZIL);
              setSelectedNodeId("son-predeceased");
            }}
            className="px-2.5 py-1 text-xs font-medium rounded-lg text-emerald-700 dark:text-emerald-400 hover:bg-white dark:hover:bg-stone-700 transition-colors cursor-pointer flex items-center gap-1"
            title="Orphaned Grandchild Tanzil Representation"
          >
            <Sparkles size={12} className="text-amber-500" />
            {isUr ? "تنزیل (یتیم پوتے)" : "Orphaned Tanzīl"}
          </button>

          <button
            onClick={() => {
              setNodes(INITIAL_NODES_SIMULTANEOUS_ACCIDENT);
              setSelectedNodeId("deceased-root");
              setShowAccidentModal(true);
            }}
            className="px-2.5 py-1 text-xs font-medium rounded-lg text-rose-700 dark:text-rose-400 hover:bg-white dark:hover:bg-stone-700 transition-colors cursor-pointer flex items-center gap-1"
            title="Simultaneous Catastrophe (Al-Gharqa wa al-Hadma)"
          >
            <Flame size={12} className="text-rose-500" />
            {isUr ? "الغرقیٰ والھدمیٰ (حادثہ)" : "Catastrophe (Accident)"}
          </button>
        </div>

        {/* Right: Canvas Utilities & Zoom */}
        <div className="flex items-center gap-2">
          {/* Estate Input */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-medium">
            <span className="text-stone-400 font-serif">PKR</span>
            <input
              type="number"
              value={canvasEstateGross}
              onChange={(e) => setCanvasEstateGross(Math.max(0, Number(e.target.value)))}
              className="w-24 bg-transparent text-xs font-bold text-stone-800 dark:text-stone-100 focus:outline-hidden"
              step={100000}
            />
          </div>

          <div className="h-5 w-px bg-stone-300 dark:bg-stone-700" />

          {/* Auto Arrange */}
          <button
            onClick={handleAutoArrange}
            className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 cursor-pointer transition-colors"
            title={isUr ? "خودکار ترتیب" : "Auto Arrange Tree"}
          >
            <Sliders size={15} />
          </button>

          {/* Zoom Out */}
          <button
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
            className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 cursor-pointer transition-colors"
            title="Zoom Out"
          >
            <Minus size={15} />
          </button>

          <span className="text-xs font-semibold w-9 text-center text-stone-600 dark:text-stone-400">
            {Math.round(zoom * 100)}%
          </span>

          {/* Zoom In */}
          <button
            onClick={() => setZoom((z) => Math.min(1.8, z + 0.1))}
            className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 cursor-pointer transition-colors"
            title="Zoom In"
          >
            <Plus size={15} />
          </button>

          {/* Reset Zoom */}
          <button
            onClick={() => {
              setZoom(1);
              setPan({ x: 40, y: 30 });
            }}
            className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 cursor-pointer transition-colors"
            title="Reset View"
          >
            <RotateCcw size={15} />
          </button>

          {/* Snapshot PNG */}
          <button
            onClick={handleExportPNG}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#245642] hover:bg-[#1a3f30] text-white text-xs font-bold transition-all shadow-sm cursor-pointer ml-1"
          >
            <Download size={14} />
            <span>{isUr ? "تصویر محفوظ کریں" : "Export PNG"}</span>
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------
          MAIN CANVAS WORKSPACE (DOT MATRIX & NODES)
          ------------------------------------------------------------------- */}
      <div className="flex-1 relative overflow-hidden flex">
        {/* Canvas Surface with Alabaster Linen and Dot-Grid */}
        <div
          ref={canvasRef}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          className="whiteboard-grid-surface flex-1 h-[88vh] relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
          style={{
            backgroundColor: "#FAF8F5",
            backgroundImage: "radial-gradient(#245642 0.75px, transparent 0.75px)",
            backgroundSize: "24px 24px",
            backgroundPosition: `${pan.x}px ${pan.y}px`,
          }}
        >
          {/* Zoomed & Panned Canvas Layer */}
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none origin-top-left transition-transform duration-75 ease-out"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            }}
          >
            {/* SVG Bezier Connectors Layer */}
            <svg
              className="absolute top-0 left-0 w-[4000px] h-[3000px] pointer-events-none"
              style={{ overflow: "visible" }}
            >
              <defs>
                {/* Emerald Gradient for direct parent-child */}
                <linearGradient id="parentChildGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#245642" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#16382a" stopOpacity="0.95" />
                </linearGradient>

                {/* Tanzil Active Glowing Cord */}
                <linearGradient id="tanzilActiveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="1" />
                </linearGradient>

                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {connections.map((conn) => {
                const fromNode = nodes.find((n) => n.id === conn.fromId);
                const toNode = nodes.find((n) => n.id === conn.toId);
                if (!fromNode || !toNode) return null;

                const x1 = fromNode.x;
                const y1 = fromNode.y;
                const x2 = toNode.x;
                const y2 = toNode.y;

                if (conn.type === "spouse") {
                  // Horizontal Golden Cord connecting spouses
                  const midX = (x1 + x2) / 2;
                  const curveY = y1 + 30;
                  const path = `M ${x1} ${y1} Q ${midX} ${curveY} ${x2} ${y2}`;

                  return (
                    <g key={conn.id}>
                      <path
                        d={path}
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="2.5"
                        strokeDasharray="5,4"
                        opacity="0.9"
                      />
                      <circle cx={midX} cy={curveY - 8} r="5" fill="#D4AF37" />
                    </g>
                  );
                }

                if (conn.type === "tanzil-active") {
                  // Pulsing glowing green cable bypassing deceased parent
                  const midY = (y1 + y2) / 2;
                  const path = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

                  return (
                    <g key={conn.id}>
                      {/* Glow backing */}
                      <path
                        d={path}
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="6"
                        opacity="0.35"
                        filter="url(#glow)"
                      />
                      {/* Animated Core Cable */}
                      <path
                        d={path}
                        fill="none"
                        stroke="url(#tanzilActiveGrad)"
                        strokeWidth="3"
                        strokeDasharray="6,4"
                        className="animate-[dash_1.5s_linear_infinite]"
                      />
                    </g>
                  );
                }

                if (conn.type === "tanzil-blocked") {
                  // Muted grey dashed cable (Blocked by living child)
                  const midY = (y1 + y2) / 2;
                  const path = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

                  return (
                    <path
                      key={conn.id}
                      d={path}
                      fill="none"
                      stroke="#A8A29E"
                      strokeWidth="1.75"
                      strokeDasharray="4,4"
                      opacity="0.6"
                    />
                  );
                }

                // Standard Parent - Child Bezier curve
                const midY = (y1 + y2) / 2;
                const path = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

                return (
                  <path
                    key={conn.id}
                    d={path}
                    fill="none"
                    stroke="#245642"
                    strokeWidth="2"
                    opacity="0.75"
                  />
                );
              })}
            </svg>

            {/* Whiteboard Nodes */}
            {nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const badge = getNodeShareBadge(node);
              const isDeceased = !node.isAlive;
              const isRoot = node.relation === "DECEASED";

              return (
                <div
                  key={node.id}
                  onMouseDown={(e) => startNodeDrag(e, node.id)}
                  className={`absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 group cursor-grab active:cursor-grabbing transition-shadow ${
                    isSelected ? "z-20" : "z-10"
                  }`}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                  }}
                >
                  {/* Floating Live Sharia Share Badge Above Node */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-xs tracking-tight ${badge.color}`}
                    >
                      {badge.text}
                    </span>
                  </div>

                  {/* Circular Node Body (r=38px) */}
                  <div
                    className={`relative w-[76px] h-[76px] rounded-full flex flex-col items-center justify-center transition-all duration-200 border-2 ${
                      isSelected
                        ? "ring-4 ring-emerald-500/30 scale-105 shadow-xl"
                        : "hover:scale-105 shadow-md"
                    } ${
                      isRoot
                        ? "bg-[#245642] text-white border-amber-400"
                        : isDeceased
                        ? "bg-stone-200 text-stone-500 border-stone-400 dark:bg-stone-800 dark:text-stone-400"
                        : node.gender === "FEMALE"
                        ? "bg-rose-50 text-rose-900 border-rose-300 dark:bg-rose-950/40 dark:text-rose-200"
                        : "bg-emerald-50 text-emerald-950 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-200"
                    }`}
                  >
                    {/* Role Icon */}
                    {isRoot ? (
                      <Scale size={24} className="text-amber-300 mb-0.5" />
                    ) : node.relation === "SPOUSE" ? (
                      <Heart size={22} className="text-rose-500 mb-0.5" />
                    ) : (
                      <User size={22} className="mb-0.5" />
                    )}

                    {/* Predeceased Ribbon or Slash */}
                    {isDeceased && !isRoot && (
                      <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/10 backdrop-blur-[0.5px]">
                        <span className="text-[9px] font-black uppercase text-rose-700 bg-white/90 px-1 rounded-sm shadow-2xs">
                          {isUr ? "متوفیٰ" : "Deceased"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Node Name & Kinship Label Below */}
                  <div className="absolute top-[82px] left-1/2 -translate-x-1/2 text-center w-36 pointer-events-none">
                    <p
                      className={`text-xs font-bold leading-tight drop-shadow-2xs ${
                        isSelected ? "text-emerald-800 dark:text-emerald-300 font-extrabold" : "text-stone-800 dark:text-stone-200"
                      }`}
                    >
                      {isUr ? node.nameUr : node.nameEn}
                    </p>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400">
                      {node.relation}
                    </p>
                  </div>

                  {/* Interactive Micro Handles (+) on Hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Top Handle: Add Parent */}
                    {node.relation !== "GRANDCHILD" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addRelativeNode(node.id, "parent");
                        }}
                        className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white dark:bg-stone-800 border-2 border-emerald-600 text-emerald-700 dark:text-emerald-300 flex items-center justify-center hover:bg-emerald-50 shadow-md cursor-pointer hover:scale-125 transition-transform"
                        title={isUr ? "والدین شامل کریں" : "Add Parent"}
                      >
                        <Plus size={13} strokeWidth={3} />
                      </button>
                    )}

                    {/* Bottom Handle: Add Child */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addRelativeNode(node.id, "child");
                      }}
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white dark:bg-stone-800 border-2 border-[#245642] text-[#245642] dark:text-emerald-300 flex items-center justify-center hover:bg-emerald-50 shadow-md cursor-pointer hover:scale-125 transition-transform"
                      title={isUr ? "اولاد شامل کریں" : "Add Child"}
                    >
                      <Plus size={13} strokeWidth={3} />
                    </button>

                    {/* Right Handle: Add Spouse */}
                    {(node.relation === "DECEASED" || node.relation === "SON" || node.relation === "DAUGHTER") && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addRelativeNode(node.id, "spouse");
                        }}
                        className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-white dark:bg-stone-800 border-2 border-amber-500 text-amber-700 dark:text-amber-300 flex items-center justify-center hover:bg-amber-50 shadow-md cursor-pointer hover:scale-125 transition-transform"
                        title={isUr ? "شریکِ حیات شامل کریں" : "Add Spouse"}
                      >
                        <Plus size={13} strokeWidth={3} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom-Left Tanzīl Quick Status Ribbon */}
          <div className="absolute bottom-4 left-4 z-20 bg-white/95 dark:bg-[#0E1E18]/95 backdrop-blur-md p-3 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-lg max-w-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <div
                className={`w-3 h-3 rounded-full ${
                  calculationData?.isTanzilActive
                    ? "bg-emerald-500 animate-ping"
                    : (calculationData?.livingDirectCount || 0) > 0
                    ? "bg-amber-500"
                    : "bg-stone-400"
                }`}
              />
              <span className="text-xs font-bold text-stone-800 dark:text-stone-100">
                {calculationData?.isTanzilActive
                  ? isUr
                    ? "تنزیل فعال ہے (قائم مقامی کا حق)"
                    : "Tanzīl Representation Active"
                  : (calculationData?.livingDirectCount || 0) > 0
                  ? isUr
                    ? "الأقرب يمنع الأبعد (پوتے محجوب)"
                    : "Al-Aqrab Yamna‘ (Grandchildren Barred)"
                  : isUr
                  ? "حالتِ انتظار"
                  : "Standard Branch"}
              </span>
            </div>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
              {calculationData?.isTanzilActive
                ? isUr
                  ? "چونکہ مورث کا کوئی براہِ راست بیٹا یا بیٹی زندہ نہیں ہے، اس لیے یتیم پوتے اور نواسے اپنے مرحوم والدین کے حصے میں قائم مقام بن چکے ہیں۔"
                  : "All direct children are deceased. Grandchildren step directly into their predeceased parents' shoes via Tanzīl representation."
                : isUr
                ? `چونکہ مورث کا ${calculationData?.livingDirectCount} زندہ بیٹا/بیٹی موجود ہے، فقہی قاعدہ 'الأقرب يمنع الأبعد' کے تحت پوتے محروم ہیں۔`
                : `${calculationData?.livingDirectCount} living direct child bars all grandchildren under the proximity rule.`}
            </p>
          </div>
        </div>

        {/* -------------------------------------------------------------------
            RIGHT-HAND SIDE: NODE INSPECTOR DRAWER
            ------------------------------------------------------------------- */}
        {inspectorOpen && selectedNode && (
          <div className="w-80 border-l border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0E1E18] flex flex-col z-30 shadow-xl">
            {/* Inspector Header */}
            <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders size={16} className="text-[#245642] dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-stone-800 dark:text-stone-100">
                  {isUr ? "تفصیلاتِ رشتہ دار" : "Node Inspector"}
                </h3>
              </div>
              <button
                onClick={() => setInspectorOpen(false)}
                className="text-stone-400 hover:text-stone-600 cursor-pointer p-1 rounded-md"
              >
                <X size={16} />
              </button>
            </div>

            {/* Inspector Body */}
            <div className="p-4 space-y-4 flex-1 overflow-y-auto">
              {/* Names */}
              <div>
                <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block mb-1">
                  {isUr ? "نام (اردو)" : "Name (Urdu)"}
                </label>
                <input
                  type="text"
                  value={selectedNode.nameUr}
                  onChange={(e) => updateSelectedNode({ nameUr: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-nastaliq"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block mb-1">
                  {isUr ? "نام (انگریزی)" : "Name (English)"}
                </label>
                <input
                  type="text"
                  value={selectedNode.nameEn}
                  onChange={(e) => updateSelectedNode({ nameEn: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-sans"
                />
              </div>

              {/* Status: Alive vs Predeceased */}
              {selectedNode.relation !== "DECEASED" && (
                <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block mb-2">
                    {isUr ? "حیات یا وفات کی حالت" : "Vital Status"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => updateSelectedNode({ isAlive: true })}
                      className={`py-1.5 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        selectedNode.isAlive
                          ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                          : "bg-stone-100 text-stone-600 border-stone-200 dark:bg-stone-800 dark:text-stone-300"
                      }`}
                    >
                      {isUr ? "حیات (زندہ)" : "Alive"}
                    </button>
                    <button
                      onClick={() => updateSelectedNode({ isAlive: false })}
                      className={`py-1.5 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        !selectedNode.isAlive
                          ? "bg-rose-600 text-white border-rose-700 shadow-xs"
                          : "bg-stone-100 text-stone-600 border-stone-200 dark:bg-stone-800 dark:text-stone-300"
                      }`}
                    >
                      {isUr ? "متوفیٰ (پہلے)" : "Predeceased"}
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-1.5">
                    {isUr
                      ? "اولاد کو 'متوفیٰ' کرنے سے تنزیل کا قانون خودکار طور پر اثر انداز ہوتا ہے۔"
                      : "Toggling to predeceased simulates whether grandchildren receive representation."}
                  </p>
                </div>
              )}

              {/* Gender */}
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block mb-2">
                  {isUr ? "جنس (مرد / خاتون)" : "Gender"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateSelectedNode({ gender: "MALE" })}
                    className={`py-1.5 px-3 rounded-lg text-xs font-bold border cursor-pointer ${
                      selectedNode.gender === "MALE"
                        ? "bg-[#245642] text-white border-[#1b4232]"
                        : "bg-stone-100 text-stone-600 border-stone-200 dark:bg-stone-800 dark:text-stone-300"
                    }`}
                  >
                    {isUr ? "مرد" : "Male"}
                  </button>
                  <button
                    onClick={() => updateSelectedNode({ gender: "FEMALE" })}
                    className={`py-1.5 px-3 rounded-lg text-xs font-bold border cursor-pointer ${
                      selectedNode.gender === "FEMALE"
                        ? "bg-rose-700 text-white border-rose-800"
                        : "bg-stone-100 text-stone-600 border-stone-200 dark:bg-stone-800 dark:text-stone-300"
                    }`}
                  >
                    {isUr ? "خاتون" : "Female"}
                  </button>
                </div>
              </div>

              {/* Unpaid Mahr for Wife */}
              {selectedNode.relation === "SPOUSE" && selectedNode.gender === "FEMALE" && (
                <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block mb-1">
                    {isUr ? "غیر ادا شدہ مہر (مہرِ مؤجل)" : "Unpaid Mahr (PKR)"}
                  </label>
                  <input
                    type="number"
                    value={selectedNode.unpaidMahr || 0}
                    onChange={(e) => updateSelectedNode({ unpaidMahr: Math.max(0, Number(e.target.value)) })}
                    className="w-full px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50/50 dark:bg-amber-950/20 text-xs font-bold text-amber-900 dark:text-amber-200"
                    step={10000}
                  />
                  <p className="text-[10px] text-amber-800 dark:text-amber-400 mt-1">
                    {isUr
                      ? "مہرِ مؤجل ترکے سے پہلے بطور قرض ادا ہوتا ہے، پھر حصہ ملتا ہے۔"
                      : "Unpaid Mahr is treated as prior debt (Duyūn al-Nās) deducted before division."}
                  </p>
                </div>
              )}

              {/* Sharia Impediments (Mawani' al-Irth) */}
              {selectedNode.relation !== "DECEASED" && (
                <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-2">
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">
                    {isUr ? "موانعِ ارث (شرعی رکاوٹیں)" : "Sharia Impediments"}
                  </label>

                  <label className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedNode.impediments?.isKiller || false}
                      onChange={(e) =>
                        updateSelectedNode({
                          impediments: {
                            isKiller: e.target.checked,
                            isNonMuslim: selectedNode.impediments?.isNonMuslim || false,
                          },
                        })
                      }
                      className="rounded text-rose-600 focus:ring-rose-500"
                    />
                    <span>{isUr ? "قتلِ مورث (قاتل بن گیا)" : "Homicide of Decedent (Qātil)"}</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedNode.impediments?.isNonMuslim || false}
                      onChange={(e) =>
                        updateSelectedNode({
                          impediments: {
                            isKiller: selectedNode.impediments?.isKiller || false,
                            isNonMuslim: e.target.checked,
                          },
                        })
                      }
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>{isUr ? "کفر / غیر مسلم" : "Non-Muslim (Kufr)"}</span>
                  </label>
                </div>
              )}

              {/* Delete Node Action */}
              {selectedNode.relation !== "DECEASED" && (
                <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
                  <button
                    onClick={() => deleteNode(selectedNode.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                    <span>{isUr ? "اس فرد کو کینوس سے ہٹائیں" : "Delete Relative"}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* -------------------------------------------------------------------
          SIMULTANEOUS ACCIDENT SIMULATOR MODAL (الغرقیٰ والھدمیٰ)
          ------------------------------------------------------------------- */}
      {showAccidentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0E1E18] rounded-2xl max-w-3xl w-full border border-stone-200 dark:border-stone-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 bg-[#245642] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Flame size={20} className="text-amber-300" />
                <div>
                  <h3 className="text-base font-bold">
                    {isUr ? "مسئلہ الغرقیٰ والھدمیٰ (بیک وقت حادثاتی موت)" : "Al-Gharqā wa al-Hadmā (Catastrophe Simulator)"}
                  </h3>
                  <p className="text-xs text-emerald-200 font-light">
                    {isUr
                      ? "جب دو باہمی وارث ایک ساتھ حادثے میں فوت ہو جائیں اور تقدم و تاخر معلوم نہ ہو"
                      : "Mutual heirs dying together in an accident with unknown sequence of death"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAccidentModal(false)}
                className="text-emerald-200 hover:text-white p-1 rounded-md cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              {/* Scholarly Ja'fari Consensus Card */}
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                <p className="font-bold mb-1 flex items-center gap-1.5">
                  <ShieldAlert size={14} className="text-amber-600" />
                  {isUr ? "فقہِ جعفریہ و فتویٰ آیت اللہ العظمیٰ سیستانی" : "Ayatollah Sistani's Ruling on Al-Gharqā"}
                </p>
                <p>
                  {isUr
                    ? "اگر دو باہمی وارث (جیسے باپ اور بیٹا) ایک ساتھ ڈوب جائیں یا عمارت کے ملبے میں دب کر فوت ہو جائیں اور یہ نہ جانا جا سکے کہ کون پہلے فوت ہوا، تو ہر ایک کو دوسرے کے اصل مال سے حصہ دیا جائے گا، لیکن ایک دوسرے سے پائے ہوئے مال پر دوبارہ وراثت جاری نہیں ہو گی (تاکہ دورِ باطل لازم نہ آئے)۔"
                    : "Under Ja‘fari jurisprudence, each victim inherits only from the original net estate of the other. The inherited portion is never recycled back between them, preventing infinite recursion."}
                </p>
              </div>

              {/* Dual-Run Simulation Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Run 1: Assuming Father died first */}
                <div className="p-4 rounded-xl border-2 border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-700 text-white">
                    {isUr ? "مرحلہ ۱: فرضِ وفاتِ پدر" : "Step 1: Father Presumed First"}
                  </span>
                  <h4 className="text-sm font-bold text-stone-800 dark:text-stone-100 mt-2">
                    {isUr ? "باپ کے ترکے کی تقسیم" : "Division of Father's Estate"}
                  </h4>
                  <ul className="text-xs text-stone-600 dark:text-stone-400 mt-2 space-y-1.5">
                    <li className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-1">
                      <span>{isUr ? "مرحوم بیٹے کا فرضی حصہ:" : "Son's Virtual Share:"}</span>
                      <strong className="text-emerald-700 dark:text-emerald-300">2/3 (66.67%)</strong>
                    </li>
                    <li className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-1">
                      <span>{isUr ? "زندہ بیٹی کا حصہ:" : "Surviving Daughter:"}</span>
                      <strong>1/3 (33.33%)</strong>
                    </li>
                    <li className="text-[11px] text-stone-500 italic mt-2">
                      {isUr
                        ? "← بیٹے کا یہ حصہ بیٹے کے اپنے ورثاء (بیوی، بچوں) میں تقسیم ہو گا۔"
                        : "→ Son's share passes directly to the son's separate surviving heirs."}
                    </li>
                  </ul>
                </div>

                {/* Run 2: Assuming Son died first */}
                <div className="p-4 rounded-xl border-2 border-amber-600 bg-amber-50/40 dark:bg-amber-950/20">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-700 text-white">
                    {isUr ? "مرحلہ ۲: فرضِ وفاتِ فرزند" : "Step 2: Son Presumed First"}
                  </span>
                  <h4 className="text-sm font-bold text-stone-800 dark:text-stone-100 mt-2">
                    {isUr ? "بیٹے کے اصل ترکے کی تقسیم" : "Division of Son's Original Estate"}
                  </h4>
                  <ul className="text-xs text-stone-600 dark:text-stone-400 mt-2 space-y-1.5">
                    <li className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-1">
                      <span>{isUr ? "مرحوم باپ کا فرضی حصہ:" : "Father's Virtual Share:"}</span>
                      <strong className="text-amber-700 dark:text-amber-300">1/6 (16.67%)</strong>
                    </li>
                    <li className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-1">
                      <span>{isUr ? "بیٹے کے بچوں کا حصہ:" : "Son's Children Share:"}</span>
                      <strong>5/6 (83.33%)</strong>
                    </li>
                    <li className="text-[11px] text-stone-500 italic mt-2">
                      {isUr
                        ? "← باپ کا یہ پایا ہوا حصہ باپ کے ورثاء میں تقسیم ہو گا، نہ کہ دوبارہ اس بیٹے میں۔"
                        : "→ Father's share passes to father's heirs without cycling back to this son."}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex justify-end">
              <button
                onClick={() => setShowAccidentModal(false)}
                className="px-4 py-2 rounded-xl bg-[#245642] text-white text-xs font-bold hover:bg-[#1a3f30] cursor-pointer"
              >
                {isUr ? "سمجھ آ گئی — کینوس پر واپس جائیں" : "Understood — Return to Canvas"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
