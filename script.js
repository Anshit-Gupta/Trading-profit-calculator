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

// DOM refs
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
};

// calculation
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
  const mandiAgentCommAmt = computeField(fields.mandiAgentCommission.value, fields.mandiAgentCommissionUnit.value);

  const expenses = mandiTaxAmt + agentArhatAmt + loadingAmt + transportAmt + coldAmt + mandiAgentCommAmt;

  out.purchaseTotal.textContent = fmt.format(purchaseTotal);
  out.totalExpenses.textContent = fmt.format(expenses);

  out.bdMandiTax.textContent = fmt.format(mandiTaxAmt) + (fields.mandiTaxUnit.value==='PCT'?` (${fields.mandiTax.value||0}%)`:``);
  out.bdAgent.textContent = fmt.format(agentArhatAmt) + (fields.agentArhatUnit.value==='PCT'?` (${fields.agentArhat.value||0}%)`:``);
  out.bdLoading.textContent = fmt.format(loadingAmt);
  out.bdTransport.textContent = fmt.format(transportAmt);
  out.bdCold.textContent = fmt.format(coldAmt);
  out.bdMandiAgent.textContent = fmt.format(mandiAgentCommAmt) + (fields.mandiAgentCommissionUnit.value==='PCT'?` (${fields.mandiAgentCommission.value||0}%)`:``);

  const netAfter = purchaseTotal + expenses;
  out.netAfter.textContent = fmt.format(netAfter);
  out.netAfter.className = 'big ' + (netAfter < 0 ? 'negative':'positive');

  // Margin / Selling Price
  const marginRaw = fields.margin.value;
  const marginEmpty = (marginRaw === null || marginRaw.trim() === '');
  if(marginEmpty){
    out.profitBlock.style.display='none';
    out.resultMsg.textContent='Calculated net after expenses. Add Margin (%) to compute Selling Price & Profit.';
  } else {
    const marginPct = toNum(marginRaw);
    const sellingPerUnit = price + (price * marginPct/100);
    const sellingTotal = sellingPerUnit * qty;
    const profit = sellingTotal - purchaseTotal - expenses;

    out.sellingTotal.textContent = fmt.format(sellingPerUnit);
    out.profit.textContent = fmt.format(profit);
    out.profit.className = 'big ' + (profit<0?'negative':'positive');
    out.profitBlock.style.display='block';
    out.resultMsg.textContent='Calculated net after expenses and net profit with Margin %.';
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
  computeAndRender();
});

const inputs = Object.values(fields);
inputs.forEach(el=>el.addEventListener('input',computeAndRender));
inputs.forEach(el=>el.addEventListener('change',computeAndRender));
computeAndRender();

// Theme toggle logic
const switchEl = document.getElementById('themeSwitch');
const themeText = document.getElementById('themeText');
const THEME_KEY='trade_calc_theme';

function applyTheme(theme){
  if(theme==='dark'){
    document.documentElement.setAttribute('data-theme','dark');
    switchEl.setAttribute('data-checked','true');
    switchEl.setAttribute('aria-checked','true');
    themeText.textContent='Dark';
  } else {
    document.documentElement.setAttribute('data-theme','');
    switchEl.setAttribute('data-checked','false');
    switchEl.setAttribute('aria-checked','false');
    themeText.textContent='Light';
  }
}

const saved = localStorage.getItem(THEME_KEY);
applyTheme(saved==='dark'?'dark':'light');

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
  if(e.target.closest('#themeSwitch')) return;
  toggleTheme();
});
