import { useState, useCallback, useEffect } from 'react';
import type { FormikHelpers } from 'formik';
import { profileService } from '../services/profile.service';
import { INITIAL_PROFILE_FORM, INITIAL_PROFILE_DATA } from '../constants';
import type { ProfileFormData } from '../types';

function getErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const axiosErr = err as { response?: { data?: { message?: string } } };
    return axiosErr.response?.data?.message || fallback;
  }
  if (err && typeof err === 'object' && 'message' in err) {
    return (err as { message: string }).message;
  }
  return fallback;
}

export function useProfileData() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>(INITIAL_PROFILE_FORM);
  const [profileData, setProfileData] = useState(INITIAL_PROFILE_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = useCallback((message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }, []);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await profileService.getProfile();
      const { companyId, companyName, email, phone, address, gstNumber } = response.data;
      setFormData({ name: companyName || '', email: email || '', mobile: phone || '', address: address || '', gstNumber: gstNumber || '' });
      setProfileData((prev) => ({ ...prev, customerId: companyId || '', firstLetter: (companyName || '').charAt(0).toUpperCase() }));
    } catch (err) {
      showToastMessage(getErrorMessage(err, 'Failed to load profile'), 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToastMessage]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSubmit = useCallback(async (values: ProfileFormData, helpers: FormikHelpers<ProfileFormData>) => {
    try {
      const response = await profileService.updateProfile(values);
      if (response.status) {
        setFormData(values);
        setProfileData((prev) => ({ ...prev, firstLetter: values.name.charAt(0).toUpperCase() }));
        showToastMessage(response.message || 'Profile updated successfully', 'success');
        setShowForm(false);
      } else {
        showToastMessage(response.message || 'Failed to update profile', 'error');
      }
    } catch (err) {
      showToastMessage(getErrorMessage(err, 'Failed to update profile'), 'error');
    } finally {
      helpers.setSubmitting(false);
    }
  }, [showToastMessage]);

  return {
    showForm, setShowForm, formData, profileData,
    isLoading, toastMessage, toastType, showToast, setShowToast,
    handleSubmit,
  };
}
