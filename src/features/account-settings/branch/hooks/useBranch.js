import { useState, useCallback, useEffect } from 'react';
import { branchService } from '../services/branch.service';
import { addBranchValidationSchema } from '../validations/branch.validation';

const addBranchInitialValues = {
  name: '',
  description: '',
  status: '',
};

export function useBranch() {
  const [branchList, setBranchList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBranches = useCallback(async (params = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await branchService.getAllBranches(params);

      if (response.status) {
        setBranchList(Array.isArray(response.data?.items) ? response.data.items : []);
      } else {
        setError(response.message || 'Failed to fetch branches');
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to fetch branches');
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
    fetchBranches();
  }, [fetchBranches]);

  const handleAddBranch = useCallback(async (values, { setSubmitting, resetForm }) => {
    setError('');
    setIsLoading(true);

    try {
      const { name, description, status } = values;
      const requestData = { name, description, status };

      const response = await branchService.createBranch(requestData);

      if (response.status) {
        const newItem = { id: response.data?.id || response.data?.branch?.id, name, description, status };
        if (newItem.id) {
          setBranchList(prev => [...prev, newItem]);
        } else {
          fetchBranches();
        }
        resetForm();
        return true;
      } else {
        setError(response.message || 'Failed to add branch');
        return false;
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to add branch');
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

  const handleUpdateBranch = useCallback(async (id, values, { setSubmitting }) => {
    const branchId = Number(id);
    if (!branchId || isNaN(branchId)) {
      setError('Invalid branch id');
      setSubmitting(false);
      return false;
    }
    setError('');
    setIsLoading(true);

    try {
      const { name, description, status } = values;
      const requestData = { name, description, status };

      const response = await branchService.updateBranch(branchId, requestData);

      if (response.status) {
        setBranchList(prev => prev.map(item =>
          Number(item.id) === branchId ? { ...item, name, description, status } : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update branch');
        return false;
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to update branch');
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

  const handleDeleteBranch = useCallback(async (id) => {
    const branchId = Number(id);
    if (!branchId || isNaN(branchId)) {
      setError('Invalid branch id');
      return false;
    }
    setError('');

    try {
      const response = await branchService.deleteBranch(branchId);

      if (response.status) {
        setBranchList(prev => prev.filter(item => Number(item.id) !== branchId));
        return true;
      } else {
        setError(response.message || 'Failed to delete branch');
        return false;
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to delete branch');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError(err.message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    branchList,
    isLoading,
    error,
    fetchBranches,
    handleAddBranch,
    handleUpdateBranch,
    handleDeleteBranch,
    validationSchema: addBranchValidationSchema,
    initialValues: addBranchInitialValues,
  };
}
