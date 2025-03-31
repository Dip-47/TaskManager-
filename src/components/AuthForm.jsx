import { useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const AuthForm = ({ formData, error, isLoading, handleChange, handleSubmit }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [showResetModal, setShowResetModal] = useState(false);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!emailRegex.test(formData.username)) {
      errors.username = 'Invalid email format';
    }
    if (!passwordRegex.test(formData.password)) {
      errors.password = 'Password must contain 8+ chars with 1 special character, 1 number, 1 uppercase and 1 lowercase';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e);
    }
  };
  return (
    <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="username"
            name="username"
            type="email"
            required
            value={formData.username}
            onChange={handleChange}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
          {validationErrors.username && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.username}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
          {validationErrors.password && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center p-4 text-sm text-red-700 bg-red-100 rounded-lg">
          <ExclamationCircleIcon className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      <div className="text-sm text-right">
        <button
          type="button"
          className="text-primary hover:underline"
          onClick={() => setShowResetModal(true)}
        >
          Forgot Password?
        </button>
      </div>

      {showResetModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-xl">
            <h3 className="text-lg font-medium text-gray-900">Password Reset</h3>
            <p className="mt-2 text-sm text-gray-500">
              A password reset link has been sent to your email address.
            </p>
            <div className="mt-4">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={() => setShowResetModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className={`flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <>
              <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;