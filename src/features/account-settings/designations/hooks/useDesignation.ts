import { useState, useCallback, useEffect } from 'react';
import type { FormikHelpers } from 'formik';
import { designationService } from '../services/designation.service';
import { addDesignationValidationSchema, editDesignationValidationSchema } from '../validations/designation.validation';
import { ADD_DESIGNATION_INITIAL_VALUES } from '../constants/designation.constants';
import type { DesignationItem, DesignationFormData } from '../types/designation.types';

export function useDesignation() {
  const [designationList, setDesignationList] = useState<DesignationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDesignations = useCallback(async (params: Record<string, string | number | undefined> = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await designationService.getAllDesignations(params);

      if (response.status) {
        const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
          ? (response.data as { items: DesignationItem[] }).items
          : Array.isArray(response.data)
            ? response.data
            : [];
        setDesignationList(Array.isArray(rawData) ? rawData : []);
      } else {
        setError(response.message || 'Failed to fetch designations');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch designations');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDesignations();
  }, [fetchDesignations]);

  const handleAddDesignation = useCallback(async (
    values: DesignationFormData,
    { setSubmitting, resetForm }: FormikHelpers<DesignationFormData>,
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await designationService.createDesignation(values);

      if (response.status) {
        const createdItem = response.data;
        if (createdItem && typeof createdItem === 'object' && 'id' in createdItem) {
          setDesignationList(prev => [...prev, createdItem as DesignationItem]);
        } else {
          fetchDesignations();
        }
        resetForm();
        return true;
      } else {
        setError(response.message || 'Failed to add designation');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add designation');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, [fetchDesignations]);

  const handleUpdateDesignation = useCallback(async (
    id: number,
    values: DesignationFormData,
    { setSubmitting }: FormikHelpers<DesignationFormData>,
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await designationService.updateDesignation(id, values);

      if (response.status) {
        const { designationName, description, status } = values;
        setDesignationList(prev => prev.map(item =>
          item.id === id ? { ...item, designationName, description, status } : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update designation');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update designation');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  const handleDeleteDesignation = useCallback(async (id: number) => {
    setError('');

    try {
      const response = await designationService.deleteDesignation(id);

      if (response.status) {
        setDesignationList(prev => prev.filter(item => item.id !== id));
        return true;
      } else {
        setError(response.message || 'Failed to delete designation');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete designation');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    designationList,
    isLoading,
    error,
    fetchDesignations,
    handleAddDesignation,
    handleUpdateDesignation,
    handleDeleteDesignation,
    validationSchema: addDesignationValidationSchema,
    editValidationSchema: editDesignationValidationSchema,
    initialValues: ADD_DESIGNATION_INITIAL_VALUES,
  };
}
