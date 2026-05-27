/* ===== BODYFORGE — PHYSIQUE ARCHITECT ===== */
/* 100% Browser Storage — No Database */

let currentUnit = 'metric', currentGender = 'male', currentActivity = 1.2;
let bmiHistory = JSON.parse(localStorage.getItem('bf_history')) || [];

const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* ===== SVG ICON LIBRARY ===== */
const ico = {
    fire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    droplet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
    muscle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11M6 12h12M7 6.5v11M17 6.5v11M12 6.5v11"/></svg>',
    water: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/><path d="M12 18a4 4 0 0 0 4-4"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    scale: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 6H3M21 10H3M21 14H3M21 18H3"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>'
};

/* ===== INTRO ===== */
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateIntro();
    initListeners();
    updateVisualBars();
    renderMiniHistory();
    updateNav('dashboard');
    updateStats();
});

function createParticles() {
    const container = $('introParticles');
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'intro-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 8 + 's';
        p.style.animationDuration = (6 + Math.random() * 6) + 's';
        container.appendChild(p);
    }
}

function animateIntro() {
    let pct = 0;
    const fill = $('introFill');
    const percent = $('introPercent');
    const interval = setInterval(() => {
        pct += Math.random() * 15 + 5;
        if (pct >= 100) { pct = 100; clearInterval(interval); }
        fill.style.width = pct + '%';
        percent.textContent = Math.floor(pct) + '%';
    }, 200);

    setTimeout(() => {
        $('introScreen').classList.add('fade-out');
        $('appWrapper').classList.remove('hidden');
        setTimeout(() => $('appWrapper').classList.add('show'), 50);
    }, 2500);
}

/* ===== NAVIGATION ===== */
function updateNav(active) {
    $$('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.nav === active);
    });
}

function showSection(name) {
    $$('.dashboard-section, .input-section, .results-section').forEach(s => s.classList.add('hidden'));
    if (name === 'dashboard') $('dashboardSection').classList.remove('hidden');
    if (name === 'analyze') $('inputSection').classList.remove('hidden');
    if (name === 'history') { $('resultsSection').classList.remove('hidden'); drawHistoryChart(); }
}

