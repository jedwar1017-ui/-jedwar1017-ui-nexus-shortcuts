import test from 'node:test';import assert from 'node:assert/strict';
import {exportBackup,importBackup} from '../backups.mjs';
const a={id:'a',title:'日本語',url:'https://example.com/'};
test('backup round trip preserves Unicode',()=>assert.deepEqual(importBackup(exportBackup([a]),[]),[a]));
test('merge preserves current links and skips duplicate URLs',()=>assert.deepEqual(importBackup(exportBackup([a]),[a]),[a]));
test('colliding IDs are renamed without mutating current data',()=>{const current=[a];const out=importBackup(exportBackup([{...a,url:'https://other.example/'}]),current);assert.equal(out.length,2);assert.notEqual(out[0].id,out[1].id);assert.deepEqual(current,[a]);});
test('reject unrelated files and unsafe links',()=>{assert.throws(()=>importBackup('{}',[]));assert.throws(()=>importBackup(JSON.stringify({app:'nexus-shortcuts',version:1,shortcuts:[{...a,url:'javascript:alert(1)'}]}),[]));});
test('over-capacity merge fails without losing existing links',()=>{const current=Array.from({length:50},(_,i)=>({...a,id:String(i),url:'https://example.com/'+i}));assert.throws(()=>importBackup(exportBackup([a]),current),/50/);assert.equal(current.length,50);});
