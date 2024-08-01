const e=await import("./FBTokenizer.js"),a=await fetch("./FBTokenizer.wasm"),t=await import("./FBlicensingLite.js"),s=await fetch("./FBlicensingLite.wasm"),i=await a.arrayBuffer(),n=await s.arrayBuffer(),l=await t.default({wasmBinary:n,onRuntimeInitialized:()=>self.postMessage({message:"initialized",data:null})}),r=await e.default({wasmBinary:i,onRuntimeInitialized:()=>self.postMessage({message:"initialized",data:null})}),o=new r.Tokenizer;self.onmessage=function(e){switch(e.data.message){case"extraData":(e=>{const a=new r.MapStrStr;a.set("ExtraData",JSON.stringify(e)),o.addExtraData(a);let t=null;o.encryptDictionary(),t=o.getEncryptedDictionaryBase64(),self.postMessage({message:"encryptedData",data:t})})(e.data.data);break;case"validLicense":(e=>{try{const a=l.isValidLicense(e),t=l.LicenseStatus.values[a.value];self.postMessage({message:"isValidLicense",data:t.constructor.name})}catch(e){self.postMessage({message:"invalidLicense"})}})(JSON.stringify(e.data.data));break;case"getEnabledComponents":{let a={};e.data.componentsName.map((t=>{const s=((e,a)=>{const t=l.getEnabledComponents(e,a).getComponents();let s;for(let e=0;e<t.size();e++){const a=t.get(e);s={parameters:""!==a.license?JSON.parse(a.license):null}}return s})(JSON.stringify(e.data.license),t);s&&(a={...a,[t]:s})})),self.postMessage({message:"getEnabledComponents",data:a})}}};