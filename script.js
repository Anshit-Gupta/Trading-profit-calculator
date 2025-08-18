// Helper: safe parse float
function toNum(v){
  if (v === null || v === undefined) return 0;
  v = v.toString().trim();
  if (v === '') return NaN;
  const n = parseFloat(v.replace(/,/g,''));
  return isNaN(n) ? 0 : n;
}

const fmt = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

// DOM refs — inputs
const fields = {
  purchasePrice: document.getElementById('purchasePrice'),
  quantity: document.getElementById('quantity'),
  mandiTax: document.getElementById('mandiTax'),
  mandiTaxUnit: document.getElementById('mandiTaxUnit'),
  agentArhat: document.getElementById('agentArhat'),
  agentArhatUnit: document.getElementById('agentArhatUnit'),
  loading: document.getElementById('loading'),
  transportation: document.getElementById('transportation'),
  coldStorage: document.getElementById('coldStorage'),
  mandiAgentCommission: document.getElementById('mandiAgentCommission'),
  mandiAgentCommissionUnit: document.getElementById('mandiAgentCommissionUnit'),
  margin: document.getElementById('margin'),
};

// optional toggle DOM ref
const mandiAgentToggle = document.getElementById('mandiAgentToggle');

// DOM refs — outputs
const out = {
  totalExpenses: document.getElementById('totalExpenses'),
  purchaseTotal: document.getElementById('purchaseTotal'),
  netAfter: document.getElementById('netAfter'),
  bdMandiTax: document.getElementById('bdMandiTax'),
  bdAgent: document.getElementById('bdAgent'),
  bdLoading: document.getElementById('bdLoading'),
  bdTransport: document.getElementById('bdTransport'),
  bdCold: document.getElementById('bdCold'),
  bdMandiAgent: document.getElementById('bdMandiAgent'),
  sellingTotal: document.getElementById('sellingTotal'),
  profit: document.getElementById('profit'),
  profitBlock: document.getElementById('profitBlock'),
  resultMsg: document.getElementById('resultMsg'),
  liBdMandiAgent: document.getElementById('liBdMandiAgent'),
};

// calculation + render
function computeAndRender(){
  const price = toNum(fields.purchasePrice.value);
  const qty = toNum(fields.quantity.value);
  const purchaseTotal = price * qty;

  function computeField(valueRaw, unit){
    const val = toNum(valueRaw);
    if (unit === 'PCT') return val * 0.01 * purchaseTotal;
    else return val;
  }

  const mandiTaxAmt = computeField(fields.mandiTax.value, fields.mandiTaxUnit.value);
  const agentArhatAmt = computeField(fields.agentArhat.value, fields.agentArhatUnit.value);
  const loadingAmt = computeField(fields.loading.value, 'INR');
  const transportAmt = computeField(fields.transportation.value, 'INR');
  const coldAmt = computeField(fields.coldStorage.value, 'INR');

  // Mandi Agent Commission respects toggle
  let mandiAgentCommAmt = 0;
  if(mandiAgentToggle && mandiAgentToggle.checked){
    mandiAgentCommAmt = computeField(fields.mandiAgentCommission.value, fields.mandiAgentCommissionUnit.value);
  } else {
    mandiAgentCommAmt = 0;
  }

  const expenses = mandiTaxAmt + agentArhatAmt + loadingAmt + transportAmt + coldAmt + mandiAgentCommAmt;

  out.purchaseTotal.textContent = fmt.format(purchaseTotal);
  out.totalExpenses.textContent = fmt.format(expenses);

  out.bdMandiTax.textContent = fmt.format(mandiTaxAmt) + (fields.mandiTaxUnit.value==='PCT'?` (${fields.mandiTax.value||0}%)`:``);
  out.bdAgent.textContent = fmt.format(agentArhatAmt) + (fields.agentArhatUnit.value==='PCT'?` (${fields.agentArhat.value||0}%)`:``);
  out.bdLoading.textContent = fmt.format(loadingAmt);
  out.bdTransport.textContent = fmt.format(transportAmt);
  out.bdCold.textContent = fmt.format(coldAmt);

  if(mandiAgentToggle && mandiAgentToggle.checked){
    out.bdMandiAgent.textContent = fmt.format(mandiAgentCommAmt) + (fields.mandiAgentCommissionUnit.value==='PCT'?` (${fields.mandiAgentCommission.value||0}%)`:``);
    if(out.liBdMandiAgent) out.liBdMandiAgent.style.display = '';
  } else {
    // hide from breakdown when not included
    if(out.bdMandiAgent) out.bdMandiAgent.textContent = '—';
    if(out.liBdMandiAgent) out.liBdMandiAgent.style.display = 'none';
  }

  const netAfter = purchaseTotal + expenses;
  out.netAfter.textContent = fmt.format(netAfter);
  out.netAfter.className = 'big ' + (netAfter < 0 ? 'negative':'positive');

  // Margin / Selling Price
  const marginRaw = fields.margin.value ?? '';
  const marginEmpty = (marginRaw.toString().trim() === '');
  if(marginEmpty){
    out.profitBlock.style.display='none';
    out.resultMsg.innerHTML='Calculated net after expenses. Add Margin (%) to compute Selling Price & Profit.';
  } else {
    const marginPct = toNum(marginRaw);
    const sellingPerUnit = price + (price * marginPct/100);
    const sellingTotal = sellingPerUnit * qty;
    const profit = sellingTotal - purchaseTotal - expenses;

    out.sellingTotal.textContent = fmt.format(sellingPerUnit);
    out.profit.textContent = fmt.format(profit);
    out.profit.className = 'big ' + (profit<0?'negative':'positive');
    out.profitBlock.style.display='block';
    out.resultMsg.innerHTML='Calculated net after expenses and net profit with Margin %.';
  }
}

