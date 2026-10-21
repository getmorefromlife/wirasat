"use client";

import React, { useState, useRef, useMemo, useEffect, useCallback } from "react";
import {
  Plus,
  Minus,
  Maximize2,
  Minimize2,
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
  LayoutGrid,
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
  customAvatar?: string; // User-selected or preset avatar path
  // Specific attributes
  unpaidMahr?: number; // For wives
  impediments?: {
    isKiller: boolean;
    isNonMuslim: boolean;
  };
}

export const AVATAR_OPTIONS = [
  { id: "grandfather", src: "/images/avatars/avatar-grandfather.jpg", labelEn: "Elderly Male", labelUr: "بزرگ مرد (والد/دادا)" },
  { id: "grandmother", src: "/images/avatars/avatar-grandmother.jpg", labelEn: "Elderly Female", labelUr: "بزرگ خاتون (والدہ/دادی)" },
  { id: "adult-male", src: "/images/avatars/avatar-adult-male.jpg", labelEn: "Adult Male", labelUr: "بالغ مرد (شوہر/بیٹا)" },
  { id: "wife", src: "/images/avatars/avatar-wife.jpg", labelEn: "Wife / Mature Female", labelUr: "زوجہ / بیوہ" },
  { id: "daughter", src: "/images/avatars/avatar-daughter.jpg", labelEn: "Young Female", labelUr: "بیٹی / پوتی" },
  { id: "boy", src: "/images/avatars/avatar-boy.jpg", labelEn: "Young Boy", labelUr: "پوتا / نواسہ" },
];

export function getNodeAvatar(node: WhiteboardNode): string {
  if (node.customAvatar) return node.customAvatar;

  // Root deceased
  if (node.relation === "DECEASED") {
    return node.gender === "FEMALE"
      ? "/images/avatars/avatar-grandmother.jpg"
      : "/images/avatars/avatar-grandfather.jpg";
  }

  // Parents / Grandparents
  if (node.relation === "FATHER") {
    return "/images/avatars/avatar-grandfather.jpg";
  }
  if (node.relation === "MOTHER") {
    return "/images/avatars/avatar-grandmother.jpg";
  }

  // Spouse: Wife gets the mature female avatar, Husband gets adult male
  if (node.relation === "SPOUSE") {
    return node.gender === "FEMALE"
      ? "/images/avatars/avatar-wife.jpg"
      : "/images/avatars/avatar-adult-male.jpg";
  }

  // Children
  if (node.relation === "SON") {
    return "/images/avatars/avatar-adult-male.jpg";
  }
  if (node.relation === "DAUGHTER") {
    return "/images/avatars/avatar-daughter.jpg";
  }

  // Grandchildren
  if (node.relation === "GRANDCHILD") {
    return node.gender === "FEMALE"
      ? "/images/avatars/avatar-daughter.jpg"
      : "/images/avatars/avatar-boy.jpg";
  }

  // Fallback by gender
  return node.gender === "FEMALE"
    ? "/images/avatars/avatar-daughter.jpg"
    : "/images/avatars/avatar-adult-male.jpg";
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
    x: 540,
    y: 160,
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
    x: 540,
    y: 160,
  },
  {
    id: "wife-1",
    nameEn: "Fatima (Wife)",
    nameUr: "فاطمہ بی بی (زوجہ)",
    gender: "FEMALE",
    relation: "SPOUSE",
    isAlive: true,
    spouseOfId: "deceased-root",
    unpaidMahr: 0,
    x: 820,
    y: 160,
  },
  {
    id: "son-1",
    nameEn: "Ali (Elder Son)",
    nameUr: "علی (بڑا بیٹا)",
    gender: "MALE",
    relation: "SON",
    isAlive: true,
    parentId: "deceased-root",
    x: 180,
    y: 400,
  },
  {
    id: "son-2",
    nameEn: "Hassan (Second Son)",
    nameUr: "حسن (دوسرا بیٹا)",
    gender: "MALE",
    relation: "SON",
    isAlive: true,
    parentId: "deceased-root",
    x: 420,
    y: 400,
  },
  {
    id: "daughter-1",
    nameEn: "Zainab (Daughter)",
    nameUr: "زینب (بیٹی)",
    gender: "FEMALE",
    relation: "DAUGHTER",
    isAlive: true,
    parentId: "deceased-root",
    x: 660,
    y: 400,
  },
  {
    id: "daughter-2",
    nameEn: "Kulsoom (Daughter)",
    nameUr: "کلثوم (بیٹی)",
    gender: "FEMALE",
    relation: "DAUGHTER",
    isAlive: true,
    parentId: "deceased-root",
    x: 900,
    y: 400,
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
    x: 180,
    y: 640,
  },
  {
    id: "gc-2",
    nameEn: "Sakina (Nawasi - Daughter's Daughter)",
    nameUr: "سکینہ (نواسی)",
    gender: "FEMALE",
    relation: "GRANDCHILD",
    isAlive: true,
    parentId: "daughter-1",
    x: 660,
    y: 640,
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
    y: 160,
  },
  {
    id: "son-predeceased",
    nameEn: "Late Kazim (Predeceased Son)",
    nameUr: "مرحوم کاظم (متوفیٰ بیٹا)",
    gender: "MALE",
    relation: "SON",
    isAlive: false, // Predeceased!
    parentId: "deceased-root",
    x: 300,
    y: 400,
  },
  {
    id: "daughter-predeceased",
    nameEn: "Late Masooma (Predeceased Daughter)",
    nameUr: "مرحومہ معصومہ (متوفیہ بیٹی)",
    gender: "FEMALE",
    relation: "DAUGHTER",
    isAlive: false, // Predeceased!
    parentId: "deceased-root",
    x: 680,
    y: 400,
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
    x: 200,
    y: 640,
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
    y: 640,
  },
  {
    id: "gc-nawasa-1",
    nameEn: "Mohammad (Nawasa - Masooma's Son)",
    nameUr: "محمد (نواسہ - وارث تنزیل)",
    gender: "MALE",
    relation: "GRANDCHILD",
    isAlive: true,
    parentId: "daughter-predeceased",
    x: 680,
    y: 640,
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
    x: 380,
    y: 180,
  },
  {
    id: "son-victim-b",
    nameEn: "Son (Victim B)",
    nameUr: "بیٹا (مرحوم دوم)",
    gender: "MALE",
    relation: "SON",
    isAlive: false,
    parentId: "deceased-root",
    x: 700,
    y: 180,
  },
  {
    id: "mother-survivor",
    nameEn: "Mother / Wife (Survivor)",
    nameUr: "والدہ / زوجہ (حیات)",
    gender: "FEMALE",
    relation: "MOTHER",
    isAlive: true,
    parentId: "deceased-root",
    x: 240,
    y: 420,
  },
  {
    id: "daughter-survivor",
    nameEn: "Daughter / Sister (Survivor)",
    nameUr: "بیٹی / بہن (حیات)",
    gender: "FEMALE",
    relation: "DAUGHTER",
    isAlive: true,
    parentId: "deceased-root",
    x: 820,
    y: 420,
  },
];

