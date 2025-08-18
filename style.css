/* -----------------------
   LIGHT THEME
----------------------- */
:root{
  --bg: #f6f8fa;
  --card: #ffffff;
  --muted: #6b7280;
  --accent: #0b79f7;
  --accent-2: #0369a1;
  --danger: #dc2626;
  --success: #16a34a;
  --glass: rgba(255,255,255,0.6);
  --radius: 12px;
  --text-light: #0f172a;
  --input-border: #e6edf3;
  --input-bg: linear-gradient(180deg,#fff,#fbfdff);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

/* -----------------------
   DARK THEME
----------------------- */
:root[data-theme="dark"]{
  --bg: #000000;
  --card: #0b0b0b;
  --muted: #9aa6b2;
  --accent: #4f46e5;
  --accent-2: #3730a3;
  --danger: #ff6b6b;
  --success: #6ad58a;
  --glass: rgba(255,255,255,0.03);
  --radius: 12px;
  --text-light: #ffffff;
  --input-border: #1b2630;
  --input-bg: linear-gradient(180deg,#071422,#071422);
}

html,body{
  height:100%;
  margin:0;
  background:
    linear-gradient(180deg, rgba(11,121,247,0.06), transparent 40%),
    var(--bg);
  color: var(--text-light);
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  transition: background-color .18s ease, color .18s ease;
}

.wrap{
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:32px;
  box-sizing:border-box;
}

.card{
  width:100%;
  max-width:880px;
  background:var(--card);
  border-radius:var(--radius);
  box-shadow: 0 10px 30px rgba(2,6,23,0.08);
  padding:28px;
  display:grid;
  grid-template-columns: 1fr 360px;
  gap:22px;
  position:relative;
}

@media (max-width:900px){
  .card{ grid-template-columns: 1fr; padding:20px; }
}

h1{
  margin:0 0 6px 0;
  font-size:20px;
  letter-spacing: -0.2px;
  color: var(--text-light);
}
p.lead{
  margin:0 0 18px 0;
  color:var(--muted);
  font-size:13px;
}

.form{
  display:flex;
  flex-direction:column;
  gap:12px;
}

.row{
  display:flex;
  gap:12px;
  align-items:center;
}

.label{
  min-width:170px;
  font-size:13px;
  color:var(--muted);
}

.input-wrap{
  flex:1;
  display:flex;
  align-items:center;
  gap:8px;
}

input[type="number"], input[type="text"], select.unit{
  width:100%;
  padding:10px 12px;
  border-radius:10px;
  border:1px solid var(--input-border);
  background:var(--input-bg);
  font-size:14px;
  outline:none;
  box-sizing:border-box;
  color: var(--text-light);
}
input[type="number"]:focus, select.unit:focus{
  box-shadow: 0 0 0 4px rgba(11,121,247,0.06);
  border-color: rgba(11,121,247,0.25);
}

.note{
  font-size:12px;
  color:var(--muted);
  margin-top:6px;
}

.actions{
  display:flex;
  gap:8px;
  margin-top:8px;
}

button{
  padding:10px 14px;
  border-radius:10px;
  border:0;
  cursor:pointer;
  font-weight:600;
}

.btn-primary{
  background:linear-gradient(180deg,var(--accent),var(--accent-2));
  color:white;
  box-shadow: 0 6px 16px rgba(11,121,247,0.18);
}
.btn-ghost{
  background:transparent;
  border:1px solid var(--input-border);
  color:var(--muted);
}

/* right panel */
.summary{
  background: linear-gradient(180deg, rgba(3,105,161,0.04), transparent);
  border-radius:12px;
  padding:18px;
  display:flex;
  flex-direction:column;
  gap:12px;
  justify-content:space-between;
}

.summary h3{ margin:0; font-size:14px; color:#063a5b; }
.summary .big{
  font-size:20px;
  font-weight:700;
  margin:6px 0 0 0;
}

.line{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:8px 0;
  border-bottom:1px dashed rgba(2,6,23,0.04);
}

.muted{ color:var(--muted); font-size:13px; }

.negative{ color:var(--danger); font-weight:700; }
.positive{ color:var(--success); font-weight:700; }

ul.breakdown{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:6px; }
ul.breakdown li{ display:flex; justify-content:space-between; align-items:center; font-size:13px; color:#0b1220; }

footer.small{
  margin-top:10px;
  font-size:12px;
  color:var(--muted);
}

.currency {
  min-width:44px;
  text-align:right;
  font-weight:600;
  color:var(--muted);
  font-size:13px;
}

/* top controls */
.top-controls {
  position: absolute;
  top: 2px;
  right: 14px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: flex-end;
}

.theme-toggle, .lang-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  user-select: none;
}

.theme-toggle .icon,
.lang-toggle .icon {
  font-size: 16px;
}

.switch {
  width:46px;
  height:26px;
  border-radius:16px;
  padding:3px;
  box-sizing:border-box;
  border:1px solid var(--input-border);
  display:flex;
  align-items:center;
  cursor:pointer;
  background: linear-gradient(180deg, rgba(2,6,23,0.04), rgba(2,6,23,0.01));
}
.switch .knob{
  width:20px;
  height:20px;
  border-radius:50%;
  background:var(--card);
  transition: transform .18s ease;
  box-shadow:0 4px 10px rgba(2,6,23,0.08);
}
.switch[data-checked="true"]{ background: linear-gradient(180deg,var(--accent),var(--accent-2)); border-color: rgba(11,121,247,0.24); }
.switch[data-checked="true"] .knob{ transform: translateX(20px); background: white; }

/* optional checkbox styling */
.optional-wrap {
  display:flex;
  align-items:center;
  gap:6px;
  margin-right:6px;
  user-select:none;
  font-size:13px;
  color:var(--muted);
}
.optional-wrap input[type="checkbox"]{
  width:16px;
  height:16px;
  cursor:pointer;
}
.optional-label { font-size:13px; color:var(--muted); }

/* ensure selects look like other inputs */
select.unit {
  min-width:88px;
  max-width:140px;
}

/* layout helpers */
.flex-row {
  display:flex;
  gap:8px;
  width:100%;
}
.flex-row > * { flex:1; }
.input-small{ max-width:140px; }

@media (max-width:720px){
  .label{ min-width: 120px; font-size:12px; }
  .card{ padding:18px; gap:12px; }
  .optional-wrap .optional-label { display:none; } /* save space on small screens */
}
