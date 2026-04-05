/* ============================================
   ASSIGNMENT COVER PAGE GENERATOR
   Vanilla JavaScript Implementation
   ============================================ */

// ============================================
// STATE MANAGEMENT
// ============================================

const formData = {
    universityName: '',
    documentType: 'ASSIGNMENT',
    courseName: '',
    courseCode: '',
    assignmentTitle: '',
    studentName: '',
    studentID: '',
    submittedDate: new Date().toISOString().split('T')[0],
    instructorName: '',
    instructorTitle: 'Professor',
    instructorDepartment: '',
    logo: null,
    logoFileName: '',
    useUppercase: true,
    fontType: 'serif',
    textAlignment: 'center',
    customDocType: ''
};

const storageKey = 'coverPageData';

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    setupEventListeners();
    updatePreview();
});

// ============================================
// STORAGE FUNCTIONS
// ============================================

function loadFromStorage() {
    try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
            const data = JSON.parse(stored);
            Object.assign(formData, data);
            syncFormToUI();
        }
    } catch (error) {
        console.error('Failed to load data from storage:', error);
    }
}

function saveToStorage() {
    try {
        const dataToSave = {
            ...formData,
            logo: null // Don't store blob data
        };
        localStorage.setItem(storageKey, JSON.stringify(dataToSave));
    } catch (error) {
        console.error('Failed to save data to storage:', error);
    }
}

function syncFormToUI() {
    // Student Info
    document.getElementById('studentName').value = formData.studentName;
    document.getElementById('studentID').value = formData.studentID;
    document.getElementById('submittedDate').value = formData.submittedDate;

    // Course Info
    document.getElementById('courseName').value = formData.courseName;
    document.getElementById('courseCode').value = formData.courseCode;
    document.getElementById('assignmentTitle').value = formData.assignmentTitle;
    document.getElementById('universityName').value = formData.universityName;

    // Instructor Info
    document.getElementById('instructorName').value = formData.instructorName;
    document.getElementById('instructorTitle').value = formData.instructorTitle;
    document.getElementById('instructorDepartment').value = formData.instructorDepartment;

    // Customization
    document.getElementById('documentType').value = 
        formData.documentType === 'CUSTOM' ? 'CUSTOM' : 'ASSIGNMENT';
    document.getElementById('customDocType').value = formData.customDocType;
    document.getElementById('customDocType').style.display = 
        formData.documentType === 'CUSTOM' ? 'block' : 'none';
    document.getElementById('useUppercase').checked = formData.useUppercase;
    document.getElementById('fontType').value = formData.fontType;
    document.getElementById('textAlignment').value = formData.textAlignment;

    // Logo
    if (formData.logoFileName) {
        updateLogoDisplay();
    }
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================

function setupEventListeners() {
    // Student Info
    document.getElementById('studentName').addEventListener('input', (e) => {
        formData.studentName = e.target.value;
        saveToStorage();
        updatePreview();
    });

    document.getElementById('studentID').addEventListener('input', (e) => {
        formData.studentID = e.target.value;
        saveToStorage();
        updatePreview();
    });

    document.getElementById('submittedDate').addEventListener('change', (e) => {
        formData.submittedDate = e.target.value;
        saveToStorage();
        updatePreview();
    });

    // Course Info
    document.getElementById('courseName').addEventListener('input', (e) => {
        formData.courseName = e.target.value;
        saveToStorage();
        updatePreview();
    });

    document.getElementById('courseCode').addEventListener('input', (e) => {
        formData.courseCode = e.target.value;
        saveToStorage();
        updatePreview();
    });

    document.getElementById('assignmentTitle').addEventListener('input', (e) => {
        formData.assignmentTitle = e.target.value;
        saveToStorage();
        updatePreview();
    });

    document.getElementById('universityName').addEventListener('input', (e) => {
        formData.universityName = e.target.value;
        saveToStorage();
        updatePreview();
    });

    // Instructor Info
    document.getElementById('instructorName').addEventListener('input', (e) => {
        formData.instructorName = e.target.value;
        saveToStorage();
        updatePreview();
    });

    document.getElementById('instructorTitle').addEventListener('input', (e) => {
        formData.instructorTitle = e.target.value;
        saveToStorage();
        updatePreview();
    });

    document.getElementById('instructorDepartment').addEventListener('input', (e) => {
        formData.instructorDepartment = e.target.value;
        saveToStorage();
        updatePreview();
    });

    // Logo Upload
    document.getElementById('logoInput').addEventListener('change', handleLogoUpload);

    // Customization
    document.getElementById('documentType').addEventListener('change', (e) => {
        formData.documentType = e.target.value;
        document.getElementById('customDocType').style.display = 
            e.target.value === 'CUSTOM' ? 'block' : 'none';
        saveToStorage();
        updatePreview();
    });

    document.getElementById('customDocType').addEventListener('input', (e) => {
        formData.customDocType = e.target.value;
        saveToStorage();
        updatePreview();
    });

    document.getElementById('useUppercase').addEventListener('change', (e) => {
        formData.useUppercase = e.target.checked;
        saveToStorage();
        updatePreview();
    });

    document.getElementById('fontType').addEventListener('change', (e) => {
        formData.fontType = e.target.value;
        saveToStorage();
        updatePreview();
    });

    document.getElementById('textAlignment').addEventListener('change', (e) => {
        formData.textAlignment = e.target.value;
        saveToStorage();
        updatePreview();
    });

    // PDF Download Button
    document.getElementById('downloadBtn').addEventListener('click', generatePDF);
}

// ============================================
// LOGO UPLOAD
// ============================================

function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }

    formData.logoFileName = file.name;
    const reader = new FileReader();

    reader.onload = (event) => {
        formData.logo = event.target.result;
        saveToStorage();
        updateLogoDisplay();
        updatePreview();
    };

    reader.onerror = () => {
        console.error('Failed to read logo file');
        alert('Failed to load logo image');
    };

    reader.readAsDataURL(file);
}

