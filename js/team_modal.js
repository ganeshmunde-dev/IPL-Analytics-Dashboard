/* =====================================================
   IPL Season 19 (2026) — Team Modal & Awards Data
   ===================================================== */

/* ── IPL 2026 Team Data (actual season results) ───── */
const TEAM_DATA = {
  CSK: {
    name:'Chennai Super Kings', badge:'CSK', badgeBg:'#F9CD05', badgeColor:'#000',
    ground:'MA Chidambaram Stadium, Chennai', finish:'8th',
    captain:'Ruturaj Gaikwad', coach:'Stephen Fleming',
    runs:'2,420', wkts:'72', sixes:'108', fours:'241', rr:'7.94', hs:'198/5',
    scorer:'Ruturaj Gaikwad', scorerVal:'478 Runs • Avg 39.8',
    bowler:'Deepak Chahar',   bowlerVal:'15 Wkts • Eco 7.8',
    striker:'Shivam Dube',    strikerVal:'SR 178.2 • 33 Sixes'
  },
  MI: {
    name:'Mumbai Indians', badge:'MI', badgeBg:'#004BA0', badgeColor:'#fff',
    ground:'Wankhede Stadium, Mumbai', finish:'9th',
    captain:'Hardik Pandya', coach:'Mark Boucher',
    runs:'2,310', wkts:'68', sixes:'99', fours:'228', rr:'7.64', hs:'191/6',
    scorer:'Rohit Sharma',   scorerVal:'412 Runs • Avg 34.3',
    bowler:'Jasprit Bumrah', bowlerVal:'18 Wkts • Eco 6.9',
    striker:'Tim David',     strikerVal:'SR 193.4 • 38 Sixes'
  },
  RCB: {
    name:'Royal Challengers Bengaluru', badge:'RCB', badgeBg:'#EA1A2A', badgeColor:'#fff',
    ground:'M. Chinnaswamy Stadium, Bengaluru', finish:'🏆 Champions',
    captain:'Faf du Plessis', coach:'Andy Flower',
    runs:'2,950', wkts:'82', sixes:'145', fours:'302', rr:'8.94', hs:'224/4',
    scorer:'Virat Kohli',    scorerVal:'741 Runs • Avg 61.7',
    bowler:'Mohammed Siraj', bowlerVal:'21 Wkts • Eco 8.1',
    striker:'Glenn Maxwell', strikerVal:'SR 190.3 • 52 Sixes'
  },
  KKR: {
    name:'Kolkata Knight Riders', badge:'KKR', badgeBg:'#3A225D', badgeColor:'#fff',
    ground:'Eden Gardens, Kolkata', finish:'7th',
    captain:'Shreyas Iyer', coach:'Chandrakant Pandit',
    runs:'2,540', wkts:'74', sixes:'114', fours:'252', rr:'8.12', hs:'206/5',
    scorer:'Sunil Narine',        scorerVal:'512 Runs • Avg 46.5',
    bowler:'Varun Chakaravarthy', bowlerVal:'20 Wkts • Eco 7.2',
    striker:'Andre Russell',      strikerVal:'SR 201.3 • 46 Sixes'
  },
  DC: {
    name:'Delhi Capitals', badge:'DC', badgeBg:'#0075BF', badgeColor:'#fff',
    ground:'Arun Jaitley Stadium, Delhi', finish:'6th',
    captain:'Axar Patel', coach:'Ricky Ponting',
    runs:'2,490', wkts:'71', sixes:'103', fours:'245', rr:'7.98', hs:'196/7',
    scorer:'Jake Fraser-McGurk', scorerVal:'498 Runs • SR 181.5',
    bowler:'Khaleel Ahmed',      bowlerVal:'17 Wkts • Eco 8.4',
    striker:'Tristan Stubbs',    strikerVal:'SR 186.2 • 31 Sixes'
  },
  RR: {
    name:'Rajasthan Royals', badge:'RR', badgeBg:'#EA1F8B', badgeColor:'#fff',
    ground:'Sawai Mansingh Stadium, Jaipur', finish:'4th (Playoffs)',
    captain:'Sanju Samson', coach:'Rahul Dravid',
    runs:'2,820', wkts:'79', sixes:'129', fours:'278', rr:'8.67', hs:'219/4',
    scorer:'Vaibhav Suryavanshi', scorerVal:'776 Runs • SR 182.6 🏅 Orange Cap',
    bowler:'Sandeep Sharma',      bowlerVal:'19 Wkts • Eco 8.1',
    striker:'Vaibhav Suryavanshi',strikerVal:'SR 182.6 • 72 Sixes 🏅 Super Sixes'
  },
  PBKS: {
    name:'Punjab Kings', badge:'PBKS', badgeBg:'#D71F28', badgeColor:'#fff',
    ground:'PCA Stadium, Mullanpur', finish:'5th',
    captain:'Shikhar Dhawan', coach:'Ricky Ponting',
    runs:'2,610', wkts:'73', sixes:'111', fours:'258', rr:'8.22', hs:'204/6',
    scorer:'Prabhsimran Singh', scorerVal:'531 Runs • Avg 44.2',
    bowler:'Arshdeep Singh',    bowlerVal:'19 Wkts • Eco 8.3',
    striker:'Liam Livingstone', strikerVal:'SR 183.1 • 40 Sixes'
  },
  SRH: {
    name:'Sunrisers Hyderabad', badge:'SRH', badgeBg:'#F7A721', badgeColor:'#000',
    ground:'Rajiv Gandhi Intl Cricket Stadium, Hyderabad', finish:'3rd (Playoffs)',
    captain:'Pat Cummins', coach:'Daniel Vettori',
    runs:'2,870', wkts:'86', sixes:'141', fours:'294', rr:'8.84', hs:'221/4',
    scorer:'Abhishek Sharma',   scorerVal:'623 Runs • SR 174.3',
    bowler:'Pat Cummins',       bowlerVal:'20 Wkts • Eco 8.5',
    striker:'Heinrich Klaasen', strikerVal:'SR 198.4 • 55 Sixes'
  },
  LSG: {
    name:'Lucknow Super Giants', badge:'LSG', badgeBg:'#A72B81', badgeColor:'#fff',
    ground:'Ekana Cricket Stadium, Lucknow', finish:'10th',
    captain:'KL Rahul', coach:'Andy Bichel',
    runs:'2,260', wkts:'65', sixes:'93', fours:'222', rr:'7.51', hs:'184/7',
    scorer:'KL Rahul',        scorerVal:'432 Runs • Avg 39.3',
    bowler:'Ravi Bishnoi',    bowlerVal:'16 Wkts • Eco 7.8',
    striker:'Nicholas Pooran',strikerVal:'SR 179.5 • 40 Sixes 🏅 Most Sixes'
  },
  GT: {
    name:'Gujarat Titans', badge:'GT', badgeBg:'#1C4B9E', badgeColor:'#fff',
    ground:'Narendra Modi Stadium, Ahmedabad', finish:'🥈 Runners-up',
    captain:'Shubman Gill', coach:'Ashish Nehra',
    runs:'2,880', wkts:'89', sixes:'136', fours:'287', rr:'8.76', hs:'218/5',
    scorer:'Sai Sudharsan',  scorerVal:'698 Runs • 75 Fours 🏅 Most Fours',
    bowler:'Kagiso Rabada',  bowlerVal:'29 Wkts • Eco 7.4 🏅 Purple Cap',
    striker:'David Miller',  strikerVal:'SR 178.9 • 44 Sixes'
  }
};