/* ===== LISTENERS ===== */
function initListeners() {
    // Bottom Nav
    $$('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            updateNav(btn.dataset.nav);
            if (btn.dataset.nav === 'dashboard') showSection('dashboard');
            if (btn.dataset.nav === 'analyze') showSection('analyze');
            if (btn.dataset.nav === 'history') showSection('history');
        });
    });

    // Hero Button
    $('heroBtn').addEventListener('click', () => {
        showSection('analyze');
        updateNav('analyze');
    });

    // Input Back
    $('inputBack').addEventListener('click', () => {
        showSection('dashboard');
        updateNav('dashboard');
    });

    // Results Back
    $('backBtn').addEventListener('click', () => {
        showSection('dashboard');
        updateNav('dashboard');
    });

    // Unit Toggle
    $$('.unit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentUnit = btn.dataset.unit;
            $('unitToggle').dataset.unit = currentUnit;
            $$('.unit-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            toggleUnitInputs();
        });
    });

    // Gender
    $$('.gender-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentGender = btn.dataset.gender;
            $$('.gender-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Activity
    $$('.activity-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentActivity = parseFloat(btn.dataset.activity);
            $$('.activity-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Optional Toggle
    $('optionalToggle').addEventListener('click', () => {
        $('optionalToggle').classList.toggle('open');
        $('optionalFields').classList.toggle('hidden');
    });

    // Sliders
    syncSlider('ageRange', 'age');
    syncSlider('heightRange', 'height', updateVisualBars);
    syncSlider('weightRange', 'weight', updateVisualBars);

    // Imperial inputs sync with metric
    $('heightFt').addEventListener('input', syncImperialToMetric);
    $('heightIn').addEventListener('input', syncImperialToMetric);
    $('weightLbs').addEventListener('input', syncImperialToMetric);
    $('height').addEventListener('input', syncMetricToImperial);
    $('weight').addEventListener('input', syncMetricToImperial);

    // Calculate
    $('calculateBtn').addEventListener('click', calculateBMI);

    // Actions
    $('saveBtn').addEventListener('click', saveRecord);
    $('clearBtn').addEventListener('click', clearHistory);
}

function syncSlider(rangeId, inputId, callback) {
    const range = $(rangeId), input = $(inputId);
    range.addEventListener('input', () => { input.value = range.value; if (callback) callback(); });
    input.addEventListener('input', () => { range.value = input.value; if (callback) callback(); });
}

/* ===== UNIT CONVERSION ===== */
function toggleUnitInputs() {
    const metric = $$('.metric-input');
    const imperial = $$('.imperial-input');
    if (currentUnit === 'metric') {
        metric.forEach(el => el.classList.remove('hidden'));
        imperial.forEach(el => el.classList.add('hidden'));
    } else {
        metric.forEach(el => el.classList.add('hidden'));
        imperial.forEach(el => el.classList.remove('hidden'));
    }
}

function syncImperialToMetric() {
    if (currentUnit !== 'imperial') return;
    const ft = parseFloat($('heightFt').value) || 0;
    const inc = parseFloat($('heightIn').value) || 0;
    const totalInches = ft * 12 + inc;
    const cm = Math.round(totalInches * 2.54);
    $('height').value = cm;
    $('heightRange').value = cm;

    const lbs = parseFloat($('weightLbs').value) || 0;
    const kg = Math.round(lbs * 0.453592 * 10) / 10;
    $('weight').value = kg;
    $('weightRange').value = kg;
    updateVisualBars();
}

function syncMetricToImperial() {
    if (currentUnit !== 'metric') return;
    const cm = parseFloat($('height').value) || 0;
    const totalInches = cm / 2.54;
    const ft = Math.floor(totalInches / 12);
    const inc = Math.round(totalInches % 12);
    $('heightFt').value = ft;
    $('heightIn').value = inc;

    const kg = parseFloat($('weight').value) || 0;
    const lbs = Math.round(kg / 0.453592 * 10) / 10;
    $('weightLbs').value = lbs;
}

function updateVisualBars() {
    const h = parseFloat($('height').value) || 175;
    const w = parseFloat($('weight').value) || 70;
    $('heightVisual').style.width = Math.min(Math.max((h - 100) / 150 * 100, 0), 100) + '%';
    $('weightVisual').style.width = Math.min(Math.max((w - 30) / 170 * 100, 0), 100) + '%';
}

/* ===== CALCULATE BMI ===== */
function calculateBMI() {
    let height, weight, neck, waist, hip;

    if (currentUnit === 'metric') {
        height = parseFloat($('height').value);
        weight = parseFloat($('weight').value);
        neck = parseFloat($('neck').value) || 0;
        waist = parseFloat($('waist').value) || 0;
        hip = parseFloat($('hip').value) || 0;
        if (!height || !weight || height <= 0 || weight <= 0) {
            toastMsg('warning', 'Please enter valid height and weight'); return;
        }
        height = height / 100;
    } else {
        const ft = parseFloat($('heightFt').value) || 0;
        const inc = parseFloat($('heightIn').value) || 0;
        weight = parseFloat($('weightLbs').value);
        if (!weight || weight <= 0) {
            toastMsg('warning', 'Please enter valid height and weight'); return;
        }
        height = (ft * 12 + inc) * 0.0254;
        weight = weight * 0.453592;
        neck = parseFloat($('neck').value) || 0;
        waist = parseFloat($('waist').value) || 0;
        hip = parseFloat($('hip').value) || 0;
    }

    const bmi = parseFloat((weight / (height * height)).toFixed(1));
    const age = parseInt($('age').value) || 25;

    showResults(bmi, height, weight, age, neck, waist, hip);
}

/* ===== SHOW RESULTS ===== */
function showResults(bmi, heightM, weightKg, age, neck, waist, hip) {
    showSection('history');
    updateNav('history');
    $('resultsSection').scrollTop = 0;

    animateNumber('bmiNumber', 0, bmi, 1200);

    const circ = 2 * Math.PI * 85;
    const offset = circ - (Math.min(bmi / 40, 1) * circ);
    setTimeout(() => $('ringProgress').style.strokeDashoffset = offset, 250);

    const cat = getCategory(bmi);
    $('categoryBadge').textContent = cat.label;
    $('categoryBadge').className = 'category-badge ' + cat.class;
    $('categoryDesc').textContent = cat.desc;

    const pct = Math.min(Math.max((bmi / 40) * 100, 5), 95);
    setTimeout(() => {
        $('scaleMarker').style.left = pct + '%';
        $('markerValue').textContent = bmi.toFixed(1);
    }, 500);

    renderBodySVG(bmi, cat.class);

    const minIdeal = (18.5 * heightM * heightM).toFixed(1);
    const maxIdeal = (24.9 * heightM * heightM).toFixed(1);
    $('idealWeight').textContent = minIdeal + ' - ' + maxIdeal + ' kg';

    if (currentUnit === 'metric') {
        $('displayHeight').textContent = (heightM * 100).toFixed(0) + ' cm';
        $('displayWeight').textContent = weightKg.toFixed(1) + ' kg';
    } else {
        const ti = heightM / 0.0254;
        $('displayHeight').textContent = Math.floor(ti / 12) + String.fromCharCode(39) + Math.round(ti % 12) + String.fromCharCode(34);
        $('displayWeight').textContent = (weightKg / 0.453592).toFixed(1) + ' lbs';
    }

    renderInsights(bmi, heightM, weightKg, age, neck, waist, hip);
    renderTargets(bmi, heightM, weightKg, age);
    renderHealthScore(bmi, age, currentActivity);
    renderTips(cat.class);
    renderComparison(bmi, age);
    drawHistoryChart();
}

function getCategory(bmi) {
    if (bmi < 18.5) return { label: 'Underweight', class: 'underweight', desc: 'You may need to gain some weight' };
    if (bmi < 25) return { label: 'Normal Weight', class: 'normal', desc: 'You have a healthy weight range' };
    if (bmi < 30) return { label: 'Overweight', class: 'overweight', desc: 'You may need to lose some weight' };
    return { label: 'Obese', class: 'obese', desc: 'Consult a healthcare professional' };
}


/* ===== BODY SVG ===== */
function renderBodySVG(bmi, cls) {
    let bw = 40;
    if (bmi < 18.5) bw = 28;
    else if (bmi < 25) bw = 36;
    else if (bmi < 30) bw = 46;
    else bw = 56;
    const op = cls === 'normal' ? '0.85' : cls === 'underweight' ? '0.45' : cls === 'overweight' ? '0.65' : '0.9';

    const svgContent = '<svg viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg">' +
        '<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#fff" stop-opacity="' + op + '"/><stop offset="100%" stop-color="#888" stop-opacity="' + (parseFloat(op)*0.5) + '"/></linearGradient>' +
        '<filter id="g"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>' +
        '<circle cx="50" cy="20" r="13" fill="url(#bg)" filter="url(#g)"/>' +
        '<rect x="44" y="32" width="12" height="7" rx="3.5" fill="url(#bg)" filter="url(#g)"/>' +
        '<path d="M50,40 C' + (50-bw/2) + ',40 ' + (50-bw/2) + ',48 ' + (50-bw/2+4) + ',53 L' + (50-bw/2) + ',138 C' + (50-bw/2) + ',148 ' + (50+bw/2) + ',148 ' + (50+bw/2) + ',138 L' + (50+bw/2-4) + ',53 C' + (50+bw/2) + ',48 ' + (50+bw/2) + ',40 50,40Z" fill="url(#bg)" filter="url(#g)"/>' +
        '<path d="M' + (50-bw/2+4) + ',58 Q' + (50-bw/2-14) + ',88 ' + (50-bw/2-9) + ',118" stroke="url(#bg)" stroke-width="7" stroke-linecap="round" fill="none" filter="url(#g)"/>' +
        '<path d="M' + (50+bw/2-4) + ',58 Q' + (50+bw/2+14) + ',88 ' + (50+bw/2+9) + ',118" stroke="url(#bg)" stroke-width="7" stroke-linecap="round" fill="none" filter="url(#g)"/>' +
        '<path d="M' + (50-bw/4) + ',143 Q' + (50-bw/4-4) + ',163 ' + (50-bw/4-2) + ',173" stroke="url(#bg)" stroke-width="9" stroke-linecap="round" fill="none" filter="url(#g)"/>' +
        '<path d="M' + (50+bw/4) + ',143 Q' + (50+bw/4+4) + ',163 ' + (50+bw/4+2) + ',173" stroke="url(#bg)" stroke-width="9" stroke-linecap="round" fill="none" filter="url(#g)"/>' +
        '<text x="50" y="98" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="13" font-weight="800" font-family="Inter,sans-serif">' + bmi.toFixed(1) + '</text>' +
        '</svg>';

    $('bodySilhouette').innerHTML = svgContent;
}

/* ===== INSIGHTS ===== */
function renderInsights(bmi, h, w, age, neck, waist, hip) {
    let bmr = currentGender === 'male'
        ? 10*w + 6.25*(h*100) - 5*age + 5
        : 10*w + 6.25*(h*100) - 5*age - 161;

    let bf;
    if (neck && waist) {
        if (currentGender === 'male') {
            bf = 495 / (1.0324 - 0.19077*Math.log10(waist-neck) + 0.15456*Math.log10(h*100)) - 450;
        } else {
            bf = 495 / (1.29579 - 0.35004*Math.log10(waist+hip-neck) + 0.22100*Math.log10(h*100)) - 450;
        }
    } else {
        bf = (1.20*bmi) + (0.23*age) - (10.8*(currentGender==='male'?1:0)) - 5.4;
    }

    const wp = currentGender === 'male' ? Math.max(50, 60-(age-20)*0.2) : Math.max(45, 55-(age-20)*0.2);
    const lbm = w * (1 - bf/100);
    const bmiPrime = bmi / 25;
    const ponderal = w / Math.pow(h, 3);

    const data = [
        { icon: ico.fire, label: 'BMR', value: Math.round(bmr), unit: 'kcal' },
        { icon: ico.droplet, label: 'Body Fat', value: Math.max(2, Math.min(60, bf)).toFixed(1), unit: '%' },
        { icon: ico.muscle, label: 'Lean Mass', value: Math.max(0, lbm).toFixed(1), unit: 'kg' },
        { icon: ico.water, label: 'Water', value: wp.toFixed(0), unit: '%' },
        { icon: ico.heart, label: 'BMI Prime', value: bmiPrime.toFixed(2), unit: '' },
        { icon: ico.scale, label: 'Ponderal', value: ponderal.toFixed(1), unit: 'kg/m3' }
    ];

    let html = '';
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        html += '<div class="insight-item" style="animation-delay:' + (0.35 + i*0.06) + 's">' +
            '<div class="insight-icon">' + item.icon + '</div>' +
            '<div class="insight-label">' + item.label + '</div>' +
            '<div class="insight-value">' + item.value + '<span class="insight-unit"> ' + item.unit + '</span></div>' +
            '</div>';
    }
    $('insightsGrid').innerHTML = html;
}

/* ===== TARGETS ===== */
function renderTargets(bmi, h, w, age) {
    let bmr = currentGender === 'male'
        ? 10*w + 6.25*(h*100) - 5*age + 5
        : 10*w + 6.25*(h*100) - 5*age - 161;

    const tdee = bmr * currentActivity;
    const protein = w * (currentActivity > 1.5 ? 2.2 : 1.8);
    const fats = w * 1.0;
    const carbs = (tdee - (protein*4 + fats*9)) / 4;

    const targets = [
        { name: 'Calories', value: Math.round(tdee), max: Math.round(tdee * 1.2), unit: 'kcal' },
        { name: 'Protein', value: Math.round(protein), max: Math.round(protein * 1.3), unit: 'g' },
        { name: 'Carbs', value: Math.round(Math.max(50, carbs)), max: Math.round(Math.max(50, carbs) * 1.3), unit: 'g' },
        { name: 'Fats', value: Math.round(fats), max: Math.round(fats * 1.3), unit: 'g' }
    ];

    let html = '';
    for (let i = 0; i < targets.length; i++) {
        const t = targets[i];
        const pct = Math.min((t.value / t.max) * 100, 100);
        html += '<div class="target-item" style="animation-delay:' + (0.5 + i*0.08) + 's">' +
            '<div style="flex:1"><div class="target-info"><span class="target-name">' + t.name + '</span><span class="target-value">' + t.value + t.unit + '</span></div>' +
            '<div class="target-bar-wrap"><div class="target-bar-fill" style="width:' + pct + '%"></div></div></div>' +
            '</div>';
    }
    $('targetsGrid').innerHTML = html;
}

/* ===== HEALTH SCORE ===== */
function renderHealthScore(bmi, age, activity) {
    let score = 100;
    if (bmi < 18.5) score -= 15;
    else if (bmi > 25) score -= Math.min(25, (bmi - 25) * 3);
    score -= Math.max(0, (age - 30) * 0.3);
    score += (activity - 1.2) * 10;
    score = Math.max(0, Math.min(100, Math.round(score)));

    $('healthNumber').textContent = score;
    setTimeout(() => $('healthBarFill').style.width = score + '%', 300);

    const rows = [
        { label: 'BMI Status', value: bmi < 18.5 ? 40 : bmi < 25 ? 95 : bmi < 30 ? 65 : 30 },
        { label: 'Activity', value: activity > 1.5 ? 90 : activity > 1.3 ? 70 : 40 },
        { label: 'Age Factor', value: age < 30 ? 95 : age < 50 ? 75 : 55 }
    ];

    let html = '';
    for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        html += '<div class="health-row">' +
            '<span class="health-row-label">' + r.label + '</span>' +
            '<div class="health-row-bar"><div class="health-row-fill" style="width:' + r.value + '%"></div></div>' +
            '<span class="health-row-value">' + r.value + '</span>' +
            '</div>';
    }
    $('healthBreakdown').innerHTML = html;
}

/* ===== TIPS ===== */
function renderTips(cls) {
    const tips = {
        underweight: [
            'Increase calories with nuts, avocados, whole grains',
            'Eat 5-6 smaller meals daily',
            'Include protein every meal',
            'Strength train 3x per week',
            'Track calories with a food diary'
        ],
        normal: [
            'Maintain balanced nutrition',
            '150 min moderate exercise weekly',
            'Drink 8 glasses water daily',
            'Sleep 7-9 hours nightly',
            'Regular health check-ups'
        ],
        overweight: [
            'Create 300-500 kcal deficit',
            'Focus on whole foods',
            'Aim 10,000 steps daily',
            'Limit processed foods',
            'Try intermittent fasting'
        ],
        obese: [
            'Consult healthcare professional',
            'Start low-impact exercises',
            'Practice portion control',
            'Track food intake daily',
            'Join support group'
        ]
    };

    let html = '';
    const tipList = tips[cls];
    for (let i = 0; i < tipList.length; i++) {
        html += '<div class="tip-item" style="animation-delay:' + (0.55 + i*0.07) + 's">' +
            '<span class="tip-number">' + (i+1) + '</span>' +
            '<span class="tip-text">' + tipList[i] + '</span>' +
            '</div>';
    }
    $('tipsList').innerHTML = html;
}

/* ===== COMPARISON ===== */
function renderComparison(bmi, age) {
    const avgBMI = age < 20 ? 21.5 : age < 30 ? 24.5 : age < 40 ? 26.5 : age < 50 ? 27.5 : 28.5;
    const maxVal = Math.max(bmi, avgBMI) * 1.2;

    $('comparisonChart').innerHTML = 
        '<div class="compare-row">' +
            '<span class="compare-label">Your BMI</span>' +
            '<div class="compare-bar-wrap">' +
                '<div class="compare-bar-fill you" style="width:' + ((bmi/maxVal)*100) + '%"><span class="compare-value">' + bmi + '</span></div>' +
            '</div>' +
        '</div>' +
        '<div class="compare-row">' +
            '<span class="compare-label">Avg ' + (age < 30 ? '20s' : age < 40 ? '30s' : age < 50 ? '40s' : '50s+') + '</span>' +
            '<div class="compare-bar-wrap">' +
                '<div class="compare-bar-fill avg" style="width:' + ((avgBMI/maxVal)*100) + '%"><span class="compare-value">' + avgBMI + '</span></div>' +
            '</div>' +
        '</div>';
}


/* ===== CHART ===== */
function drawHistoryChart() {
    const canvas = $('historyChart'), ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width, h = rect.height;
    const pad = { t: 16, r: 14, b: 24, l: 34 };
    const cw = w - pad.l - pad.r, ch = h - pad.t - pad.b;

    ctx.clearRect(0, 0, w, h);

    if (bmiHistory.length === 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.12)';
        ctx.font = '13px Inter,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('No history yet — Save your first record!', w/2, h/2);
        return;
    }

    const data = bmiHistory.slice(-7);
    const minB = Math.min(...data.map(d => d.bmi), 15);
    const maxB = Math.max(...data.map(d => d.bmi), 35);
    const rng = maxB - minB || 10;

    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
        const y = pad.t + (ch/3)*i;
        ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w-pad.r, y); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.font = '9px Inter,sans-serif'; ctx.textAlign = 'right';
        ctx.fillText((maxB - (rng/3)*i).toFixed(1), pad.l - 6, y + 3);
    }

    const getX = i => pad.l + (cw/(data.length-1||1))*i;
    const getY = b => pad.t + ch - ((b-minB)/rng)*ch;

    const grad = ctx.createLinearGradient(0, pad.t, 0, h-pad.b);
    grad.addColorStop(0, 'rgba(255,255,255,0.12)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.beginPath();
    ctx.moveTo(getX(0), getY(data[0].bmi));
    for (let i = 1; i < data.length; i++) {
        const x = getX(i), y = getY(data[i].bmi);
        const px = getX(i-1), py = getY(data[i-1].bmi);
        const cx = (px+x)/2;
        ctx.bezierCurveTo(cx, py, cx, y, x, y);
    }
    ctx.lineTo(getX(data.length-1), h-pad.b);
    ctx.lineTo(getX(0), h-pad.b);
    ctx.closePath();
    ctx.fillStyle = grad; ctx.fill();

    ctx.beginPath();
    ctx.moveTo(getX(0), getY(data[0].bmi));
    for (let i = 1; i < data.length; i++) {
        const x = getX(i), y = getY(data[i].bmi);
        const px = getX(i-1), py = getY(data[i-1].bmi);
        const cx = (px+x)/2;
        ctx.bezierCurveTo(cx, py, cx, y, x, y);
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.75)';
    ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.stroke();

    data.forEach((d, i) => {
        const x = getX(i), y = getY(d.bmi);
        ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fill();
        ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI*2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.font = '8px Inter,sans-serif'; ctx.textAlign = 'center';
        const date = new Date(d.date);
        ctx.fillText(date.getDate() + '/' + (date.getMonth()+1), x, h - 8);
    });

    $('timelineLegend').innerHTML = 
        '<div class="legend-item"><div class="legend-dot" style="background:rgba(255,255,255,0.75)"></div>BMI Trend</div>' +
        '<div class="legend-item"><div class="legend-dot" style="background:rgba(255,255,255,0.25)"></div>Check Date</div>';
}

