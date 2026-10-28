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
  Target,
  BookOpen,
  Users,
  Home,
  UserCheck,
  Orbit,
} from "lucide-react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { calculateInheritance, calculateBalanceSheet } from "@/lib/fiqh-engine";
import { WhiteboardExplanationDrawer } from "./WhiteboardExplanationDrawer";
import { PersonNode, WifeProfile, HeirsInput, DeceasedInfo, EstateAssets, EstateDebts, BranchCalculationResult } from "@/types/fiqh";
import html2canvas from "html2canvas";
import { WHITEBOARD_TEMPLATES, type WhiteboardPresetTemplate, type TemplateCategory } from "@/lib/whiteboard-templates";

/* =========================================================================
   TYPES & INTERFACES FOR WHITEBOARD
   ========================================================================= */

export type { WhiteboardRelation, WhiteboardNode } from "@/lib/whiteboard-model";
import { type WhiteboardNode, type WhiteboardError, type AddRelativeType, WHITEBOARD_ERRORS, validateWhiteboard, getAddRelativeError, createWhiteboardRelative, editWhiteboardPerson, removeWhiteboardPerson, projectWhiteboardFamily, arrangeWhiteboard as arrangeFamily, createWhiteboardSibling, type SiblingKind } from "@/lib/whiteboard-model";

export const AVATAR_OPTIONS = [
  { id: "father", src: "/images/avatars/father.jpeg", labelEn: "Father / Elder Male", labelUr: "والد / بزرگ مرد" },
  { id: "mother", src: "/images/avatars/mother.jpeg", labelEn: "Mother / Elder Female", labelUr: "والدہ / بزرگ خاتون" },
  { id: "husband", src: "/images/avatars/husband.jpeg", labelEn: "Husband", labelUr: "شوہر" },
  { id: "wife", src: "/images/avatars/wife.jpeg", labelEn: "Wife", labelUr: "زوجہ / بیوہ" },
  { id: "son", src: "/images/avatars/son.jpeg", labelEn: "Son", labelUr: "بیٹا" },
  { id: "daughter", src: "/images/avatars/daughter.jpeg", labelEn: "Daughter", labelUr: "بیٹی" },
  { id: "grand-son", src: "/images/avatars/grand-son.jpeg", labelEn: "Grandson", labelUr: "پوتا / نواسہ" },
  { id: "grand-daughter", src: "/images/avatars/grand-daughter.jpeg", labelEn: "Granddaughter", labelUr: "پوتی / نواسی" },
];

