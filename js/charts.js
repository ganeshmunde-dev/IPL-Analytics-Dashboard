/* ═══════════════════════════════════════════════════
   IPL Season 19 Analytics Hub — Charts Controller
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Global Chart.js Defaults ────────────────────
    Chart.defaults.color          = '#8892a4';
    Chart.defaults.font.family    = "'Outfit', sans-serif";
    Chart.defaults.font.size      = 12;
    Chart.defaults.plugins.legend.labels.boxWidth = 12;

    // ── Static chart data (works with or without DB) ─
    const CHART_DATA = {
        runs_distribution: [
            { type: 'Singles',  value: 7500  },
            { type: 'Doubles',  value: 3600  },
            { type: 'Triples',  value: 150   },
            { type: 'Fours',    value: 8400  },
            { type: 'Sixes',    value: 6900  }
        ],
        over_analysis: [
            { over_number: 1,  avg_runs: 5.5  },
            { over_number: 2,  avg_runs: 6.8  },
            { over_number: 3,  avg_runs: 7.2  },
            { over_number: 4,  avg_runs: 8.1  },
            { over_number: 5,  avg_runs: 8.4  },
            { over_number: 6,  avg_runs: 9.2  },
            { over_number: 7,  avg_runs: 7.9  },
            { over_number: 8,  avg_runs: 7.4  },
            { over_number: 9,  avg_runs: 7.8  },
            { over_number: 10, avg_runs: 8.0  },
            { over_number: 11, avg_runs: 7.5  },
            { over_number: 12, avg_runs: 8.2  },
            { over_number: 13, avg_runs: 8.6  },
            { over_number: 14, avg_runs: 9.1  },
            { over_number: 15, avg_runs: 9.5  },
            { over_number: 16, avg_runs: 10.2 },
            { over_number: 17, avg_runs: 10.8 },
            { over_number: 18, avg_runs: 11.4 },
            { over_number: 19, avg_runs: 12.0 },
            { over_number: 20, avg_runs: 12.5 }
        ],
        team_comparison: {
            labels:  ['CSK', 'MI', 'RCB', 'KKR', 'DC', 'RR', 'PBKS', 'SRH', 'LSG', 'GT'],
            runs:    [2850, 2750, 2950, 2800, 2600, 2700, 2500, 2900, 2650, 2720],
            wickets: [85,   90,   82,   88,   75,   80,   70,   85,   78,   81  ]
        },
        extras_analysis: [
            { type: 'Wides',       value: 600 },
            { type: 'No Balls',    value: 100 },
            { type: 'Byes',        value: 200 },
            { type: 'Leg Byes',    value: 250 },
            { type: 'Overthrows',  value: 50  }
        ],
        scoring_breakdown: {
            labels:   ['Dot Balls', 'Singles', 'Doubles', 'Triples', 'Fours', 'Sixes', 'Extras'],
            values:   [6000,        7500,       1800,      50,        2100,    1150,    1200   ],
            colors:   [
                'rgba(99, 102, 241, 0.85)',
                'rgba(0, 212, 255, 0.85)',
                'rgba(6, 182, 212, 0.85)',
                'rgba(16, 185, 129, 0.85)',
                'rgba(168, 85, 247, 0.85)',
                'rgba(245, 158, 11, 0.85)',
                'rgba(239, 68, 68, 0.85)'
            ]
        }
    };

    // ── Attempt API load, fallback to static ────────
    fetch('api/get_charts.php')
        .then(res => { if (!res.ok) throw new Error(); return res.json(); })
        .then(data => {
            if (data && !data.error) {
                initCharts({ ...CHART_DATA, ...data });
            } else {
                initCharts(CHART_DATA);
            }
        })
        .catch(() => initCharts(CHART_DATA));

    // ── Initialise all charts ───────────────────────
    function initCharts(data) {

        // ── 1. Runs Distribution (Doughnut) ──────────
        const ctx1 = document.getElementById('runsDistributionChart');
        if (ctx1) {
            new Chart(ctx1.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels:   data.runs_distribution.map(d => d.type),
                    datasets: [{
                        data:            data.runs_distribution.map(d => d.value),
                        backgroundColor: [
                            '#00d4ff', '#a855f7', '#10b981', '#f59e0b', '#ef4444'
                        ],
                        borderColor:     '#0d1626',
                        borderWidth:     3,
                        hoverOffset:     12
                    }]
                },
                options: {
                    responsive:          true,
                    maintainAspectRatio: false,
                    cutout:              '65%',
                    plugins: {
                        legend: { position: 'right', labels: { padding: 16 } },
                        tooltip: {
                            callbacks: {
                                label: ctx => {
                                    const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                                    const pct   = ((ctx.parsed / total) * 100).toFixed(1);
                                    return ` ${ctx.label}: ${ctx.parsed.toLocaleString()} (${pct}%)`;
                                }
                            }
                        }
                    }
                }
            });
        }

        // ── 2. Over-wise Run Rate (Line) ─────────────
        const ctx2 = document.getElementById('overWiseChart');
        if (ctx2) {
            new Chart(ctx2.getContext('2d'), {
                type: 'line',
                data: {
                    labels:   data.over_analysis.map(d => `Ov ${d.over_number}`),
                    datasets: [{
                        label:           'Avg Runs / Over',
                        data:            data.over_analysis.map(d => d.avg_runs),
                        borderColor:     '#00d4ff',
                        backgroundColor: 'rgba(0, 212, 255, 0.08)',
                        borderWidth:     2.5,
                        pointRadius:     4,
                        pointBackgroundColor: '#00d4ff',
                        pointBorderColor:     '#0d1626',
                        pointBorderWidth:     2,
                        tension:         0.45,
                        fill:            true
                    }]
                },
                options: {
                    responsive:          true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 4,
                            grid:  { color: 'rgba(255,255,255,0.04)' },
                            ticks: { callback: v => v.toFixed(1) }
                        },
                        x: { grid: { display: false } }
                    }
                }
            });
        }

        // ── 3. Team Comparison (Bar) ──────────────────
        const ctx3 = document.getElementById('teamComparisonChart');
        if (ctx3) {
            new Chart(ctx3.getContext('2d'), {
                type: 'bar',
                data: {
                    labels:   data.team_comparison.labels,
                    datasets: [
                        {
                            label:           'Total Runs',
                            data:            data.team_comparison.runs,
                            backgroundColor: 'rgba(168, 85, 247, 0.8)',
                            borderColor:     'rgba(168, 85, 247, 1)',
                            borderWidth:     1,
                            borderRadius:    6,
                            borderSkipped:   false
                        },
                        {
                            label:           'Wickets × 10',
                            data:            data.team_comparison.wickets.map(w => w * 10),
                            backgroundColor: 'rgba(0, 212, 255, 0.8)',
                            borderColor:     'rgba(0, 212, 255, 1)',
                            borderWidth:     1,
                            borderRadius:    6,
                            borderSkipped:   false
                        }
                    ]
                },
                options: {
                    responsive:          true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top' },
                        tooltip: {
                            callbacks: {
                                label: ctx => {
                                    let val = ctx.parsed.y;
                                    if (ctx.dataset.label === 'Wickets × 10') {
                                        return ` Wickets: ${(val / 10).toFixed(0)}`;
                                    }
                                    return ` Runs: ${val.toLocaleString()}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid:  { color: 'rgba(255,255,255,0.04)' },
                            ticks: { callback: v => v.toLocaleString() }
                        },
                        x: { grid: { display: false } }
                    }
                }
            });
        }

        // ── 4. Extras Analysis (Polar Area) ──────────
        const ctx4 = document.getElementById('extrasChart');
        if (ctx4) {
            new Chart(ctx4.getContext('2d'), {
                type: 'polarArea',
                data: {
                    labels:   data.extras_analysis.map(d => d.type),
                    datasets: [{
                        data:            data.extras_analysis.map(d => d.value),
                        backgroundColor: [
                            'rgba(0, 212, 255, 0.75)',
                            'rgba(168, 85, 247, 0.75)',
                            'rgba(16, 185, 129, 0.75)',
                            'rgba(245, 158, 11, 0.75)',
                            'rgba(239, 68, 68, 0.75)'
                        ],
                        borderColor: '#0d1626',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive:          true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { padding: 12 } } },
                    scales: {
                        r: {
                            grid:  { color: 'rgba(255,255,255,0.05)' },
                            ticks: { display: false, backdropColor: 'transparent' }
                        }
                    }
                }
            });
        }

        // ── 5. Scoring Breakdown (Horizontal Bar) ─────
        const ctx5 = document.getElementById('scoringBreakdownChart');
        if (ctx5) {
            new Chart(ctx5.getContext('2d'), {
                type: 'bar',
                data: {
                    labels:   data.scoring_breakdown.labels,
                    datasets: [{
                        label:           'Total Balls / Runs',
                        data:            data.scoring_breakdown.values,
                        backgroundColor: data.scoring_breakdown.colors,
                        borderColor:     data.scoring_breakdown.colors.map(c => c.replace('0.85', '1')),
                        borderWidth:     1,
                        borderRadius:    6,
                        borderSkipped:   false
                    }]
                },
                options: {
                    indexAxis:           'y',
                    responsive:          true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: ctx => ` ${ctx.parsed.x.toLocaleString()}`
                            }
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            grid:  { color: 'rgba(255,255,255,0.04)' },
                            ticks: { callback: v => v.toLocaleString() }
                        },
                        y: { grid: { display: false } }
                    }
                }
            });
        }
    }
});
