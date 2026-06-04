import { useState, useCallback, useEffect } from 'react';
import { designationService } from '../services/designation.service';
import { addDesignationValidationSchema } from '../validations/designation.validation';

const addDesignationInitialValues = {
  designationName: '',
  description: '',
  status: '',
};

export function useDesignation() {
  const [designationList, setDesignationList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDesignations = useCallback(async (params = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await designationService.getAllDesignations(params);

      if (response.status) {
        setDesignationList(Array.isArray(response.data?.items) ? response.data.items : []);
      } else {
        setError(response.message || 'Failed to fetch designations');
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to fetch designations');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError(err.message);
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDesignations();
  }, [fetchDesignations]);

  const handleAddDesignation = useCallback(async (values, { setSubmitting, resetForm }) => {
    setError('');
    setIsLoading(true);

    try {
      const { designationName, description, status } = values;
      const requestData = { designationName, description, status };

      const response = await designationService.createDesignation(requestData);

      if (response.status) {
        setDesignationList(prev => [...prev, { id: Date.now(), designationName, description, status }]);
        resetForm();
        return true;
      } else {
        setError(response.message || 'Failed to add designation');
        return false;
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to add designation');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError(err.message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  const handleUpdateDesignation = useCallback(async (id, values, { setSubmitting }) => {
    setError('');
    setIsLoading(true);

    try {
      const { designationName, description, status } = values;
      const requestData = { designationName, description, status };

      const response = await designationService.updateDesignation(id, requestData);

      if (response.status) {
        setDesignationList(prev => prev.map(item =>
          item.id === id ? { ...item, designationName, description, status } : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update designation');
        return false;
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to update designation');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError(err.message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  const handleDeleteDesignation = useCallback(async (id) => {
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
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to delete designation');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError(err.message);
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
    initialValues: addDesignationInitialValues,
  };
}
