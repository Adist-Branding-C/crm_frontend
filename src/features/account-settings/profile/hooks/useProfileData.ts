import { useState, useCallback, useEffect } from 'react';
import type { FormikHelpers } from 'formik';
import { profileService } from '../services/profile.service';
import { INITIAL_PROFILE_FORM, INITIAL_PROFILE_DATA, INITIAL_PROFILE_PLAN } from '../constants';
import type { ProfileFormData, ProfilePlan } from '../types';
import { DEFAULT_COUNTRY_CODE } from '../../../../shared/constants/countryCodes';

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
  const [planDetails, setPlanDetails] = useState<ProfilePlan>(INITIAL_PROFILE_PLAN);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    setError(null);
    try {
      const response = await profileService.getProfile();
const { staff, plan } = response.data;
      setFormData({
        name: staff.name || '',
        email: staff.email || '',
        countryCode: staff.countryCode || DEFAULT_COUNTRY_CODE,
        mobile: staff.phoneNumber || '',
      });
      setProfileData({
        customerId: staff.staffId || '',
        dateOfRegistration: staff.dateOfRegistration || '',
        accountStatus: staff.status || '-',
        firstLetter: (staff.name || '').charAt(0).toUpperCase(),
      });
      setPlanDetails(plan);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load profile'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSubmit = useCallback(async (values: ProfileFormData, helpers: FormikHelpers<ProfileFormData>) => {
    try {
      const response = await profileService.updateProfile(values);
      if (response.status) {
        showToastMessage(response.message || 'Profile updated successfully', 'success');
        setShowForm(false);
        await fetchProfile();
      } else {
        showToastMessage(response.message || 'Failed to update profile', 'error');
      }
    } catch (err) {
      showToastMessage(getErrorMessage(err, 'Failed to update profile'), 'error');
    } finally {
      helpers.setSubmitting(false);
    }
  }, [showToastMessage, fetchProfile]);

  return {
    showForm, setShowForm, formData, profileData, planDetails,
    isLoading, error, retryFetchProfile: fetchProfile,
    toastMessage, toastType, showToast, setShowToast,
    handleSubmit,
  };
}
