export const getLocalStorageItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

export const setLocalStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting localStorage:', error);
  }
};

export const removeLocalStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing localStorage:', error);
  }
};

export const initializeAuthState = () => {
  const authData = getLocalStorageItem('auth');
  return {
    token: authData?.token || null,
    user: authData?.user || null,
    expiresAt: authData?.expiresAt || null,
    isAuthenticated: !!authData?.token
  };
};
