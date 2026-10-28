import type { HeirsInput, DeceasedInfo } from "@/types/fiqh";

/** Structural constraints for the permanent-marriage inheritance sandbox.
 * Survival is a scenario input, not a structural constraint.
 */
export type WhiteboardRelation = "DECEASED" | "SPOUSE" | "FATHER" | "MOTHER" | "SON" | "DAUGHTER" | "GRANDCHILD" | "RELATIVE";
export interface WhiteboardNode {
  id: string;
  nameEn: string;
  nameUr: string;
  gender: "MALE" | "FEMALE";
  relation: WhiteboardRelation;
  isAlive: boolean;
  parentId?: string;
  secondParentId?: string;
  parentageReviewed?: boolean;
  parentOfId?: string;
  spouseOfId?: string;
  x: number;
  y: number;
  customAvatar?: string;
  unpaidMahr?: number;
  impediments?: { isKiller: boolean; isNonMuslim: boolean };
}
export type AddRelativeType = "parent" | "child" | "spouse";
export type WhiteboardError =
  | "missing-person" | "duplicate-id" | "one-subject" | "self-link" | "parent-limit"
  | "wife-limit" | "husband-limit" | "spouse-gender" | "role-gender" | "ancestry-cycle"
  | "related-parents" | "incomplete-family" | "related-spouse" | "parent-scope" | "child-scope" | "spouse-scope" | "missing-link";

export const WHITEBOARD_ERRORS: Record<WhiteboardError, { en: string; ur: string }> = {
  "related-parents": {en:"The two biological parents cannot be an ancestor–descendant pair or siblings. Select a compatible parent.",ur:"دونوں حقیقی والدین ایک دوسرے کے آباؤ اجداد، اولاد یا بہن بھائی نہیں ہو سکتے۔ مناسب والد یا والدہ منتخب کریں۔"},
  "incomplete-family": {en:"Confirm the missing parent links before calculating this person’s estate. The board will not guess parentage or full/half sibling relationships.",ur:"اس شخص کا ترکہ شمار کرنے سے پہلے والدین کے نامکمل ربط کی تصدیق کریں۔ نقشہ والدین یا سگے اور سوتیلے رشتوں کا اندازہ نہیں لگائے گا۔"},
  "missing-person": {en:"The connected person could not be found.",ur:"متعلقہ شخص نہیں ملا۔"},
  "duplicate-id": {en:"Each person needs a unique identity on the board.",ur:"ہر شخص کی الگ شناخت ضروری ہے۔"},
  "one-subject": {en:"Keep exactly one estate-planning subject on this board.",ur:"اس نقشے میں ترکے کا ایک ہی مرکزی شخص ہونا چاہیے۔"},
  "self-link": {en:"A person cannot be their own parent or spouse.",ur:"کوئی شخص اپنا والد، والدہ یا شریکِ حیات نہیں ہو سکتا۔"},
  "parent-limit": {en:"A person can have only one biological father and one biological mother. Edit the existing parent instead.",ur:"ہر شخص کا صرف ایک حقیقی والد اور ایک حقیقی والدہ ہو سکتے ہیں۔ موجودہ والدین کی تفصیل بدلیں۔"},
  "wife-limit": {en:"This man already has four permanent-wife connections. Remove a connection before adding another. Survival toggles do not create extra marriage slots.",ur:"اس مرد کی چار مستقل بیویوں کے رشتے موجود ہیں۔ مزید شامل کرنے سے پہلے ایک رشتہ ہٹائیں۔ حیات کی حالت بدلنے سے اضافی رشتے کی گنجائش نہیں بنتی۔"},
  "husband-limit": {en:"This woman already has a husband connection. Remove that connection before adding another.",ur:"اس خاتون کا شوہر کا رشتہ موجود ہے۔ دوسرا شامل کرنے سے پہلے موجودہ رشتہ ہٹائیں۔"},
  "spouse-gender": {en:"This change conflicts with an existing husband–wife connection. Remove the spouse connection before changing gender.",ur:"یہ تبدیلی موجودہ میاں بیوی کے رشتے سے مطابقت نہیں رکھتی۔ پہلے شریکِ حیات کا رشتہ ہٹائیں۔"},
  "role-gender": {en:"The gender must match the father or mother role. Remove that parent and add the intended role instead.",ur:"جنس والد یا والدہ کے رشتے کے مطابق ہونی چاہیے۔ رشتہ ہٹا کر مطلوبہ والد یا والدہ شامل کریں۔"},
  "ancestry-cycle": {en:"A person cannot be an ancestor of themselves.",ur:"کوئی شخص اپنا جد یا آباؤ اجداد نہیں ہو سکتا۔"},
  "related-spouse": {en:"A parent, descendant, or sibling cannot also be connected as a spouse.",ur:"والدین، اولاد یا بہن بھائی کو شریکِ حیات نہیں بنایا جا سکتا۔"},
  "parent-scope": {en:"Parent nodes can be added above the original family anchor. For a child, use the existing parent link and the Second biological parent selector.",ur:"یہاں مرکزی شخص کے والدین شامل کریں۔ اولاد کا والدین سے ربط موجود ہے؛ مزید آبائی شاخیں ابھی اس نقشے میں دستیاب نہیں۔"},
  "child-scope": {en:"Add children to the planning subject or grandchildren to a son or daughter. Further generations and sibling branches are not supported here yet.",ur:"مرکزی شخص کی اولاد یا بیٹے بیٹی کی اولاد شامل کریں۔ مزید نسلیں اور بہن بھائیوں کی شاخیں ابھی دستیاب نہیں۔"},
  "spouse-scope": {en:"Spouses can be added to the planning subject, a son, or a daughter.",ur:"شریکِ حیات مرکزی شخص، بیٹے یا بیٹی کے ساتھ شامل کیا جا سکتا ہے۔"},
  "missing-link": {en:"A relative is missing the required parent or spouse connection.",ur:"رشتہ دار کا ضروری والدین یا شریکِ حیات سے ربط موجود نہیں۔"},
};

