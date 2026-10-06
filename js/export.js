// ================================================================
// IPL Season 19 Analytics Hub — Multi-Sheet Professional Exporter
// ================================================================
// NOTE: exportData() signature is UNCHANGED — buttons keep working.
// Only downloadProfessionalExcel() is replaced with a multi-sheet
// workbook generator.  downloadCSV() is also unchanged.
// ================================================================

/* ── Season data ─────────────────────────────────────────────── */
const SEASON = {
    total_matches:        74,
    total_overs:          2900.5,
    total_balls:          17405,
    total_runs:           24500,
    total_wickets:        850,
    total_fours:          2100,
    total_sixes:          1150,
    total_singles:        7500,
    total_doubles:        1800,
    total_triples:        50,
    total_dot_balls:      6000,
    total_extras:         1200,
    total_wides:          600,
    total_no_balls:       100,
    total_byes:           200,
    total_leg_byes:       250,
    total_overthrow_runs: 50
};

/* ── Team data ───────────────────────────────────────────────── */
const TEAMS = [
    { team:'Chennai Super Kings',       abbr:'CSK', matches:14, wins:10, losses:4, runs:2850, wickets:85, sixes:132, fours:286, nrr:'+0.82' },
    { team:'Sunrisers Hyderabad',       abbr:'SRH', matches:14, wins:9,  losses:5, runs:2900, wickets:85, sixes:139, fours:271, nrr:'+0.67' },
    { team:'Royal Challengers Bengaluru',abbr:'RCB',matches:14, wins:9,  losses:5, runs:2950, wickets:82, sixes:145, fours:295, nrr:'+0.61' },
    { team:'Kolkata Knight Riders',     abbr:'KKR', matches:14, wins:8,  losses:6, runs:2800, wickets:88, sixes:128, fours:268, nrr:'+0.45' },
    { team:'Gujarat Titans',            abbr:'GT',  matches:14, wins:8,  losses:6, runs:2720, wickets:81, sixes:120, fours:260, nrr:'+0.38' },
    { team:'Rajasthan Royals',          abbr:'RR',  matches:14, wins:7,  losses:7, runs:2700, wickets:80, sixes:115, fours:255, nrr:'+0.12' },
    { team:'Mumbai Indians',            abbr:'MI',  matches:14, wins:7,  losses:7, runs:2750, wickets:90, sixes:118, fours:262, nrr:'-0.08' },
    { team:'Lucknow Super Giants',      abbr:'LSG', matches:14, wins:6,  losses:8, runs:2650, wickets:78, sixes:111, fours:248, nrr:'-0.21' },
    { team:'Delhi Capitals',            abbr:'DC',  matches:14, wins:5,  losses:9, runs:2600, wickets:75, sixes:108, fours:240, nrr:'-0.55' },
    { team:'Punjab Kings',              abbr:'PBKS',matches:14, wins:3,  losses:11,runs:2500, wickets:70, sixes:102, fours:228, nrr:'-1.21' }
];

/* ── Player data ─────────────────────────────────────────────── */
const PLAYERS = [
    { name:'Virat Kohli',       team:'RCB',  type:'Batsman',   matches:14, runs:741,  avg:61.75, sr:152.9, fours:62, sixes:38, hs:113 },
    { name:'Rohit Sharma',      team:'MI',   type:'Batsman',   matches:13, runs:682,  avg:56.83, sr:148.5, fours:71, sixes:32, hs:109 },
    { name:'Shubman Gill',      team:'GT',   type:'Batsman',   matches:14, runs:658,  avg:54.83, sr:143.2, fours:68, sixes:22, hs:104 },
    { name:'KL Rahul',          team:'LSG',  type:'WK-Batsman',matches:14, runs:612,  avg:51.00, sr:141.0, fours:60, sixes:28, hs:98  },
    { name:'Ruturaj Gaikwad',   team:'CSK',  type:'Batsman',   matches:14, runs:589,  avg:49.08, sr:138.7, fours:57, sixes:24, hs:95  },
    { name:'Yashasvi Jaiswal',  team:'RR',   type:'Batsman',   matches:14, runs:574,  avg:47.83, sr:155.1, fours:52, sixes:41, hs:118 },
    { name:'Nitish Kumar Reddy',team:'SRH',  type:'All-Rounder',matches:14,runs:548,  avg:45.67, sr:161.2, fours:44, sixes:38, hs:89  },
    { name:'Heinrich Klaasen',  team:'SRH',  type:'WK-Batsman',matches:14, runs:521,  avg:43.42, sr:177.5, fours:38, sixes:46, hs:104 },
    { name:'Jasprit Bumrah',    team:'MI',   type:'Bowler',    matches:13, runs:28,   avg:4.67,  sr:72.0,  fours:2,  sixes:1,  hs:18  },
    { name:'Mohammed Siraj',    team:'RCB',  type:'Bowler',    matches:14, runs:15,   avg:3.0,   sr:60.0,  fours:1,  sixes:0,  hs:12  },
];

/* ── Player bowling data ─────────────────────────────────────── */
const BOWLERS = [
    { name:'Jasprit Bumrah',    team:'MI',   wickets:28, avg:14.2, econ:6.8,  sr:12.5, bbm:'5/21', fiveW:1 },
    { name:'Mohammed Siraj',    team:'RCB',  wickets:26, avg:16.5, econ:8.1,  sr:12.2, bbm:'4/19', fiveW:0 },
    { name:'Rashid Khan',       team:'GT',   wickets:24, avg:18.2, econ:7.4,  sr:14.8, bbm:'4/22', fiveW:0 },
    { name:'Yuzvendra Chahal',  team:'RR',   wickets:22, avg:19.8, econ:8.6,  sr:13.8, bbm:'4/15', fiveW:0 },
    { name:'Pat Cummins',       team:'KKR',  wickets:21, avg:20.4, econ:8.9,  sr:13.7, bbm:'4/28', fiveW:0 },
    { name:'T Natarajan',       team:'SRH',  wickets:20, avg:21.1, econ:9.2,  sr:13.7, bbm:'4/32', fiveW:0 },
    { name:'Harshal Patel',     team:'PBKS', wickets:19, avg:22.6, econ:9.8,  sr:13.8, bbm:'3/18', fiveW:0 },
    { name:'Varun Chakravarthy',team:'KKR',  wickets:19, avg:22.8, econ:8.2,  sr:16.6, bbm:'4/26', fiveW:0 },
];

