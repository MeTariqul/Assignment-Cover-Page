import html2pdf from 'html2pdf.js'

export default function PDFButton({ formData, validateForm }) {
  const generatePDF = () => {
    if (!validateForm()) {
      return
    }

    const element = document.getElementById('preview-content')
    if (!element) {
      console.error('Preview element not found')
      return
    }

    const opt = {
      margin: 0,
      filename: `${formData.assignmentTitle || 'cover-page'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, logging: false, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }

    html2pdf().set(opt).from(element).save()
  }

  return (
    <button
      onClick={generatePDF}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
    >
      📥 Download PDF
    </button>
  )
}
