<div align="center">

<!-- Animated Logo -->
<img src="https://raw.githubusercontent.com/zypil/bodyforge/main/assets/icon.jpg" width="120" height="120" alt="BodyForge Logo">

<h1>BodyForge</h1>
<p><strong>Physique Architect</strong> — Advanced BMI Analysis & Body Composition Tracker</p>

<!-- Badges -->
[![License](https://img.shields.io/badge/license-MIT-white.svg?style=flat-square&logo=open-source-initiative&logoColor=white)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Made With Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-white.svg?style=flat-square&color=ff69b4)](https://github.com/itzfilzz)

</div>

---

## ✨ What is BodyForge?

**BodyForge** is a sleek, privacy-first BMI calculator and body composition analyzer built entirely with vanilla HTML, CSS, and JavaScript. No frameworks. No backend. No tracking. Your data stays on your device — always.

Designed with a **dark cinematic aesthetic**, smooth animations, and real-time visualizations, BodyForge transforms a simple health check into an immersive experience.

> 🎯 **Goal:** Make health tracking beautiful, instant, and completely private.

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| 📊 **BMI Calculator** | Instant BMI calculation with category classification (Underweight / Normal / Overweight / Obese) |
| 🔄 **Dual Units** | Seamless toggle between **Metric (kg/cm)** and **Imperial (lbs/ft)** with real-time conversion |
| 🏃 **Activity Levels** | 5-tier activity multiplier for accurate TDEE estimation |
| 📈 **Body Visualization** | Dynamic SVG silhouette that morphs based on your BMI |
| 🧬 **Body Composition** | BMR, Body Fat %, Lean Mass, Water %, BMI Prime, Ponderal Index |
| 🍽️ **Macro Targets** | Personalized daily calorie, protein, carb & fat recommendations |
| 💯 **Health Score** | Composite health rating with breakdown analysis |
| 📉 **Progress Timeline** | Canvas-based BMI trend chart with up to 7 recent records |
| 👥 **Age Comparison** | Compare your BMI against age-group averages |
| 💾 **Local Storage** | All history saved in browser — no cloud, no accounts, no signup |
| 🎬 **Cinematic Intro** | Animated hexagon loader with particle effects |
| 🌌 **Animated Background** | Floating orbs, noise texture, and grid overlay |
| 📱 **Mobile First** | Fully responsive — built for iPhone 12 and all devices |
| 🎨 **Dark Aesthetic** | Premium black/white design with glassmorphism touches |

---

## 📸 Preview

<div align="center">

| Dashboard | Analysis | Results |
|-----------|----------|---------|
| *Home screen with stats & hero card* | *Input form with unit toggle* | *BMI ring, charts & insights* |

</div>

---

## 🛠️ Tech Stack

```
Pure Vanilla — Zero Dependencies
├── HTML5 (Semantic markup)
├── CSS3 (Custom properties, animations, backdrop-filter)
├── JavaScript ES6+ (No jQuery, no frameworks)
└── localStorage API (Data persistence)
```

**External resources used:**
- [Inter](https://fonts.google.com/specimen/Inter) font from Google Fonts
- Inline SVG icons (no icon library dependency)

---

## 📦 File Structure

```
bodyforge/
├── index.html          # Main HTML structure
├── style.css           # All styles & animations
├── app.js              # Application logic & calculations
├── LICENSE             # MIT License
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

> **Flat structure** — intentionally simple for easy editing in mobile code editors like Spck Editor.

---

## 🚀 Quick Start

### Option 1: Open Directly
Simply open `index.html` in any modern browser. No server needed.

### Option 2: GitHub Pages
1. Fork this repo
2. Go to **Settings → Pages**
3. Select branch `main` and folder `/ (root)`
4. Your site will be live at `https://yourusername.github.io/bodyforge/`

### Option 3: Local Development
```bash
git clone https://github.com/itzfilzz/bodyforge.git
cd bodyforge
# Open index.html in your browser
# Or use a live server:
npx live-server
```

---

## 🧮 How It Works

### BMI Formula
```
BMI = weight(kg) / height(m)²
```

### Body Fat (Deurenberg Formula)
```
Body Fat % = (1.20 × BMI) + (0.23 × Age) − (10.8 × Sex) − 5.4
```
*Sex: Male = 1, Female = 0*

### BMR (Mifflin-St Jeor)
```
Male:   BMR = 10W + 6.25H − 5A + 5
Female: BMR = 10W + 6.25H − 5A − 161
```

### TDEE
```
TDEE = BMR × Activity Multiplier
```

---

## 📋 Supported Browsers

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Safari | 14+ |
| Firefox | 88+ |
| Edge | 90+ |
| Samsung Internet | 15+ |

> ⚠️ **Note:** `backdrop-filter` and CSS custom properties are required. Internet Explorer is not supported.

---

## 🔒 Privacy

- ✅ **No data leaves your device**
- ✅ **No accounts or logins**
- ✅ **No cookies or tracking**
- ✅ **No external APIs**
- ✅ **All data stored in localStorage**

Clear your browser data to erase all history.

---

## 🎯 Roadmap

- [x] Core BMI calculation
- [x] Imperial/Metric conversion
- [x] Body visualization SVG
- [x] History tracking with charts
- [x] Health score algorithm
- [ ] Export data as PDF/CSV
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] PWA install support
- [ ] Goal setting & reminders

---

## 🤝 Contributing

Contributions are welcome! This is a personal learning project, but suggestions and improvements are appreciated.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You are free to:
- ✅ Use commercially
- ✅ Modify and distribute
- ✅ Use privately
- ✅ Sublicense

Only requirement: include the original copyright notice.

---

## 🙏 Acknowledgments

- [World Health Organization](https://www.who.int) — BMI classification standards
- [Mifflin-St Jeor Equation](https://pubmed.ncbi.nlm.nih.gov/2305711/) — BMR calculation
- [Inter Font](https://rsms.me/inter/) — Beautiful typeface by Rasmus Andersson
- Inspired by modern health apps with a dark, premium aesthetic

---

<div align="center">

**[⬆ Back to Top](#bodyforge)**

<br>

<sub>Built with precision by <a href="https://github.com/itzfilzz">@ItzFilzz</a></sub>

</div>