export function getWhiteboardSpouses(nodes: readonly WhiteboardNode[], personId: string): WhiteboardNode[] {
  const person = nodes.find(n => n.id === personId);
  return nodes.filter(n => n.spouseOfId === personId || person?.spouseOfId === n.id);
}

export function validateWhiteboard(nodes: readonly WhiteboardNode[]): WhiteboardError | null {
  const byId = new Map(nodes.map(n => [n.id, n]));
  if (byId.size !== nodes.length) return "duplicate-id";
  const subjects = nodes.filter(n => n.relation === "DECEASED");
  if (subjects.length !== 1) return "one-subject";
  const root = subjects[0];
  const parents = new Map<string, Set<string>>();
  const children = new Map<string, Set<string>>();
  const addParent = (parentId: string, childId: string) => {
    if (!parents.has(childId)) parents.set(childId, new Set());
    if (!children.has(parentId)) children.set(parentId, new Set());
    parents.get(childId)!.add(parentId);
    children.get(parentId)!.add(childId);
  };
  for (const n of nodes) {
    if ([n.parentId,n.secondParentId,n.parentOfId,n.spouseOfId].some(id => id === n.id)) return "self-link";
    if ([n.parentId,n.secondParentId,n.parentOfId,n.spouseOfId].some(id => id && !byId.has(id))) return "missing-person";
    if ((n.relation === "FATHER" || n.relation === "SON") && n.gender !== "MALE") return "role-gender";
    if ((n.relation === "MOTHER" || n.relation === "DAUGHTER") && n.gender !== "FEMALE") return "role-gender";
    if (n.relation === "SPOUSE" && !n.spouseOfId) return "missing-link";
    if (n.relation === "GRANDCHILD" && !n.parentId) return "missing-link";
    if (n.secondParentId && n.secondParentId === n.parentId) return "parent-limit";
    if (n.secondParentId) addParent(n.secondParentId,n.id);
    if (n.parentId) addParent(n.parentId,n.id);
    else if (n.relation === "SON" || n.relation === "DAUGHTER") addParent(root.id,n.id);
    if (n.relation === "FATHER" || n.relation === "MOTHER") addParent(n.id,n.parentOfId || root.id);
  }
  for (const parentSet of parents.values()) {
    const list = [...parentSet].map(id => byId.get(id)!);
    if (list.filter(n => n.gender === "MALE").length > 1 || list.filter(n => n.gender === "FEMALE").length > 1) return "parent-limit";
  }
  const visited = new Set<string>();
  const visiting = new Set<string>();
  const hasCycle = (id: string): boolean => {
    if (visiting.has(id)) return true;
    if (visited.has(id)) return false;
    visiting.add(id);
    for (const child of children.get(id) || []) if (hasCycle(child)) return true;
    visiting.delete(id); visited.add(id); return false;
  };
  for (const n of nodes) if (hasCycle(n.id)) return "ancestry-cycle";
  const reaches = (from: string,to: string): boolean => {
    const pending = [...(children.get(from) || [])];
    const seen = new Set<string>();
    while (pending.length) { const id = pending.pop()!; if(id === to) return true; if(seen.has(id)) continue; seen.add(id); pending.push(...(children.get(id)||[])); }
    return false;
  };
  for (const parentSet of parents.values()) {
    const pair=[...parentSet];
    if(pair.length === 2 && (reaches(pair[0],pair[1]) || reaches(pair[1],pair[0]) || [...(parents.get(pair[0]) || [])].some(id=>parents.get(pair[1])?.has(id)))) return "related-parents";
  }
  for (const n of nodes) {
    const spouses = getWhiteboardSpouses(nodes,n.id);
    if (spouses.some(s => s.gender === n.gender)) return "spouse-gender";
    if (n.gender === "MALE" && spouses.length > 4) return "wife-limit";
    if (n.gender === "FEMALE" && spouses.length > 1) return "husband-limit";
    for (const spouse of spouses) {
      if (reaches(n.id,spouse.id) || reaches(spouse.id,n.id)) return "related-spouse";
      if ([...(parents.get(n.id)||[])].some(id => parents.get(spouse.id)?.has(id))) return "related-spouse";
    }
  }
  return null;
}

