import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import {readFileSync} from "node:fs";
const source=readFileSync(new URL("../app.mjs",import.meta.url),"utf8");
const handler=source.slice(source.indexOf("function store()"),source.indexOf('$("add").addEventListener'));
for(const failed of [false,true])test("shortcut save "+(failed?"failure is visible and usable":"reports success"),()=>{
 let rendered=0,notice="",value;
 const context=vm.createContext({KEY:"test",personal:[{id:"a",title:"Example",url:"https://example.com"}],
  localStorage:{setItem:(key,v)=>{if(failed)throw Error("quota");value=v;}},
  render:()=>rendered++,message:s=>notice=s});
 vm.runInContext(handler,context);
 assert.equal(context.store(),!failed);assert.equal(rendered,1);
 if(failed)assert.match(notice,/only in this session/);
 else assert.equal(JSON.parse(value)[0].title,"Example");
});