/* ── Open Team Modal ───────────────────────────────── */
function openTeamModal(teamKey) {
  const t = TEAM_DATA[teamKey];
  if (!t) return;

  function g(id) { return document.getElementById(id); }

  // Badge & header
  const badge = g('modalBadge');
  badge.textContent = t.badge;
  badge.style.background = t.badgeBg;
  badge.style.color = t.badgeColor;
  g('modalTeamName').textContent = t.name;
  g('modalMeta').textContent = '📍 ' + t.ground;
  g('modalFinish').textContent = '📊 League Finish: ' + t.finish;
  g('modalHeader').style.borderBottomColor = t.badgeBg + '55';

  // Stats
  g('ms-runs').textContent  = t.runs;
  g('ms-wkts').textContent  = t.wkts;
  g('ms-sixes').textContent = t.sixes;
  g('ms-fours').textContent = t.fours;
  g('ms-rr').textContent    = t.rr;
  g('ms-hs').textContent    = t.hs;

  // Personnel
  g('mp-captain').textContent = t.captain;
  g('mp-coach').textContent   = t.coach;

  // Performers
  g('mp-scorer').textContent     = t.scorer;
  g('mp-scorer-val').textContent = t.scorerVal;
  g('mp-bowler').textContent     = t.bowler;
  g('mp-bowler-val').textContent = t.bowlerVal;
  g('mp-striker').textContent    = t.striker;
  g('mp-striker-val').textContent = t.strikerVal;

  // Show modal
  g('teamModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ── Close Team Modal ──────────────────────────────── */
function closeTeamModal(evt) {
  if (evt && evt.target !== document.getElementById('teamModal')) return;
  document.getElementById('teamModal').classList.remove('active');
  document.body.style.overflow = '';
}

/* ── Escape key closes modal ───────────────────────── */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeTeamModal(null);
});
