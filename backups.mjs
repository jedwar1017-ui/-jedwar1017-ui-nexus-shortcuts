import {validateShortcuts} from './catalog.mjs';
export function exportBackup(items){return JSON.stringify({app:'nexus-shortcuts',version:1,shortcuts:validateShortcuts(items)},null,2);}
export function importBackup(text,current){
 const raw=JSON.parse(text);
 if(raw?.app!=='nexus-shortcuts'||raw.version!==1)throw Error('Choose a Nexus Shortcuts backup.');
 const incoming=validateShortcuts(raw.shortcuts),result=validateShortcuts(current);
 const urls=new Set(result.map(x=>x.url)),ids=new Set(result.map(x=>x.id));
 for(const item of incoming){
  if(urls.has(item.url))continue;
  let id=item.id||'imported',n=1;while(ids.has(id))id='imported-'+n++;
  result.push({...item,id});ids.add(id);urls.add(item.url);
 }
 if(result.length>50)throw Error('Import would exceed 50 shortcuts. Nothing was changed.');
 return result;
}