export function getNodeAvatar(node: WhiteboardNode): string {
  if (node.customAvatar) return node.customAvatar;

  // Root deceased
  if (node.relation === "DECEASED") {
    return node.gender === "FEMALE"
      ? "/images/avatars/mother.jpeg"
      : "/images/avatars/father.jpeg";
  }

  // Parents / Grandparents
  if (node.relation === "FATHER") {
    return "/images/avatars/father.jpeg";
  }
  if (node.relation === "MOTHER") {
    return "/images/avatars/mother.jpeg";
  }

  // Spouse
  if (node.relation === "SPOUSE") {
    return node.gender === "FEMALE"
      ? "/images/avatars/wife.jpeg"
      : "/images/avatars/husband.jpeg";
  }

  // Children
  if (node.relation === "SON") {
    return "/images/avatars/son.jpeg";
  }
  if (node.relation === "DAUGHTER") {
    return "/images/avatars/daughter.jpeg";
  }

  // Grandchildren
  if (node.relation === "GRANDCHILD") {
    return node.gender === "FEMALE"
      ? "/images/avatars/grand-daughter.jpeg"
      : "/images/avatars/grand-son.jpeg";
  }

  // Fallback by gender
  return node.gender === "FEMALE"
    ? "/images/avatars/daughter.jpeg"
    : "/images/avatars/son.jpeg";
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
  const { language, assets, debts, deceased: planningInfo, updateDeceased, updateAssets, updateDebts, updateHeirs, setActiveView } = useInheritanceStore();
  const isUr = language === "ur";
  const arrangeWhiteboard=useCallback((familyNodes:readonly WhiteboardNode[])=>arrangeFamily(familyNodes,isUr),[isUr]);

  // Canvas Viewport State
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 40, y: 30 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Nodes & Selection
  const [nodes, setNodes] = useState<WhiteboardNode[]>(() => arrangeWhiteboard(INITIAL_NODES_4_CHILDREN));
  const [estateSubjectId, setEstateSubjectId] = useState("deceased-root");
  const [deletedSnapshot, setDeletedSnapshot] = useState<WhiteboardNode[] | null>(null);
  const family = useMemo(() => projectWhiteboardFamily(nodes, estateSubjectId), [nodes, estateSubjectId]);
  const nodesRef = useRef(nodes);
  nodesRef.current = nodes;
  const [relationshipError, setRelationshipError] = useState<WhiteboardError | null>(null);
  const errorMessage = (error: WhiteboardError) => WHITEBOARD_ERRORS[error][isUr ? "ur" : "en"];
  const replaceNodes = (candidate: WhiteboardNode[]) => {
    const error = validateWhiteboard(candidate);
    setRelationshipError(error);
    if (error) return false;
    if (!candidate.some(n => n.id === estateSubjectId)) setEstateSubjectId(candidate.find(n => n.relation === "DECEASED")!.id);
    nodesRef.current = candidate;
    setDeletedSnapshot(null);
    setNodes(candidate);
    return true;
  };
  const [siblingKind, setSiblingKind] = useState<SiblingKind>("full");
  const [siblingParentsAlive, setSiblingParentsAlive] = useState(false);
  const [collapsedBranches, setCollapsedBranches] = useState<Set<string>>(new Set());
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

  // Ready-Made Shia Inheritance Templates Modal
  const [showTemplatesModal, setShowTemplatesModal] = useState<boolean>(false);
  const [templateCategoryFilter, setTemplateCategoryFilter] = useState<"ALL" | TemplateCategory>("ALL");
  const [activeTemplateId, setActiveTemplateId] = useState<string>("template-nuclear-standard");

  // Inspector Open State
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(true);
  const [isExplanationOpen, setIsExplanationOpen] = useState<boolean>(false);

  // Canvas Reference for export
  const canvasRef = useRef<HTMLDivElement>(null);

  // Smooth Center-Anchored Zoom Function
  const setZoomAnchored = useCallback(
    (newZoomVal: number | ((prev: number) => number), focal?: { x: number; y: number }) => {
      setZoom((prevZoom) => {
        const targetZoom = typeof newZoomVal === "function" ? newZoomVal(prevZoom) : newZoomVal;
        const clampedZoom = Math.min(2.0, Math.max(0.3, Number(targetZoom.toFixed(2))));
        if (Math.abs(clampedZoom - prevZoom) < 0.001) return prevZoom;

        const surface = canvasRef.current;
        if (surface) {
          const rect = surface.getBoundingClientRect();
          const fx = focal ? focal.x - rect.left : surface.clientWidth / 2;
          const fy = focal ? focal.y - rect.top : surface.clientHeight / 2;

          setPan((prevPan) => {
            const canvasX = (fx - prevPan.x) / prevZoom;
            const canvasY = (fy - prevPan.y) / prevZoom;
            return {
              x: Math.round(fx - canvasX * clampedZoom),
              y: Math.round(fy - canvasY * clampedZoom),
            };
          });
        }
        return clampedZoom;
      });
    },
    []
  );

  const frameBoard = useCallback((candidate: WhiteboardNode[]) => {
    const surface = canvasRef.current;
    if (!surface || !candidate.length) return;
    const minX = Math.min(...candidate.map((n) => n.x)) - 140,
      maxX = Math.max(...candidate.map((n) => n.x)) + 140;
    const minY = Math.min(...candidate.map((n) => n.y)) - 110,
      maxY = Math.max(...candidate.map((n) => n.y)) + 190;
    const scale = Math.min(
      1.1,
      Math.max(0.35, Math.min(surface.clientWidth / (maxX - minX + 60), surface.clientHeight / (maxY - minY + 60)))
    );
    setZoom(Number(scale.toFixed(2)));
    setPan({
      x: (surface.clientWidth - (maxX - minX) * scale) / 2 - minX * scale,
      y: (surface.clientHeight - (maxY - minY) * scale) / 2 - minY * scale,
    });
  }, []);

  // Load a preset template onto the canvas
  const loadPresetTemplate = useCallback(
    (template: WhiteboardPresetTemplate) => {
      const arranged = arrangeFamily(template.nodes, isUr);
      if (replaceNodes(arranged)) {
        frameBoard(arranged);
        setEstateSubjectId("deceased-root");
        setDeletedSnapshot(null);
        setSelectedNodeId("deceased-root");
        setActiveTemplateId(template.id);
        setShowTemplatesModal(false);
      }
    },
    [isUr, frameBoard]
  );
  useEffect(() => { frameBoard(nodesRef.current); }, []);

  useEffect(()=>{
    const surface=canvasRef.current;
    if(!surface)return;
    const observer=new ResizeObserver(()=>frameBoard(nodesRef.current));
    observer.observe(surface);
    return ()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    const arranged=arrangeFamily(nodesRef.current,isUr);
    nodesRef.current=arranged;
    setNodes(arranged);
    frameBoard(arranged);
  },[isUr]);

  // Automatically re-center and frame family visual on the side whenever explanation drawer or inspector toggles
  useEffect(() => {
    const timer = setTimeout(() => {
      frameBoard(nodesRef.current);
    }, 80);
    return () => clearTimeout(timer);
  }, [isExplanationOpen, inspectorOpen]);

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
        if (showTemplatesModal) {
          setShowTemplatesModal(false);
          return;
        }
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
  }, [isFullHD, showAccidentModal, showTemplatesModal]);

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
        // Pinch-to-zoom or Ctrl+wheel zoom anchored to cursor
        const zoomDelta = e.deltaY < 0 ? 0.05 : -0.05;
        setZoomAnchored((z) => z + zoomDelta, { x: e.clientX, y: e.clientY });
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
  }, [setZoomAnchored]);

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
    setIsExplanationOpen(false);
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

  const addRelativeNode = (targetNodeId: string, type: AddRelativeType) => {
    const created = createWhiteboardRelative(nodesRef.current, targetNodeId, type, `node-${crypto.randomUUID()}`);
    if (created.error || !created.node) {
      setRelationshipError(created.error || "missing-person");
      return;
    }
    if (replaceNodes(arrangeWhiteboard([...nodesRef.current, created.node]))) {
      setSelectedNodeId(created.node.id);
      setInspectorOpen(true);
    }
  };

  const addSibling = (gender: "MALE" | "FEMALE") => {
    if(!selectedNodeId)return;
    const id=`node-${crypto.randomUUID()}`;
    const result=createWhiteboardSibling(nodesRef.current,selectedNodeId,gender,siblingKind,id);
    if(result.error){setRelationshipError(result.error);return;}
    const existing=new Set(nodesRef.current.map(n=>n.id));
    const candidate=result.nodes.map(n=>!existing.has(n.id) && n.id !== id ? {...n,isAlive:siblingParentsAlive} : n);
    const arranged=arrangeWhiteboard(candidate);
    if(replaceNodes(arranged)){setSelectedNodeId(id);frameBoard(arranged);}
  };

  const deleteNode = (nodeId: string) => {
    if (nodeId === estateSubjectId || nodesRef.current.find(n => n.id === nodeId)?.relation === "DECEASED") return;
    const snapshot = nodesRef.current;
    const candidate = removeWhiteboardPerson(snapshot, nodeId);
    if (candidate.some(n => n.id === estateSubjectId) && replaceNodes(candidate) && !candidate.some(n => n.id === selectedNodeId)) {
      setSelectedNodeId(estateSubjectId);
    }
    if (candidate.some(n => n.id === estateSubjectId)) setDeletedSnapshot(snapshot);
  };

  const exploreEstate = (nodeId: string) => {
    const edited = {nodes:nodesRef.current};
    if (!edited.nodes.some(n=>n.id === nodeId)) return;
    setEstateSubjectId(nodeId);
    setSelectedNodeId(nodeId);
    const person=edited.nodes.find(n=>n.id === nodeId)!;
    const surface=canvasRef.current;
    if(surface) setPan({x:surface.clientWidth/2-person.x*zoom,y:surface.clientHeight/2-person.y*zoom});
  };

  const focusOnPerson = useCallback(
    (person: WhiteboardNode) => {
      const surface = canvasRef.current;
      if (surface) {
        setPan({
          x: Math.round(surface.clientWidth / 2 - person.x * zoom),
          y: Math.round(surface.clientHeight / 2 - (person.y + 60) * zoom),
        });
      }
    },
    [zoom]
  );

  /* -------------------------------------------------------------------------
     FIQH ENGINE REAL-TIME CALCULATION INTEGRATION
     ------------------------------------------------------------------------- */

  const calculationData = useMemo(() => {
    const root = family.subject;
    if (!root) return null;

    const deceasedInfo: DeceasedInfo = {
      gender: root.gender === "MALE" ? "male" : "female",
      name: isUr ? root.nameUr : root.nameEn,
      currency: planningInfo.currency,
      marja: planningInfo.marja,
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
    const wivesList: WifeProfile[] = family.spouses
      .filter((n) => n.gender === "FEMALE")
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
    const directChildren = family.children;

    directChildren.forEach((child) => {
      const grandchildren = family.grandchildren.get(child.id) || [];
      const childNode: PersonNode = {
        id: child.id,
        name: isUr ? child.nameUr : child.nameEn,
        gender: child.gender,
        isAlive: child.isAlive,
        relation: child.gender === "MALE" ? "SON" : "DAUGHTER",
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
    const fatherNode = family.parents.find(n=>n.gender === "MALE");
    const motherNode = family.parents.find(n=>n.gender === "FEMALE");

    const eligible = (n: WhiteboardNode) => n.isAlive && !n.impediments?.isKiller && !n.impediments?.isNonMuslim;
    const countRole = (role: string) => nodes.filter(n=>family.roles.get(n.id) === role && eligible(n)).length;
    const heirsInput: HeirsInput = {
      wives: wivesList,
      spouseCount: root.gender === "MALE" ? wivesList.filter((w) => w.isAlive).length : family.spouses.filter(n => n.gender === "MALE" && n.isAlive && !n.impediments?.isKiller && !n.impediments?.isNonMuslim).length,
      fatherAlive: !!(fatherNode && fatherNode.isAlive && !fatherNode.impediments?.isKiller && !fatherNode.impediments?.isNonMuslim),
      fatherImpediment: !!(fatherNode?.impediments?.isKiller || fatherNode?.impediments?.isNonMuslim),
      motherAlive: !!(motherNode && motherNode.isAlive && !motherNode.impediments?.isKiller && !motherNode.impediments?.isNonMuslim),
      motherImpediment: !!(motherNode?.impediments?.isKiller || motherNode?.impediments?.isNonMuslim),
      sonsCount: directChildren.filter((c) => c.gender === "MALE" && c.isAlive && !c.impediments?.isKiller && !c.impediments?.isNonMuslim).length,
      daughtersCount: directChildren.filter((c) => c.gender === "FEMALE" && c.isAlive && !c.impediments?.isKiller && !c.impediments?.isNonMuslim).length,
      deceasedSonsWithChildren: [],
      deceasedDaughtersWithChildren: [],
      namedDescendants,
      childrenList: namedDescendants.map(child => ({
        id: child.id,
        name: child.name,
        gender: child.gender,
        isAlive: child.isAlive,
        impediments: { isKiller: Boolean(child.impediments?.isKiller), isNonMuslim: Boolean(child.impediments?.isNonMuslim), isLian: false },
        children: (child.children || []).map(gc => ({
          id: gc.id, name: gc.name, gender: gc.gender, isAlive: gc.isAlive,
          parentGender: child.gender, parentChildId: child.id,
          impediments: { isKiller: Boolean(gc.impediments?.isKiller), isNonMuslim: Boolean(gc.impediments?.isNonMuslim), isLian: false },
        })),
      })),
      paternalGrandfatherAlive: countRole("PATERNAL_GRANDFATHER") > 0,
      paternalGrandmotherAlive: countRole("PATERNAL_GRANDMOTHER") > 0,
      maternalGrandfatherAlive: countRole("MATERNAL_GRANDFATHER") > 0,
      maternalGrandmotherAlive: countRole("MATERNAL_GRANDMOTHER") > 0,
      fullBrothersCount: countRole("FULL_BROTHER"),
      fullSistersCount: countRole("FULL_SISTER"),
      paternalBrothersCount: countRole("PATERNAL_BROTHER"),
      paternalSistersCount: countRole("PATERNAL_SISTER"),
      uterineBrothersCount: countRole("MATERNAL_BROTHER"),
      uterineSistersCount: countRole("MATERNAL_SISTER"),
      deceasedSiblingsChildren: [],
      motherBlockingBrothers: countRole("FULL_BROTHER") + countRole("PATERNAL_BROTHER"),
      motherBlockingSisters: countRole("FULL_SISTER") + countRole("PATERNAL_SISTER"),
      paternalUnclesCount: countRole("PATERNAL_UNCLE"),
      paternalAuntsCount: countRole("PATERNAL_AUNT"),
      maternalUnclesCount: countRole("MATERNAL_UNCLE"),
      maternalAuntsCount: countRole("MATERNAL_AUNT"),
      paternalCousinsCount: countRole("PATERNAL_COUSIN"),
      maternalCousinsCount: countRole("MATERNAL_COUSIN"),
    };

    const calcResult = calculateInheritance(deceasedInfo, currentAssets, currentDebts, heirsInput);
    const balanceSheet = calculateBalanceSheet(currentAssets, currentDebts, deceasedInfo, heirsInput);

    // Calculate Tanzīl branches
    const livingDirectCount = directChildren.filter(
      (c) => c.isAlive && !c.impediments?.isKiller && !c.impediments?.isNonMuslim
    ).length;

    const tanzilOutput = {branchResults: calcResult.branchResults || []};

    return {
      ready: family.unresolvedIds.size === 0,
      deceasedInfo,
      heirsInput,
      calcResult,
      balanceSheet,
      tanzilOutput,
      livingDirectCount,
      isTanzilActive: livingDirectCount === 0 && namedDescendants.some((c) => !c.isAlive && c.children?.some(gc => gc.isAlive && !gc.impediments?.isKiller && !gc.impediments?.isNonMuslim)),
      isGrossZero,
      canvasEstateGross,
    };
  }, [nodes, family, canvasEstateGross, debts, isUr, planningInfo.currency, planningInfo.marja]);

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
          if (family.roles.get(node.id) === "GRANDCHILD") {
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

      if (node.secondParentId) {
        list.push({id:`conn-second-parent-${node.id}`,fromId:node.secondParentId,toId:node.id,type:"parent-child"});
      }

      // Father/Mother to Root
      if ((node.relation === "FATHER" || node.relation === "MOTHER") && root) {
        list.push({
          id: `conn-parent-${node.id}`,
          fromId: node.id,
          toId: node.parentOfId || root.id,
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
    const arranged = arrangeWhiteboard(nodes);
    replaceNodes(arranged);
    frameBoard(arranged);
  };

  /* -------------------------------------------------------------------------
     SYNC WHITEBOARD FAMILY INTO MAIN CALCULATOR WIZARD
     ------------------------------------------------------------------------- */

  const handleSyncToCalculator = () => {
    const error = validateWhiteboard(nodesRef.current);
    if (error || !calculationData || !calculationData.ready) { setRelationshipError(error || "incomplete-family"); return; }
    updateDeceased(calculationData.deceasedInfo);
    updateHeirs(calculationData.heirsInput);

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

  const branchFamily=family;
  const branchGroups=[...branchFamily.spouses.map((spouse,index)=>({id:spouse.id,title:isUr?spouse.nameUr:spouse.nameEn,color:["#0369a1","#7c3aed","#b45309","#0f766e"][index%4],children:branchFamily.children.filter(c=>branchFamily.getParents(c.id).some(p=>p.id === spouse.id))})),{id:"unassigned",title:isUr?"دوسرے والد / والدہ کی تصدیق باقی":"Parent link needed",color:"#78716c",children:branchFamily.children.filter(c=>branchFamily.getParents(c.id).length < 2)}];
  const hiddenIds=new Set<string>();
  const hideBranch=(id:string)=>{if(hiddenIds.has(id))return;hiddenIds.add(id);branchFamily.getChildren(id).forEach(n=>hideBranch(n.id));nodes.filter(n=>n.spouseOfId === id).forEach(n=>hideBranch(n.id));};
  branchGroups.filter(g=>collapsedBranches.has(g.id)).forEach(g=>g.children.forEach(n=>hideBranch(n.id)));
  const visibleNodes=nodes.filter(n=>!hiddenIds.has(n.id));

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const updateSelectedNode = (partial: Partial<WhiteboardNode>) => {
    if (!selectedNodeId) return;
    const edited = editWhiteboardPerson(nodesRef.current, selectedNodeId, partial);
    if (edited.error) { setRelationshipError(edited.error); return; }
    replaceNodes("secondParentId" in partial ? arrangeWhiteboard(edited.nodes) : edited.nodes);
  };

  /* -------------------------------------------------------------------------
     GET SHARE BADGE TEXT FOR A NODE
     ------------------------------------------------------------------------- */

  const shareForNode=(node:WhiteboardNode)=>{
    const role=family.roles.get(node.id) || "OTHER";
    const key=role === "SPOUSE"?(node.gender === "MALE"?"husband":"wives"):role === "SON"?"sons":role === "DAUGHTER"?"daughters":role.toLowerCase();
    return calculationData?.calcResult.heirShares.find(share=>share.id === key || share.relationKey === key || share.id === `tanzil_${node.id}` || share.id === `${key}s`);
  };

  const getNodeShareBadge = (node: WhiteboardNode) => {
    const role=family.roles.get(node.id) || "OTHER";
    if(node.id === estateSubjectId) return {text:node.isAlive ? (isUr?"زندہ مرکزی شخص · فرضی ترکہ":"Living subject · hypothetical estate") : (isUr?"منتخب ترکہ":"Selected estate"),color:"bg-[#245642] text-white border-amber-400 font-bold"};
    if(!node.isAlive) return {text:isUr?"پہلے وفات پا چکے":"Predeceased",color:"bg-rose-100 text-rose-900 border-rose-300"};
    if(node.impediments?.isKiller || node.impediments?.isNonMuslim) return {text:isUr?"مانعِ ارث موجود":"Impediment selected",color:"bg-rose-100 text-rose-900 border-rose-300"};
    if(!calculationData?.ready) return {text:isUr?"والدین کے ربط کی تصدیق کریں":"Confirm parent links",color:"bg-amber-50 text-amber-950 border-amber-300"};
    const zero=calculationData.isGrossZero;
    if(role === "GRANDCHILD") {
      if(calculationData.livingDirectCount > 0) return {text:isUr?"زندہ اولاد کے سبب محروم":"Blocked by living children",color:"bg-stone-100 text-stone-700 border-stone-300"};
      const branch=calculationData.tanzilOutput.branchResults.find(b=>b.person.id === node.id);
      if(branch) return {text:`${branch.finalFraction} (${Math.round(zero?0:branch.monetaryValue).toLocaleString()} ${planningInfo.currency})`,color:"bg-emerald-700 text-white border-emerald-800"};
    }
    const share=shareForNode(node);
    if(share) return {text:`${share.fractionString}${share.count > 1?(isUr?" مجموعی":" group"):""} · ${planningInfo.currency} ${Math.round(zero?0:share.sharePerIndividual).toLocaleString()}${share.count > 1?(isUr?" فی کس":" each"):""}`,color:"bg-[#245642] text-white border-[#163c2c]"};
    if(["FULL_BROTHER","FULL_SISTER","PATERNAL_BROTHER","PATERNAL_SISTER","MATERNAL_BROTHER","MATERNAL_SISTER"].includes(role))return {text:calculationData.calcResult.activeTier === 1?(isUr?"پہلے طبقے کے سبب حصہ نہیں":"No share: Tier 1 present"):(isUr?"گروہی نتیجہ نیچے دیکھیں؛ انفرادی تقسیم دستیاب نہیں":"See group result; individual allocation unavailable"),color:"bg-amber-50 text-amber-950 border-amber-300"};
    if(role === "OTHER") return {text:isUr?"دیگر خاندانی ربط":"Other family connection",color:"bg-stone-100 text-stone-700 border-stone-300"};
    return {text:isUr?"انفرادی حصہ ظاہر نہیں ہوا":"No individual allocation",color:"bg-stone-100 text-stone-700 border-stone-300"};
  };

  const relationLabel = (node: WhiteboardNode) => {
    const role=family.roles.get(node.id)||"OTHER";
    const urLabels:Record<string,string>={SUBJECT:"مرکزی شخص",FATHER:"والد",MOTHER:"والدہ",SON:"بیٹا",DAUGHTER:"بیٹی",SPOUSE:"شریکِ حیات",GRANDCHILD:"پوتا / پوتی / نواسا / نواسی",PATERNAL_GRANDFATHER:"دادا",PATERNAL_GRANDMOTHER:"دادی",MATERNAL_GRANDFATHER:"نانا",MATERNAL_GRANDMOTHER:"نانی",FULL_BROTHER:"سگا بھائی",FULL_SISTER:"سگی بہن",PATERNAL_BROTHER:"علاتی بھائی",PATERNAL_SISTER:"علاتی بہن",MATERNAL_BROTHER:"اخیافی بھائی",MATERNAL_SISTER:"اخیافی بہن",SIBLING_UNSPECIFIED:"بہن / بھائی · والدین نامکمل",PATERNAL_UNCLE:"چچا",PATERNAL_AUNT:"پھوپھی",MATERNAL_UNCLE:"ماموں",MATERNAL_AUNT:"خالہ",PATERNAL_COUSIN:"چچا زاد / پھوپھی زاد",MATERNAL_COUSIN:"ماموں زاد / خالہ زاد",OTHER:"دیگر رشتہ"};
    return isUr ? urLabels[role] || "دیگر رشتہ" : role === "SUBJECT" ? "Estate subject" : role === "SIBLING_UNSPECIFIED" ? "Sibling · parentage incomplete" : role.replaceAll("_"," ").toLowerCase();
  };

  const deletionPreview=selectedNode ? removeWhiteboardPerson(nodes,selectedNode.id) : nodes;
  const deleteBlocked=!selectedNode || selectedNode.relation === "DECEASED" || selectedNode.id === estateSubjectId || !deletionPreview.some(n=>n.id === estateSubjectId);
  const deleteReason=isUr ? "مرکزی خاندانی فرد یا فعال ترکے کے شخص کو حذف نہیں کر سکتے۔ نیا خاکہ شروع کرنے کے لیے Clean استعمال کریں۔" : "The family anchor and active estate subject must remain on the board. Use Clean to start a fresh family.";

  return (
    <div
      ref={studioContainerRef}
      className={`kinship-whiteboard-studio min-w-0 max-w-full w-full flex flex-col bg-[#FAF8F5] dark:bg-[#0B1713] text-stone-800 dark:text-stone-100 select-none ${
        isFullHD
          ? "fixed inset-0 z-[99999] w-screen h-screen overflow-hidden"
          : "min-h-[92vh]"
      }`}
    >
      <div className="px-4 py-3 bg-emerald-50 text-emerald-950 border-b border-emerald-200 text-sm leading-relaxed" role="note">
        {isUr ? "فرضی منصوبہ بندی: زندہ مرکزی شخص، پہلے فوت شدہ اولاد اور زندہ پوتے نواسے آزما سکتے ہیں۔ ہر شخص کے ایک حقیقی والد اور ایک حقیقی والدہ؛ مرد کے زیادہ سے زیادہ چار مستقل بیویوں کے رشتے، خاتون کا ایک شوہر۔ یہ نکاح کی تاریخ یا طلاق کا ماڈل نہیں ہے۔" : "What-if planning: explore a living subject, predeceased children, and surviving grandchildren. Each person has one biological father and mother; this board models up to four permanent-wife connections for a man and one husband for a woman. It does not model marriage history or divorce."}
      </div>
      <div className="whiteboard-subject-strip" role="status"><span><Sparkles size={18}/>{isUr?"اس وقت منتخب ترکہ:":"Currently exploring:"} <strong>{isUr?family.subject.nameUr:family.subject.nameEn}</strong></span><small>{isUr?"حیات کی حالت اور ترکے کا انتخاب الگ ہیں۔":"Survival settings and estate selection are separate."}</small></div>
      {!calculationData?.ready && <div role="alert" className="px-4 py-3 bg-amber-50 text-amber-950 border-b border-amber-300 text-sm">{WHITEBOARD_ERRORS["incomplete-family"][isUr?"ur":"en"]} {isUr?"متعلقہ افراد:":"People to review:"} {[...family.unresolvedIds].map(id=>nodes.find(n=>n.id===id)).filter(Boolean).map(n=>isUr?n!.nameUr:n!.nameEn).join(", ")}</div>}
      {deletedSnapshot && <div className="px-4 py-3 bg-stone-100 text-stone-900 flex items-center justify-between gap-4 text-sm" role="status"><span>{isUr?"فرد اور اس کی ذیلی شاخ ہٹا دی گئی۔":"Person and dependent branch removed."}</span><button onClick={()=>{if(replaceNodes(deletedSnapshot))setDeletedSnapshot(null);}} className="underline font-bold">{isUr?"واپس لائیں":"Undo deletion"}</button></div>}
      {relationshipError && <div className="px-4 py-3 bg-rose-50 text-rose-950 border-b border-rose-300 flex items-start justify-between gap-4 text-sm" role="alert"><span>{errorMessage(relationshipError)}</span><button type="button" onClick={() => setRelationshipError(null)} aria-label={isUr ? "پیغام بند کریں" : "Dismiss relationship message"}><X size={18}/></button></div>}
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

          <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800/80 p-1 rounded-xl border border-stone-200 dark:border-stone-700 shrink-0">
            {/* Primary Templates Modal Trigger */}
            <button
              onClick={() => setShowTemplatesModal(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#245642] hover:bg-[#1a3f30] text-white text-xs font-bold transition-all shadow-2xs hover:shadow-md cursor-pointer whitespace-nowrap active:scale-95 ring-1 ring-emerald-400/40"
              title={isUr ? "تمام فقہی نمونوں کی فہرست کھولیں" : "Open Shia Family Templates Library"}
            >
              <LayoutGrid size={13} className="text-amber-300" />
              <span>{isUr ? "تیار شدہ خاکے" : "Templates"}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/20 text-emerald-100">
                {WHITEBOARD_TEMPLATES.length}
              </span>
            </button>

            {/* Quick Presets Pills */}
            <button
              onClick={() => {
                const tmpl = WHITEBOARD_TEMPLATES.find((t) => t.id === "template-clean-slate");
                if (tmpl) loadPresetTemplate(tmpl);
              }}
              className="px-2 py-1 text-xs font-medium rounded-lg text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700 transition-colors cursor-pointer whitespace-nowrap"
              title="Clean Slate"
            >
              {isUr ? "خالی" : "Clean"}
            </button>

            <button
              onClick={() => {
                const tmpl = WHITEBOARD_TEMPLATES.find((t) => t.id === "template-nuclear-standard");
                if (tmpl) loadPresetTemplate(tmpl);
              }}
              className={`px-2 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTemplateId === "template-nuclear-standard"
                  ? "bg-white dark:bg-stone-700 text-[#245642] dark:text-emerald-300 shadow-2xs font-bold"
                  : "text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700"
              }`}
              title="Standard Nuclear Family (~52% of cases)"
            >
              {isUr ? "بنیادی خاندان" : "Nuclear"}
            </button>

            <button
              onClick={() => {
                const tmpl = WHITEBOARD_TEMPLATES.find((t) => t.id === "template-daughters-only");
                if (tmpl) loadPresetTemplate(tmpl);
              }}
              className={`px-2 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                activeTemplateId === "template-daughters-only"
                  ? "bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 shadow-2xs font-bold border border-purple-300 dark:border-purple-800"
                  : "text-purple-800 dark:text-purple-300 hover:bg-white dark:hover:bg-stone-700"
              }`}
              title="Daughters Only (Brother/Uncle Excluded)"
            >
              <ShieldAlert size={12} className="text-purple-600 dark:text-purple-400" />
              <span>{isUr ? "صرف بیٹیاں" : "Daughters"}</span>
            </button>

            <button
              onClick={() => {
                const tmpl = WHITEBOARD_TEMPLATES.find((t) => t.id === "template-tanzil-orphaned-grandchildren");
                if (tmpl) loadPresetTemplate(tmpl);
              }}
              className={`px-2 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                activeTemplateId === "template-tanzil-orphaned-grandchildren"
                  ? "bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 shadow-2xs font-bold border border-amber-300 dark:border-amber-800"
                  : "text-amber-800 dark:text-amber-300 hover:bg-white dark:hover:bg-stone-700"
              }`}
              title="Orphaned Grandchild Tanzil Representation"
            >
              <Sparkles size={12} className="text-amber-500" />
              <span>{isUr ? "تنزیل" : "Tanzīl"}</span>
            </button>

            <button
              onClick={() => {
                replaceNodes(arrangeWhiteboard(INITIAL_NODES_SIMULTANEOUS_ACCIDENT));
                frameBoard(arrangeWhiteboard(INITIAL_NODES_SIMULTANEOUS_ACCIDENT));
                setEstateSubjectId("deceased-root");
                setDeletedSnapshot(null);
                setSelectedNodeId("deceased-root");
                setShowAccidentModal(true);
              }}
              className="px-2 py-1 text-xs font-semibold rounded-lg text-rose-800 dark:text-rose-300 hover:bg-white dark:hover:bg-stone-700 transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap"
              title="Simultaneous Catastrophe (Al-Gharqa wa al-Hadma)"
            >
              <Flame size={12} className="text-rose-500" />
              <span>{isUr ? "الغرقیٰ" : "Accident"}</span>
            </button>
          </div>
        </div>

        {/* Right: Canvas Utilities & Zoom */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* 3D Cosmic Galaxy Mode Switch */}
          <button
            onClick={() => setActiveView("galaxy")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50/60 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-xs font-bold cursor-pointer transition-all shadow-2xs whitespace-nowrap"
            title={isUr ? "3D کہکشاں ویو کھولیں" : "Open 3D Cosmic Galaxy View"}
          >
            <Orbit size={14} className="text-purple-600 dark:text-purple-400" />
            <span>{isUr ? "3D کہکشاں" : "3D Galaxy"}</span>
          </button>

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
                replaceNodes(arrangeWhiteboard(INITIAL_NODES_4_CHILDREN));
                frameBoard(arrangeWhiteboard(INITIAL_NODES_4_CHILDREN));
                setEstateSubjectId("deceased-root");
                setDeletedSnapshot(null);
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
            <span className="text-stone-400 font-serif text-[11px]">{planningInfo.currency}</span>
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
            onClick={() => setZoomAnchored((z) => z - 0.1)}
            disabled={zoom <= 0.3}
            className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 cursor-pointer transition-colors disabled:opacity-40"
            title="Zoom Out"
          >
            <Minus size={14} />
          </button>

          <button
            onClick={() => setZoomAnchored(1.0)}
            className="text-xs font-semibold w-10 text-center text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            title={isUr ? "100% پر ری سیٹ کریں" : "Reset to 100%"}
          >
            {Math.round(zoom * 100)}%
          </button>

          {/* Zoom In */}
          <button
            onClick={() => setZoomAnchored((z) => z + 0.1)}
            disabled={zoom >= 2.0}
            className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 cursor-pointer transition-colors disabled:opacity-40"
            title="Zoom In"
          >
            <Plus size={14} />
          </button>

          {/* Reset Zoom */}
          <button
            onClick={() => frameBoard(nodesRef.current)}
            className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 cursor-pointer transition-colors"
            title={isUr ? "خاکہ اسکرین پر فٹ کریں" : "Fit Family to View"}
          >
            <RotateCcw size={14} />
          </button>

          {/* Inspector Toggle */}
          <button
            onClick={() => {
              setInspectorOpen(!inspectorOpen);
              if (!inspectorOpen) setIsExplanationOpen(false);
            }}
            className={`p-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-colors ${
              inspectorOpen
                ? "bg-[#245642] text-white border-[#245642]"
                : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-50"
            }`}
            title={isUr ? "تفصیلات کا پینل کھولیں/بند کریں" : "Toggle Inspector Panel"}
          >
            <Sliders size={14} />
          </button>

          {/* Shariah & Math Audit Explanation Drawer Toggle */}
          <button
            onClick={() => {
              setIsExplanationOpen(!isExplanationOpen);
              if (!isExplanationOpen) setInspectorOpen(false);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-all shadow-2xs whitespace-nowrap ${
              isExplanationOpen
                ? "bg-[#1b4d3e] text-amber-200 border-[#1b4d3e] shadow-md ring-2 ring-emerald-600/30"
                : "border-emerald-600/30 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-[#1b4d3e] dark:text-emerald-300"
            }`}
            title={isUr ? "شرعی رہنمائی و حسابی آڈٹ پینل کھولیں/بند کریں" : "Toggle Live Shariah & Math Explanatory Drawer"}
          >
            <BookOpen size={14} className={isExplanationOpen ? "text-amber-300" : "text-[#1b4d3e] dark:text-emerald-300"} />
            <span>{isUr ? "شرعی حساب و رہنمائی" : "Fiqh Audit"}</span>
            {calculationData?.calcResult && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
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

      <div className="flex gap-3 overflow-x-auto px-4 py-3 bg-white dark:bg-stone-950 border-b border-stone-200" aria-label={isUr?"خاندانی شاخیں":"Family branches"}>
        {branchGroups.filter(g=>g.children.length || g.id !== "unassigned").map(group=><div key={group.id} className="shrink-0 rounded-xl border bg-stone-50 dark:bg-stone-900 p-3 min-w-48" style={{borderInlineStart:`5px solid ${group.color}`}}>
          <strong className="block text-sm">{group.title}</strong>
          <span className="text-sm text-stone-600 dark:text-stone-300">{group.children.length} {isUr?(group.children.length === 1?"بچہ":"بچے"):(group.children.length === 1?"child":"children")}</span>
          <div className="flex gap-3 mt-2">
            <button type="button" aria-expanded={!collapsedBranches.has(group.id)} className="text-sm underline min-h-8" onClick={()=>setCollapsedBranches(previous=>{const next=new Set(previous);if(next.has(group.id))next.delete(group.id);else next.add(group.id);return next;})}>{collapsedBranches.has(group.id)?(isUr?"شاخ کھولیں":"Expand branch"):(isUr?"شاخ سمیٹیں":"Collapse branch")}</button>
            {group.id !== "unassigned" && <button type="button" className="text-sm font-bold min-h-8" onClick={()=>addRelativeNode(group.id,"child")}>{isUr?"اولاد +":"Child +"}</button>}
          </div>
        </div>)}
      </div>

      {/* -------------------------------------------------------------------
          MAIN CANVAS WORKSPACE (NODES & CONNECTORS)
          ------------------------------------------------------------------- */}
      <div className="flex-1 min-w-0 min-h-0 relative overflow-hidden flex">
        {/* Canvas Surface with Alabaster Linen */}
        <div
          ref={canvasRef}
          onMouseDown={handleCanvasMouseDown}
          className={`whiteboard-grid-surface min-w-0 flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing select-none ${
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

              {connections.filter(conn=>!hiddenIds.has(conn.fromId) && !hiddenIds.has(conn.toId)).map((conn) => {
                const fromNode = nodes.find((n) => n.id === conn.fromId);
                const toNode = nodes.find((n) => n.id === conn.toId);
                if (!fromNode || !toNode) return null;

                const x1 = fromNode.x;
                const y1 = conn.type === "spouse" ? fromNode.y : fromNode.y + 192;
                const x2 = toNode.x;
                const y2 = conn.type === "spouse" ? toNode.y : toNode.y - 85;

                if (conn.type === "spouse") {
                  // Horizontal Golden Cord connecting spouses
                  const midX = (x1 + x2) / 2;
                  const curveY = y1 + 32;
                  const direction = x2 >= x1 ? 1 : -1;
                  const path = `M ${x1 + direction*56} ${y1} Q ${midX} ${curveY} ${x2-direction*56} ${y2}`;

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
                    stroke={branchGroups.find(g=>g.children.some(c=>c.id === conn.toId))?.color || "#164E3F"}
                    strokeWidth="3.5"
                    opacity="0.9"
                  />
                );
              })}
            </svg>

            {/* Whiteboard Nodes */}
            {visibleNodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const badge = getNodeShareBadge(node);
              const isDeceased = !node.isAlive;
              const isRoot = node.id === estateSubjectId;

              return (
                <div
                  key={node.id}
                  tabIndex={0}
                  role="group"
                  aria-label={isUr?node.nameUr:node.nameEn}
                  onClick={(e)=>{e.stopPropagation();setSelectedNodeId(node.id);setInspectorOpen(true);setIsExplanationOpen(false);}}
                  onKeyDown={(e)=>{if(e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")){e.preventDefault();setSelectedNodeId(node.id);setInspectorOpen(true);setIsExplanationOpen(false);}}}
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
                    className={`relative w-[90px] h-[90px] rounded-full transition-all duration-200 border-[3.5px] ${isRoot ? "whiteboard-subject-halo" : ""} ${
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
                  <div className="whiteboard-nameplate absolute top-[108px] left-1/2 -translate-x-1/2 text-center pointer-events-auto z-20" title={isUr ? node.nameUr : node.nameEn}>
                    <p
                      className={`whiteboard-person-name text-base font-bold text-stone-900 dark:text-stone-100 ${
                        isSelected ? "text-emerald-900 dark:text-emerald-200 font-black" : ""
                      }`}
                    >
                      {isUr ? (node.nameUr || node.relation) : (node.nameEn || node.relation)}
                    </p>
                    <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-full text-stone-600 dark:text-stone-300">
                      {relationLabel(node)}
                    </span>
                  </div>

                  {/* Interactive Micro Handles (+) on Hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Top Handle: Add Parent */}
                    {node.relation === "DECEASED" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addRelativeNode(node.id, "parent");
                        }}
                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white dark:bg-stone-800 border-2 border-emerald-600 text-emerald-700 dark:text-emerald-300 flex items-center justify-center hover:bg-emerald-50 shadow-md cursor-pointer hover:scale-125 transition-transform z-30"
                        aria-label={isUr ? "والدین شامل کریں" : "Add Parent"}
                        aria-disabled={Boolean(getAddRelativeError(nodes,node.id,"parent"))}
                        title={getAddRelativeError(nodes,node.id,"parent") ? errorMessage(getAddRelativeError(nodes,node.id,"parent")!) : (isUr ? "والدین شامل کریں" : "Add Parent")}
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
                      aria-label={isUr ? "اولاد شامل کریں" : "Add Child"}
                      aria-disabled={Boolean(getAddRelativeError(nodes,node.id,"child"))}
                      title={getAddRelativeError(nodes,node.id,"child") ? errorMessage(getAddRelativeError(nodes,node.id,"child")!) : (isUr ? "اولاد شامل کریں" : "Add Child")}
                    >
                      <Plus size={15} strokeWidth={3} />
                    </button>

                    {/* Right Handle: Add Spouse */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addRelativeNode(node.id, "spouse");
                        }}
                        className="absolute top-1/2 -right-3.5 -translate-y-1/2 w-7 h-7 rounded-full bg-white dark:bg-stone-800 border-2 border-amber-500 text-amber-700 dark:text-amber-300 flex items-center justify-center hover:bg-amber-50 shadow-md cursor-pointer hover:scale-125 transition-transform z-30"
                        aria-label={isUr ? "شریکِ حیات شامل کریں" : "Add Spouse"}
                        aria-disabled={Boolean(getAddRelativeError(nodes,node.id,"spouse"))}
                        title={getAddRelativeError(nodes,node.id,"spouse") ? errorMessage(getAddRelativeError(nodes,node.id,"spouse")!) : (isUr ? "شریکِ حیات شامل کریں" : "Add Spouse")}
                      >
                        <Plus size={15} strokeWidth={3} />
                      </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Glass HUD Pill for Smooth Zoom Controls */}
          <div
            className="whiteboard-zoom-hud absolute bottom-5 start-5 z-20 flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/92 dark:bg-[#10241b]/95 backdrop-blur-md border border-stone-200/80 dark:border-emerald-800/60 select-none transition-all duration-200 shadow-xl"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            role="toolbar"
            aria-label={isUr ? "زوم کنٹرولز" : "Zoom controls"}
          >
            {/* Zoom Out Button */}
            <button
              type="button"
              onClick={() => setZoomAnchored((z) => z - 0.1)}
              disabled={zoom <= 0.3}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-emerald-900/50 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              title={isUr ? "زوم آؤٹ (−10%)" : "Zoom Out (−10%)"}
              aria-label={isUr ? "زوم آؤٹ" : "Zoom Out"}
            >
              <Minus size={15} strokeWidth={2.5} />
            </button>

            {/* Smooth Zoom Slider */}
            <div className="relative flex items-center group">
              <input
                type="range"
                min="30"
                max="200"
                step="1"
                value={Math.round(zoom * 100)}
                onChange={(e) => setZoomAnchored(Number(e.target.value) / 100)}
                className="whiteboard-zoom-slider w-24 sm:w-28 h-1.5 rounded-full"
                style={{
                  background: `linear-gradient(to right, #245642 0%, #245642 ${
                    ((zoom - 0.3) / (2.0 - 0.3)) * 100
                  }%, #e5e7eb ${((zoom - 0.3) / (2.0 - 0.3)) * 100}%, #e5e7eb 100%)`,
                }}
                aria-label={isUr ? "زوم لیول سلائیڈر" : "Zoom level slider"}
              />
            </div>

            {/* Zoom In Button */}
            <button
              type="button"
              onClick={() => setZoomAnchored((z) => z + 0.1)}
              disabled={zoom >= 2.0}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-emerald-900/50 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              title={isUr ? "زوم ان (+10%)" : "Zoom In (+10%)"}
              aria-label={isUr ? "زوم ان" : "Zoom In"}
            >
              <Plus size={15} strokeWidth={2.5} />
            </button>

            <div className="h-4 w-px bg-stone-300/80 dark:bg-stone-700 mx-0.5" />

            {/* Zoom Percentage Badge (Click to reset to 100%) */}
            <button
              type="button"
              onClick={() => setZoomAnchored(1.0)}
              className="px-2 py-1 rounded-lg text-xs font-bold text-stone-700 dark:text-emerald-300 hover:bg-stone-100 dark:hover:bg-emerald-900/40 active:scale-95 transition-all cursor-pointer min-w-12 text-center"
              title={isUr ? "100% پر ری سیٹ کریں" : "Click to reset to 100%"}
            >
              {Math.round(zoom * 100)}%
            </button>

            <div className="h-4 w-px bg-stone-300/80 dark:bg-stone-700 mx-0.5" />

            {/* Fit Family (Fit to View) Button */}
            <button
              type="button"
              onClick={() => frameBoard(nodesRef.current)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-[#1b4d3e] dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/60 hover:bg-emerald-100/90 dark:hover:bg-emerald-900/60 active:scale-95 border border-emerald-600/20 transition-all cursor-pointer"
              title={isUr ? "پورا خاندان اسکرین پر فٹ کریں" : "Fit all family members to screen"}
            >
              <Maximize2 size={13} strokeWidth={2.2} />
              <span className="hidden sm:inline">{isUr ? "مکمل خاکہ" : "Fit"}</span>
            </button>

            {/* Center Selected Relative (if selected) */}
            {selectedNode && (
              <button
                type="button"
                onClick={() => focusOnPerson(selectedNode)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 active:scale-95 transition-all cursor-pointer"
                title={isUr ? `اس فرد (${selectedNode.nameUr || selectedNode.relation}) پر فوکس کریں` : `Focus on ${selectedNode.nameEn || selectedNode.relation}`}
              >
                <Target size={13} strokeWidth={2.2} className="text-[#245642] dark:text-emerald-400" />
              </button>
            )}

            <div className="h-4 w-px bg-stone-300/80 dark:bg-stone-700 mx-0.5" />

            {/* Quick Live Fiqh Audit Drawer Button */}
            <button
              type="button"
              onClick={() => {
                setIsExplanationOpen(!isExplanationOpen);
                if (!isExplanationOpen) setInspectorOpen(false);
              }}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                isExplanationOpen
                  ? "bg-[#245642] text-white border-[#245642] shadow-xs"
                  : "text-stone-700 dark:text-emerald-300 hover:bg-stone-100 dark:hover:bg-emerald-900/40 border-stone-200/80 dark:border-emerald-800/40"
              }`}
              title={isUr ? "شرعی رہنمائی و حسابی آڈٹ" : "Live Fiqh Audit"}
            >
              <BookOpen size={13} strokeWidth={2.2} />
              <span className="hidden md:inline">{isUr ? "شرعی آڈٹ" : "Audit"}</span>
            </button>
          </div>
        </div>

        {/* -------------------------------------------------------------------
            RIGHT-HAND SIDE: NODE INSPECTOR DRAWER
            ------------------------------------------------------------------- */}
        {inspectorOpen && selectedNode && (
          <div className="whiteboard-node-inspector w-88 shrink-0 border-l border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0E1E18] flex flex-col z-30 shadow-2xl">
            {/* Inspector Header with prominent close button */}
            <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/70 dark:bg-stone-900/50">
              <div className="flex items-center gap-2.5">
                <Sliders size={18} className="text-[#245642] dark:text-emerald-400" />
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  {isUr ? "تفصیلاتِ رشتہ دار (انسپکٹر)" : "Node Inspector"}
                </h3>
              </div>
              <div className="flex items-center gap-1 shrink-0"><button type="button" disabled={deleteBlocked} aria-label={isUr?"فرد حذف کریں":"Delete person"} title={deleteBlocked?deleteReason:(isUr?"فرد اور اس کی ذیلی شاخ حذف کریں":"Delete person and dependent branch")} onClick={()=>selectedNode && deleteNode(selectedNode.id)} className="min-h-10 px-2 flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 text-rose-800 disabled:opacity-40 disabled:cursor-not-allowed"><Trash2 size={17}/><span className="text-xs font-bold">{isUr?"حذف":"Delete"}</span></button>
              <button
                onClick={() => setInspectorOpen(false)}
                className="text-stone-500 hover:text-stone-900 dark:hover:text-white cursor-pointer p-1.5 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
                title={isUr ? "بند کریں (Close)" : "Close Inspector"}
              >
                <X size={18} />
              </button></div>
            </div>

            {/* Inspector Body */}
            <div className="p-5 space-y-5 flex-1 overflow-y-auto">
              {relationshipError && <div className="sticky top-0 z-40 rounded-xl border border-rose-300 bg-rose-50 p-3 text-sm leading-relaxed text-rose-950 shadow-sm">{errorMessage(relationshipError)}</div>}
              <div className="whiteboard-estate-action"><strong>{isUr?"فرضی ترکے کا مرکز":"Hypothetical estate focus"}</strong><p>{selectedNode.id === estateSubjectId ? (isUr?"اس فرد کا ترکہ منتخب ہے؛ ہالہ اسی مرکز کو ظاہر کرتا ہے۔":"This person’s estate is selected. The halo marks this focus.") : (isUr?"اس فرد کا ترکہ دیکھیں۔ خاندان کے تمام رشتے محفوظ رہیں گے۔":"Explore this person’s estate while preserving every family connection.")}</p><button disabled={selectedNode.id === estateSubjectId} onClick={()=>exploreEstate(selectedNode.id)}>{selectedNode.id === estateSubjectId ? (isUr?"منتخب ترکہ":"Current estate subject") : (isUr?"اس شخص کا ترکہ دیکھیں":"Explore this person’s estate")}</button></div>
              {selectedNode.parentId && <label className="block text-sm font-bold">{isUr?"دوسرے حقیقی والد / والدہ":"Second biological parent"}<select aria-label={isUr?"دوسرے حقیقی والد / والدہ":"Second biological parent"} value={selectedNode.secondParentId || (selectedNode.parentageReviewed ? "__not_in_scenario__" : "")} onChange={e=>updateSelectedNode({secondParentId:e.target.value && e.target.value !== "__not_in_scenario__" ? e.target.value : undefined,parentageReviewed:Boolean(e.target.value)})} className="w-full min-h-11 border border-stone-300 rounded-lg px-2 mt-2 bg-white text-stone-900"><option value="">{isUr?"ابھی تصدیق نہیں ہوئی":"Not confirmed yet"}</option><option value="__not_in_scenario__">{isUr?"دوسرا والد / والدہ اس فرضی خاندان میں شامل نہیں":"Other parent is not included in this scenario"}</option>{nodes.filter(n=>n.id !== selectedNode.id && n.id !== selectedNode.parentId && n.gender !== nodes.find(p=>p.id === selectedNode.parentId)?.gender && !editWhiteboardPerson(nodes, selectedNode.id, {secondParentId:n.id}).error).map(n=><option key={n.id} value={n.id}>{isUr?n.nameUr:n.nameEn}</option>)}</select><small className="block mt-1 font-normal text-stone-600">{isUr?"ایک شریکِ حیات کو خودکار طور پر والدہ یا والد نہیں سمجھا جاتا۔":"A spouse is never automatically assumed to be this person’s parent."}</small></label>}
              {!deleteBlocked && nodes.length-deletionPreview.length > 1 && <p className="text-sm text-rose-800 bg-rose-50 rounded-lg p-3">{isUr?`حذف کرنے سے اس فرد سمیت ${nodes.length-deletionPreview.length} افراد کی ذیلی شاخ ہٹے گی۔ فوراً Undo سے واپس لا سکتے ہیں۔`:`Deleting this person removes ${nodes.length-deletionPreview.length} people including their dependent branch. Undo is available immediately afterwards.`}</p>}
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

              <section className="rounded-2xl border border-sky-200 bg-sky-50 p-4 space-y-3 text-sky-950">
                <h4 className="font-bold">{isUr?"بہن بھائی شامل کریں":"Add brothers & sisters"}</h4>
                <label className="block text-sm">{isUr?"والدین کا تعلق":"Shared parents"}
                  <select className="mt-2 w-full min-h-11 rounded-lg border border-sky-300 bg-white px-2" value={siblingKind} onChange={e=>setSiblingKind(e.target.value as SiblingKind)}>
                    <option value="full">{isUr?"سگے — ایک ہی والد اور والدہ":"Full — same father and mother"}</option>
                    <option value="paternal">{isUr?"علاتی — ایک والد، الگ والدہ":"Same father, different mother"}</option>
                    <option value="maternal">{isUr?"اخیافی — ایک والدہ، الگ والد":"Same mother, different father"}</option>
                  </select>
                </label>
                <p className="text-sm leading-relaxed">{isUr?"نامکمل والدین کے لیے الگ افراد شامل ہوں گے۔ بعد میں ہر فرد کا نام اور حیات کی حالت بدل سکتے ہیں۔":"Missing parents are added as explicit people. You can edit each parent’s name and status afterwards."}</p>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={siblingParentsAlive} onChange={e=>setSiblingParentsAlive(e.target.checked)}/>{isUr?"نئے شامل ہونے والے والدین زندہ ہیں":"Newly added parents are alive"}</label>
                <p className="text-xs">{siblingParentsAlive?(isUr?"نئے والدین زندہ شمار ہوں گے۔":"New parents will be recorded as alive."):(isUr?"نئے والدین پہلے وفات یافتہ شمار ہوں گے۔":"New parents will be recorded as predeceased.")}</p>
                <div className="grid grid-cols-2 gap-2">{(["MALE","FEMALE"] as const).map(gender=><button key={gender} type="button" onClick={()=>addSibling(gender)} className="min-h-11 rounded-xl bg-sky-800 text-white font-bold">{gender === "MALE"?(isUr?"بھائی +":"Brother +"):(isUr?"بہن +":"Sister +")}</button>)}</div>
              </section>
              <div className="space-y-2 border-t border-stone-200 pt-3">
                <h4 className="text-sm font-bold">{isUr ? "رشتے شامل کریں" : "Add relationships"}</h4>
                {(["parent", "spouse", "child"] as const).map(type => {
                  const reason = getAddRelativeError(nodes, selectedNode.id, type);
                  const label = type === "parent" ? (isUr ? "والد / والدہ شامل کریں" : "Add parent") : type === "spouse" ? (isUr ? "شریکِ حیات شامل کریں" : "Add spouse") : selectedNode.relation === "SPOUSE" ? (isUr ? "اس جوڑے کی اولاد شامل کریں" : "Add child with this spouse") : (isUr ? "اولاد شامل کریں" : "Add child");
                  return <div key={type}><button type="button" aria-disabled={Boolean(reason)} onClick={() => addRelativeNode(selectedNode.id, type)} className={`w-full min-h-10 px-3 py-2 rounded-lg text-sm font-bold border ${reason ? "bg-stone-100 text-stone-600 border-stone-300" : "bg-emerald-50 text-emerald-950 border-emerald-300 hover:bg-emerald-100"}`}>{label}{reason ? " · " + (isUr ? "حد / رکاوٹ" : "unavailable") : " +"}</button>{reason && <p className="text-xs leading-relaxed text-stone-600 mt-1">{errorMessage(reason)}</p>}</div>;
                })}
              </div>

              {/* Status: Alive vs Predeceased */}
              {(
                <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-2.5">
                    {selectedNode.id === estateSubjectId ? (isUr ? "مرکزی شخص کی فرضی حالت" : "Planning subject status") : (isUr ? "فرضی وفات کے وقت حالت" : "Status at the assumed estate event")}
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
                      {selectedNode.id === estateSubjectId ? (isUr ? "زندہ · منصوبہ بندی" : "Alive · planning") : (isUr ? "حیات (زندہ)" : "Alive")}
                    </button>
                    <button
                      onClick={() => updateSelectedNode({ isAlive: false })}
                      className={`py-2.5 px-4 rounded-xl text-sm font-extrabold border-2 transition-all cursor-pointer ${
                        !selectedNode.isAlive
                          ? "bg-rose-600 text-white border-rose-700 shadow-md scale-102"
                          : "bg-stone-100 text-stone-600 border-stone-200 dark:bg-stone-800 dark:text-stone-300"
                      }`}
                    >
                      {selectedNode.id === estateSubjectId ? (isUr ? "فرضی وفات" : "Assumed estate event") : (isUr ? "متوفیٰ (وفات)" : "Predeceased")}
                    </button>
                  </div>
                  <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                    {isUr
                      ? "یہ صرف فرضی حالات ہیں۔ مرکزی شخص زندہ رہ سکتا ہے؛ اولاد اور پوتے نواسوں کی حالت فرضی تقسیم کے وقت کے مطابق بدلیں۔"
                      : "These are what-if settings, not real-life declarations. The subject may be alive today; relatives’ survival is evaluated at the assumed estate event."}
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
                <div className="grid grid-cols-4 gap-2.5">
                  {AVATAR_OPTIONS.map((opt) => {
                    const activeAvatar = getNodeAvatar(selectedNode);
                    const isPicked = (selectedNode.customAvatar || activeAvatar) === opt.src;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateSelectedNode({ customAvatar: opt.src })}
                        title={isUr ? opt.labelUr : opt.labelEn}
                        className={`flex flex-col items-center p-1.5 rounded-xl border transition-all cursor-pointer ${
                          isPicked
                            ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-600 ring-2 ring-emerald-500/40 shadow-xs"
                            : "border-stone-200 dark:border-stone-700 hover:border-emerald-400 bg-stone-50/50 dark:bg-stone-800/40 opacity-80 hover:opacity-100"
                        }`}
                      >
                        <div className="w-11 h-11 rounded-full overflow-hidden border border-stone-200 dark:border-stone-600 flex items-center justify-center">
                          <img
                            src={opt.src}
                            alt={opt.labelEn}
                            className="w-full h-full object-cover scale-[1.2]"
                            crossOrigin="anonymous"
                          />
                        </div>
                        <span className="text-[10.5px] font-bold mt-1 text-stone-700 dark:text-stone-300 font-nastaliq leading-[1.8] text-center truncate max-w-full">
                          {isUr ? opt.labelUr.split(" ")[0] : opt.labelEn.split(" ")[0]}
                        </span>
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
                    {isUr ? `غیر ادا شدہ مہر (${planningInfo.currency})` : `Unpaid Mahr (${planningInfo.currency})`}
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
              {selectedNode.id !== estateSubjectId && (
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


            </div>
          </div>
        )}

        {/* Live Shariah & Mathematical Audit Explanation Drawer */}
        <WhiteboardExplanationDrawer
          isOpen={isExplanationOpen}
          onClose={() => {
            setIsExplanationOpen(false);
            if (selectedNodeId) setInspectorOpen(true);
          }}
          selectedPersonId={selectedNodeId}
          onSelectPerson={(id) => {const person=nodes.find(n=>n.id === id);if(person){setCollapsedBranches(new Set());setSelectedNodeId(id);focusOnPerson(person);}}}
          personRelation={relationLabel}
          personExplanation={(node)=>{const share=shareForNode(node);return share ? (isUr ? share.proof.quranAyahArabic : share.proof.ruleExplanation) : getNodeShareBadge(node).text;}}
          personResult={(node) => getNodeShareBadge(node).text}
          calculationData={calculationData}
          family={family}
          nodes={nodes}
          isUr={isUr}
          currency={planningInfo.currency}
          estateSubjectName={
            isUr
              ? family.subject?.nameUr || family.subject?.relation
              : family.subject?.nameEn || family.subject?.relation
          }
        />
      </div>

          {/* Tanzīl Quick Status Ribbon - Positioned away from inspector in both LTR and RTL */}
          <div className="px-4 py-3 bg-white dark:bg-[#0E1E18] border-t border-stone-200 dark:border-stone-800">
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
                {!calculationData?.ready ? (isUr ? "والدین کے نامکمل ربط کی تصدیق کریں" : "Confirm missing parent links") : calculationData?.isTanzilActive
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
              {!calculationData?.ready ? WHITEBOARD_ERRORS["incomplete-family"][isUr?"ur":"en"] : calculationData?.isTanzilActive
                ? isUr
                  ? "چونکہ مورث کا کوئی براہِ راست بیٹا یا بیٹی زندہ نہیں ہے، اس لیے یتیم پوتے اور نواسے اپنے مرحوم والدین کے حصے میں قائم مقام بن چکے ہیں۔"
                  : "All direct children are deceased. Grandchildren step directly into their predeceased parents' shoes via Tanzīl representation."
                : (calculationData?.livingDirectCount || 0) > 0
                ? isUr
                  ? `مرکزی شخص کی ${calculationData?.livingDirectCount} زندہ براہِ راست اولاد موجود ہے؛ پوتوں اور نواسوں کی حالت حساب کے مطابق دکھائی گئی ہے۔`
                  : `${calculationData?.livingDirectCount} surviving direct child(ren) are recorded. Grandchild status follows the calculation.`
                : isUr ? "منتخب شخص کے درج شدہ خاندانی ربط کے مطابق حساب دیکھیں۔" : "Review the calculation using the selected person’s recorded family connections."}
            </p>
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

      {/* -------------------------------------------------------------------
          SHIA INHERITANCE READY-MADE TEMPLATES MODAL
          ------------------------------------------------------------------- */}
      {showTemplatesModal && (
        <div className="fixed inset-0 z-[100000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
          <div className="bg-white dark:bg-[#0E1E18] rounded-2xl max-w-4xl w-full border border-stone-200 dark:border-stone-700 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in duration-150">
            {/* Modal Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-[#245642] to-[#16382a] text-white flex items-center justify-between border-b border-emerald-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 shadow-inner">
                  <LayoutGrid size={22} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold tracking-tight">
                    {isUr ? "تیار شدہ خاندانی نمونے (فقہِ جعفریہ)" : "Shia Inheritance Case Templates"}
                  </h3>
                  <p className="text-xs text-emerald-200 font-light">
                    {isUr
                      ? "ہند و پاک اور دنیا بھر میں سب سے زیادہ پیش آنے والے خاندانی خاکے ایک کلک میں منتخب کریں"
                      : "Common real-world family structures from India, Pakistan & global Shia practice"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowTemplatesModal(false)}
                className="text-emerald-200 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label={isUr ? "بند کریں" : "Close templates modal"}
              >
                <X size={20} />
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="px-5 py-2.5 bg-stone-50 dark:bg-stone-900/80 border-b border-stone-200 dark:border-stone-800 flex items-center gap-2 overflow-x-auto text-xs">
              <span className="font-semibold text-stone-500 dark:text-stone-400 shrink-0">
                {isUr ? "زمرہ:" : "Category:"}
              </span>
              {[
                { id: "ALL", en: "All Templates", ur: "تمام خاکے" },
                { id: "MOST_COMMON", en: "Most Common (~50%+)", ur: "سب سے عام صورتحال" },
                { id: "SOUTH_ASIA_SPECIAL", en: "South Asia & Landmark Rules", ur: "ہند و پاک قانونی نکات" },
                { id: "EDGE_CASES", en: "Edge Cases & Class II", ur: "خصوصی کیسز" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setTemplateCategoryFilter(cat.id as any)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
                    templateCategoryFilter === cat.id
                      ? "bg-[#245642] text-white shadow-2xs"
                      : "bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700"
                  }`}
                >
                  {isUr ? cat.ur : cat.en}
                </button>
              ))}
            </div>

            {/* Templates Grid Content */}
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {WHITEBOARD_TEMPLATES.filter(
                  (tmpl) => templateCategoryFilter === "ALL" || tmpl.category === templateCategoryFilter
                ).map((tmpl) => {
                  const isActive = activeTemplateId === tmpl.id;
                  return (
                    <div
                      key={tmpl.id}
                      className={`relative flex flex-col justify-between p-4 rounded-2xl border transition-all duration-200 hover:shadow-md ${
                        isActive
                          ? "border-[#245642] dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-xs ring-2 ring-emerald-500/30"
                          : "border-stone-200 dark:border-stone-800 bg-white dark:bg-[#12221b] hover:border-emerald-300"
                      }`}
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tmpl.badgeColor}`}
                        >
                          {isUr ? tmpl.badgeTextUr : tmpl.badgeTextEn}
                        </span>
                        <span className="text-[10px] font-medium text-stone-500 dark:text-stone-400">
                          {isUr ? tmpl.frequencyLabelUr : tmpl.frequencyLabelEn}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="mb-3">
                        <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center justify-between">
                          <span>{isUr ? tmpl.nameUr : tmpl.nameEn}</span>
                          {isActive && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-600 text-white flex items-center gap-1">
                              <Check size={11} /> {isUr ? "فعال" : "Active"}
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5 font-medium">
                          {isUr ? tmpl.subtitleUr : tmpl.subtitleEn}
                        </p>
                      </div>

                      {/* Fiqh Calculation Summary */}
                      <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/90 border border-stone-200/80 dark:border-stone-800 text-xs mb-3 space-y-1.5">
                        <div className="font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                          <Scale size={13} className="text-[#245642] dark:text-emerald-400" />
                          <span>{isUr ? "شرعی تقسیم کا خلاصہ:" : "Shia Fiqh Distribution:"}</span>
                        </div>
                        <p className="text-stone-700 dark:text-stone-300 text-[11px] leading-relaxed">
                          {isUr ? tmpl.fiqhSummaryUr : tmpl.fiqhSummaryEn}
                        </p>
                      </div>

                      {/* Key Rule Box */}
                      <div className="p-2.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 text-[11px] text-amber-950 dark:text-amber-200 mb-4 leading-relaxed flex items-start gap-1.5">
                        <Info size={13} className="text-amber-600 shrink-0 mt-0.5" />
                        <span>{isUr ? tmpl.keyRuleUr : tmpl.keyRuleEn}</span>
                      </div>

                      {/* Load Button */}
                      <button
                        onClick={() => loadPresetTemplate(tmpl)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isActive
                            ? "bg-emerald-700 text-white hover:bg-emerald-800 shadow-xs"
                            : "bg-[#245642] hover:bg-[#1a3f30] text-white shadow-2xs hover:shadow-sm"
                        }`}
                      >
                        {isActive ? (
                          <>
                            <Check size={14} />
                            <span>{isUr ? "دوبارہ لوڈ کریں" : "Reload this Template"}</span>
                          </>
                        ) : (
                          <>
                            <ArrowRight size={14} />
                            <span>{isUr ? "یہ نمونہ وائٹ بورڈ پر لائیں" : "Load this Template"}</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3.5 bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-500 dark:text-stone-400">
                {isUr
                  ? "نمونہ لوڈ کرنے کے بعد آپ کسی بھی فرد پر کلک کر کے نام اور رشتہ تبدیل کر سکتے ہیں۔"
                  : "After loading, click on any person card to rename or adjust relations as needed."}
              </span>
              <button
                onClick={() => setShowTemplatesModal(false)}
                className="px-4 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors cursor-pointer"
              >
                {isUr ? "بند کریں" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
