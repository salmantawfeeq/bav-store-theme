const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.BAV_PLAYWRIGHT_PATH || path.join(process.env.TEMP, 'bav-store-qa/node_modules/playwright'));
const root = path.resolve(__dirname, '../..');
const artifacts = path.resolve(__dirname, '../.qa-artifacts');
fs.mkdirSync(artifacts, {recursive:true});
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.pdf':'application/pdf'};
const server = http.createServer((req,res) => {
  if (req.url === '/favicon.ico') {res.writeHead(204).end();return;}
  const file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  const relative = path.relative(root,file);
  if (relative.startsWith('..') || path.isAbsolute(relative) || relative.split(path.sep).some(part=>part.startsWith('.'))) {res.writeHead(403).end();return;}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end();return;}res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(data);});
});
let browser;
const report={pages:0,runtimeErrors:[],consoleErrors:[],missingResources:[],overflow:[],brokenImages:[],interactionChecks:[]};
async function run(){
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base='http://127.0.0.1:'+server.address().port;
  browser=await chromium.launch({channel:'chrome',headless:true});
  const context=await browser.newContext();
  const page=await context.newPage();
  page.setDefaultTimeout(10000);
  page.on('pageerror',error=>report.runtimeErrors.push({url:page.url(),message:error.message}));
  page.on('console',message=>{if(message.type()==='error')report.consoleErrors.push({url:page.url(),message:message.text()});});
  page.on('response',response=>{if(response.url().startsWith(base)&&response.status()>=400)report.missingResources.push({url:response.url(),status:response.status()});});
  const files=fs.readdirSync(path.join(root,'bav-preview')).filter(file=>file.endsWith('.html'));
  for(const width of [390,768,1440]){
    await page.setViewportSize({width,height:900});
    for(const file of files){
      await page.goto(base+'/bav-preview/'+file,{waitUntil:'load'});
      await page.waitForTimeout(80);
      report.pages++;
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
      if(overflow)report.overflow.push({file,width});
      const broken=await page.evaluate(()=>[...document.images].filter(image=>image.getClientRects().length&&image.complete&&!image.naturalWidth).map(image=>image.getAttribute('src')));
      if(broken.length)report.brokenImages.push({file,width,images:broken});
    }
    console.log('Inspected '+files.length+' pages at '+width+'px');
  }
  const visible=()=>page.locator('.s-products-index-grid .pcard:visible').count();
  for(const width of [390,768,1440]){
    await page.setViewportSize({width,height:900});
    await page.goto(base+'/bav-preview/category.html');
    if(width<1024){await page.locator('[href="#filters-menu"]').click();await page.locator('[data-filter-min]').waitFor({state:'visible'});}
    await page.locator('[data-filter-min]').fill('30');
    await page.locator('[data-filter-max]').fill('100');
    const prices=await page.locator('.s-products-index-grid .pcard:visible').evaluateAll(cards=>cards.map(card=>Number(card.dataset.price)));
    assert(prices.length&&prices.every(price=>price>=30&&price<=100));
    await page.locator('[data-filter-category][value="digital"]').check();assert.equal(await visible(),0);
    await page.locator('[data-filter-reset]').click();assert.equal(await visible(),9);
    await page.locator('[data-filter-min]').fill('100');await page.locator('[data-filter-max]').fill('50');assert(await page.locator('[data-filter-error]').textContent());
    await page.locator('[data-filter-reset]').click();
    if(width<1024){await page.keyboard.press('Escape');assert.equal(await page.locator('[href="#filters-menu"]').getAttribute('aria-expanded'),'false');assert.notEqual(await page.evaluate(()=>document.body.style.overflow),'hidden');}
    await page.locator('#product-filter').selectOption('priceFromLowToTop');
    const sorted=await page.locator('.s-products-index-grid .pcard:visible').evaluateAll(cards=>cards.map(card=>Number(card.dataset.price)));
    assert.deepEqual(sorted,[...sorted].sort((a,b)=>a-b));
    if(width<1024){await page.locator('[href="#filters-menu"]').click();await page.screenshot({path:path.join(artifacts,'filters-'+width+'.png')});await page.setViewportSize({width:1440,height:900});assert.notEqual(await page.evaluate(()=>document.body.style.overflow),'hidden');}
    report.interactionChecks.push('filter and sort '+width);
  }
  await page.setViewportSize({width:390,height:900});await page.goto(base+'/bav-preview/weapons-calculator.html');
  assert.equal(await page.locator('.bav-wcalc-tab').count(),3);
  assert.equal(await page.locator('.bav-wcalc-tab[aria-pressed="true"]').count(),1);
  const expected=[[12630,8675,4950],[14530,10075,5750],[14730,10075,5810],[18000,12640,7220],[9600,6600,3800],[9000,6000,3750],[14400,9600,6000]];
  const result=async()=>Number((await page.locator('[data-role="result"]').innerText()).replace(/[^0-9]/g,''));
  const wheels=await page.locator('[data-role="wheel-select"] option').evaluateAll(options=>options.map(option=>option.value));
  assert.equal(wheels.length,7);
  for(let i=0;i<wheels.length;i++)for(const[j,account]of ['gulf','medium','african'].entries()){
    await page.locator('[data-role="wheel-select"]').selectOption(wheels[i]);await page.locator('[data-account="'+account+'"]').click();
    assert.equal(await result(),expected[i][j]);assert.equal(await page.locator('.bav-wcalc-tab[aria-pressed="true"]').count(),1);
  }
  await page.locator('[data-role="wheel-select"]').selectOption(wheels[0]);await page.locator('[data-account="gulf"]').click();
  await page.locator('[data-index="0"]').click();assert.equal(await result(),12600);
  await page.locator('[data-role="discount"]').fill('10');await page.locator('[data-role="owned"]').fill('100');assert.equal(await result(),11240);
  await page.locator('[data-role="exclude-all"]').click();assert.equal(await result(),0);
  await page.locator('[data-role="include-all"]').click();assert.equal(await result(),11267);
  await page.locator('[data-role="discount"]').fill('0');await page.locator('[data-role="owned"]').fill('0');
  await page.locator('[data-role="wheel-select"]').selectOption(wheels[2]);await page.locator('[data-role="upgrades"] input').check();assert.equal(await result(),29130);
  await page.screenshot({path:path.join(artifacts,'calculator-mobile.png'),fullPage:true});
  await page.locator('[data-role="wheel-select"]').selectOption(wheels[5]);await page.locator('[data-role="pull-count"]').fill('10');assert.equal(await result(),1200);
  report.interactionChecks.push('21 wheel/account combinations, pulls, discount, owned balance, upgrades, series counts');
  await page.goto(base+'/bav-preview/index.html');
  assert.equal(await page.locator('#bav-lad-total').textContent(),'185.50');
  assert.equal(await page.locator('.lv-chip').filter({hasText:'مكافأتك الحالية'}).count(),1);
  await page.locator('#bav-search-toggle').click();await page.locator('#bav-preview-search').fill('دليل');assert(await page.locator('#bav-preview-search-results a').count()>0);
  await page.screenshot({path:path.join(artifacts,'home-mobile.png'),fullPage:true});
  report.interactionChecks.push('rewards initial state and search');
  assert.equal(report.runtimeErrors.length,0,'JavaScript runtime errors');
  assert.equal(report.missingResources.length,0,'Missing local resources');
  assert.equal(report.overflow.length,0,'Horizontal overflow');
  assert.equal(report.brokenImages.length,0,'Broken visible images');
}
run().then(()=>{report.passed=true;}).catch(error=>{report.passed=false;report.failure=error.stack;process.exitCode=1;}).finally(async()=>{
  fs.writeFileSync(path.join(artifacts,'browser-report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({...report,consoleErrors:{count:report.consoleErrors.length,sample:report.consoleErrors.slice(0,4)}},null,2));
  await browser?.close();server.close();
});