function updateLogoDisplay() {
    const logoPreview = document.getElementById('logoPreview');
    const logoName = document.getElementById('logoName');
    const removeBtn = document.getElementById('removeLogo');

    if (formData.logoFileName) {
        logoName.textContent = formData.logoFileName;
        logoPreview.style.display = 'flex';
        removeBtn.onclick = removeLogo;
    } else {
        logoPreview.style.display = 'none';
        logoName.textContent = '';
    }
}

function removeLogo() {
    formData.logo = null;
    formData.logoFileName = '';
    document.getElementById('logoInput').value = '';
    updateLogoDisplay();
    saveToStorage();
    updatePreview();
}

// ============================================
// PREVIEW UPDATE
// ============================================

function updatePreview() {
    const preview = document.getElementById('a4-preview');

    // Apply font and alignment classes
    preview.className = 'a4-preview';
    if (formData.fontType === 'sans') {
        preview.classList.add('font-sans');
    }
    if (formData.textAlignment === 'left') {
        preview.classList.add('align-left');
    } else if (formData.textAlignment === 'center') {
        preview.classList.add('align-center');
    }

    // Update logo
    const logoDiv = preview.querySelector('.preview-logo');
    if (formData.logo) {
        logoDiv.innerHTML = `<img src="${formData.logo}" alt="Logo">`;
    } else {
        logoDiv.innerHTML = '';
    }

    // Update university name
    const universityEl = preview.querySelector('.preview-university h1');
    universityEl.textContent = formData.universityName || 'University Name';

    // Update document type
    const docTypeEl = preview.querySelector('.preview-doctype h2');
    const displayDocType = formData.documentType === 'CUSTOM' 
        ? (formData.customDocType || 'CUSTOM')
        : formData.documentType;
    docTypeEl.textContent = formData.useUppercase 
        ? displayDocType.toUpperCase()
        : displayDocType;

    // Update course info
    const courseNameEl = preview.querySelector('.preview-course').children[0];
    const courseCodeEl = preview.querySelector('.preview-course').children[1];
    const assignmentEl = preview.querySelector('.preview-course').children[2];
    
    courseNameEl.textContent = formData.courseName || 'Course Name';
    courseCodeEl.textContent = `(${formData.courseCode || 'Course Code'})`;
    assignmentEl.textContent = formData.assignmentTitle || 'Assignment Title';

    // Update student info
    const studentInfoEl = preview.querySelector('.preview-submitted-by');
    studentInfoEl.innerHTML = `
        <p class="preview-section-title">Submitted By:</p>
        <p>${formData.studentName || 'Student Name'}</p>
        <p>${formData.studentID || 'Student ID'}</p>
    `;

    // Update instructor info
    const instructorEl = preview.querySelector('.preview-submitted-to');
    instructorEl.innerHTML = `
        <p class="preview-section-title">Submitted To:</p>
        <p>${formData.instructorTitle || 'Professor'} ${formData.instructorName || 'Instructor Name'}</p>
        <p>${formData.instructorDepartment || 'Department'}</p>
    `;

    // Update date
    const dateEl = preview.querySelector('.preview-date');
    const formatDate = (dateStr) => {
        if (!dateStr) return 'Date';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };
    dateEl.innerHTML = `<p>${formatDate(formData.submittedDate)}</p>`;
}

// ============================================
// PDF GENERATION
// ============================================

function generatePDF() {
    if (!validateForm()) {
        alert('Please fill in all required fields');
        return;
    }

    const element = document.getElementById('a4-preview');
    const fileName = `${formData.studentName}_CoverPage_${new Date().toISOString().split('T')[0]}.pdf`;

    const options = {
        margin: 0,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { format: 'a4', orientation: 'portrait' },
    };

    try {
        html2pdf().set(options).from(element).save();
    } catch (error) {
        console.error('PDF generation failed:', error);
        alert('Failed to generate PDF. Please try again.');
    }
}

// ============================================
// FORM VALIDATION
// ============================================

function validateForm() {
    const requiredFields = [
        'studentName',
        'studentID',
        'courseName',
        'courseCode',
        'assignmentTitle',
        'universityName',
        'instructorName',
    ];

    for (const field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
            return false;
        }
    }

    return true;
}
