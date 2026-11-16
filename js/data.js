/* EducaFAM — camada de dados e persistência.
   Sem backend: tudo fica no LocalStorage do navegador.
*/
const STORE_KEY = 'educafam_store_v2';
const SESSION_KEY = 'educafam_session_v2';
const SCHEMA_VERSION = 2;
const PBKDF2_ITERATIONS = 120000;

const AVATARS = ['🦊','🐼','🐨','🐯','🐸','🦁','🐰','🐻'];
const LEVEL_NAMES = ['Iniciante','Aprendiz','Planejador','Guardião','Especialista','Mestre','Mentor','Líder'];

const DEMO_PASSWORD = '123456';
const DEMO_HASH = {
  salt:'SkGqnhj8LXOIQvRavxZiaA==',
  hash:'+RJ1tG+ljuv7NQlMAbxZpcRHwsgcPMnFNuRhSRS0LqA='
};

const DEMO_CHILD_HASHES = {
  1:{salt:'3JuRyuokjdGDYJbtkwMbUg==',hash:'dFf6k1qqNkE+dUgIHReuWNDROWGktwXNqKGvbROKmXg='},
  2:{salt:'S8+hTkoSAqFI6El8Ft3drg==',hash:'VZ3MBGDLQg2FTEzAA3eqdUgIVKN0V/H9KSaUgSHICfg='}
};

