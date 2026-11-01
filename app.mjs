import {exportBackup,importBackup} from "./backups.mjs";
import {PROJECTS,ROLES,validUrl,validateShortcuts} from "./catalog.mjs";
import {SOFTWARE_PROJECTS,COMPANIONS} from "./project-separation.mjs";
const $=id=>document.getElementById(id),KEY="nexus-shortcuts-v1";
let personal=[];
try{personal=validateShortcuts(JSON.parse(localStorage.getItem(KEY)??"[]"));}catch{personal=[];}
const message=s=>{$("message").textContent=s;};
function el(tag,text,css){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(css)e.className=css;return e;}
function render(){
  const q=$("search").value.trim().toLowerCase(),host=$("links");host.replaceChildren();
  for(const p of [...SOFTWARE_PROJECTS,...personal.filter(x=>!PROJECTS.some(z=>z.id===x.id))]){
    if(!(p.title+" "+(p.type??"custom")).toLowerCase().includes(q))continue;
    const card=el("article",undefined,"tile");card.append(el("span",p.icon??"↗","icon"),el("b",p.title),el("small",p.type??"Custom link"));
    const anchor=el("a","Open "+p.title);anchor.href=p.url;anchor.target="_blank";anchor.rel="noopener noreferrer";card.append(anchor);
    if(personal.some(x=>x.id===p.id)){const remove=el("button","Remove","secondary");remove.type="button";remove.addEventListener("click",()=>{personal=personal.filter(x=>x.id!==p.id);if(store())message("Removed "+p.title);});card.append(el("span","  "),remove);}
    host.append(card);
  }
  if(!host.childElementCount)host.append(el("p","No shortcuts match."));
}
function store(){
  let saved=true;
  try{localStorage.setItem(KEY,JSON.stringify(personal));}catch{saved=false;}
  render();
  if(!saved)message("Changes are only in this session because saving failed. Keep a copy of your links before closing or reloading.");
  return saved;
}
$("add").addEventListener("submit",e=>{e.preventDefault();
  const title=$("name").value.trim(),url=validUrl($("url").value.trim());
  if(!title||!url){message("Use a nonempty name and an HTTPS URL without credentials.");return;}
  if(personal.length>=50){message("Shortcut limit reached.");return;}
  personal.push({id:"custom-"+Date.now()+"-"+Math.random().toString(36).slice(2),title,url});const saved=store();$("add").reset();if(saved)message("Shortcut added on this device.");
});
$("search").addEventListener("input",render);
for(const role of ROLES){const card=el("article",undefined,"tile role");card.append(el("b",role.name),el("p",role.prompt));
  const btn=el("button","Copy prompt");btn.type="button";btn.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(role.prompt);message("Copied "+role.name+" prompt.");}catch{message("Clipboard unavailable. Select and copy the displayed prompt manually.");}});card.append(btn);$("roles").append(card);}
render();
const petsHost=$("companions");
for(const companion of COMPANIONS){
  const title=el("b",companion.icon+" "+companion.title);
  const description=el("p","Standalone digital companions and seven-slot rotation; separate from software projects.");
  const link=el("a","Open digital pets landscape");link.href=companion.url;link.target="_blank";link.rel="noopener noreferrer";
  petsHost.append(title,description,link);
}


$("export-links").addEventListener("click",()=>{
 const url=URL.createObjectURL(new Blob([exportBackup(personal)],{type:"application/json"}));
 const a=document.createElement("a");a.href=url;a.download="nexus-shortcuts-backup.json";
 document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 message("Backup download started. Keep it private if your links contain personal information.");
});
$("import-links").addEventListener("change",async e=>{
 const file=e.target.files?.[0];e.target.value="";if(!file)return;
 try{
  if(file.size>200000)throw Error("Backup must be smaller than 200 KB.");
  const next=importBackup(await file.text(),personal),added=next.length-personal.length;
  personal=next;if(store())message("Imported "+added+" shortcuts. Existing links were kept; duplicate addresses were skipped.");
 }catch(err){message("Import rejected: "+err.message);}
});