export function getAddRelativeError(nodes: readonly WhiteboardNode[], personId: string, type: AddRelativeType): WhiteboardError | null {
  const person = nodes.find(n => n.id === personId);
  if (!person) return "missing-person";
  if (type === "parent") {
    const parents = projectWhiteboardFamily(nodes, personId).parents;
    if (parents.some(n=>n.gender === "MALE") && parents.some(n=>n.gender === "FEMALE")) return "parent-limit";
  }
  if (type === "spouse") {
    if (getWhiteboardSpouses(nodes,personId).length >= (person.gender === "MALE" ? 4 : 1)) return person.gender === "MALE" ? "wife-limit" : "husband-limit";
  }
  return null;
}

export function createWhiteboardRelative(nodes: readonly WhiteboardNode[], personId: string, type: AddRelativeType, id: string): { node?: WhiteboardNode; error: WhiteboardError | null } {
  const error = getAddRelativeError(nodes,personId,type);
  if (error) return {error};
  const person = nodes.find(n=>n.id === personId)!;
  let node: WhiteboardNode;
  if (type === "parent") {
    const fatherExists = projectWhiteboardFamily(nodes, personId).parents.some(n => n.gender === "MALE");
    node = {id,nameEn:fatherExists?"Mother":"Father",nameUr:fatherExists?"والدہ محترمہ":"والد صاحب",gender:fatherExists?"FEMALE":"MALE",relation:fatherExists?"MOTHER":"FATHER",isAlive:true,parentOfId:personId,x:person.x+(fatherExists?90:-90),y:Math.max(50,person.y-140)};
  } else if (type === "spouse") {
    const isWife = person.gender === "MALE";
    const index = getWhiteboardSpouses(nodes,personId).length;
    node = {id,nameEn:isWife?`Wife ${index+1}`:"Husband",nameUr:isWife?`زوجہ ${index+1}`:"شوہر",gender:isWife?"FEMALE":"MALE",relation:"SPOUSE",isAlive:true,spouseOfId:personId,unpaidMahr:0,x:person.x+180+(index%2)*145,y:person.y+Math.floor(index/2)*145};
  } else {
    const parent = person.relation === "SPOUSE" ? nodes.find(n=>n.id === person.spouseOfId)! : person;
    const siblings = nodes.filter(n => n.parentId === parent.id).length;
    const male = siblings%2 === 0;
    const direct = parent.relation === "DECEASED";
    node = {id,nameEn:direct || !["SON","DAUGHTER"].includes(parent.relation)?(male?"Son":"Daughter"):"Grandchild",nameUr:direct || !["SON","DAUGHTER"].includes(parent.relation)?(male?"بیٹا":"بیٹی"):(parent.gender === "MALE"?"پوتا / پوتی":"نواسہ / نواسی"),gender:male?"MALE":"FEMALE",relation:direct?(male?"SON":"DAUGHTER"):(["SON","DAUGHTER"].includes(parent.relation)?"GRANDCHILD":"RELATIVE"),isAlive:true,parentId:parent.id,secondParentId:person.relation === "SPOUSE" ? person.id : undefined,x:parent.x-90+siblings*120,y:parent.y+160};
  }
  return {node,error:validateWhiteboard([...nodes,node])};
}