function uid(prefix='id') { return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`; }
function clone(v){ return JSON.parse(JSON.stringify(v)); }
function money(v){ return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(v)||0); }
function dateBR(v){ if(!v)return '—'; const d=new Date(`${v}T12:00:00`); return Number.isNaN(d.getTime())?'—':d.toLocaleDateString('pt-BR'); }
function dateInput(v=new Date()){ const d=v instanceof Date?v:new Date(v); return d.toISOString().slice(0,10); }
function monthKey(v){ return String(v||'').slice(0,7); }
function monthLabel(key){ const [y,m]=String(key).split('-').map(Number); if(!y||!m)return key; return new Date(y,m-1,1).toLocaleDateString('pt-BR',{month:'short',year:'2-digit'}).replace('.',''); }
function todayISO(){ return dateInput(new Date()); }
function levelForXP(xp){ return Math.max(1,Math.floor(Math.max(0,Number(xp)||0)/200)+1); }
function levelName(level){ return LEVEL_NAMES[Math.min(LEVEL_NAMES.length-1,Math.max(0,(Number(level)||1)-1))]; }
function xpToNext(xp){ const level=levelForXP(xp); return level*200; }
function remainingXP(xp){ return Math.max(0,xpToNext(xp)-(Number(xp)||0)); }

function demoFamily(){
  return {
    id:'fam_demo',
    name:'Família Pimenta',
    responsible:'Stephanie P.',
    email:'familia@educafam.local',
    consentMinor:true,
    createdAt:'2026-11-01',
    users:[{id:'usr_demo',name:'Stephanie P.',email:'familia@educafam.local',role:'responsible',password:DEMO_HASH}],
    children:[
      {id:'child_1',name:'Lucas',age:10,avatar:'🦊',pin:DEMO_CHILD_HASHES[1],xp:850,coffer:35,createdAt:'2026-11-02'},
      {id:'child_2',name:'Alice',age:8,avatar:'🐼',pin:DEMO_CHILD_HASHES[2],xp:620,coffer:20,createdAt:'2026-11-02'}
    ],
    transactions:[
      {id:'tx_1',type:'income',description:'Salário',category:'Renda',amount:6200,date:'2026-11-05',createdBy:'usr_demo'},
      {id:'tx_2',type:'expense',description:'Supermercado',category:'Alimentação',amount:320,date:'2026-11-08',createdBy:'usr_demo'},
      {id:'tx_3',type:'expense',description:'Energia elétrica',category:'Casa',amount:180,date:'2026-11-07',createdBy:'usr_demo'},
      {id:'tx_4',type:'expense',description:'Transporte',category:'Transporte',amount:150,date:'2026-11-06',createdBy:'usr_demo'},
      {id:'tx_5',type:'income',description:'Poupança (meta)',category:'Transferência',amount:100,date:'2026-11-04',createdBy:'usr_demo'}
    ],
    categories:[
      {id:'cat_1',name:'Alimentação',color:'#2f6f95',icon:'🍽️'},
      {id:'cat_2',name:'Casa',color:'#7b61a8',icon:'🏠'},
      {id:'cat_3',name:'Transporte',color:'#d38b32',icon:'🚌'},
      {id:'cat_4',name:'Educação',color:'#3f806c',icon:'📚'},
      {id:'cat_5',name:'Lazer',color:'#d96b5f',icon:'🎯'},
      {id:'cat_6',name:'Renda',color:'#3f806c',icon:'💼'},
      {id:'cat_7',name:'Transferência',color:'#9a7a2f',icon:'↔️'}
    ],
    goals:[
      {id:'goal_1',name:'Novo notebook',target:2500,saved:1750,deadline:'2027-02-15',category:'Tecnologia',type:'family',childId:null,contributions:[{id:'gc_1',amount:100,by:'usr_demo',name:'Stephanie P.',date:'2026-11-04'}]},
      {id:'goal_2',name:'Viagem em família',target:5000,saved:2000,deadline:'2027-07-20',category:'Lazer',type:'family',childId:null,contributions:[]}
    ],
    missions:[
      {id:'m_1',title:'Registrar as despesas do dia',description:'Anote as compras feitas hoje e informe o valor gasto.',xp:50,type:'Registro de despesa',childId:'child_1',deadline:'2026-11-18',status:'pending',linkedGoalId:null,createdAt:'2026-11-10',submission:null,reviewComment:''},
      {id:'m_2',title:'Guardar R$ 10,00 na poupança',description:'Separe R$ 10,00 do seu cofrinho para uma meta da família.',xp:100,type:'Poupança',childId:'child_1',deadline:'2026-11-20',status:'approved',linkedGoalId:'goal_1',createdAt:'2026-11-08',submission:{amount:10,description:'Contribuição para o notebook'},reviewComment:'Muito bem!'},
      {id:'m_3',title:'Ajudar nas compras da casa',description:'Ajude a conferir a lista e compare preços antes de escolher.',xp:75,type:'Compras',childId:'child_2',deadline:'2026-11-19',status:'in_progress',linkedGoalId:null,createdAt:'2026-11-11',submission:null,reviewComment:''},
      {id:'m_4',title:'Separar necessidade de desejo',description:'Escolha dois exemplos de necessidade e dois de desejo.',xp:80,type:'Educação financeira',childId:'child_2',deadline:'2026-11-21',status:'pending',linkedGoalId:null,createdAt:'2026-11-12',submission:null,reviewComment:''}
    ],
    xpHistory:[
      {id:'xp_1',childId:'child_1',amount:100,reason:'Missão aprovada: Guardar R$ 10,00 na poupança',date:'2026-11-09'},
      {id:'xp_2',childId:'child_2',amount:80,reason:'Bônus inicial de educação financeira',date:'2026-11-06'}
    ],
    budgets:[
      {id:'budget_1',category:'Alimentação',month:'2026-11',limit:700},
      {id:'budget_2',category:'Casa',month:'2026-11',limit:500},
      {id:'budget_3',category:'Transporte',month:'2026-11',limit:300}
    ],
    notifications:[
      {id:'n_1',text:'Há 1 missão aguardando aprovação.',date:'2026-11-16',read:false,type:'mission'},
      {id:'n_2',text:'A meta “Novo notebook” está em 70%.',date:'2026-11-15',read:false,type:'goal'}
    ],
    settings:{notifications:true,weeklySummary:true,familyTheme:'light'}
  };
}

function createStore(){ return {version:SCHEMA_VERSION,accounts:[demoFamily()],legacyImported:false}; }

function migrateLegacy(){
  const legacy=localStorage.getItem('educafam_data');
  if(!legacy)return null;
  try{
    const old=JSON.parse(legacy);
    if(!old || typeof old!=='object')return null;
    const fam=demoFamily();
    fam.name=old.family?.name||fam.name;
    fam.responsible=old.family?.responsible||fam.responsible;
    fam.email=old.family?.email||fam.email;
    fam.transactions=Array.isArray(old.transactions)?old.transactions:fam.transactions;
    fam.goals=Array.isArray(old.goals)?old.goals.map(g=>({...g,type:'family',childId:null,contributions:g.contributions||[]})):fam.goals;
    fam.children=Array.isArray(old.children)?old.children.map((c,i)=>({id:`child_legacy_${c.id||i}`,name:c.name,age:c.age||10,avatar:AVATARS[i%AVATARS.length],pin:DEMO_CHILD_HASHES[(i%2)+1],xp:c.xp||0,coffer:0,createdAt:todayISO()})):fam.children;
    fam.missions=Array.isArray(old.missions)?old.missions.map(m=>({...m,status:m.done?'approved':'pending',description:m.title,deadline:null,submission:null,reviewComment:'',type:'Educação financeira'})):fam.missions;
    fam.users=[{id:'usr_legacy',name:fam.responsible,email:fam.email,role:'responsible',password:DEMO_HASH}];
    return fam;
  }catch{return null}
}

function ensureDemoAccount(store){
  const demoEmail='familia@educafam.local';
  let demo=store.accounts.find(a=>a.email?.toLowerCase()===demoEmail);
  if(!demo){
    store.accounts.push(demoFamily());
    return true;
  }
  const responsible=demo.users?.find(u=>u.role==='responsible')||demo.users?.[0];
  if(responsible){
    let changed=false;
    if(responsible.needsPasswordSetup){responsible.password=DEMO_HASH;delete responsible.needsPasswordSetup;changed=true;}
    if(demo.email!==demoEmail){demo.email=demoEmail;changed=true;}
    if(responsible.email!==demoEmail){responsible.email=demoEmail;changed=true;}
    return changed;
  }
  return false;
}

function getStore(){
  const raw=localStorage.getItem(STORE_KEY);
  if(!raw){
    const legacy=migrateLegacy();
    const store=createStore();
    if(legacy){store.accounts=[legacy];store.legacyImported=true;}
    ensureDemoAccount(store);
    try{localStorage.setItem(STORE_KEY,JSON.stringify(store));}catch(e){return store;}
    return store;
  }
  try{
    const parsed=JSON.parse(raw);
    if(!parsed || !Array.isArray(parsed.accounts))throw new Error('Estrutura inválida');
    const store=migrateStore(parsed);
    if(ensureDemoAccount(store)){
      try{localStorage.setItem(STORE_KEY,JSON.stringify(store));}catch(_e){}
    }
    return store;
  }catch(e){
    const store=createStore();
    try{localStorage.setItem(STORE_KEY,JSON.stringify(store));}catch(_e){}
    return store;
  }
}

function migrateStore(store){
  const s=store.version===SCHEMA_VERSION?store:{...store,version:SCHEMA_VERSION};
  s.accounts=(s.accounts||[]).map(a=>normalizeFamily(a));
  return s;
}
function normalizeFamily(a){
  const f={...demoFamily(),...a};
  f.users=Array.isArray(a.users)?a.users:[];
  f.children=Array.isArray(a.children)?a.children:[];
  f.transactions=Array.isArray(a.transactions)?a.transactions:[];
  f.categories=Array.isArray(a.categories)&&a.categories.length?a.categories:clone(demoFamily().categories);
  f.goals=Array.isArray(a.goals)?a.goals:[];
  f.missions=Array.isArray(a.missions)?a.missions:[];
  f.xpHistory=Array.isArray(a.xpHistory)?a.xpHistory:[];
  f.budgets=Array.isArray(a.budgets)?a.budgets:[];
  f.notifications=Array.isArray(a.notifications)?a.notifications:[];
  f.settings={...demoFamily().settings,...(a.settings||{})};
  return f;
}

function safeSaveStore(store){
  try{
    localStorage.setItem(STORE_KEY,JSON.stringify(store));
    return {ok:true};
  }catch(e){
    return {ok:false,error:e};
  }
}
function saveStore(store){
  const result=safeSaveStore(store);
  if(!result.ok)throw result.error;
  return result.ok;
}
function getAccount(id){ return getStore().accounts.find(a=>a.id===id)||null; }
function upsertAccount(account){
  const store=getStore();
  const idx=store.accounts.findIndex(a=>a.id===account.id);
  if(idx<0)store.accounts.push(account);else store.accounts[idx]=account;
  saveStore(store);
  return account;
}
function resetDemo(){
  const store=getStore();
  const idx=store.accounts.findIndex(a=>a.id==='fam_demo');
  if(idx>=0)store.accounts[idx]=demoFamily();else store.accounts.push(demoFamily());
  saveStore(store);
}
function exportStore(){ return JSON.stringify(getStore(),null,2); }
function importStore(raw){
  const parsed=typeof raw==='string'?JSON.parse(raw):raw;
  if(!parsed || !Array.isArray(parsed.accounts))throw new Error('Backup incompatível.');
  const migrated=migrateStore(parsed);
  saveStore(migrated);
  return migrated;
}
function getLegacyInfo(){return migrateLegacy();}

function getSession(){
  try{
    const raw=localStorage.getItem(SESSION_KEY); if(!raw)return null;
    const s=JSON.parse(raw);
    if(!s?.accountId || !s?.role)return null;
    if(s.expiresAt && Date.now()>s.expiresAt){clearSession();return null;}
    return s;
  }catch{return null;}
}
function setSession(session){localStorage.setItem(SESSION_KEY,JSON.stringify(session));}
function clearSession(){localStorage.removeItem(SESSION_KEY);}
function touchSession(){const s=getSession();if(!s)return null;s.expiresAt=Date.now()+30*60*1000;s.lastActivity=Date.now();setSession(s);return s;}

async function hashSecret(secret,saltBytes){
  const salt=saltBytes||crypto.getRandomValues(new Uint8Array(16));
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(secret),'PBKDF2',false,['deriveBits']);
  const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:PBKDF2_ITERATIONS,hash:'SHA-256'},key,256);
  return {salt:btoa(String.fromCharCode(...salt)),hash:btoa(String.fromCharCode(...new Uint8Array(bits)))};
}
async function verifySecret(secret,record){
  if(!record?.salt||!record?.hash)return false;
  try{
    const salt=Uint8Array.from(atob(record.salt),c=>c.charCodeAt(0));
    const result=await hashSecret(secret,salt);
    return result.hash===record.hash;
  }catch{return false;}
}

function sanitizeText(v){return String(v??'').replace(/[<>]/g,'');}