/* ===== SAVE / HISTORY ===== */
function saveRecord() {
    const bmi = parseFloat($('bmiNumber').textContent);
    if (isNaN(bmi)) return;
    bmiHistory.push({
        bmi: bmi, date: new Date().toISOString(),
        height: $('height').value, weight: $('weight').value,
        unit: currentUnit, activity: currentActivity
    });
    localStorage.setItem('bf_history', JSON.stringify(bmiHistory));
    drawHistoryChart();
    renderMiniHistory();
    updateStats();
    toastMsg('check', 'Record saved!');
}

function clearHistory() {
    if (bmiHistory.length === 0) { toastMsg('info', 'No history to clear'); return; }
    bmiHistory = [];
    localStorage.removeItem('bf_history');
    drawHistoryChart();
    renderMiniHistory();
    updateStats();
    toastMsg('trash', 'History cleared');
}

function updateStats() {
    if (bmiHistory.length > 0) {
        const last = bmiHistory[bmiHistory.length - 1];
        $('lastBMI').querySelector('.stat-value').textContent = last.bmi.toFixed(1);
        $('totalChecks').querySelector('.stat-value').textContent = bmiHistory.length;
        const uniqueDays = new Set(bmiHistory.map(r => new Date(r.date).toDateString())).size;
        $('daysActive').querySelector('.stat-value').textContent = uniqueDays;
    } else {
        $('lastBMI').querySelector('.stat-value').textContent = '—';
        $('totalChecks').querySelector('.stat-value').textContent = '0';
        $('daysActive').querySelector('.stat-value').textContent = '0';
    }
}