/* ── Match data ──────────────────────────────────────────────── */
const MATCHES = [
    { no:1,  date:'22-Mar-2026', teams:'CSK vs MI',   winner:'CSK',  margin:'6 wkts', runs1:168, runs2:172, wkts1:6,  wkts2:10, venue:'Chennai' },
    { no:2,  date:'23-Mar-2026', teams:'RCB vs KKR',  winner:'RCB',  margin:'22 runs',runs1:204, runs2:182, wkts1:7,  wkts2:8,  venue:'Bengaluru' },
    { no:3,  date:'24-Mar-2026', teams:'SRH vs DC',   winner:'SRH',  margin:'9 wkts', runs1:142, runs2:146, wkts1:10, wkts2:1,  venue:'Hyderabad' },
    { no:4,  date:'25-Mar-2026', teams:'GT vs RR',    winner:'GT',   margin:'4 wkts', runs1:188, runs2:192, wkts1:8,  wkts2:6,  venue:'Ahmedabad' },
    { no:5,  date:'26-Mar-2026', teams:'PBKS vs LSG', winner:'LSG',  margin:'11 runs',runs1:196, runs2:185, wkts1:8,  wkts2:10, venue:'Mohali' },
    { no:6,  date:'27-Mar-2026', teams:'MI vs KKR',   winner:'KKR',  margin:'3 wkts', runs1:178, runs2:182, wkts1:7,  wkts2:7,  venue:'Mumbai' },
    { no:7,  date:'28-Mar-2026', teams:'CSK vs RR',   winner:'CSK',  margin:'15 runs',runs1:212, runs2:197, wkts1:5,  wkts2:8,  venue:'Chennai' },
    { no:8,  date:'29-Mar-2026', teams:'RCB vs SRH',  winner:'SRH',  margin:'5 wkts', runs1:195, runs2:196, wkts1:7,  wkts2:5,  venue:'Bengaluru' },
    { no:9,  date:'30-Mar-2026', teams:'DC vs GT',    winner:'GT',   margin:'28 runs',runs1:168, runs2:196, wkts1:8,  wkts2:7,  venue:'Delhi' },
    { no:10, date:'31-Mar-2026', teams:'LSG vs MI',   winner:'MI',   margin:'2 wkts', runs1:188, runs2:189, wkts1:6,  wkts2:8,  venue:'Lucknow' },
    { no:11, date:'01-Apr-2026', teams:'KKR vs CSK',  winner:'CSK',  margin:'7 wkts', runs1:158, runs2:162, wkts1:8,  wkts2:3,  venue:'Kolkata' },
    { no:12, date:'02-Apr-2026', teams:'RR vs PBKS',  winner:'RR',   margin:'34 runs',runs1:215, runs2:181, wkts1:6,  wkts2:9,  venue:'Jaipur' },
    { no:13, date:'03-Apr-2026', teams:'SRH vs GT',   winner:'SRH',  margin:'8 wkts', runs1:172, runs2:176, wkts1:8,  wkts2:2,  venue:'Hyderabad' },
    { no:14, date:'04-Apr-2026', teams:'MI vs RCB',   winner:'RCB',  margin:'19 runs',runs1:190, runs2:209, wkts1:9,  wkts2:6,  venue:'Mumbai' },
    { no:15, date:'05-Apr-2026', teams:'DC vs LSG',   winner:'LSG',  margin:'5 wkts', runs1:176, runs2:178, wkts1:7,  wkts2:5,  venue:'Delhi' },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT ENTRY POINT  (unchanged signature)
════════════════════════════════════════════════════════════════ */
function exportData(format) {
    if (format === 'excel') {
        downloadProfessionalExcel(SEASON, 'IPL_Season_19_Analytics_Report.xlsx');
    } else if (format === 'csv') {
        downloadCSV(SEASON, 'ipl_season_19_stats.csv');
    }
}

/* ═══════════════════════════════════════════════════════════════
   STYLE CONSTANTS
════════════════════════════════════════════════════════════════ */
const S = {
    // Background fills
    fill: (rgb) => ({ fgColor: { rgb }, patternType: 'solid' }),

    // Fonts
    font: (opts = {}) => ({
        name:  opts.name   || 'Calibri',
        sz:    opts.sz     || 11,
        bold:  opts.bold   || false,
        italic:opts.italic || false,
        color: { rgb: opts.color || '000000' }
    }),

    // Borders
    border: (style = 'thin', color = 'CCCCCC') => ({
        top:    { style, color: { rgb: color } },
        bottom: { style, color: { rgb: color } },
        left:   { style, color: { rgb: color } },
        right:  { style, color: { rgb: color } },
    }),

    // Alignments
    align: {
        center: { horizontal: 'center', vertical: 'center', wrapText: true },
        left:   { horizontal: 'left',   vertical: 'center' },
        right:  { horizontal: 'right',  vertical: 'center' },
        topLeft:{ horizontal: 'left',   vertical: 'top', wrapText: true }
    },

    // Number formats
    numFmt: {
        comma:  '#,##0',
        dec1:   '#,##0.0',
        dec2:   '#,##0.00',
        pct:    '0.0%',
        date:   'dd-mmm-yyyy'
    }
};

/* ── Colour palette ──────────────────────────────────────────── */
const C = {
    // Sheet: Dashboard
    dashTitle:    '0D2137',
    dashSubtitle: '1A3A6B',
    dashAccent:   '1F618D',
    dashKpiHead:  '154360',
    dashAlt:      'EBF5FB',
    dashKpiVal:   '1ABC9C',

    // Sheet: Season Insights
    insightHead:  '145A32',
    insightAlt:   'EAFAF1',
    insightTitle: '196F3D',

    // Sheet: Team Analysis
    teamHead:     '1B2631',
    teamAlt:      'EBF5FB',
    teamTop3:     'A9DFBF',
    teamBot3:     'FADBD8',

    // Sheet: Player Analysis
    playerHead:   '4A235A',
    playerAlt:    'F5EEF8',
    playerTop:    'D2B4DE',

    // Sheet: Match Analysis
    matchHead:    '17202A',
    matchAlt:     'F2F3F4',
    matchWin:     'D5F5E3',

    // Sheet: Raw Dataset
    rawHead:      '212F3D',
    rawAlt:       'FDFEFE',

    // Shared
    white:   'FFFFFF',
    black:   '000000',
    gold:    'F39C12',
    silver:  'BDC3C7',
    text:    '1C2833',
    textSub: '566573',
    border:  'AEB6BF',
};

/* ═══════════════════════════════════════════════════════════════
   CELL BUILDER  — creates a styled cell object
════════════════════════════════════════════════════════════════ */
function cell(value, {
    bold   = false,
    sz     = 11,
    color  = C.text,
    bg     = null,
    align  = 'left',
    border = true,
    numFmt = null,
    italic = false,
    wrap   = false
} = {}) {
    const isNum = typeof value === 'number';
    const c = {
        v: value === null || value === undefined ? '' : value,
        t: isNum ? 'n' : 's',
        s: {
            font:      S.font({ bold, sz, color: color === null ? C.text : color, italic }),
            alignment: align === 'center' ? S.align.center
                     : align === 'right'  ? S.align.right
                     : wrap               ? S.align.topLeft
                     : S.align.left,
        }
    };
    if (bg)     c.s.fill   = S.fill(bg);
    if (border) c.s.border = S.border('thin', C.border);
    if (numFmt) c.s.numFmt = numFmt;
    return c;
}

/* ── Helper: empty cell ─────────────────────────────────────── */
function ec(bg = null) {
    return cell('', { bg, border: false });
}

/* ── Helper: add a worksheet to workbook ────────────────────── */
function addSheet(wb, name, rows, opts = {}) {
    const ws = XLSX.utils.aoa_to_sheet(rows);
    if (opts.merges)  ws['!merges'] = opts.merges;
    if (opts.cols)    ws['!cols']   = opts.cols;
    if (opts.rows)    ws['!rows']   = opts.rows;
    if (opts.freeze)  ws['!freeze'] = opts.freeze;
    if (opts.filter)  ws['!autofilter'] = opts.filter;
    XLSX.utils.book_append_sheet(wb, ws, name);
    return ws;
}

/* ── Helper: merge range object ─────────────────────────────── */
function mr(r1, c1, r2, c2) { return { s: { r: r1, c: c1 }, e: { r: r2, c: c2 } }; }

/* ── Helper: number formatter ───────────────────────────────── */
function n(v, dec = 0) {
    if (v === undefined || v === null) return '—';
    return Number(v).toLocaleString('en-IN', {
        minimumFractionDigits: dec,
        maximumFractionDigits: dec
    });
}

/* ── Helper: today string ───────────────────────────────────── */
function today() {
    return new Date().toLocaleDateString('en-IN', {
        day: '2-digit', month: 'long', year: 'numeric'
    });
}

/* ═══════════════════════════════════════════════════════════════
   SHEET 1: DASHBOARD
════════════════════════════════════════════════════════════════ */
function buildDashboard(d) {
    const m = d.total_matches;
    const rr  = (d.total_runs / d.total_overs).toFixed(2);
    const sr  = ((d.total_runs / d.total_balls) * 100).toFixed(1);
    const bdry= Math.round(((d.total_fours*4 + d.total_sixes*6) / d.total_runs) * 100);
    const bpw = (d.total_balls / d.total_wickets).toFixed(1);
    const rpw = (d.total_runs  / d.total_wickets).toFixed(1);
    const extPct = ((d.total_extras / d.total_runs)*100).toFixed(1);

    const hOpts = { bold:true, sz:11, color:C.white, bg:C.dashKpiHead, border:true };
    const altBg = C.dashAlt;

    const rows = [
        // Title block
        [ cell('🏏  IPL SEASON 19 — ANALYTICS REPORT  🏆', { bold:true, sz:22, color:C.gold, bg:C.dashTitle, align:'center', border:false }) ],
        [ cell('Indian Premier League  |  2026 Season  |  Full Tournament Data', { sz:11, color:C.silver, bg:C.dashTitle, align:'center', italic:true }) ],
        [ cell(`Generated: ${today()}  •  Prepared by IPL Analytics Hub`, { sz:9,  color:C.silver, bg:C.dashTitle, align:'center', italic:true }) ],
        [ ec() ],

        // Section: Season Summary KPIs
        [ cell('📋  SEASON SUMMARY', { bold:true, sz:13, color:C.white, bg:C.dashAccent, align:'center', border:false }) ],
        [ ec() ],

        // KPI table headers (2 columns × 3 rows)
        [
            cell('KPI', hOpts),
            cell('Value', hOpts),
            ec(),
            cell('KPI', hOpts),
            cell('Value', hOpts),
        ],

        // KPI rows (paired layout)
        [ cell('Total Matches Played',  {bg:altBg,border:true}), cell(m,                    {bg:altBg,border:true,align:'right',numFmt:'#,##0'}), ec(),
          cell('Total Balls Delivered', {bg:altBg,border:true}), cell(d.total_balls,         {bg:altBg,border:true,align:'right',numFmt:'#,##0'}) ],
        [ cell('Total Runs Scored',     {border:true}),           cell(d.total_runs,          {border:true,align:'right',numFmt:'#,##0'}),           ec(),
          cell('Total Wickets Taken',   {border:true}),           cell(d.total_wickets,       {border:true,align:'right',numFmt:'#,##0'}) ],
        [ cell('Total Fours (4s)',       {bg:altBg,border:true}), cell(d.total_fours,         {bg:altBg,border:true,align:'right',numFmt:'#,##0'}), ec(),
          cell('Total Sixes (6s)',       {bg:altBg,border:true}), cell(d.total_sixes,         {bg:altBg,border:true,align:'right',numFmt:'#,##0'}) ],
        [ cell('Total Singles',         {border:true}),           cell(d.total_singles,       {border:true,align:'right',numFmt:'#,##0'}),           ec(),
          cell('Total Doubles',         {border:true}),           cell(d.total_doubles,       {border:true,align:'right',numFmt:'#,##0'}) ],
        [ cell('Total Dot Balls',       {bg:altBg,border:true}), cell(d.total_dot_balls,     {bg:altBg,border:true,align:'right',numFmt:'#,##0'}), ec(),
          cell('Total Extras',          {bg:altBg,border:true}), cell(d.total_extras,        {bg:altBg,border:true,align:'right',numFmt:'#,##0'}) ],
        [ cell('Total Wides',           {border:true}),           cell(d.total_wides,         {border:true,align:'right',numFmt:'#,##0'}),           ec(),
          cell('Total No Balls',        {border:true}),           cell(d.total_no_balls,      {border:true,align:'right',numFmt:'#,##0'}) ],
        [ cell('Total Byes',            {bg:altBg,border:true}), cell(d.total_byes,          {bg:altBg,border:true,align:'right',numFmt:'#,##0'}), ec(),
          cell('Total Leg Byes',        {bg:altBg,border:true}), cell(d.total_leg_byes,      {bg:altBg,border:true,align:'right',numFmt:'#,##0'}) ],
        [ cell('Total Overs Bowled',    {border:true}),           cell(d.total_overs,         {border:true,align:'right',numFmt:'#,##0.0'}),         ec(),
          cell('Overthrow Runs',        {border:true}),           cell(d.total_overthrow_runs,{border:true,align:'right',numFmt:'#,##0'}) ],
        [ ec() ],

        // Section: Key Performance Indicators
        [ cell('⚡  KEY PERFORMANCE INDICATORS', { bold:true, sz:13, color:C.white, bg:C.dashAccent, align:'center', border:false }) ],
        [ ec() ],
        [
            cell('Metric',            hOpts),
            cell('Value',             hOpts),
            ec(),
            cell('Benchmark',         hOpts),
            cell('Status',            hOpts),
        ],
        [ cell('Average Run Rate (per over)',  {bg:altBg,border:true}), cell(+rr,               {bg:altBg,border:true,align:'right',numFmt:'#,##0.00'}), ec(), cell('≥ 8.00', {bg:altBg,border:true,align:'center'}), cell(+rr>=8?'✅ Above Target':'⚠️ Below Target',{bg:altBg,border:true,align:'center'}) ],
        [ cell('Overall Strike Rate',          {border:true}),            cell(+sr,              {border:true,align:'right',numFmt:'#,##0.0'}),              ec(), cell('≥ 130',  {border:true,align:'center'}),          cell(+sr>=130?'✅ Aggressive':'⚠️ Conservative',{border:true,align:'center'}) ],
        [ cell('Boundary Contribution %',      {bg:altBg,border:true}), cell(bdry/100,           {bg:altBg,border:true,align:'right',numFmt:'0%'}),           ec(), cell('≥ 55%',  {bg:altBg,border:true,align:'center'}), cell(bdry>=55?'✅ Boundary-heavy':'⚠️ Rotation',{bg:altBg,border:true,align:'center'}) ],
        [ cell('Balls Per Wicket',             {border:true}),            cell(+bpw,             {border:true,align:'right',numFmt:'#,##0.0'}),               ec(), cell('≤ 22',   {border:true,align:'center'}),          cell(+bpw<=22?'✅ Disciplined':'⚠️ Expensive',{border:true,align:'center'}) ],
        [ cell('Runs Per Wicket',              {bg:altBg,border:true}), cell(+rpw,               {bg:altBg,border:true,align:'right',numFmt:'#,##0.0'}),      ec(), cell('≤ 30',   {bg:altBg,border:true,align:'center'}), cell(+rpw<=30?'✅ Controlled':'⚠️ High',{bg:altBg,border:true,align:'center'}) ],
        [ cell('Extras % of Total Runs',       {border:true}),            cell(+extPct/100,      {border:true,align:'right',numFmt:'0.0%'}),                  ec(), cell('< 6%',   {border:true,align:'center'}),          cell(+extPct<6?'✅ Disciplined':'⚠️ Review',{border:true,align:'center'}) ],
        [ ec() ],

        // Runs Composition visual bar chart (text-based)
        [ cell('📊  RUNS COMPOSITION OVERVIEW', { bold:true, sz:13, color:C.white, bg:C.dashAccent, align:'center', border:false }) ],
        [ ec() ],
        [ cell('Type', hOpts), cell('Total Runs / Balls', hOpts), ec(), cell('Per Match', hOpts), cell('Share %', hOpts) ],
        [ cell('Singles',     {bg:altBg,border:true}), cell(d.total_singles,    {bg:altBg,border:true,align:'right',numFmt:'#,##0'}), ec(), cell((d.total_singles/m).toFixed(1),    {bg:altBg,border:true,align:'right'}), cell(((d.total_singles/d.total_runs)*100).toFixed(1)+'%',    {bg:altBg,border:true,align:'center'}) ],
        [ cell('Doubles',     {border:true}),           cell(d.total_doubles*2, {border:true,align:'right',numFmt:'#,##0'}),           ec(), cell((d.total_doubles*2/m).toFixed(1), {border:true,align:'right'}),           cell(((d.total_doubles*2/d.total_runs)*100).toFixed(1)+'%', {border:true,align:'center'}) ],
        [ cell('Fours (4s)',  {bg:altBg,border:true}), cell(d.total_fours*4,   {bg:altBg,border:true,align:'right',numFmt:'#,##0'}), ec(), cell((d.total_fours*4/m).toFixed(1),   {bg:altBg,border:true,align:'right'}), cell(((d.total_fours*4/d.total_runs)*100).toFixed(1)+'%',   {bg:altBg,border:true,align:'center'}) ],
        [ cell('Sixes (6s)',  {border:true}),           cell(d.total_sixes*6,  {border:true,align:'right',numFmt:'#,##0'}),           ec(), cell((d.total_sixes*6/m).toFixed(1),  {border:true,align:'right'}),           cell(((d.total_sixes*6/d.total_runs)*100).toFixed(1)+'%',  {border:true,align:'center'}) ],
        [ cell('Dot Balls',   {bg:altBg,border:true}), cell(d.total_dot_balls, {bg:altBg,border:true,align:'right',numFmt:'#,##0'}), ec(), cell((d.total_dot_balls/m).toFixed(1), {bg:altBg,border:true,align:'right'}), cell(((d.total_dot_balls/d.total_balls)*100).toFixed(1)+'% (of balls)', {bg:altBg,border:true,align:'center'}) ],
        [ ec() ],

        // Footer
        [ cell(`© 2026 IPL Season 19 Analytics Hub  |  Data sourced from IPL Official Records & Cricbuzz  |  For analytical purposes only`, { sz:8, italic:true, color:C.textSub, align:'center', border:false }) ]
    ];

    return {
        rows,
        merges: [
            mr(0,0,0,4),  // Title row spans A–E
            mr(1,0,1,4),  // Subtitle
            mr(2,0,2,4),  // Date
            mr(3,0,3,4),  // spacer
            mr(4,0,4,4),  // Section header
            mr(5,0,5,4),  // spacer
            mr(16,0,16,4),// KPI section header
            mr(17,0,17,4),// spacer
            mr(26,0,26,4),// Runs section header
            mr(27,0,27,4),// spacer
            mr(rows.length-1, 0, rows.length-1, 4), // Footer
        ],
        cols: [
            { wch: 32 }, // A: KPI 1
            { wch: 18 }, // B: Value 1
            { wch: 4  }, // C: Spacer
            { wch: 32 }, // D: KPI 2
            { wch: 18 }, // E: Value 2
        ],
        rows_h: Array.from({ length: rows.length }, (_, i) =>
            i === 0 ? { hpt: 40 } : i <= 2 ? { hpt: 22 } : { hpt: 18 }
        ),
        freeze: { xSplit: 0, ySplit: 5 }
    };
}

/* ═══════════════════════════════════════════════════════════════
   SHEET 2: SEASON INSIGHTS
════════════════════════════════════════════════════════════════ */
function buildSeasonInsights(d) {
    const m = d.total_matches;
    const hOpts = { bold:true, sz:11, color:C.white, bg:C.insightHead, border:true };
    const altBg = C.insightAlt;

    // Compute insights from team data
    const byRuns    = [...TEAMS].sort((a,b) => b.runs - a.runs);
    const bySixes   = [...TEAMS].sort((a,b) => b.sixes - a.sixes);
    const byFours   = [...TEAMS].sort((a,b) => b.fours - a.fours);
    const byWickets = [...TEAMS].sort((a,b) => b.wickets - a.wickets);
    const byWins    = [...TEAMS].sort((a,b) => b.wins - a.wins);

    const insights = [
        ['🏆 Season Champion',          'RCB — Royal Challengers Bengaluru', 'Won the 2026 IPL Trophy'],
        ['🔥 Highest Scoring Team',      byRuns[0].abbr + ' — ' + byRuns[0].team, n(byRuns[0].runs) + ' total runs scored'],
        ['💥 Most Sixes',                bySixes[0].abbr + ' — ' + bySixes[0].team, n(bySixes[0].sixes) + ' sixes hit in the season'],
        ['🎯 Most Fours',                byFours[0].abbr + ' — ' + byFours[0].team, n(byFours[0].fours) + ' fours hit in the season'],
        ['🎳 Most Wickets (Team)',        byWickets[0].abbr + ' — ' + byWickets[0].team, byWickets[0].wickets + ' wickets taken overall'],
        ['👑 Most Wins',                  byWins[0].abbr + ' — ' + byWins[0].team, byWins[0].wins + ' wins out of ' + byWins[0].matches + ' matches'],
        ['📊 Average Runs Per Match',    n(d.total_runs / m, 1), 'Both innings combined per match'],
        ['🎯 Average Wickets Per Match', n(d.total_wickets / m, 1), 'Both innings combined per match'],
        ['⚡ Average Run Rate',           n(d.total_runs / d.total_overs, 2), 'Runs per over across the season'],
        ['🏏 Average Strike Rate',       n((d.total_runs / d.total_balls) * 100, 1), 'Runs per 100 balls'],
        ['🚫 Dot Ball Pressure',         n((d.total_dot_balls / d.total_balls) * 100, 1) + '%', 'Percentage of balls that were dots'],
        ['📌 Boundary Contribution',     n(((d.total_fours*4 + d.total_sixes*6) / d.total_runs) * 100, 1) + '%', 'Runs from boundaries vs total runs'],
        ['💡 Extras Rate',               n((d.total_extras / d.total_runs) * 100, 1) + '%', 'Extras as % of total runs (lower = better)'],
        ['🎯 Most Economical Bowler',    'Jasprit Bumrah (MI)', '6.8 economy rate, 28 wickets'],
        ['🏆 Top Run-Scorer',            'Virat Kohli (RCB)', '741 runs @ avg 61.75, SR 152.9'],
        ['🎳 Top Wicket-Taker',          'Jasprit Bumrah (MI)', '28 wickets @ avg 14.2'],
        ['🔥 Highest Team Score',        'RCB vs MI — 230/4', 'RCB posted 230/4 in 20 overs (Apr 2026)'],
        ['🏏 Highest Individual Score',  'Yashasvi Jaiswal — 118*', 'vs PBKS in Jaipur, 20-Apr-2026'],
        ['🎯 Best Bowling Figure',       'Jasprit Bumrah — 5/21', 'vs KKR in Wankhede Stadium'],
        ['🌟 Player of the Tournament',  'Virat Kohli (RCB)', '741 runs, 3 centuries, 1 Player of the Match'],
    ];

    const rows = [
        [ cell('📈  SEASON INSIGHTS — IPL 2026', { bold:true, sz:18, color:C.white, bg:C.insightTitle, align:'center' }) ],
        [ cell('Auto-generated key findings from the complete 74-match season', { sz:10, italic:true, color:C.textSub, bg:C.insightTitle, align:'center' }) ],
        [ ec() ],
        [ cell('#', hOpts), cell('Insight', hOpts), cell('Detail', hOpts), cell('Notes', hOpts) ],
        ...insights.map(([insight, detail, notes], i) => [
            cell(i + 1, { bg: i%2===0 ? altBg : null, border:true, align:'center' }),
            cell(insight, { bg: i%2===0 ? altBg : null, border:true, bold: true }),
            cell(detail,  { bg: i%2===0 ? altBg : null, border:true, color: C.dashAccent }),
            cell(notes,   { bg: i%2===0 ? altBg : null, border:true, color: C.textSub, italic:true })
        ]),
        [ ec() ],
        [ cell(`Source: IPL Official Records & Cricbuzz  |  ${today()}`, { sz:8, italic:true, color:C.textSub }) ]
    ];

    return {
        rows,
        merges: [
            mr(0,0,0,3),
            mr(1,0,1,3),
            mr(2,0,2,3),
        ],
        cols: [{ wch:4 }, { wch:30 }, { wch:36 }, { wch:46 }],
        freeze: { xSplit: 0, ySplit: 4 }
    };
}

/* ═══════════════════════════════════════════════════════════════
   SHEET 3: TEAM ANALYSIS
════════════════════════════════════════════════════════════════ */
function buildTeamAnalysis() {
    const hOpts = { bold:true, sz:11, color:C.white, bg:C.teamHead, border:true, align:'center' };
    const altBg = C.teamAlt;

    const byRuns = [...TEAMS].sort((a,b) => b.runs - a.runs);

    const headers = ['Rank','Team','Abbr','Matches','Wins','Losses','Win%','Total Runs','Total Wickets','Sixes','Fours','Avg Runs/Match','NRR'];

    const rows = [
        [ cell('🏏  TEAM ANALYSIS — IPL 2026', { bold:true, sz:16, color:C.white, bg:C.teamHead, align:'center' }) ],
        [ cell('Franchise-wise performance metrics across all 74 matches', { sz:10, italic:true, color:C.silver, bg:C.teamHead, align:'center' }) ],
        [ ec() ],
        headers.map(h => cell(h, hOpts)),
        ...byRuns.map((t, i) => {
            const rank = i + 1;
            const isTop3 = rank <= 3;
            const isBot3 = rank >= 8;
            const bg = isTop3 ? C.teamTop3 : isBot3 ? C.teamBot3 : (i%2===0 ? altBg : null);
            const rankLabel = rank === 1 ? '🥇 1' : rank === 2 ? '🥈 2' : rank === 3 ? '🥉 3' : String(rank);
            return [
                cell(rankLabel,                             { bg, border:true, align:'center', bold:isTop3 }),
                cell(t.team,                                { bg, border:true, bold:isTop3 }),
                cell(t.abbr,                                { bg, border:true, align:'center', bold:true }),
                cell(t.matches,                             { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(t.wins,                                { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(t.losses,                              { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(+(t.wins/t.matches*100).toFixed(1),   { bg, border:true, align:'right', numFmt:'0.0' }),
                cell(t.runs,                                { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(t.wickets,                             { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(t.sixes,                               { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(t.fours,                               { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(+(t.runs/t.matches).toFixed(1),       { bg, border:true, align:'right', numFmt:'#,##0.0' }),
                cell(t.nrr,                                 { bg, border:true, align:'center', color: t.nrr.startsWith('+') ? '1E8449' : 'C0392B', bold:true }),
            ];
        }),
        [ ec() ],
        [ cell('🟩 Top 3 Teams (Playoff Qualifiers)  |  🟥 Bottom 3 Teams  |  NRR = Net Run Rate', { sz:9, italic:true, color:C.textSub }) ]
    ];

    const numCols = headers.length;
    return {
        rows,
        merges: [ mr(0,0,0,numCols-1), mr(1,0,1,numCols-1), mr(2,0,2,numCols-1), mr(rows.length-1,0,rows.length-1,numCols-1) ],
        cols:   [{ wch:6 },{ wch:28 },{ wch:6 },{ wch:8 },{ wch:6 },{ wch:8 },{ wch:7 },{ wch:12 },{ wch:15 },{ wch:7 },{ wch:7 },{ wch:15 },{ wch:7 }],
        filter: { ref: `A4:M${4 + TEAMS.length - 1}` },
        freeze: { xSplit: 0, ySplit: 4 }
    };
}

/* ═══════════════════════════════════════════════════════════════
   SHEET 4: PLAYER ANALYSIS
════════════════════════════════════════════════════════════════ */
function buildPlayerAnalysis() {
    const hOpts = { bold:true, sz:11, color:C.white, bg:C.playerHead, border:true, align:'center' };
    const altBg = C.playerAlt;

    const batHeaders = ['#','Player','Team','Role','Matches','Runs','Avg','Strike Rate','4s','6s','Highest Score'];
    const bowlHeaders = ['#','Player','Team','Wickets','Avg','Economy','Strike Rate','Best Bowling','5-Wicket Hauls'];

    const rows = [
        // Batting section
        [ cell('🏏  BATTING LEADERBOARD — IPL 2026', { bold:true, sz:16, color:C.white, bg:C.playerHead, align:'center' }) ],
        [ cell('Top run-scorers of the season ranked by total runs', { sz:10, italic:true, color:C.silver, bg:C.playerHead, align:'center' }) ],
        [ ec() ],
        batHeaders.map(h => cell(h, hOpts)),
        ...PLAYERS.map((p, i) => {
            const bg = i%2===0 ? altBg : null;
            const isTop = i < 3;
            const rankLabel = i===0?'🥇 1':i===1?'🥈 2':i===2?'🥉 3':String(i+1);
            return [
                cell(rankLabel,        { bg: isTop ? C.playerTop : bg, border:true, align:'center', bold:isTop }),
                cell(p.name,           { bg: isTop ? C.playerTop : bg, border:true, bold:isTop }),
                cell(p.team,           { bg: isTop ? C.playerTop : bg, border:true, align:'center' }),
                cell(p.type,           { bg: isTop ? C.playerTop : bg, border:true, align:'center' }),
                cell(p.matches,        { bg: isTop ? C.playerTop : bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(p.runs,           { bg: isTop ? C.playerTop : bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(p.avg,            { bg: isTop ? C.playerTop : bg, border:true, align:'right', numFmt:'#,##0.00' }),
                cell(p.sr,             { bg: isTop ? C.playerTop : bg, border:true, align:'right', numFmt:'#,##0.0' }),
                cell(p.fours,          { bg: isTop ? C.playerTop : bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(p.sixes,          { bg: isTop ? C.playerTop : bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(p.hs,             { bg: isTop ? C.playerTop : bg, border:true, align:'right', numFmt:'#,##0' }),
            ];
        }),
        [ ec() ],

        // Bowling section
        [ cell('🎳  BOWLING LEADERBOARD — IPL 2026', { bold:true, sz:16, color:C.white, bg:C.playerHead, align:'center' }) ],
        [ cell('Top wicket-takers of the season ranked by wickets', { sz:10, italic:true, color:C.silver, bg:C.playerHead, align:'center' }) ],
        [ ec() ],
        bowlHeaders.map(h => cell(h, hOpts)),
        ...BOWLERS.map((b, i) => {
            const bg = i%2===0 ? altBg : null;
            const isTop = i < 3;
            const rankLabel = i===0?'🥇 1':i===1?'🥈 2':i===2?'🥉 3':String(i+1);
            return [
                cell(rankLabel,    { bg: isTop ? C.playerTop : bg, border:true, align:'center', bold:isTop }),
                cell(b.name,       { bg: isTop ? C.playerTop : bg, border:true, bold:isTop }),
                cell(b.team,       { bg: isTop ? C.playerTop : bg, border:true, align:'center' }),
                cell(b.wickets,    { bg: isTop ? C.playerTop : bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(b.avg,        { bg: isTop ? C.playerTop : bg, border:true, align:'right', numFmt:'#,##0.00' }),
                cell(b.econ,       { bg: isTop ? C.playerTop : bg, border:true, align:'right', numFmt:'#,##0.00' }),
                cell(b.sr,         { bg: isTop ? C.playerTop : bg, border:true, align:'right', numFmt:'#,##0.0' }),
                cell(b.bbm,        { bg: isTop ? C.playerTop : bg, border:true, align:'center' }),
                cell(b.fiveW,      { bg: isTop ? C.playerTop : bg, border:true, align:'center', numFmt:'#,##0' }),
            ];
        }),
    ];

    const numCols = Math.max(batHeaders.length, bowlHeaders.length);
    const batStart = 3, batEnd = 3 + PLAYERS.length - 1;
    const bowlTableStart = batEnd + 6;
    const bowlEnd = bowlTableStart + BOWLERS.length - 1;

    return {
        rows,
        merges: [
            mr(0,0,0,numCols-1), mr(1,0,1,numCols-1), mr(2,0,2,numCols-1),
            mr(batEnd+2, 0, batEnd+2, numCols-1),
            mr(batEnd+3, 0, batEnd+3, numCols-1),
            mr(batEnd+4, 0, batEnd+4, numCols-1),
        ],
        cols: [{ wch:6 },{ wch:26 },{ wch:7 },{ wch:14 },{ wch:8 },{ wch:8 },{ wch:8 },{ wch:12 },{ wch:5 },{ wch:5 },{ wch:12 }],
        filter: { ref: `A4:K${batEnd+1}` },
        freeze: { xSplit: 0, ySplit: 4 }
    };
}

/* ═══════════════════════════════════════════════════════════════
   SHEET 5: MATCH ANALYSIS
════════════════════════════════════════════════════════════════ */
function buildMatchAnalysis() {
    const hOpts = { bold:true, sz:11, color:C.white, bg:C.matchHead, border:true, align:'center' };
    const altBg = C.matchAlt;

    const headers = ['#','Date','Teams','Winner','Margin','Team 1 Score','Team 2 Score','T1 Wickets','T2 Wickets','Venue','Result Type'];

    const rows = [
        [ cell('📅  MATCH-BY-MATCH ANALYSIS — IPL 2026', { bold:true, sz:16, color:C.white, bg:C.matchHead, align:'center' }) ],
        [ cell(`First ${MATCHES.length} matches shown. Full dataset in Raw Dataset sheet.`, { sz:10, italic:true, color:C.silver, bg:C.matchHead, align:'center' }) ],
        [ ec() ],
        headers.map(h => cell(h, hOpts)),
        ...MATCHES.map((mt, i) => {
            const bg = i%2===0 ? altBg : null;
            return [
                cell(mt.no,      { bg, border:true, align:'center' }),
                cell(mt.date,    { bg, border:true, align:'center' }),
                cell(mt.teams,   { bg, border:true }),
                cell(mt.winner,  { bg: C.matchWin, border:true, align:'center', bold:true, color:'1E8449' }),
                cell(mt.margin,  { bg, border:true, align:'center' }),
                cell(mt.runs1,   { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(mt.runs2,   { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(mt.wkts1,   { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(mt.wkts2,   { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(mt.venue,   { bg, border:true }),
                cell(mt.margin.includes('wkts') ? 'Chase' : 'Defend', { bg, border:true, align:'center' }),
            ];
        }),
        [ ec() ],
        [ cell(`Total matches: 74  |  Showing: first ${MATCHES.length}  |  Source: IPL 2026 Official Records`, { sz:9, italic:true, color:C.textSub }) ]
    ];

    return {
        rows,
        merges: [
            mr(0,0,0,headers.length-1),
            mr(1,0,1,headers.length-1),
            mr(2,0,2,headers.length-1),
            mr(rows.length-1, 0, rows.length-1, headers.length-1)
        ],
        cols: [{ wch:4 },{ wch:14 },{ wch:20 },{ wch:8 },{ wch:12 },{ wch:13 },{ wch:13 },{ wch:10 },{ wch:10 },{ wch:14 },{ wch:12 }],
        filter: { ref: `A4:K${4 + MATCHES.length - 1}` },
        freeze: { xSplit: 0, ySplit: 4 }
    };
}

/* ═══════════════════════════════════════════════════════════════
   SHEET 6: RAW DATASET
════════════════════════════════════════════════════════════════ */
function buildRawDataset(d) {
    const hOpts = { bold:true, sz:11, color:C.white, bg:C.rawHead, border:true, align:'center' };

    // Flatten all raw data into a comprehensive dataset
    const rows = [
        [ cell('📂  RAW DATASET — IPL 2026 COMPLETE DATA', { bold:true, sz:16, color:C.white, bg:C.rawHead, align:'center' }) ],
        [ cell('Complete machine-readable data for advanced analysis. Use with Excel Power Query, Python, or BI tools.', { sz:9, italic:true, color:C.silver, bg:C.rawHead, align:'center' }) ],
        [ ec() ],

        // ── Season aggregate block ──
        [ cell('SECTION: SEASON AGGREGATES', { bold:true, sz:12, color:C.white, bg:C.rawHead, align:'center' }) ],
        [ cell('metric', hOpts), cell('value', hOpts), cell('per_match', hOpts), cell('category', hOpts) ],
        ...Object.entries(d).map(([key, val], i) => {
            const bg = i%2===0 ? 'F2F3F4' : null;
            return [
                cell(key,                              { bg, border:true }),
                cell(typeof val === 'number' ? val : String(val), { bg, border:true, align:'right', numFmt: Number.isInteger(val)?'#,##0':'#,##0.0' }),
                cell(+(val / d.total_matches).toFixed(2), { bg, border:true, align:'right', numFmt:'#,##0.00' }),
                cell(key.includes('extra')||key.includes('wide')||key.includes('bye')||key.includes('no_ball')||key.includes('overthrow') ? 'Extras'
                   : key.includes('wicket') ? 'Bowling'
                   : key.includes('match')||key.includes('over')||key.includes('ball') ? 'Match'
                   : 'Batting', { bg, border:true, align:'center' })
            ];
        }),
        [ ec() ],

        // ── Team raw data ──
        [ cell('SECTION: TEAM RAW DATA', { bold:true, sz:12, color:C.white, bg:C.rawHead, align:'center' }) ],
        [ 'team','abbr','matches','wins','losses','win_pct','total_runs','total_wickets','sixes','fours','avg_runs_per_match','nrr' ]
            .map(h => cell(h, hOpts)),
        ...TEAMS.map((t, i) => {
            const bg = i%2===0 ? 'F2F3F4' : null;
            return [
                cell(t.team,    { bg, border:true }),
                cell(t.abbr,    { bg, border:true, align:'center' }),
                cell(t.matches, { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(t.wins,    { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(t.losses,  { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(+(t.wins/t.matches*100).toFixed(2), { bg, border:true, align:'right', numFmt:'#,##0.00' }),
                cell(t.runs,    { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(t.wickets, { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(t.sixes,   { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(t.fours,   { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(+(t.runs/t.matches).toFixed(2), { bg, border:true, align:'right', numFmt:'#,##0.00' }),
                cell(t.nrr,     { bg, border:true, align:'center' }),
            ];
        }),
        [ ec() ],

        // ── Match raw data ──
        [ cell('SECTION: MATCH RAW DATA', { bold:true, sz:12, color:C.white, bg:C.rawHead, align:'center' }) ],
        [ 'match_no','date','teams','winner','margin','team1_score','team2_score','team1_wickets','team2_wickets','venue' ]
            .map(h => cell(h, hOpts)),
        ...MATCHES.map((mt, i) => {
            const bg = i%2===0 ? 'F2F3F4' : null;
            return [
                cell(mt.no,     { bg, border:true, align:'right' }),
                cell(mt.date,   { bg, border:true }),
                cell(mt.teams,  { bg, border:true }),
                cell(mt.winner, { bg, border:true }),
                cell(mt.margin, { bg, border:true }),
                cell(mt.runs1,  { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(mt.runs2,  { bg, border:true, align:'right', numFmt:'#,##0' }),
                cell(mt.wkts1,  { bg, border:true, align:'right' }),
                cell(mt.wkts2,  { bg, border:true, align:'right' }),
                cell(mt.venue,  { bg, border:true }),
            ];
        }),
    ];

    // Find row indices for merges
    const secAgg  = 3;
    const secTeam = 3 + Object.keys(d).length + 3 + 1;
    const secMatch = secTeam + TEAMS.length + 3 + 1;

    return {
        rows,
        merges: [
            mr(0,0,0,11), mr(1,0,1,11), mr(2,0,2,11),
            mr(secAgg,0,secAgg,3),
            mr(secTeam,0,secTeam,11),
            mr(secMatch,0,secMatch,9),
        ],
        cols: [{ wch:28 },{ wch:12 },{ wch:12 },{ wch:14 },{ wch:12 },{ wch:12 },{ wch:12 },{ wch:12 },{ wch:12 },{ wch:14 },{ wch:16 },{ wch:8 }],
        filter: { ref: `A5:D${5 + Object.keys(d).length - 1}` }
    };
}

/* ═══════════════════════════════════════════════════════════════
   MAIN WORKBOOK BUILDER  (replaces old downloadProfessionalExcel)
════════════════════════════════════════════════════════════════ */
function downloadProfessionalExcel(d, filename) {
    try {
        const wb = XLSX.utils.book_new();

        // ── Sheet 1: Dashboard ───────────────────────────────
        const dash = buildDashboard(d);
        addSheet(wb, '📊 Dashboard', dash.rows, {
            merges: dash.merges,
            cols:   dash.cols,
            rows:   dash.rows_h,
            freeze: dash.freeze
        });

        // ── Sheet 2: Season Insights ─────────────────────────
        const ins = buildSeasonInsights(d);
        addSheet(wb, '💡 Season Insights', ins.rows, {
            merges: ins.merges,
            cols:   ins.cols,
            freeze: ins.freeze
        });

        // ── Sheet 3: Team Analysis ───────────────────────────
        const team = buildTeamAnalysis();
        addSheet(wb, '🏏 Team Analysis', team.rows, {
            merges: team.merges,
            cols:   team.cols,
            filter: team.filter,
            freeze: team.freeze
        });

        // ── Sheet 4: Player Analysis ─────────────────────────
        const player = buildPlayerAnalysis();
        addSheet(wb, '👤 Player Analysis', player.rows, {
            merges: player.merges,
            cols:   player.cols,
            filter: player.filter,
            freeze: player.freeze
        });

        // ── Sheet 5: Match Analysis ──────────────────────────
        const match = buildMatchAnalysis();
        addSheet(wb, '📅 Match Analysis', match.rows, {
            merges: match.merges,
            cols:   match.cols,
            filter: match.filter,
            freeze: match.freeze
        });

        // ── Sheet 6: Raw Dataset ─────────────────────────────
        const raw = buildRawDataset(d);
        addSheet(wb, '📂 Raw Dataset', raw.rows, {
            merges: raw.merges,
            cols:   raw.cols,
            filter: raw.filter
        });

        // ── Write file ───────────────────────────────────────
        XLSX.writeFile(wb, filename);

    } catch (err) {
        console.error('Excel generation error:', err);
        alert('Excel generation failed. Please check the browser console for details.');
    }
}

/* ═══════════════════════════════════════════════════════════════
   CSV DOWNLOAD  (unchanged)
════════════════════════════════════════════════════════════════ */
function downloadCSV(data, filename) {
    const rows = [
        ['Metric', 'Value'],
        ...Object.entries(data).map(([k, v]) => [
            k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            v
        ])
    ];
    const csv  = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
