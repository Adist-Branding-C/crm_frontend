import { useState, useCallback } from 'react';
import { PROFILE_DATA, INITIAL_PROFILE_FORM } from '../constants';

export function useProfileData() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(INITIAL_PROFILE_FORM);

  const profileData = PROFILE_DATA;

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
  }, []);

  return { showForm, setShowForm, formData, setFormData, profileData, handleInputChange, handleSubmit };
}