export type SiblingKind = "full" | "paternal" | "maternal";
export function createWhiteboardSibling(nodes: readonly WhiteboardNode[], personId: string, gender: "MALE" | "FEMALE", kind: SiblingKind, id: string): {nodes: WhiteboardNode[]; error: WhiteboardError | null} {
  if (!nodes.some(n=>n.id === personId)) return {nodes:[...nodes],error:"missing-person"};
  const next=[...nodes];
  // Missing parents are explicit placeholder people, initially predeceased to avoid
  // introducing living heirs as a side effect of adding a sibling.
  for (const sex of ["MALE","FEMALE"] as const) {
    if (!projectWhiteboardFamily(next,personId).parents.some(n=>n.gender === sex)) {
      const result=createWhiteboardRelative(next,personId,"parent",`${id}-${sex}`);
      if(result.error || !result.node) return {nodes:[...nodes],error:result.error};
      next.push({...result.node,isAlive:false,nameEn:sex === "MALE"?"Father (confirm details)":"Mother (confirm details)",nameUr:sex === "MALE"?"والد — تفصیل کی تصدیق کریں":"والدہ — تفصیل کی تصدیق کریں"});
    }
  }
  const parents=projectWhiteboardFamily(next,personId).parents;
  let father=parents.find(n=>n.gender === "MALE")!;
  let mother=parents.find(n=>n.gender === "FEMALE")!;
  if(kind !== "full") {
    const sex=kind === "paternal"?"FEMALE":"MALE";
    const other:WhiteboardNode={id:`${id}-other`,nameEn:sex === "MALE"?"Other father (confirm details)":"Other mother (confirm details)",nameUr:sex === "MALE"?"دوسرے والد — تصدیق کریں":"دوسری والدہ — تصدیق کریں",gender:sex,relation:"RELATIVE",isAlive:false,x:0,y:0};
    next.push(other);
    if(sex === "MALE")father=other;else mother=other;
  }
  next.push({id,nameEn:gender === "MALE"?"Brother":"Sister",nameUr:gender === "MALE"?"بھائی":"بہن",gender,relation:"RELATIVE",isAlive:true,parentId:father.id,secondParentId:mother.id,x:0,y:0});
  return {nodes:next,error:validateWhiteboard(next)};
}

export function editWhiteboardPerson(nodes: readonly WhiteboardNode[], personId: string, partial: Partial<WhiteboardNode>): { nodes: WhiteboardNode[]; error: WhiteboardError | null } {
  const candidate = nodes.map(n => {
    if(n.id !== personId) return n;
    const next = {...n,...partial};
    if(partial.gender && (n.relation === "SON" || n.relation === "DAUGHTER")) next.relation = partial.gender === "MALE" ? "SON" : "DAUGHTER";
    return next;
  });
  return {nodes:candidate,error:validateWhiteboard(candidate)};
}

export function removeWhiteboardPerson(nodes: readonly WhiteboardNode[], personId: string): WhiteboardNode[] {
  if(nodes.find(n=>n.id === personId)?.relation === "DECEASED") return [...nodes];
  const removed=new Set([personId]);
  let changed=true;
  while(changed){changed=false;for(const n of nodes)if(n.relation !== "DECEASED" && !removed.has(n.id) && ((n.parentId && removed.has(n.parentId)) || (n.spouseOfId && removed.has(n.spouseOfId)))){removed.add(n.id);changed=true;}}
  return nodes.filter(n=>!removed.has(n.id)).map(n=>{
    const next={...n};
    if(next.parentId && removed.has(next.parentId))next.parentId=undefined;
    if(next.secondParentId && removed.has(next.secondParentId))next.secondParentId=undefined;
    if(next.parentOfId && removed.has(next.parentOfId)){next.parentOfId=undefined;next.relation="RELATIVE";}
    return next;
  });
}

