const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
process.chdir(path.join(__dirname, '..'));
let assertions = 0;
const equal = (actual, expected) => { assert.equal(actual, expected); assertions++; };
const homeSource = fs.readFileSync('src/assets/js/home.js', 'utf8')
  .replace(/^import .*;\r?\n/gm, '').replace(/^export default Home;$/m, '')
  .replace(/Home.initiateWhenReady\(.*\);/, '');
const context = vm.createContext({ BasePage: class {} });
vm.runInContext(homeSource + ';globalThis.HomeClass=Home;', context);
const home = new context.HomeClass();
for (const [value, expected] of [['185.50 ر.س',185.5], ['١٨٥٫٥٠ ر.س',185.5], ['١٬٢٣٤٫٥٠ ر.س',1234.5], ['1,234.50 SAR',1234.5], [0,0], [undefined,0]]) equal(home.parseMoneyString(value), expected);
for (const [amount, index] of [[0,-1],[49.99,-1],[50,0],[149.99,0],[150,1],[299.99,1],[300,2],[599.99,2],[600,3],[900,3]]) {
  const levels = [50,150,300,600].map(value => ({ dataset:{amt:value},style:{},chip:{style:{}},querySelector(){ return this.chip; } }));
  const total = {}, fill = {style:{}}, text = {};
  const ladder = { dataset: {initialTotal:String(amount),langAddMore:'أضف :amount',langAlmostThere:'قريب',langAllUnlocked:'مفاجأة',langUnlocked:'current',langNext:'next',langLocked:'locked'}, querySelectorAll:()=>levels };
  context.document = {getElementById:id=>({'bav-ladder':ladder,'bav-lad-total':total,'bav-lad-fill':fill,'bav-lad-text':text}[id])};
  let update;
  home.initRewardsLadder({formatNumber:value=>value.toFixed(2),subscribe:callback=>{update=callback;}});
  equal(levels.filter(level=>level.chip.textContent==='current').length,index<0?0:1);
  if(index>=0)equal(levels[index].chip.textContent,'current');
  update({total:'٥٠٫٠٠ ر.س'});equal(levels[0].chip.textContent,'current');
}
const dataSource = fs.readFileSync('src/assets/js/partials/weapons-wheels-data.js','utf8').replaceAll('export const','const');
const calcSource = fs.readFileSync('src/assets/js/partials/weapons-calculator.js','utf8').replace(/^import .*;\r?\n/gm,'').replace('export class','class');
vm.runInContext(dataSource + calcSource + ';globalThis.calc=WeaponsCalculator;globalThis.wheels=WEAPON_WHEELS;',context);
const expected = [[12630,8675,4950],[14530,10075,5750],[14730,10075,5810],[18000,12640,7220],[9600,6600,3800],[9000,6000,3750],[14400,9600,6000]];
const settings=JSON.parse(fs.readFileSync('twilight.json','utf8')).settings.find(item=>item.id==='weapon_wheel_prices').value;
context.wheels.forEach((wheel,i)=>['gulf','medium','african'].forEach((account,j)=>{
  const model={pulls:wheel.pulls[account],excluded:new Set(),ownedCp:0,discountPercent:0,wheel,accountType:account};
  equal(context.calc.prototype.compute.call(model),expected[i][j]);
  const configured=settings.find(item=>item['weapon_wheel_prices.name']===wheel.label);
  equal(configured['weapon_wheel_prices.'+account+'_prices'].split(',').reduce((sum,value)=>sum+Number(value),0),expected[i][j]);
  model.excluded=new Set(model.pulls.map((_,index)=>index));equal(context.calc.prototype.compute.call(model),0);
}));
const model={pulls:[1000],excluded:new Set(),ownedCp:100,discountPercent:10,wheel:{},accountType:'gulf'};
equal(context.calc.prototype.compute.call(model),800);
model.ownedCp=2000;equal(context.calc.prototype.compute.call(model),0);
model.ownedCp=-100;equal(context.calc.prototype.compute.call(model),900);
for(const wheel of context.wheels)for(const upgrade of wheel.upgrades||[])for(const account of ['gulf','medium','african'])equal(context.calc.prototype.compute.call({pulls:[1000],excluded:new Set(),ownedCp:100,discountPercent:10,wheel,accountType:account,upgradeId:upgrade.id}),800+upgrade.costs[account]);
const files=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?files(path.join(dir,entry.name)):[path.join(dir,entry.name)]);
for(const file of files('src/assets/js').concat(files('scripts')).filter(file=>/\.(?:js|cjs)$/.test(file)))require('@babel/core').parseSync(fs.readFileSync(file,'utf8'),{filename:file,configFile:false,babelrc:false,sourceType:'unambiguous'});
let pages=0;
for(const file of files('../bav-preview').filter(file=>file.endsWith('.html'))){
  pages++;
  const html=fs.readFileSync(file,'utf8');
  assert(!/\[\[[\w.]+\]\]/.test(html),'Untranslated key in '+file);
  for(const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)){
    if(/^(?:https?:|data:|tel:|mailto:|#|\/\/)/.test(match[1]))continue;
    const target=decodeURIComponent(match[1].split(/[?#]/)[0]);
    if(target)assert(fs.existsSync(path.resolve(path.dirname(file),target)),file+': missing '+target);
  }
  for(const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g))if(!/src=|application\/ld\+json/.test(match[1]))new vm.Script(match[2],{filename:file});
}
console.log(JSON.stringify({passed:true,behaviorAssertions:assertions,previewPages:pages}));
