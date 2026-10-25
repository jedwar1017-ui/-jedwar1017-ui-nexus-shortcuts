export const PROJECTS=Object.freeze([
  {id:"programs",title:"J-Programs",type:"Project Control",url:"https://github.com/jedwar1017-ui/J-Programs",icon:"▦"},
  {id:"creative",title:"J Creative Studio",type:"Design & Products",url:"https://github.com/jedwar1017-ui/J-Creative-Studio",icon:"✦"},
  {id:"pets",title:"@Pets",type:"Animation & Rotation",url:"https://github.com/jedwar1017-ui/pets-playground",icon:"✧"},
  {id:"nexus",title:"Nexus Shortcuts",type:"AI Collaboration",url:"https://github.com/jedwar1017-ui/-jedwar1017-ui-nexus-shortcuts",icon:"⌘"}
]);
export const ROLES=Object.freeze([
  {name:"1. Plan",prompt:"You are the planner. Define the task, requirements, risks, and concrete acceptance tests. Do not invent files, capabilities, or test results."},
  {name:"2. Build",prompt:"You are the engineer. Implement the requested change. Identify all changed files and the exact commands needed to test them. Preserve working features."},
  {name:"3. Critique",prompt:"You are an independent critic. Review the proposed solution for hidden assumptions, broken cases, security issues, and missing requirements. Identify evidence gaps."},
  {name:"4. Verify",prompt:"You are the tester. Write reproducible test cases and distinguish code inspection from tests actually executed, with pass/fail logs and environment."},
  {name:"5. Release Gate",prompt:"You are the release controller. Compare the task acceptance criteria with verified evidence. Output GO only if every required test is proven; otherwise output NO-GO with next steps."}
]);
export function validUrl(input){
  if(typeof input!=="string" || input.length>2048)return null;
  try {const u=new URL(input);if(u.protocol!=="https:")return null;if(!u.hostname.includes("."))return null;if(u.username||u.password)return null;return u.toString();}
  catch{return null;}
}
export function validateShortcuts(items){
  if(!Array.isArray(items)||items.length>50)throw Error("Shortcut limit 50");
  return items.map(p=>{
    if(!p||typeof p.id!=="string"||p.id.length>80||typeof p.title!=="string"||!p.title.trim()||p.title.length>70||!validUrl(p.url))throw Error("Invalid shortcut");
    return{id:p.id,title:p.title,url:validUrl(p.url)};
  });
}
