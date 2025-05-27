import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { API_BASE_URL } from '../../api';

export default function MSMEApplicationRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [uploadedFiles, setUploadedFiles] = useState({});

  const onFileChange = (e) => {
    const { name, files } = e.target;
    setUploadedFiles((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const postMsmeApplication = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/msme-application`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    alert('Application submitted successfully!');
    console.log('Success:', result);
  } catch (error) {
    alert('Error submitting application. Please try again.');
    console.error('Error:', error);
  }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    Object.entries(uploadedFiles).forEach(([key, file]) => {
      formData.append(key, file);
    });
    await postMsmeApplication(formData);
  };



  return (
    <div className="max-w-3xl mx-auto p-6 mt-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-left">
        MSME Application Registration
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Number Input */}
        <div className='grid grid-cols-2 gap-6'>
            <div>
            <label className="block text-sm font-medium mb-1" htmlFor="businessName">
                Business Name
            </label>
            <input
                type="text"
                id="businessName"
                {...register('businessName', { required: 'This field is required' })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.businessName && (
                <p className="text-red-600 text-sm mt-1">{errors.businessName.message}</p>
            )}

            </div>
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="creditScore">
                    Credit Score
                </label>
                <input
                    id="creditScore"
                    {...register('creditScore', { required: 'This field is required', min: { value: 0, message: 'Minimum value is 0' }, max: { value: 800, message: 'Maximum value is 800' } })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.creditScore && (
                    <p className="text-red-600 text-sm mt-1">{errors.creditScore.message}</p>
                )}
          </div>
        </div>

        {/* File Inputs */}

        <div className='grid grid-cols-2 gap-6'>
        {[
          { name: 'commercialRegistrationCertificate', label: 'Commercial Registration Certificate' , required: true },
          { name: 'tradeLicense', label: 'Trade License', required: false },
          { name: 'taxCard', label: 'Tax Card', required: false },
          { name: 'establishmentCertificate', label: 'Establishment Certificate', required: false },
          { name: 'auditedFinancialStatement', label: 'Audited Financial Statement', required: true },
          { name: 'bankStatement', label: 'Bank Statement', required: true },
        ].map((field) => (

          <div key={field.name}>
            <label className="block text-sm font-medium mb-1" htmlFor={field.name}>
              {field.label}
            </label>
            <input
              type="file"
              id={field.name}
              accept="application/pdf,image/*"
              {...register(field.name, field.required && { required: `${field.label} is required` })}
              onChange={onFileChange}
              className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100"
            />
            {errors[field.name] && (
              <p className="text-red-600 text-sm mt-1">{errors[field.name].message}</p>
            )}
            {uploadedFiles[field.name] && (
              <p className="mt-1 text-green-600 text-sm">
                Uploaded: {uploadedFiles[field.name].name}
              </p>
            )}
          </div>
        ))}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