/* =========================================================================
   MAIN COMPONENT: KINSHIP WHITEBOARD STUDIO
   ========================================================================= */

export function KinshipWhiteboard() {
  const { language, assets, debts, updateAssets, updateDebts, updateHeirs } = useInheritanceStore();
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

  // Estate Amount on Canvas (defaults to empty/0 or user's integrated assets.cash)
  const [canvasEstateGross, setCanvasEstateGross] = useState<number>(assets.cash || 0);

  // Free Sandbox Supposition Mode
  const [sandboxMode, setSandboxMode] = useState<boolean>(true);
  const [syncSuccess, setSyncSuccess] = useState<boolean>(false);

  // Sync canvasEstateGross with assets.cash if updated from other views and not detached
  useEffect(() => {
    if (!sandboxMode) {
      setCanvasEstateGross(assets.cash || 0);
    }
  }, [assets.cash, sandboxMode]);

  // Full HD Immersive Mode & Container Ref
  const [isFullHD, setIsFullHD] = useState<boolean>(false);
  const studioContainerRef = useRef<HTMLDivElement>(null);

  // Catastrophe Simulation Modal
  const [showAccidentModal, setShowAccidentModal] = useState<boolean>(false);

  // Inspector Open State
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(true);

  // Canvas Reference for export
  const canvasRef = useRef<HTMLDivElement>(null);

  // Toggle Full HD with native fullscreen + CSS fallback
  const toggleFullHD = async () => {
    const nextState = !isFullHD;
    setIsFullHD(nextState);

    try {
      if (nextState) {
        if (studioContainerRef.current?.requestFullscreen) {
          await studioContainerRef.current.requestFullscreen();
        } else if ((studioContainerRef.current as any)?.webkitRequestFullscreen) {
          await (studioContainerRef.current as any).webkitRequestFullscreen();
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        } else if ((document as any).webkitFullscreenElement) {
          await (document as any).webkitExitFullscreen();
        }
      }
    } catch {
      // Gracefully fall back to CSS fixed fullscreen if browser denies permission
    }
  };

  // Sync state with native browser fullscreen and handle Esc key
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNative = Boolean(
        document.fullscreenElement || (document as any).webkitFullscreenElement
      );
      setIsFullHD(isNative);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showAccidentModal) {
          setShowAccidentModal(false);
          return;
        }
        if (isFullHD) {
          setIsFullHD(false);
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          } else if ((document as any).webkitFullscreenElement) {
            (document as any).webkitExitFullscreen().catch(() => {});
          }
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullHD, showAccidentModal]);

  // Lock body scroll in Full HD mode to prevent double scrollbars / jumping
  useEffect(() => {
    if (isFullHD) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isFullHD]);

  // Smooth canvas trackpad pinch-to-zoom & two-finger pan / mouse wheel listener
  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        // Pinch-to-zoom or Ctrl+wheel zoom
        const zoomDelta = e.deltaY < 0 ? 0.08 : -0.08;
        setZoom((z) => Math.min(2.0, Math.max(0.4, Number((z + zoomDelta).toFixed(2)))));
      } else {
        // Two-finger trackpad panning or mouse wheel pan
        setPan((p) => ({
          x: p.x - e.deltaX,
          y: p.y - e.deltaY,
        }));
      }
    };

    canvasEl.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      canvasEl.removeEventListener("wheel", handleWheel);
    };
  }, []);

  /* -------------------------------------------------------------------------
     NODE POSITION DRAGGING & PANNING HANDLERS
     ------------------------------------------------------------------------- */

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // If clicking background or canvas surface, start pan
    const target = e.target as HTMLElement;
    if (
      target.classList.contains("whiteboard-grid-surface") ||
      target === canvasRef.current ||
      target.tagName === "svg"
    ) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  // Window-level smooth panning and node dragging (works across all edges in Full HD)
  useEffect(() => {
    if (!isPanning && !draggingNodeId) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
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
    };

    const handleWindowMouseUp = () => {
      setIsPanning(false);
      setDraggingNodeId(null);
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleWindowMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [isPanning, draggingNodeId, panStart, pan.x, pan.y, zoom, dragOffset]);

  const startNodeDrag = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setSelectedNodeId(nodeId);
    setInspectorOpen(true);
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
        unpaidMahr: 0,
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
    // Use nominal reference estate (24,000,000) when gross is 0 to ensure Quranic fractions calculate cleanly
    const isGrossZero = canvasEstateGross <= 0;
    const nominalGross = isGrossZero ? 24000000 : canvasEstateGross;

    const currentAssets: EstateAssets = {
      cash: nominalGross,
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
      isGrossZero,
      canvasEstateGross,
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
     CLEAN HIERARCHICAL AUTO-ARRANGE ALGORITHM (SYMMETRICAL & BREATHING)
     ------------------------------------------------------------------------- */

  const handleAutoArrange = () => {
    const root = nodes.find((n) => n.relation === "DECEASED");
    if (!root) return;

    const newNodes = nodes.map((node) => ({ ...node }));

    // 1. Generation 0: Parents (Top Row at y = 120)
    const parents = newNodes.filter((n) => n.relation === "FATHER" || n.relation === "MOTHER");
    const parentSpacing = 260;
    const parentStartX = 580 - ((parents.length - 1) * parentSpacing) / 2;
    parents.forEach((p, idx) => {
      p.x = Math.round(parentStartX + idx * parentSpacing);
      p.y = 120;
    });

    // 2. Generation 1: Root Deceased & Spouses (Center Row at y = 290)
    const rootNode = newNodes.find((n) => n.id === root.id);
    if (rootNode) {
      rootNode.x = 580;
      rootNode.y = 290;
    }

    const spouses = newNodes.filter((n) => n.relation === "SPOUSE");
    const spouseStartX = 840;
    const spouseSpacing = 200;
    spouses.forEach((s, idx) => {
      s.x = Math.round(spouseStartX + idx * spouseSpacing);
      s.y = 290;
    });

    // 3. Generation 2: Direct Children (Row at y = 500) & Generation 3: Grandchildren (Row at y = 720)
    const children = newNodes.filter((n) => n.relation === "SON" || n.relation === "DAUGHTER");

    // Compute width required per child branch based on their grandchildren count
    const branchWidths = children.map((c) => {
      const gcs = newNodes.filter((g) => g.relation === "GRANDCHILD" && g.parentId === c.id);
      return Math.max(220, gcs.length * 150);
    });

    const totalChildrenWidth = branchWidths.reduce((sum, w) => sum + w, 0);
    let currentX = 580 - totalChildrenWidth / 2;

    children.forEach((c, idx) => {
      const bWidth = branchWidths[idx];
      const childCenterX = currentX + bWidth / 2;
      c.x = Math.round(childCenterX);
      c.y = 500;

      // Arrange grandchildren neatly beneath this child's column
      const grandchildren = newNodes.filter((g) => g.relation === "GRANDCHILD" && g.parentId === c.id);
      const gcSpacing = 140;
      const gcStartX = childCenterX - ((grandchildren.length - 1) * gcSpacing) / 2;
      grandchildren.forEach((gc, gcIdx) => {
        gc.x = Math.round(gcStartX + gcIdx * gcSpacing);
        gc.y = 720;
      });

      currentX += bWidth;
    });

    setNodes(newNodes);
  };

  /* -------------------------------------------------------------------------
     SYNC WHITEBOARD FAMILY INTO MAIN CALCULATOR WIZARD
     ------------------------------------------------------------------------- */

  const handleSyncToCalculator = () => {
    const root = nodes.find((n) => n.relation === "DECEASED") || nodes[0];
    const directChildren = nodes.filter(
      (n) => (n.relation === "SON" || n.relation === "DAUGHTER") && (n.parentId === root.id || !n.parentId)
    );
    const sons = directChildren.filter((c) => c.relation === "SON" && c.isAlive);
    const daughters = directChildren.filter((c) => c.relation === "DAUGHTER" && c.isAlive);
    const fatherNode = nodes.find((n) => n.relation === "FATHER");
    const motherNode = nodes.find((n) => n.relation === "MOTHER");

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

    updateHeirs({
      wives: wivesList,
      spouseCount: wivesList.filter((w) => w.isAlive).length,
      fatherAlive: !!(fatherNode && fatherNode.isAlive),
      motherAlive: !!(motherNode && motherNode.isAlive),
      sonsCount: sons.length,
      daughtersCount: daughters.length,
    });

    updateAssets({
      cash: canvasEstateGross,
    });

    setSyncSuccess(true);
    setTimeout(() => setSyncSuccess(false), 4000);
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
        logging: false,
        onclone: (clonedDoc) => {
          // html2canvas does not support CSS oklch() color syntax; replace with hex fallbacks
          const allElements = clonedDoc.querySelectorAll<HTMLElement>("*");
          allElements.forEach((el) => {
            const computed = window.getComputedStyle(el);
            if (computed.backgroundColor?.includes("oklch")) {
              el.style.backgroundColor = "#ffffff";
            }
            if (computed.color?.includes("oklch")) {
              el.style.color = "#1c1917";
            }
            if (computed.borderColor?.includes("oklch")) {
              el.style.borderColor = "#e7e5e4";
            }
          });
        },
      });
      const link = document.createElement("a");
      link.download = `Wirasat-Family-Whiteboard-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.warn("PNG export fallback:", err);
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
      return {
        text: isUr ? "متوفیٰ (پہلے وفات)" : "Predeceased",
        color: "bg-rose-100 text-rose-800 border-rose-300 font-extrabold",
      };
    }

    if (node.impediments?.isKiller) {
      return { text: isUr ? "محروم (قاتل مورث)" : "Disqualified (Homicide)", color: "bg-rose-100 text-rose-800 border-rose-300 font-bold" };
    }
    if (node.impediments?.isNonMuslim) {
      return { text: isUr ? "محروم (غیر مسلم)" : "Disqualified (Non-Muslim)", color: "bg-amber-100 text-amber-900 border-amber-300 font-bold" };
    }

    if (node.relation === "DECEASED") {
      return { text: isUr ? "اصلِ ترکہ (مورث)" : "Estate Origin", color: "bg-[#245642] text-white border-amber-400 font-black shadow-xs" };
    }

    const isGrossZero = calculationData?.isGrossZero ?? true;
    const gross = calculationData?.canvasEstateGross ?? 0;

    // Check Tanzīl grandchild
    if (node.relation === "GRANDCHILD") {
      if ((calculationData?.livingDirectCount || 0) > 0) {
        return {
          text: isUr ? "محجوب (الأقرب يمنع الأبعد)" : "Blocked by Living Children",
          color: "bg-stone-100 text-stone-700 border-stone-300 dark:bg-stone-800 dark:text-stone-300 font-bold",
        };
      }
      const branchRes = calculationData?.tanzilOutput.branchResults.find((b) => b.person.id === node.id);
      if (branchRes) {
        const money = isGrossZero ? 0 : branchRes.monetaryValue;
        return {
          text: `${branchRes.finalFraction} (${Math.round(money).toLocaleString()} PKR)`,
          color: "bg-emerald-600 text-white border-emerald-700 shadow-xs animate-pulse",
        };
      }
    }

    // Check Spouse
    if (node.relation === "SPOUSE") {
      const spouseShare = calculationData?.calcResult.heirShares.find(
        (s) => s.relationKey === "wives" || s.relationKey === "wife" || s.relationKey === "husband"
      );
      const mahrDeducted = node.unpaidMahr || 0;
      if (spouseShare) {
        const money = isGrossZero
          ? mahrDeducted
          : ((spouseShare.percentage / 100) * gross) / Math.max(1, spouseShare.count) + mahrDeducted;
        return {
          text: `${spouseShare.fractionString} (${Math.round(money).toLocaleString()} PKR)`,
          color: "bg-amber-700 text-white border-amber-800",
        };
      }
    }

    // Check Sons/Daughters
    if (node.relation === "SON" || node.relation === "DAUGHTER") {
      const isSon = node.relation === "SON";
      const directShare = calculationData?.calcResult.heirShares.find(
        (s) =>
          s.relationKey === (isSon ? "sons" : "daughters") ||
          s.relationKey === (isSon ? "son" : "daughter")
      );
      if (directShare) {
        const money = isGrossZero
          ? 0
          : ((directShare.percentage / 100) * gross) / Math.max(1, directShare.count);
        return {
          text: `${directShare.fractionString} (${Math.round(money).toLocaleString()} PKR)`,
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
        const money = isGrossZero
          ? 0
          : ((parentShare.percentage / 100) * gross) / Math.max(1, parentShare.count);
        return {
          text: `${parentShare.fractionString} (${Math.round(money).toLocaleString()} PKR)`,
          color: "bg-emerald-800 text-white border-emerald-900",
        };
      }
    }

    return { text: isUr ? "زیرِ تدقیق" : "Calculating...", color: "bg-stone-100 text-stone-700" };
  };

  return (
    <div
      ref={studioContainerRef}
      className={`w-full flex flex-col bg-[#FAF8F5] dark:bg-[#0B1713] text-stone-800 dark:text-stone-100 select-none ${
        isFullHD
          ? "fixed inset-0 z-[99999] w-screen h-screen overflow-hidden"
          : "min-h-[92vh]"
      }`}
    >
      {/* -------------------------------------------------------------------
          TOP SACRED STUDIO HEADER & TOOLBAR
          ------------------------------------------------------------------- */}
      <div className="border-b border-stone-200/80 dark:border-stone-800 bg-white/95 dark:bg-[#0E1E18]/95 backdrop-blur-md px-3.5 py-2.5 sticky top-0 z-30 flex items-center justify-between gap-3 shadow-2xs overflow-x-auto select-none flex-nowrap min-w-0">
        {/* Left: Studio Title & Botanical Badge */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#245642] to-[#16382a] flex items-center justify-center text-amber-300 shadow-sm shrink-0">
            <Compass size={18} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm md:text-base font-bold text-[#245642] dark:text-emerald-400 tracking-tight whitespace-nowrap">
                {isUr ? "اسٹوڈیو کنبہ وائٹ بورڈ" : "Kinship Whiteboard"}
              </h1>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50 whitespace-nowrap">
                {isUr ? "جعفری فقہ" : "Ja‘fari Fiqh"}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Scenario Presets & Sandbox Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Free Sandbox Supposition Mode Checkbox & Sync */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 shadow-2xs">
            <label className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200 cursor-pointer select-none whitespace-nowrap">
              <input
                type="checkbox"
                checked={sandboxMode}
                onChange={(e) => setSandboxMode(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#245642] focus:ring-[#245642] cursor-pointer"
              />
              <span>{isUr ? "فرضی مشق (Sandbox)" : "Sandbox"}</span>
            </label>
            <button
              onClick={handleSyncToCalculator}
              className="px-2 py-0.5 rounded-lg bg-[#245642] hover:bg-[#1a3f30] text-white text-[11px] font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1 whitespace-nowrap"
              title={isUr ? "اس خاندانی خاکے کو اصل کیلکولیٹر میں منتقل کریں" : "Sync this family into Main Calculator"}
            >
              {syncSuccess ? (
                <>
                  <Check size={12} className="text-emerald-300" />
                  <span>{isUr ? "منتقل ہو گیا!" : "Synced!"}</span>
                </>
              ) : (
                <>
                  <Split size={12} />
                  <span>{isUr ? "کیلکولیٹر سنک" : "Sync"}</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800/80 p-1 rounded-xl border border-stone-200 dark:border-stone-700 shrink-0">
            <button
              onClick={() => {
                setNodes(INITIAL_NODES_CLEAN);
                setSelectedNodeId("deceased-root");
              }}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700 transition-colors cursor-pointer whitespace-nowrap"
              title="Clean Slate"
            >
              {isUr ? "خالی" : "Clean"}
            </button>

            <button
              onClick={() => {
                setNodes(INITIAL_NODES_4_CHILDREN);
                setSelectedNodeId("deceased-root");
              }}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white dark:bg-stone-700 text-[#245642] dark:text-emerald-300 shadow-2xs transition-colors cursor-pointer whitespace-nowrap"
              title="The 4 Children & Grandchildren Mystery"
            >
              {isUr ? "۴ اولادیں" : "4 Children"}
            </button>

            <button
              onClick={() => {
                setNodes(INITIAL_NODES_ORPHANED_TANZIL);
                setSelectedNodeId("son-predeceased");
              }}
              className="px-2.5 py-1 text-xs font-bold rounded-lg text-emerald-800 dark:text-emerald-300 hover:bg-white dark:hover:bg-stone-700 transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap"
              title="Orphaned Grandchild Tanzil Representation"
            >
              <Sparkles size={13} className="text-amber-500" />
              <span>{isUr ? "تنزیل" : "Tanzīl"}</span>
            </button>

            <button
              onClick={() => {
                setNodes(INITIAL_NODES_SIMULTANEOUS_ACCIDENT);
                setSelectedNodeId("deceased-root");
                setShowAccidentModal(true);
              }}
              className="px-2.5 py-1 text-xs font-bold rounded-lg text-rose-800 dark:text-rose-300 hover:bg-white dark:hover:bg-stone-700 transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap"
              title="Simultaneous Catastrophe (Al-Gharqa wa al-Hadma)"
            >
              <Flame size={13} className="text-rose-500" />
              <span>{isUr ? "الغرقیٰ" : "Accident"}</span>
            </button>
          </div>
        </div>

        {/* Right: Canvas Utilities & Zoom */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Full HD Mode Toggle */}
          <button
            onClick={toggleFullHD}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-all shadow-2xs whitespace-nowrap ${
              isFullHD
                ? "bg-[#1b4d3e] text-white border-[#1b4d3e] shadow-md ring-2 ring-emerald-400/50"
                : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700"
            }`}
            title={isUr ? "مکمل اسکرین فل ایچ ڈی اسٹوڈیو (باہر نکلنے کے لیے دوبارہ دبائیں یا Esc)" : "Toggle Full HD edge-to-edge canvas (or press Esc to exit)"}
          >
            {isFullHD ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span>{isUr ? (isFullHD ? "عام اسکرین (Esc)" : "Full HD") : (isFullHD ? "Exit Full HD (Esc)" : "Full HD")}</span>
          </button>

          {/* Contextual Studio Reset Canvas Button */}
          <button
            onClick={() => {
              if (window.confirm(isUr ? "کیا آپ خاندانی نقشہ صاف کر کے دوبارہ شروع کرنا چاہتے ہیں؟" : "Reset canvas to fresh starter family?")) {
                setNodes(INITIAL_NODES_4_CHILDREN);
                setSelectedNodeId("deceased-root");
                setCanvasEstateGross(assets.cash || 0);
              }
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 dark:hover:bg-rose-950/30 text-stone-600 dark:text-stone-300 text-xs font-bold cursor-pointer transition-colors shadow-2xs whitespace-nowrap"
            title={isUr ? "خاندانی خاکہ صاف کریں" : "Reset Canvas"}
          >
            <RotateCcw size={13} />
            <span>{isUr ? "نیا خاکہ" : "Reset"}</span>
          </button>

          {/* Estate Input */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-medium">
            <span className="text-stone-400 font-serif text-[11px]">PKR</span>
            <input
              type="number"
              value={canvasEstateGross || ""}
              placeholder="0"
              onChange={(e) => {
                const val = Math.max(0, parseFloat(e.target.value) || 0);
                setCanvasEstateGross(val);
                if (!sandboxMode) {
                  updateAssets({ cash: val });
                }
              }}
              className="w-20 bg-transparent text-xs font-bold text-stone-800 dark:text-stone-100 focus:outline-hidden"
              step={100000}
            />
          </div>

          <div className="h-4 w-px bg-stone-300 dark:bg-stone-700" />

          {/* Auto Arrange */}
          <button
            onClick={handleAutoArrange}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-emerald-600/30 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-[#1b4d3e] dark:text-emerald-300 text-xs font-bold cursor-pointer transition-colors shadow-2xs whitespace-nowrap"
            title={isUr ? "تمام رشتہ داروں کو صاف و منظم شجرے کی ترتیب میں لائیں" : "Neatly auto-arrange tree into balanced tiers"}
          >
            <LayoutGrid size={14} />
            <span>{isUr ? "ترتیب" : "Arrange"}</span>
          </button>

          {/* Zoom Out */}
          <button
            onClick={() => setZoom((z) => Math.max(0.4, Number((z - 0.1).toFixed(2))))}
            className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 cursor-pointer transition-colors"
            title="Zoom Out"
          >
            <Minus size={14} />
          </button>

          <span className="text-xs font-semibold w-8 text-center text-stone-600 dark:text-stone-400">
            {Math.round(zoom * 100)}%
          </span>

          {/* Zoom In */}
          <button
            onClick={() => setZoom((z) => Math.min(2.0, Number((z + 0.1).toFixed(2))))}
            className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 cursor-pointer transition-colors"
            title="Zoom In"
          >
            <Plus size={14} />
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
            <RotateCcw size={14} />
          </button>

          {/* Inspector Toggle */}
          <button
            onClick={() => setInspectorOpen(!inspectorOpen)}
            className={`p-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-colors ${
              inspectorOpen
                ? "bg-[#245642] text-white border-[#245642]"
                : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-50"
            }`}
            title={isUr ? "تفصیلات کا پینل کھولیں/بند کریں" : "Toggle Inspector Panel"}
          >
            <Sliders size={14} />
          </button>

          {/* Snapshot PNG */}
          <button
            onClick={handleExportPNG}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#245642] hover:bg-[#1a3f30] text-white text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap"
            title={isUr ? "تصویر محفوظ کریں" : "Export PNG"}
          >
            <Download size={13} />
            <span>{isUr ? "تصویر" : "PNG"}</span>
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------
          MAIN CANVAS WORKSPACE (NODES & CONNECTORS)
          ------------------------------------------------------------------- */}
      <div className="flex-1 min-h-0 relative overflow-hidden flex">
        {/* Canvas Surface with Alabaster Linen */}
        <div
          ref={canvasRef}
          onMouseDown={handleCanvasMouseDown}
          className={`whiteboard-grid-surface flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing select-none ${
            isFullHD ? "h-full" : "h-[88vh]"
          }`}
          style={{
            backgroundColor: "#FAF8F5",
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
                  const curveY = y1 + 32;
                  const path = `M ${x1} ${y1} Q ${midX} ${curveY} ${x2} ${y2}`;

                  return (
                    <g key={conn.id}>
                      <path
                        d={path}
                        fill="none"
                        stroke="#D97706"
                        strokeWidth="4"
                        strokeDasharray="6,4"
                        opacity="0.95"
                      />
                      <circle cx={midX} cy={curveY - 8} r="6" fill="#D97706" />
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
                        strokeWidth="8"
                        opacity="0.4"
                        filter="url(#glow)"
                      />
                      {/* Animated Core Cable */}
                      <path
                        d={path}
                        fill="none"
                        stroke="url(#tanzilActiveGrad)"
                        strokeWidth="4.5"
                        strokeDasharray="7,5"
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
                      stroke="#78716C"
                      strokeWidth="2.75"
                      strokeDasharray="5,4"
                      opacity="0.8"
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
                    stroke="#164E3F"
                    strokeWidth="3.5"
                    opacity="0.9"
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
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
                    <span
                      className={`text-xs md:text-sm font-extrabold px-3 py-1 rounded-full border-2 shadow-sm tracking-tight ${badge.color}`}
                    >
                      {badge.text}
                    </span>
                  </div>

                  {/* Circular Node Body (r=45px, 90x90px) */}
                  <div
                    className={`relative w-[90px] h-[90px] rounded-full transition-all duration-200 border-[3.5px] ${
                      isSelected
                        ? "ring-4 ring-emerald-500/40 scale-105 shadow-2xl"
                        : "hover:scale-105 shadow-lg"
                    } ${
                      isRoot
                        ? "bg-[#245642] text-white border-amber-400 ring-4 ring-amber-400/20"
                        : isDeceased
                        ? "bg-rose-50/95 text-rose-950 border-rose-600 dark:bg-rose-950/70 dark:text-rose-100 ring-4 ring-rose-500/20"
                        : node.gender === "FEMALE"
                        ? "bg-pink-50/95 text-pink-950 border-pink-500 dark:bg-pink-950/60 dark:text-pink-100 ring-2 ring-pink-400/20"
                        : "bg-emerald-50/95 text-emerald-950 border-[#1b4d3e] dark:bg-emerald-950/60 dark:text-emerald-100 ring-2 ring-emerald-400/20"
                    }`}
                  >
                    {/* Inner cropped circle for the avatar */}
                    <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center relative">
                      <img
                        src={getNodeAvatar(node)}
                        alt={isUr ? node.nameUr : node.nameEn}
                        className={`w-full h-full object-cover scale-[1.22] transition-all duration-200 pointer-events-none select-none ${
                          isDeceased && !isRoot ? "grayscale contrast-125 opacity-75" : ""
                        }`}
                        crossOrigin="anonymous"
                        loading="eager"
                      />

                      {/* Root Deceased Gold Judicial Scale Badge Overlay */}
                      {isRoot && (
                        <div className="absolute inset-0 bg-[#245642]/35 flex items-center justify-center pointer-events-none">
                          <div className="bg-[#1b4334]/90 p-1.5 rounded-full border border-amber-400 shadow-md">
                            <Scale size={20} className="text-amber-300 drop-shadow-sm" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Distinct Red Cross Badge on Top Right for Deceased */}
                    {isDeceased && !isRoot && (
                      <div
                        className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center border-2 border-white dark:border-[#0E1E18] shadow-md z-30 pointer-events-none"
                        title={isUr ? "متوفیٰ (وفات پا چکا ہے)" : "Deceased"}
                      >
                        <X size={15} strokeWidth={3.5} />
                      </div>
                    )}
                  </div>

                  {/* Node Name & Kinship Label Below - Clean Direct Typography */}
                  <div className="absolute top-[96px] left-1/2 -translate-x-1/2 text-center pointer-events-none z-20 min-w-[160px] max-w-[240px]">
                    <p
                      className={`text-sm md:text-base font-bold font-nastaliq leading-[2.4] text-stone-900 dark:text-stone-100 whitespace-normal ${
                        isSelected ? "text-emerald-900 dark:text-emerald-200 font-black" : ""
                      }`}
                    >
                      {isUr ? (node.nameUr || node.relation) : (node.nameEn || node.relation)}
                    </p>
                    <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-full text-stone-600 dark:text-stone-300">
                      {node.relation}
                    </span>
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
                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white dark:bg-stone-800 border-2 border-emerald-600 text-emerald-700 dark:text-emerald-300 flex items-center justify-center hover:bg-emerald-50 shadow-md cursor-pointer hover:scale-125 transition-transform z-30"
                        title={isUr ? "والدین شامل کریں" : "Add Parent"}
                      >
                        <Plus size={15} strokeWidth={3} />
                      </button>
                    )}

                    {/* Bottom Handle: Add Child */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addRelativeNode(node.id, "child");
                      }}
                      className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white dark:bg-stone-800 border-2 border-[#1b4d3e] text-[#1b4d3e] dark:text-emerald-300 flex items-center justify-center hover:bg-emerald-50 shadow-md cursor-pointer hover:scale-125 transition-transform z-30"
                      title={isUr ? "اولاد شامل کریں" : "Add Child"}
                    >
                      <Plus size={15} strokeWidth={3} />
                    </button>

                    {/* Right Handle: Add Spouse */}
                    {(node.relation === "DECEASED" || node.relation === "SON" || node.relation === "DAUGHTER") && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addRelativeNode(node.id, "spouse");
                        }}
                        className="absolute top-1/2 -right-3.5 -translate-y-1/2 w-7 h-7 rounded-full bg-white dark:bg-stone-800 border-2 border-amber-500 text-amber-700 dark:text-amber-300 flex items-center justify-center hover:bg-amber-50 shadow-md cursor-pointer hover:scale-125 transition-transform z-30"
                        title={isUr ? "شریکِ حیات شامل کریں" : "Add Spouse"}
                      >
                        <Plus size={15} strokeWidth={3} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tanzīl Quick Status Ribbon - Positioned away from inspector in both LTR and RTL */}
          <div className="absolute bottom-4 ltr:left-4 rtl:right-4 z-20 bg-white/95 dark:bg-[#0E1E18]/95 backdrop-blur-md p-3 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-lg max-w-sm">
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
          <div className="w-88 border-l border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0E1E18] flex flex-col z-30 shadow-2xl">
            {/* Inspector Header with prominent close button */}
            <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/70 dark:bg-stone-900/50">
              <div className="flex items-center gap-2.5">
                <Sliders size={18} className="text-[#245642] dark:text-emerald-400" />
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  {isUr ? "تفصیلاتِ رشتہ دار (انسپکٹر)" : "Node Inspector"}
                </h3>
              </div>
              <button
                onClick={() => setInspectorOpen(false)}
                className="text-stone-500 hover:text-stone-900 dark:hover:text-white cursor-pointer p-1.5 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
                title={isUr ? "بند کریں (Close)" : "Close Inspector"}
              >
                <X size={18} />
              </button>
            </div>

            {/* Inspector Body */}
            <div className="p-5 space-y-5 flex-1 overflow-y-auto">
              {/* Names */}
              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">
                  {isUr ? "نام (اردو)" : "Name (Urdu)"}
                </label>
                <input
                  type="text"
                  value={selectedNode.nameUr}
                  onChange={(e) => updateSelectedNode({ nameUr: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm font-nastaliq leading-[2.2] focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">
                  {isUr ? "نام (انگریزی)" : "Name (English)"}
                </label>
                <input
                  type="text"
                  value={selectedNode.nameEn}
                  onChange={(e) => updateSelectedNode({ nameEn: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm font-sans focus:outline-emerald-600"
                />
              </div>

              {/* Status: Alive vs Predeceased */}
              {selectedNode.relation !== "DECEASED" && (
                <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-2.5">
                    {isUr ? "حیات یا وفات کی حالت" : "Vital Status"}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => updateSelectedNode({ isAlive: true })}
                      className={`py-2.5 px-4 rounded-xl text-sm font-extrabold border-2 transition-all cursor-pointer ${
                        selectedNode.isAlive
                          ? "bg-emerald-600 text-white border-emerald-700 shadow-md scale-102"
                          : "bg-stone-100 text-stone-600 border-stone-200 dark:bg-stone-800 dark:text-stone-300"
                      }`}
                    >
                      {isUr ? "حیات (زندہ)" : "Alive"}
                    </button>
                    <button
                      onClick={() => updateSelectedNode({ isAlive: false })}
                      className={`py-2.5 px-4 rounded-xl text-sm font-extrabold border-2 transition-all cursor-pointer ${
                        !selectedNode.isAlive
                          ? "bg-rose-600 text-white border-rose-700 shadow-md scale-102"
                          : "bg-stone-100 text-stone-600 border-stone-200 dark:bg-stone-800 dark:text-stone-300"
                      }`}
                    >
                      {isUr ? "متوفیٰ (وفات)" : "Predeceased"}
                    </button>
                  </div>
                  <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                    {isUr
                      ? "اولاد کو 'متوفیٰ' کرنے سے تنزیل کا قانون خودکار طور پر اثر انداز ہوتا ہے۔"
                      : "Toggling to predeceased simulates whether grandchildren receive representation."}
                  </p>
                </div>
              )}

              {/* Gender */}
              <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-2.5">
                  {isUr ? "جنس (مرد / خاتون)" : "Gender"}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => updateSelectedNode({ gender: "MALE" })}
                    className={`py-2.5 px-4 rounded-xl text-sm font-extrabold border-2 cursor-pointer transition-all ${
                      selectedNode.gender === "MALE"
                        ? "bg-[#1b4d3e] text-white border-[#13382c] shadow-md scale-102"
                        : "bg-stone-100 text-stone-600 border-stone-200 dark:bg-stone-800 dark:text-stone-300"
                    }`}
                  >
                    {isUr ? "مرد (Green)" : "Male"}
                  </button>
                  <button
                    onClick={() => updateSelectedNode({ gender: "FEMALE" })}
                    className={`py-2.5 px-4 rounded-xl text-sm font-extrabold border-2 cursor-pointer transition-all ${
                      selectedNode.gender === "FEMALE"
                        ? "bg-pink-600 text-white border-pink-700 shadow-md scale-102"
                        : "bg-stone-100 text-stone-600 border-stone-200 dark:bg-stone-800 dark:text-stone-300"
                    }`}
                  >
                    {isUr ? "خاتون (Pink)" : "Female"}
                  </button>
                </div>
              </div>

              {/* Illustrated Avatar Picker */}
              <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block">
                    {isUr ? "تصویر / اواتار (Avatar)" : "Illustrated Avatar"}
                  </label>
                  {selectedNode.customAvatar && (
                    <button
                      type="button"
                      onClick={() => updateSelectedNode({ customAvatar: undefined })}
                      className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      {isUr ? "طے شدہ اواتار بحال کریں" : "Reset Default"}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {AVATAR_OPTIONS.map((opt) => {
                    const activeAvatar = getNodeAvatar(selectedNode);
                    const isPicked = (selectedNode.customAvatar || activeAvatar) === opt.src;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateSelectedNode({ customAvatar: opt.src })}
                        title={isUr ? opt.labelUr : opt.labelEn}
                        className={`relative rounded-full aspect-square p-0.5 border-2 transition-all cursor-pointer overflow-hidden ${
                          isPicked
                            ? "border-emerald-600 ring-2 ring-emerald-500/50 scale-105 shadow-sm"
                            : "border-stone-200 dark:border-stone-700 hover:border-emerald-400 opacity-80 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={opt.src}
                          alt={opt.labelEn}
                          className="w-full h-full rounded-full object-cover scale-[1.2]"
                          crossOrigin="anonymous"
                        />
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1.5">
                  {isUr
                    ? "کسی بھی رشتے دار کے لیے اواتار کا دستی انتخاب ممکن ہے۔"
                    : "Customize or change the illustrated avatar for this family member."}
                </p>
              </div>

              {/* Unpaid Mahr for Wife */}
              {selectedNode.relation === "SPOUSE" && selectedNode.gender === "FEMALE" && (
                <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
                  <label className="text-xs font-bold text-amber-900 dark:text-amber-200 block mb-1.5">
                    {isUr ? "غیر ادا شدہ مہر (مہرِ مؤجل) PKR" : "Unpaid Mahr (PKR)"}
                  </label>
                  <input
                    type="number"
                    value={selectedNode.unpaidMahr || ""}
                    placeholder="0"
                    onChange={(e) => updateSelectedNode({ unpaidMahr: Math.max(0, parseFloat(e.target.value) || 0) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-400 bg-amber-50/70 dark:bg-amber-950/30 text-sm font-bold text-amber-900 dark:text-amber-100"
                    step={10000}
                  />
                  <p className="text-xs text-amber-800 dark:text-amber-300 mt-1.5 leading-relaxed">
                    {isUr
                      ? "مہرِ مؤجل ترکے سے پہلے بطور قرض ادا ہوتا ہے، پھر حصہ ملتا ہے۔"
                      : "Unpaid Mahr is treated as prior debt (Duyūn al-Nās) deducted before division."}
                  </p>
                </div>
              )}

              {/* Sharia Impediments (Mawani' al-Irth) */}
              {selectedNode.relation !== "DECEASED" && (
                <div className="pt-3 border-t border-stone-200 dark:border-stone-800 space-y-2.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block">
                    {isUr ? "موانعِ ارث (شرعی رکاوٹیں)" : "Sharia Impediments"}
                  </label>

                  <label className="flex items-center gap-2.5 text-xs md:text-sm font-medium text-stone-800 dark:text-stone-200 cursor-pointer">
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
                      className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                    />
                    <span>{isUr ? "قتلِ مورث (قاتل بن گیا)" : "Homicide of Decedent (Qātil)"}</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs md:text-sm font-medium text-stone-800 dark:text-stone-200 cursor-pointer">
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
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>{isUr ? "کفر / غیر مسلم" : "Non-Muslim (Kufr)"}</span>
                  </label>
                </div>
              )}

              {/* Delete Node Action */}
              {selectedNode.relation !== "DECEASED" && (
                <div className="pt-5 border-t border-stone-200 dark:border-stone-800">
                  <button
                    onClick={() => deleteNode(selectedNode.id)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs md:text-sm font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    <Trash2 size={16} />
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
        <div className="fixed inset-0 z-[100000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
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