function renderMiniHistory() {
    const list = $('miniList');
    if (bmiHistory.length === 0) {
        list.innerHTML = '<div class="mini-item" style="justify-content:center;color:var(--text-4);font-size:12px;">No records yet</div>';
        return;
    }
    const recent = bmiHistory.slice(-3).reverse();
    let html = '';
    for (let i = 0; i < recent.length; i++) {
        const r = recent[i];
        const cat = getCategory(r.bmi);
        const date = new Date(r.date);
        html += '<div class="mini-item">' +
            '<span class="mini-date">' + date.getDate() + '/' + (date.getMonth()+1) + ' ' + date.getHours() + ':' + String(date.getMinutes()).padStart(2,'0') + '</span>' +
            '<span class="mini-bmi">' + r.bmi.toFixed(1) + '</span>' +
            '<span class="mini-badge ' + cat.class + '" style="border-color:' + (cat.class==='normal'?'rgba(255,255,255,0.2)':'rgba(255,255,255,0.1)') + ';background:' + (cat.class==='normal'?'rgba(255,255,255,0.06)':'rgba(255,255,255,0.03)') + ';color:' + (cat.class==='normal'?'#fff':'rgba(255,255,255,0.5)') + '">' + cat.label + '</span>' +
            '</div>';
    }
    list.innerHTML = html;
}

/* ===== UTILS ===== */
function animateNumber(id, start, end, dur) {
    const el = $(id), t0 = performance.now();
    function tick(t) {
        const p = Math.min((t - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = (start + (end - start) * e).toFixed(1);
        if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

function toastMsg(type, msg) {
    const map = { check: ico.check, warning: ico.warning, info: ico.info, trash: ico.trash };
    $('toastIcon').innerHTML = map[type] || ico.check;
    $('toastMessage').textContent = msg;
    $('toast').classList.add('show');
    setTimeout(() => $('toast').classList.remove('show'), 2500);
}

window.addEventListener('resize', () => {
    if (!$('resultsSection').classList.contains('hidden')) drawHistoryChart();
});