/** Interpret existing family links around a chosen estate subject without rewriting them. */
export function projectWhiteboardFamily(nodes: readonly WhiteboardNode[], subjectId: string) {
  const anchor = nodes.find(n => n.relation === "DECEASED");
  const subject = nodes.find(n => n.id === subjectId) || anchor!;
  const byId = new Map(nodes.map(n=>[n.id,n]));
  const parentIds = new Map<string, Set<string>>();
  const childIds = new Map<string, Set<string>>();
  const connect = (parent: string, child: string) => {
    if(!parentIds.has(child)) parentIds.set(child,new Set());
    if(!childIds.has(parent)) childIds.set(parent,new Set());
    parentIds.get(child)!.add(parent); childIds.get(parent)!.add(child);
  };
  for(const n of nodes){
    if(n.parentId) connect(n.parentId,n.id);
    else if((n.relation === "SON" || n.relation === "DAUGHTER") && anchor) connect(anchor.id,n.id);
    if(n.secondParentId) connect(n.secondParentId,n.id);
    if((n.relation === "FATHER" || n.relation === "MOTHER") && anchor) connect(n.id,n.parentOfId || anchor.id);
  }
  const getParents = (id:string) => [...(parentIds.get(id)||[])].map(id=>byId.get(id)!).filter(Boolean);
  const getChildren = (id:string) => [...(childIds.get(id)||[])].map(id=>byId.get(id)!).filter(Boolean);
  const eligible = (n:WhiteboardNode) => n.isAlive && !n.impediments?.isKiller && !n.impediments?.isNonMuslim;
  const parents = getParents(subject.id);
  const children = getChildren(subject.id);
  const spouses = getWhiteboardSpouses(nodes,subject.id);
  const grandchildren = new Map(children.map(c=>[c.id,getChildren(c.id)]));
  const roles = new Map<string,string>([[subject.id,"SUBJECT"]]);
  parents.forEach(n=>roles.set(n.id,n.gender === "MALE" ? "FATHER" : "MOTHER"));
  spouses.forEach(n=>roles.set(n.id,"SPOUSE"));
  children.forEach(n=>roles.set(n.id,n.gender === "MALE" ? "SON" : "DAUGHTER"));
  for(const list of grandchildren.values()) list.forEach(n=>roles.set(n.id,"GRANDCHILD"));
  const grandparents = parents.flatMap(parent=>getParents(parent.id).map(n=>({node:n,side:parent.gender})));
  grandparents.forEach(({node,side})=>roles.set(node.id,`${side === "MALE" ? "PATERNAL" : "MATERNAL"}_GRAND${node.gender === "MALE" ? "FATHER" : "MOTHER"}`));
  const siblingIds = new Set(parents.flatMap(p=>getChildren(p.id).filter(n=>n.id !== subject.id).map(n=>n.id)));
  const siblings = [...siblingIds].map(id=>byId.get(id)!);
  const siblingGroups = {full:[] as WhiteboardNode[],paternal:[] as WhiteboardNode[],maternal:[] as WhiteboardNode[],unspecified:[] as WhiteboardNode[]};
  for(const sibling of siblings){
    const theirParents = getParents(sibling.id);
    const shared = parents.filter(p=>theirParents.some(other=>other.id === p.id));
    let group:keyof typeof siblingGroups = "unspecified";
    if(shared.length === 2) group="full";
    else if(parents.length === 2 && theirParents.length === 2) group=shared[0]?.gender === "MALE" ? "paternal":"maternal";
    siblingGroups[group].push(sibling);
    roles.set(sibling.id,group === "unspecified" ? "SIBLING_UNSPECIFIED" : `${group.toUpperCase()}_${sibling.gender === "MALE" ? "BROTHER" : "SISTER"}`);
  }
  const unclesAndAunts = parents.flatMap(parent=>{
    const gp=getParents(parent.id);
    const siblingIds=new Set(gp.flatMap(p=>getChildren(p.id).filter(n=>n.id !== parent.id).map(n=>n.id)));
    return [...siblingIds].map(id=>({node:byId.get(id)!,side:parent.gender}));
  });
  unclesAndAunts.forEach(({node,side})=>{if(!roles.has(node.id))roles.set(node.id,`${side === "MALE" ? "PATERNAL":"MATERNAL"}_${node.gender === "MALE" ? "UNCLE":"AUNT"}`);});
  const cousins=unclesAndAunts.flatMap(({node,side})=>getChildren(node.id).map(n=>({node:n,side})));
  cousins.forEach(({node,side})=>{if(!roles.has(node.id))roles.set(node.id,`${side === "MALE" ? "PATERNAL":"MATERNAL"}_COUSIN`);});
  const unresolvedIds=new Set<string>();
  // A spouse's children are not automatically this person's children, particularly with multiple wives.
  const possibleChildren=spouses.flatMap(s=>getChildren(s.id)).filter(n=>!children.some(c=>c.id===n.id) && getParents(n.id).length < 2);
  possibleChildren.filter(n=>!n.parentageReviewed).forEach(n=>unresolvedIds.add(n.id));
  if(parents.length === 1 && !subject.parentageReviewed && getWhiteboardSpouses(nodes,parents[0].id).length > 0) unresolvedIds.add(subject.id);
  const tierOnePresent=parents.some(eligible)||children.some(eligible)||[...grandchildren.values()].some(list=>list.some(eligible));
  if(!tierOnePresent) siblingGroups.unspecified.filter(eligible).forEach(n=>unresolvedIds.add(n.id));
  nodes.forEach(n=>{if(!roles.has(n.id))roles.set(n.id,"OTHER");});
  return {subject,parents,children,spouses,grandchildren,grandparents,siblingGroups,unclesAndAunts,cousins,roles,unresolvedIds,getParents,getChildren};
}

