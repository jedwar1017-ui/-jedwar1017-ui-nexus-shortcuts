import test from "node:test";import assert from "node:assert/strict";import {PROJECTS,ROLES,validUrl,validateShortcuts} from "../catalog.mjs";
test("all project launch URLs are safe HTTPS",()=>assert.ok(PROJECTS.every(p=>validUrl(p.url))));
test("distinct project ids and five role prompts",()=>{assert.equal(new Set(PROJECTS.map(x=>x.id)).size,PROJECTS.length);assert.equal(ROLES.length,5);});
test("unsafe schemes and embedded credentials rejected",()=>{for(const u of ["javascript:alert(1)","data:text/html,x","http://site.com","https://a:b@example.com","https://localhost/"])assert.equal(validUrl(u),null);});
test("valid custom shortcut normalized",()=>assert.equal(validateShortcuts([{id:"1",title:"Docs",url:"https://example.com"}])[0].url,"https://example.com/"));
test("invalid shortcut rejected",()=>assert.throws(()=>validateShortcuts([{id:"x",title:"bad",url:"http://example.org"}]),/Invalid/));
