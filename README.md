# Assignment Cover Page Generator

A fully client-side web application for generating professional university assignment cover pages as PDF files. Built with React and Vite, it runs entirely in the browser with no backend requirements.

## ✨ Features

- **📥 Smart Input Form**: Collect student, teacher, and course information
- **🖼️ Logo Upload**: Add and preview university logo instantly
- **🎨 Live Preview**: See real-time cover page preview as you type
- **📄 A4 PDF Export**: Download as professional A4 PDF
- **🧠 Smart Storage**: Auto-save data to browser localStorage
- **🎛️ Customization**: Font selection, text alignment, document type
- **📱 Responsive Design**: Works on all devices
- **⚡ Offline Ready**: Works without internet after loading

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## 📦 Tech Stack

- React 18
- Vite
- Tailwind CSS
- html2pdf.js
- html2canvas

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Form.jsx
│   ├── Preview.jsx
│   └── PDFButton.jsx
├── hooks/
│   └── useLocalStorage.js
├── utils/
│   └── generatePDF.js
├── App.jsx
├── main.jsx
└── index.css
```

## ✅ Bugs Fixed

✓ Removed unused `useEffect` import from App.jsx
✓ Removed unused `useRef` import from Preview.jsx
✓ Fixed logo removal button to properly update form data
✓ Changed `console.log` to `console.error` in useLocalStorage
✓ Replaced alert() with console.error for better error handling
✓ Updated package.json with correct GitHub repo URL
✓ Added ESLint configuration
✓ Added Prettier configuration
✓ Added lint scripts to package.json

## 🚀 Deployment

To deploy to GitHub Pages:

```bash
npm run build
```

Then push the `dist` folder to GitHub Pages or set up GitHub Actions.

## 📝 License

MIT