/** Lay out an ownership forest; secondary parent links remain cross-links.
 * Every person is placed once, including siblings, spouses and distant branches.
 */
export function arrangeWhiteboard(nodes: readonly WhiteboardNode[], rtl = false): WhiteboardNode[] {
  const anchor=nodes.find(n=>n.relation === "DECEASED");
  if(!anchor)return [...nodes];
  const result=nodes.map(n=>({...n}));
  const family=projectWhiteboardFamily(nodes,anchor.id);
  const owner=new Map<string,string>();
  for(const n of nodes){
    const parents=family.getParents(n.id);
    const primary=parents.find(p=>p.gender === "MALE") || parents[0];
    if(primary)owner.set(n.id,primary.id);
    else if(n.spouseOfId)owner.set(n.id,n.spouseOfId);
  }
  // Co-parents sit alongside the owner rather than in a separate distant tree.
  for(const n of nodes){
    const parents=family.getParents(n.id);
    if(parents.length === 2){const father=parents.find(p=>p.gender === "MALE")!;const mother=parents.find(p=>p.gender === "FEMALE")!;if(!owner.has(mother.id))owner.set(mother.id,father.id);}
  }
  const byId=new Map(result.map(n=>[n.id,n]));
  const partners=(id:string)=>result.filter(n=>owner.get(n.id) === id && (n.spouseOfId === id || !family.getParents(n.id).length));
  const children=(id:string)=>result.filter(n=>owner.get(n.id) === id && !partners(id).some(p=>p.id === n.id)).sort((a,b)=>(a.secondParentId || "~").localeCompare(b.secondParentId || "~"));
  const widths=new Map<string,number>();
  const measuring=new Set<string>();
  const placed=new Set<string>();
  const lanes=(id:string)=>{
    const spouses=partners(id);
    const kids=[...children(id),...spouses.flatMap(p=>children(p.id))];
    const groups=spouses.map(p=>({partner:p,kids:kids.filter(c=>family.getParents(c.id).some(parent=>parent.id === p.id))}));
    const assigned=new Set(groups.flatMap(g=>g.kids.map(c=>c.id)));
    return [...groups,...(kids.some(c=>!assigned.has(c.id))?[{partner:undefined,kids:kids.filter(c=>!assigned.has(c.id))}]:[])];
  };
  const width=(id:string):number=>{
    if(widths.has(id))return widths.get(id)!;
    if(measuring.has(id))return 300;
    measuring.add(id);
    const groups=lanes(id);
    const size=partners(id).length?300+groups.reduce((sum,g)=>sum+Math.max(300,g.kids.reduce((total,c)=>total+width(c.id),0)),0):Math.max(300,children(id).reduce((sum,c)=>sum+width(c.id),0));
    measuring.delete(id);widths.set(id,size);return size;
  };
  const place=(id:string,left:number,depth:number)=>{
    if(placed.has(id))return;placed.add(id);
    const n=byId.get(id)!;const ownWidth=width(id);
    n.x=left+(partners(id).length?150:ownWidth/2);n.y=220+depth*390;
    if(partners(id).length){
      let offset=left+300;
      for(const group of lanes(id)){
        const laneWidth=Math.max(300,group.kids.reduce((sum,c)=>sum+width(c.id),0));
        if(group.partner){group.partner.x=offset+laneWidth/2;group.partner.y=n.y;placed.add(group.partner.id);}
        let childLeft=offset;
        for(const child of group.kids){place(child.id,childLeft,depth+1);childLeft+=width(child.id);}
        offset+=laneWidth;
      }
    }else{let offset=left;for(const c of children(id)){place(c.id,offset,depth+1);offset+=width(c.id);}}
  };
  let left=100;
  for(const n of result.filter(n=>!owner.has(n.id))){place(n.id,left,0);left+=width(n.id)+300;}
  // Imported graphs may have ownership cycles through marriages; keep all nodes visible.
  for(const n of result)if(!placed.has(n.id)){place(n.id,left,0);left+=width(n.id)+300;}
  if(rtl){const axis=Math.min(...result.map(n=>n.x))+Math.max(...result.map(n=>n.x));result.forEach(n=>{n.x=axis-n.x;});}
  return result;
}

/**
 * Synthesizes a valid WhiteboardNode graph from Main Calculator's HeirsInput & DeceasedInfo.
 * Supports parents, spouses, sons, daughters, grandchildren (Tanzil), and Class 2 siblings.
 */
