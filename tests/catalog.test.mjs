import test from "node:test";import assert from "node:assert/strict";import {PROJECTS,ROLES,validUrl,validateShortcuts} from "../catalog.mjs";
import {SOFTWARE_PROJECTS,COMPANIONS} from "../project-separation.mjs";
test("all project launch URLs are safe HTTPS",()=>assert.ok(PROJECTS.every(p=>validUrl(p.url))));
test("distinct project ids and five role prompts",()=>{assert.equal(new Set(PROJECTS.map(x=>x.id)).size,PROJECTS.length);assert.equal(ROLES.length,5);});
test("unsafe schemes and embedded credentials rejected",()=>{for(const u of ["javascript:alert(1)","data:text/html,x","http://site.com","https://a:b@example.com","https://localhost/"])assert.equal(validUrl(u),null);});
test("valid custom shortcut normalized",()=>assert.equal(validateShortcuts([{id:"1",title:"Docs",url:"https://example.com"}])[0].url,"https://example.com/"));
test("invalid shortcut rejected",()=>assert.throws(()=>validateShortcuts([{id:"x",title:"bad",url:"http://example.org"}]),/Invalid/));

test("pets are in their own companion landscape, not software projects",()=>{
  assert.equal(SOFTWARE_PROJECTS.some(x=>x.id==="pets"),false);
  assert.equal(COMPANIONS.length,1);
  assert.equal(COMPANIONS[0].id,"pets");
  assert.ok(validUrl(COMPANIONS[0].url));
});