// events
document.getElementById('calcBtn').addEventListener('click', computeAndRender);
document.getElementById('resetBtn').addEventListener('click',()=>{
  fields.purchasePrice.value="0";
  fields.quantity.value="1";
  fields.mandiTax.value="0";
  fields.mandiTaxUnit.value="INR";
  fields.agentArhat.value="0";
  fields.agentArhatUnit.value="INR";
  fields.loading.value="0";
  fields.transportation.value="0";
  fields.coldStorage.value="0";
  fields.mandiAgentCommission.value="0";
  fields.mandiAgentCommissionUnit.value="INR";
  fields.margin.value="";
  // reset toggle to checked (keeps previous default behaviour)
  if(mandiAgentToggle) mandiAgentToggle.checked = true;
  // ensure mandi commission visible
  if(out.liBdMandiAgent) out.liBdMandiAgent.style.display = '';
  computeAndRender();
});

const inputs = Object.values(fields);
inputs.forEach(el=>el.addEventListener('input',computeAndRender));
inputs.forEach(el=>el.addEventListener('change',computeAndRender));

// Mandi Agent toggle behaviour
if(mandiAgentToggle){
  mandiAgentToggle.addEventListener('change', ()=>{
    if(mandiAgentToggle.checked){
      // re-enable input
      fields.mandiAgentCommission.disabled = false;
      fields.mandiAgentCommissionUnit.disabled = false;
      // show input elements (we keep layout but enable)
      fields.mandiAgentCommission.style.display = '';
      fields.mandiAgentCommissionUnit.style.display = '';
      if(out.liBdMandiAgent) out.liBdMandiAgent.style.display = '';
    } else {
      // disable and clear value (but keep previous value saved in data attribute)
      // store previous value to restore later
      fields.mandiAgentCommission.dataset._prev = fields.mandiAgentCommission.value;
      fields.mandiAgentCommission.dataset._prevUnit = fields.mandiAgentCommissionUnit.value;
      fields.mandiAgentCommission.value = "0";
      fields.mandiAgentCommissionUnit.value = "INR";
      fields.mandiAgentCommission.disabled = true;
      fields.mandiAgentCommissionUnit.disabled = true;
      // hide in breakdown
      if(out.liBdMandiAgent) out.liBdMandiAgent.style.display = 'none';
    }
    computeAndRender();
  });
  // allow toggle via keyboard/space handled by default for checkbox
}