export function buildWhiteboardNodesFromCalculator(
  heirs: HeirsInput,
  deceased: DeceasedInfo,
  isUr = false
): WhiteboardNode[] {
  const isMale = deceased.gender === "male";
  const nodes: WhiteboardNode[] = [];

  // 1. Root Deceased
  nodes.push({
    id: "deceased-root",
    nameEn: deceased.name || (isMale ? "Deceased (Father/Husband)" : "Deceased (Mother/Wife)"),
    nameUr: deceased.name || (isMale ? "مرحوم (مورث)" : "مرحومہ (مورثہ)"),
    gender: isMale ? "MALE" : "FEMALE",
    relation: "DECEASED",
    isAlive: false,
    x: 540,
    y: 160,
  });

  // 2. Parents
  if (heirs.fatherAlive) {
    nodes.push({
      id: "father-1",
      nameEn: "Father",
      nameUr: "والد محترم",
      gender: "MALE",
      relation: "FATHER",
      isAlive: true,
      parentOfId: "deceased-root",
      x: 360,
      y: 40,
    });
  }
  if (heirs.motherAlive) {
    nodes.push({
      id: "mother-1",
      nameEn: "Mother",
      nameUr: "والدہ محترمہ",
      gender: "FEMALE",
      relation: "MOTHER",
      isAlive: true,
      parentOfId: "deceased-root",
      x: 720,
      y: 40,
    });
  }

  // 3. Spouses
  if (isMale) {
    const wivesCount = heirs.wives && heirs.wives.length > 0 
      ? heirs.wives.filter(w => w.isAlive).length 
      : (heirs.spouseCount > 0 ? heirs.spouseCount : 0);
    
    for (let i = 0; i < wivesCount; i++) {
      const wifeData = heirs.wives?.[i];
      nodes.push({
        id: `wife-${i + 1}`,
        nameEn: wifeData?.name || `Wife ${i + 1}`,
        nameUr: wifeData?.name || `زوجہ ${i + 1}`,
        gender: "FEMALE",
        relation: "SPOUSE",
        isAlive: true,
        spouseOfId: "deceased-root",
        unpaidMahr: wifeData?.pendingMahrAmount || 0,
        x: 780 + i * 160,
        y: 160,
      });
    }
  } else {
    if (heirs.spouseCount > 0) {
      nodes.push({
        id: "husband-1",
        nameEn: "Husband",
        nameUr: "شوہر",
        gender: "MALE",
        relation: "SPOUSE",
        isAlive: true,
        spouseOfId: "deceased-root",
        x: 780,
        y: 160,
      });
    }
  }

  // 4. Children (Sons & Daughters)
  const sonsCount = heirs.sonsCount || 0;
  const daughtersCount = heirs.daughtersCount || 0;

  for (let i = 0; i < sonsCount; i++) {
    nodes.push({
      id: `son-${i + 1}`,
      nameEn: `Son ${i + 1}`,
      nameUr: `بیٹا ${i + 1}`,
      gender: "MALE",
      relation: "SON",
      isAlive: true,
      parentId: "deceased-root",
      x: 300 + i * 160,
      y: 420,
    });
  }

  for (let i = 0; i < daughtersCount; i++) {
    nodes.push({
      id: `daughter-${i + 1}`,
      nameEn: `Daughter ${i + 1}`,
      nameUr: `بیٹی ${i + 1}`,
      gender: "FEMALE",
      relation: "DAUGHTER",
      isAlive: true,
      parentId: "deceased-root",
      x: 300 + (sonsCount + i) * 160,
      y: 420,
    });
  }

  // 5. Grandchildren through predeceased children (Tanzil)
  if (heirs.deceasedSonsWithChildren && heirs.deceasedSonsWithChildren.length > 0) {
    heirs.deceasedSonsWithChildren.forEach((group, gIdx) => {
      const pSonId = `predeceased-son-${gIdx + 1}`;
      nodes.push({
        id: pSonId,
        nameEn: `Late Son ${gIdx + 1}`,
        nameUr: `مرحوم بیٹا ${gIdx + 1}`,
        gender: "MALE",
        relation: "SON",
        isAlive: false,
        parentId: "deceased-root",
        x: 200 + gIdx * 200,
        y: 420,
      });
      for (let s = 0; s < (group.sons || 0); s++) {
        nodes.push({
          id: `pota-${gIdx + 1}-${s + 1}`,
          nameEn: `Pota (Grandson) ${s + 1}`,
          nameUr: `پوتا ${s + 1}`,
          gender: "MALE",
          relation: "GRANDCHILD",
          isAlive: true,
          parentId: pSonId,
          x: 200 + s * 140,
          y: 700,
        });
      }
      for (let d = 0; d < (group.daughters || 0); d++) {
        nodes.push({
          id: `poti-${gIdx + 1}-${d + 1}`,
          nameEn: `Poti (Granddaughter) ${d + 1}`,
          nameUr: `پوتی ${d + 1}`,
          gender: "FEMALE",
          relation: "GRANDCHILD",
          isAlive: true,
          parentId: pSonId,
          x: 200 + ((group.sons || 0) + d) * 140,
          y: 700,
        });
      }
    });
  }

  if (heirs.deceasedDaughtersWithChildren && heirs.deceasedDaughtersWithChildren.length > 0) {
    heirs.deceasedDaughtersWithChildren.forEach((group, gIdx) => {
      const pDauId = `predeceased-dau-${gIdx + 1}`;
      nodes.push({
        id: pDauId,
        nameEn: `Late Daughter ${gIdx + 1}`,
        nameUr: `مرحومہ بیٹی ${gIdx + 1}`,
        gender: "FEMALE",
        relation: "DAUGHTER",
        isAlive: false,
        parentId: "deceased-root",
        x: 600 + gIdx * 200,
        y: 420,
      });
      for (let s = 0; s < (group.sons || 0); s++) {
        nodes.push({
          id: `nawasa-${gIdx + 1}-${s + 1}`,
          nameEn: `Nawasa (Grandson) ${s + 1}`,
          nameUr: `نواسا ${s + 1}`,
          gender: "MALE",
          relation: "GRANDCHILD",
          isAlive: true,
          parentId: pDauId,
          x: 600 + s * 140,
          y: 700,
        });
      }
      for (let d = 0; d < (group.daughters || 0); d++) {
        nodes.push({
          id: `nawasi-${gIdx + 1}-${d + 1}`,
          nameEn: `Nawasi (Granddaughter) ${d + 1}`,
          nameUr: `نواسی ${d + 1}`,
          gender: "FEMALE",
          relation: "GRANDCHILD",
          isAlive: true,
          parentId: pDauId,
          x: 600 + ((group.sons || 0) + d) * 140,
          y: 700,
        });
      }
    });
  }

  // 6. Siblings (if Class 2)
  if (sonsCount === 0 && daughtersCount === 0 && !heirs.fatherAlive && !heirs.motherAlive) {
    const rootFatherId = "deceased-father-placeholder";
    if (!nodes.some(n => n.id === "father-1")) {
      nodes.push({
        id: rootFatherId,
        nameEn: "Deceased Father",
        nameUr: "مرحوم والد",
        gender: "MALE",
        relation: "FATHER",
        isAlive: false,
        parentOfId: "deceased-root",
        x: 360,
        y: 40,
      });
    }
    const fatherNodeId = nodes.find(n => n.relation === "FATHER")?.id || rootFatherId;

    const fullBro = heirs.fullBrothersCount || 0;
    const fullSis = heirs.fullSistersCount || 0;
    for (let i = 0; i < fullBro; i++) {
      nodes.push({
        id: `full-brother-${i + 1}`,
        nameEn: `Full Brother ${i + 1}`,
        nameUr: `سگا بھائی ${i + 1}`,
        gender: "MALE",
        relation: "RELATIVE",
        isAlive: true,
        parentId: fatherNodeId,
        x: 100 + i * 160,
        y: 220,
      });
    }
    for (let i = 0; i < fullSis; i++) {
      nodes.push({
        id: `full-sister-${i + 1}`,
        nameEn: `Full Sister ${i + 1}`,
        nameUr: `سگی بہن ${i + 1}`,
        gender: "FEMALE",
        relation: "RELATIVE",
        isAlive: true,
        parentId: fatherNodeId,
        x: 100 + (fullBro + i) * 160,
        y: 220,
      });
    }
    const uterineSis = heirs.uterineSistersCount || 0;
    for (let i = 0; i < uterineSis; i++) {
      nodes.push({
        id: `uterine-sister-${i + 1}`,
        nameEn: `Maternal Sister ${i + 1}`,
        nameUr: `مادری بہن ${i + 1}`,
        gender: "FEMALE",
        relation: "RELATIVE",
        isAlive: true,
        parentId: fatherNodeId,
        x: 100 + (fullBro + fullSis + i) * 160,
        y: 220,
      });
    }
  }

  return arrangeWhiteboard(nodes, isUr);
}
