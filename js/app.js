/* ═══════════════════════════════════════════════════
   IPL Season 19 Analytics Hub — App Controller
   ═══════════════════════════════════════════════════ */

// ── Static season data (mirrors PHP fallback) ───────
const SEASON_DATA = {
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

document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar scroll effect ────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // ── Mobile nav toggle ──────────────────────────
    const navToggle = document.getElementById('navToggle');
    const navLinks  = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
        // Close when a link is clicked
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => navLinks.classList.remove('open'));
        });
    }

    // ── Active nav link on scroll ──────────────────
    const sections  = document.querySelectorAll('section[id], header[id]');
    const navAnchors = document.querySelectorAll('.nav-link');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navAnchors.forEach(a => a.classList.remove('active'));
                const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.35 });
    sections.forEach(s => observer.observe(s));

    // ── Load data (API → fallback to static) ───────
    fetch('api/get_stats.php')
        .then(res => {
            if (!res.ok) throw new Error('Network error');
            return res.json();
        })
        .then(data => {
            if (data && !data.error) {
                applyData(data);
            } else {
                applyData(SEASON_DATA);
            }
        })
        .catch(() => applyData(SEASON_DATA));

    // ── Apply data to DOM ──────────────────────────
    function applyData(d) {
        const m = d.total_matches || 74;

        // Hero quick stats
        setEl('hqs-matches',  fmt(m));
        setEl('hqs-runs',     fmt(d.total_runs));
        setEl('hqs-wickets',  fmt(d.total_wickets));
        setEl('hqs-sixes',    fmt(d.total_sixes));

        // Stat cards — update data-target then animate
        updateCounter('[data-key="total_matches"] .counter', d.total_matches);
        updateCounter('[data-key="total_runs"]    .counter', d.total_runs);
        updateCounter('[data-key="total_wickets"] .counter', d.total_wickets);
        updateCounter('[data-key="total_sixes"]   .counter', d.total_sixes);
        updateCounter('[data-key="total_fours"]   .counter', d.total_fours);
        updateCounter('[data-key="total_balls"]   .counter', d.total_balls);
        updateCounter('[data-key="total_dot_balls"].counter',d.total_dot_balls);
        updateCounter('[data-key="total_extras"]  .counter', d.total_extras);

        // KPI calculations
        const rr   = (d.total_runs / d.total_overs).toFixed(2);
        const sr   = ((d.total_runs / d.total_balls) * 100).toFixed(1);
        const bdry = Math.round(((d.total_fours * 4 + d.total_sixes * 6) / d.total_runs) * 100);
        const bpw  = (d.total_balls / d.total_wickets).toFixed(1);

        setEl('kpi-rr',   rr);
        setEl('kpi-sr',   sr);
        setEl('kpi-bdry', bdry + '%');
        setEl('kpi-bpw',  bpw);

        // Deep stats table
        setEl('tbl-matches',         fmt(m));
        setEl('tbl-overs',           fmt(d.total_overs));
        setEl('tbl-overs-per',       perMatch(d.total_overs, m) + ' / match');
        setEl('tbl-balls',           fmt(d.total_balls));
        setEl('tbl-balls-per',       perMatch(d.total_balls, m) + ' / match');
        setEl('tbl-runs',            fmt(d.total_runs));
        setEl('tbl-runs-per',        perMatch(d.total_runs, m) + ' / match');
        setEl('tbl-fours',           fmt(d.total_fours));
        setEl('tbl-fours-per',       perMatch(d.total_fours, m) + ' / match');
        setEl('tbl-sixes',           fmt(d.total_sixes));
        setEl('tbl-sixes-per',       perMatch(d.total_sixes, m) + ' / match');
        setEl('tbl-singles',         fmt(d.total_singles));
        setEl('tbl-singles-per',     perMatch(d.total_singles, m) + ' / match');
        setEl('tbl-doubles',         fmt(d.total_doubles));
        setEl('tbl-doubles-per',     perMatch(d.total_doubles, m) + ' / match');
        setEl('tbl-triples',         fmt(d.total_triples));
        setEl('tbl-triples-per',     perMatch(d.total_triples, m) + ' / match');
        setEl('tbl-wickets',         fmt(d.total_wickets));
        setEl('tbl-wickets-per',     perMatch(d.total_wickets, m) + ' / match');
        setEl('tbl-dots',            fmt(d.total_dot_balls));
        setEl('tbl-dots-per',        perMatch(d.total_dot_balls, m) + ' / match');
        setEl('tbl-extras',          fmt(d.total_extras));
        setEl('tbl-extras-per',      perMatch(d.total_extras, m) + ' / match');
        setEl('tbl-wides',           fmt(d.total_wides));
        setEl('tbl-wides-per',       perMatch(d.total_wides, m) + ' / match');
        setEl('tbl-noballs',         fmt(d.total_no_balls));
        setEl('tbl-noballs-per',     perMatch(d.total_no_balls, m) + ' / match');
        setEl('tbl-byes',            fmt(d.total_byes));
        setEl('tbl-byes-per',        perMatch(d.total_byes, m) + ' / match');
        setEl('tbl-legbyes',         fmt(d.total_leg_byes));
        setEl('tbl-legbyes-per',     perMatch(d.total_leg_byes, m) + ' / match');
        setEl('tbl-overthrows',      fmt(d.total_overthrow_runs));
        setEl('tbl-overthrows-per',  perMatch(d.total_overthrow_runs, m) + ' / match');

        // Progress bars
        const dotPct  = ((d.total_dot_balls / d.total_balls) * 100).toFixed(1);
        const bdryPct = (((d.total_fours * 4 + d.total_sixes * 6) / d.total_runs) * 100).toFixed(1);
        const extPct  = ((d.total_extras / d.total_runs) * 100).toFixed(1);

        setEl('prog-dot-pct',  dotPct + '%');
        setEl('prog-bdry-pct', bdryPct + '%');
        setEl('prog-ext-pct',  extPct + '%');

        // Animate progress bars on scroll
        animateProgressBar('prog-dot',  dotPct);
        animateProgressBar('prog-bdry', bdryPct);
        animateProgressBar('prog-ext',  extPct);

        // Animate team bars on scroll
        animateTeamBars();

        // Start counter animations
        initCounterObserver();
    }

    // ── Counter animation with IntersectionObserver ─
    function initCounterObserver() {
        const counters = document.querySelectorAll('.counter[data-target]');
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el     = entry.target;
                const target = +el.dataset.target;
                animateCount(el, target);
                obs.unobserve(el);
            });
        }, { threshold: 0.5 });
        counters.forEach(c => io.observe(c));
    }

    function animateCount(el, target) {
        const duration = 1800;
        const start    = performance.now();
        const update   = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const value    = Math.round(eased * target);
            el.textContent = value.toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target.toLocaleString();
        };
        requestAnimationFrame(update);
    }

    function updateCounter(selector, value) {
        const el = document.querySelector(selector);
        if (el && value !== undefined) {
            el.dataset.target = value;
        }
    }

    // ── Progress bar animation on scroll ───────────
    function animateProgressBar(id, pct) {
        const bar = document.getElementById(id);
        if (!bar) return;
        bar.style.width = '0%';
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                setTimeout(() => { bar.style.width = pct + '%'; }, 100);
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.3 });
        io.observe(bar);
    }

    // ── Team bars animation on scroll ──────────────
    function animateTeamBars() {
        const bars = document.querySelectorAll('.team-bar');
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const bar = entry.target;
                const target = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => { bar.style.width = target; }, 100);
                obs.unobserve(bar);
            });
        }, { threshold: 0.3 });
        bars.forEach(b => io.observe(b));
    }

    // ── Smooth scroll for all anchor links ─────────
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ── Scroll Reveal Observer ─────────────────────
    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('[data-animate]').forEach(el => {
        revealObserver.observe(el);
    });

    // ── Utility helpers ────────────────────────────
    function setEl(id, val) {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    }

    function fmt(n) {
        if (n === undefined || n === null) return '—';
        return Number(n).toLocaleString('en-IN');
    }

    function perMatch(val, matches) {
        if (!matches) return '—';
        const result = val / matches;
        return result % 1 === 0 ? result.toFixed(0) : result.toFixed(1);
    }
});