// populate initial state and compute
// (if toggle unchecked in HTML, ensure fields are disabled)
if(mandiAgentToggle && !mandiAgentToggle.checked){
  fields.mandiAgentCommission.disabled = true;
  fields.mandiAgentCommissionUnit.disabled = true;
  if(out.liBdMandiAgent) out.liBdMandiAgent.style.display = 'none';
}

computeAndRender();

/* -----------------------
   Theme toggle
----------------------- */
const switchEl = document.getElementById('themeSwitch');
const themeText = document.getElementById('themeText');
const themeIcon = document.getElementById('themeIcon');
const THEME_KEY='trade_calc_theme';

function applyTheme(theme){
  if(theme==='dark'){
    document.documentElement.setAttribute('data-theme','dark');
    switchEl.setAttribute('data-checked','true');
    switchEl.setAttribute('aria-checked','true');
    themeText.textContent='Dark';
    if (themeIcon) themeIcon.textContent='🌙';
  } else {
    document.documentElement.setAttribute('data-theme','');
    switchEl.setAttribute('data-checked','false');
    switchEl.setAttribute('aria-checked','false');
    themeText.textContent='Light';
    if (themeIcon) themeIcon.textContent='🌞';
  }
}

const savedTheme = localStorage.getItem(THEME_KEY);
applyTheme(savedTheme==='dark'?'dark':'light');

function toggleTheme(){
  const current = document.documentElement.getAttribute('data-theme')==='dark'?'dark':'light';
  const next = current==='dark'?'light':'dark';
  applyTheme(next);
  localStorage.setItem(THEME_KEY,next);
}

switchEl.addEventListener('click',toggleTheme);
switchEl.addEventListener('keydown',(e)=>{
  if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggleTheme(); }
});
document.getElementById('themeToggle').addEventListener('click',(e)=>{
  if(e.target.closest('#themeSwitch')) return; // avoid double toggle when clicking the switch
  toggleTheme();
});

/* -----------------------
   Language toggle (EN ↔ HI)
   - stores original HTML for English
   - restores English when switching back
----------------------- */
const langSwitch = document.getElementById('langSwitch');
const langText = document.getElementById('langText');
const LANG_KEY = 'trade_calc_lang';

// keys mapping: logical name -> element id
const textElements = {
  pageTitle: 'pageTitle',
  pageLead: 'pageLead',
  lblPurchase: 'lblPurchase',
  lblQty: 'lblQty',
  lblMandiTax: 'lblMandiTax',
  lblAgent: 'lblAgent',
  lblLoad: 'lblLoad',
  lblTrans: 'lblTrans',
  lblCold: 'lblCold',
  lblMandiAgent: 'lblMandiAgent',
  lblMandiAgentOpt: 'lblMandiAgentOpt', // optional label
  lblMargin: 'lblMargin',
  noteText: 'noteText',
  footerText: 'footerText',
  btnCalculate: 'calcBtn',
  btnReset: 'resetBtn',
  lblSummaryTitle: 'lblSummaryTitle',
  lblOtherExpenses: 'lblOtherExpenses',
  lblPurchaseCost: 'lblPurchaseCost',
  lblTotalExpenses: 'lblTotalExpenses',
  lblNetProfit: 'lblNetProfit',
  lblSellingPrice: 'lblSellingPrice',
  lblBreakdown: 'lblBreakdown',
  lblBdMandiTax: 'lblBdMandiTax',
  lblBdAgent: 'lblBdAgent',
  lblBdLoading: 'lblBdLoading',
  lblBdTransport: 'lblBdTransport',
  lblBdCold: 'lblBdCold',
  lblBdMandiAgent: 'lblBdMandiAgent',
  resultMsg: 'resultMsg',
  themeLight: 'themeText' // optional: translate 'Light'/'Dark' label too
};

// capture originals (English) as innerHTML so we preserve markup (strong tags etc.)
const originals = {};
Object.values(textElements).forEach(id => {
  const el = document.getElementById(id);
  originals[id] = el ? el.innerHTML : '';
});

