// Optional utility for PDF generation (backup/alternative implementation)
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

/**
 * Generate PDF using jsPDF and html2canvas
 * This is an alternative to html2pdf.js
 */
export async function generatePDFAlternative(element, filename = 'cover-page.pdf') {
  try {
    // Convert HTML element to canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#FFFFFF',
    })

    // Get canvas dimensions
    const imageData = canvas.toDataURL('image/jpeg', 0.98)

    // Create PDF (A4 size: 210mm × 297mm)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const imgWidth = 210 // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    let heightLeft = imgHeight
    let position = 0

    // Add image to PDF (handle multi-page if needed)
    while (heightLeft > 0) {
      pdf.addImage(imageData, 'JPEG', 0, position, imgWidth, imgHeight)
      heightLeft -= 297 // A4 height
      position -= 297

      if (heightLeft > 0) {
        pdf.addPage()
      }
    }

    // Save the PDF
    pdf.save(filename)
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}

/**
 * Validate PDF generation requirements
 */
export function validatePDFRequirements(formData) {
  const required = [
    'studentName',
    'studentID',
    'courseTitle',
    'courseCode',
    'assignmentTitle',
    'teacherName',
  ]

  const missing = required.filter((field) => !formData[field] || formData[field].trim() === '')

  return {
    isValid: missing.length === 0,
    missingFields: missing,
  }
}
