export default function Preview({ formData }) {
  const fontStack =
    formData.fontFamily === 'Serif'
      ? 'Georgia, "Times New Roman", serif'
      : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

  const textStyle = {
    fontFamily: fontStack,
    textAlign: formData.textAlignment,
  }

  const formatText = (text) => {
    return formData.useUppercase ? text.toUpperCase() : text
  }

  const submissionDateFormatted = formData.submissionDate
    ? new Date(formData.submissionDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-4">
      {/* A4 Preview Container */}
      <div
        className="bg-gray-100 p-4 overflow-y-auto"
        style={{ height: 'calc(100vh - 150px)' }}
      >
        <div
          id="preview-content"
          className="bg-white shadow-xl mx-auto"
          style={{
            width: '210mm',
            height: '297mm',
            padding: '40px 30px',
            boxSizing: 'border-box',
            ...textStyle,
            lineHeight: '1.6',
            color: '#333',
          }}
        >
          {/* Logo Section */}
          {formData.universityLogo && (
            <div className="text-center mb-6">
              <img
                src={formData.universityLogo}
                alt="University Logo"
                style={{
                  maxHeight: '80px',
                  maxWidth: '80px',
                  objectFit: 'contain',
                  margin: '0 auto',
                }}
              />
            </div>
          )}

          {/* University Name */}
          <div className="text-center mb-8">
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
              {formatText(formData.universityName || 'Your University')}
            </h1>
          </div>

          {/* Document Type Title */}
          <div className="text-center mb-12">
            <h2
              style={{ fontSize: '32px', fontWeight: 'bold', letterSpacing: '1px' }}
            >
              {formatText(formData.documentType)}
            </h2>
          </div>

          {/* Course Information */}
          <div className="text-center mb-12">
            <p style={{ fontSize: '14px', marginBottom: '8px' }}>
              {formatText(formData.courseTitle || 'Course Title')}
            </p>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
              {formatText(formData.courseCode || 'Course Code')}
            </p>
          </div>

          {/* Divider */}
          <hr style={{ borderTop: '1px solid #999', margin: '24px 0' }} />

          {/* Submitted By Section */}
          <div className="mb-12">
            <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '12px' }}>
              Submitted By:
            </p>
            <p style={{ fontSize: '13px', marginBottom: '4px' }}>
              {formatText(formData.studentName || 'Student Name')}
            </p>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
              {formatText(formData.studentID || 'Student ID')}
            </p>
            {formData.studentDepartment && (
              <p style={{ fontSize: '13px', color: '#666' }}>
                {formatText(formData.studentDepartment)}
              </p>
            )}
          </div>

          {/* Submitted To Section */}
          <div className="mb-12">
            <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '12px' }}>
              Submitted To:
            </p>
            <p style={{ fontSize: '13px', marginBottom: '4px' }}>
              {formatText(formData.teacherName || 'Teacher Name')}
            </p>
            {formData.teacherDesignation && (
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
                {formatText(formData.teacherDesignation)}
              </p>
            )}
            {formData.teacherDepartment && (
              <p style={{ fontSize: '13px', color: '#666' }}>
                {formatText(formData.teacherDepartment)}
              </p>
            )}
          </div>

          {/* Assignment Title */}
          {formData.assignmentTitle && (
            <div className="text-center mb-12">
              <p style={{ fontSize: '13px', fontWeight: 'bold' }}>
                {formatText(formData.assignmentTitle)}
              </p>
            </div>
          )}

          {/* Submission Date */}
          {submissionDateFormatted && (
            <div className="text-center mt-16">
              <p style={{ fontSize: '13px', color: '#666' }}>
                Submission Date: {submissionDateFormatted}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