// hindi translations (HTML-safe strings where necessary)
const translations = {
  hi: {
    pageTitle: "ट्रेडिंग — लाभ और खर्च कैलकुलेटर",
    pageLead: "खरीद और खर्च दर्ज करें। वैकल्पिक रूप से मार्जिन (%) दर्ज करें ताकि विक्रय मूल्य और शुद्ध लाभ निकल सके।",
    lblPurchase: "खरीद मूल्य (प्रति यूनिट)",
    lblQty: "मात्रा (यूनिट / बैग / क्विंटल)",
    lblMandiTax: "मंडी टैक्स",
    lblAgent: "एजेंट / अरहत",
    lblLoad: "लोडिंग / अनलोडिंग + मजदूरी",
    lblTrans: "परिवहन",
    lblCold: "कोल्ड स्टोरेज / किराया",
    lblMandiAgent: "मंडी एजेंट कमीशन",
    lblMandiAgentOpt: "शामिल करें",
    lblMargin: "मार्जिन (%) — वैकल्पिक",
    noteText: "संकेत: प्रतिशत मान (%) <strong>खरीद कुल = खरीद मूल्य × मात्रा</strong> पर लागू होते हैं। अपनी पसंद की इकाई (बैग, क्विंटल आदि) में मात्रा दर्ज करें।",
    footerText: "मल्टी-पर्पज़ कैलकुलेटर — ज़रूरत पड़ने पर और खर्च जोड़ने हेतु पंक्तियाँ बदलें।",
    btnCalculate: "गणना करें",
    btnReset: "रीसेट",
    lblSummaryTitle: "सारांश",
    lblOtherExpenses: "अन्य खर्च",
    lblPurchaseCost: "खरीद लागत",
    lblTotalExpenses: "कुल खर्च",
    lblNetProfit: "शुद्ध लाभ",
    lblSellingPrice: "विक्रय मूल्य (प्रति यूनिट)",
    lblBreakdown: "विवरण",
    lblBdMandiTax: "मंडी टैक्स",
    lblBdAgent: "एजेंट / अरहत",
    lblBdLoading: "लोडिंग / मजदूरी",
    lblBdTransport: "परिवहन",
    lblBdCold: "कोल्ड स्टोरेज / किराया",
    lblBdMandiAgent: "मंडी एजेंट कमीशन",
    resultMsg: "तैयार — मान दर्ज करें और <strong>गणना करें</strong> पर क्लिक करें।",
    themeLight: "Light"
  }
};

// helper to set innerHTML safely if element exists
function setHTMLById(id, html){
  const el = document.getElementById(id);
  if(!el) return;
  el.innerHTML = html;
}

// apply language: 'en' restores originals; 'hi' uses translations
function applyLang(lang){
  if(lang === 'hi'){
    const t = translations.hi;
    Object.entries(textElements).forEach(([key, id]) => {
      const val = t[key];
      if(typeof val !== 'undefined'){
        setHTMLById(id, val);
      } else {
        // if translation missing, leave original (do nothing)
      }
    });
    langText.textContent = 'हिंदी';
    langSwitch.setAttribute('data-checked','true');
    langSwitch.setAttribute('aria-checked','true');
  } else {
    // restore originals (English)
    Object.values(textElements).forEach(id => {
      setHTMLById(id, originals[id] || '');
    });
    langText.textContent = 'English';
    langSwitch.setAttribute('data-checked','false');
    langSwitch.setAttribute('aria-checked','false');
  }
}

// toggle handler
function toggleLang(){
  const isHi = langSwitch.getAttribute('data-checked') === 'true';
  const next = isHi ? 'en' : 'hi';
  applyLang(next);
  localStorage.setItem(LANG_KEY, next);
}

// attach events
if (langSwitch){
  langSwitch.addEventListener('click', toggleLang);
  langSwitch.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggleLang(); }
  });
}

// initialize language from storage (default en)
const savedLang = localStorage.getItem(LANG_KEY) || 'en';
applyLang(savedLang);

// ensure theme label text matches theme on load
(function syncThemeLabel(){
  const savedThemeLocal = localStorage.getItem(THEME_KEY);
  applyTheme(savedThemeLocal === 'dark' ? 'dark' : 'light');
})();
