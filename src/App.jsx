import { useState } from 'react'
import Form from './components/Form'
import Preview from './components/Preview'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App() {
  const [formData, setFormData] = useLocalStorage('coverPageData', {
    // Student Info
    studentName: '',
    studentID: '',
    studentDepartment: '',
    studentProgram: '',
    studentSemester: '',

    // Teacher Info
    teacherName: '',
    teacherDesignation: '',
    teacherDepartment: '',

    // Course Info
    courseTitle: '',
    courseCode: '',
    assignmentTitle: '',
    submissionDate: '',

    // Logo
    universityLogo: null,
    universityName: 'Your University',

    // Customization
    documentType: 'Assignment',
    fontFamily: 'Serif',
    textAlignment: 'center',
    useUppercase: false,
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          universityLogo: event.target.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.studentName.trim())
      newErrors.studentName = 'Student name is required'
    if (!formData.studentID.trim()) newErrors.studentID = 'Student ID is required'
    if (!formData.courseTitle.trim())
      newErrors.courseTitle = 'Course title is required'
    if (!formData.courseCode.trim()) newErrors.courseCode = 'Course code is required'
    if (!formData.assignmentTitle.trim())
      newErrors.assignmentTitle = 'Assignment title is required'
    if (!formData.teacherName.trim())
      newErrors.teacherName = 'Teacher name is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-full mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            📄 Assignment Cover Page Generator
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Create professional cover pages for your assignments
          </p>
        </div>
      </header>

      <div className="flex gap-6 p-4 max-w-full">
        {/* Form Section */}
        <div className="flex-1 min-w-0">
          <Form
            formData={formData}
            handleInputChange={handleInputChange}
            handleLogoUpload={handleLogoUpload}
            errors={errors}
            setErrors={setErrors}
            validateForm={validateForm}
          />
        </div>

        {/* Preview Section */}
        <div className="flex-1 min-w-0">
          <Preview formData={formData} />
        </div>
      </div>
    </div>
  )
}
