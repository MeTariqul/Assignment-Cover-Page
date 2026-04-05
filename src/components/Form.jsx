import { useState } from 'react'
import PDFButton from './PDFButton'

export default function Form({
  formData,
  handleInputChange,
  handleLogoUpload,
  errors,
  validateForm,
}) {
  const [logoName, setLogoName] = useState('')

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogoName(file.name)
      handleLogoUpload(e)
    }
  }

  const removeLogo = () => {
    setLogoName('')
  }

  const handleRemoveLogo = () => {
    removeLogo()
    // Properly update form data through the parent
    handleInputChange({
      target: {
        name: 'universityLogo',
        type: 'text',
        value: null,
      },
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
      <form className="space-y-6">
        {/* Logo Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            🏫 University Logo
          </label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          {logoName && (
            <div className="mt-2 flex items-center justify-between bg-blue-50 p-2 rounded">
              <span className="text-sm text-gray-700">✓ {logoName}</span>
              <button
                type="button"
                onClick={handleRemoveLogo}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* University Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            University Name
          </label>
          <input
            type="text"
            name="universityName"
            value={formData.universityName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Enter university name"
          />
        </div>

        {/* Student Info Section */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">👤 Student Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.studentName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="John Doe"
              />
              {errors.studentName && (
                <p className="text-red-500 text-sm mt-1">{errors.studentName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Student ID *
              </label>
              <input
                type="text"
                name="studentID"
                value={formData.studentID}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.studentID ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="2024001"
              />
              {errors.studentID && (
                <p className="text-red-500 text-sm mt-1">{errors.studentID}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Department
              </label>
              <input
                type="text"
                name="studentDepartment"
                value={formData.studentDepartment}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Program
              </label>
              <input
                type="text"
                name="studentProgram"
                value={formData.studentProgram}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="B.Sc. Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Semester
              </label>
              <input
                type="text"
                name="studentSemester"
                value={formData.studentSemester}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="4th Semester"
              />
            </div>
          </div>
        </div>

        {/* Course Info Section */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📚 Course Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                name="courseTitle"
                value={formData.courseTitle}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.courseTitle ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Advanced Web Development"
              />
              {errors.courseTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.courseTitle}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course Code *
              </label>
              <input
                type="text"
                name="courseCode"
                value={formData.courseCode}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.courseCode ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="CS-401"
              />
              {errors.courseCode && (
                <p className="text-red-500 text-sm mt-1">{errors.courseCode}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {formData.documentType} Title *
              </label>
              <input
                type="text"
                name="assignmentTitle"
                value={formData.assignmentTitle}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.assignmentTitle ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="E-commerce Platform Design"
              />
              {errors.assignmentTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.assignmentTitle}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Submission Date
              </label>
              <input
                type="date"
                name="submissionDate"
                value={formData.submissionDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Teacher Info Section */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">👨‍🏫 Teacher Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Teacher Name *
              </label>
              <input
                type="text"
                name="teacherName"
                value={formData.teacherName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.teacherName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Dr. Jane Smith"
              />
              {errors.teacherName && (
                <p className="text-red-500 text-sm mt-1">{errors.teacherName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Designation
              </label>
              <input
                type="text"
                name="teacherDesignation"
                value={formData.teacherDesignation}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Assistant Professor"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Department
              </label>
              <input
                type="text"
                name="teacherDepartment"
                value={formData.teacherDepartment}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Computer Science"
              />
            </div>
          </div>
        </div>

        {/* Customization Section */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">🎨 Customization</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Document Type
              </label>
              <select
                name="documentType"
                value={formData.documentType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              >
                <option value="Assignment">Assignment</option>
                <option value="Lab Report">Lab Report</option>
                <option value="Project Report">Project Report</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Font Family
              </label>
              <select
                name="fontFamily"
                value={formData.fontFamily}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              >
                <option value="Serif">Serif</option>
                <option value="Sans-serif">Sans-serif</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Text Alignment
              </label>
              <select
                name="textAlignment"
                value={formData.textAlignment}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              >
                <option value="center">Center</option>
                <option value="left">Left</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="useUppercase"
                checked={formData.useUppercase}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label className="text-sm font-semibold text-gray-700 cursor-pointer">
                Uppercase formatting
              </label>
            </div>
          </div>
        </div>

        {/* PDF Download Button */}
        <PDFButton formData={formData} validateForm={validateForm} />
      </form>
    </div>
  )
}
