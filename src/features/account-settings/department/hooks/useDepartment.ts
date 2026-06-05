import { useState, useCallback, useEffect } from 'react';
import type { FormikHelpers } from 'formik';
import { departmentService } from '../services/department.service';
import { addDepartmentValidationSchema } from '../validations/department.validation';
import type { DepartmentItem, DepartmentFormData, DepartmentQueryParams } from '../types/department.types';

const addDepartmentInitialValues: DepartmentFormData = {
  departmentName: '',
  description: '',
  status: '',
};

export function useDepartment() {
  const [departmentList, setDepartmentList] = useState<DepartmentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDepartments = useCallback(async (params: DepartmentQueryParams = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await departmentService.getAllDepartments(params);

      if (response.status) {
        setDepartmentList(Array.isArray(response.data?.items) ? response.data.items : []);
      } else {
        setError(response.message || 'Failed to fetch departments');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch departments');
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
    fetchDepartments();
  }, [fetchDepartments]);

  const handleAddDepartment = useCallback(async (
    values: DepartmentFormData,
    { setSubmitting, resetForm }: FormikHelpers<DepartmentFormData>,
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await departmentService.createDepartment(values);

      if (response.status) {
        if (response.data && 'id' in response.data) {
          setDepartmentList(prev => [...prev, response.data as DepartmentItem]);
        } else {
          fetchDepartments();
        }
        resetForm();
        return true;
      } else {
        setError(response.message || 'Failed to add department');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add department');
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
  }, [fetchDepartments]);

  const handleUpdateDepartment = useCallback(async (
    id: number,
    values: DepartmentFormData,
    { setSubmitting }: FormikHelpers<DepartmentFormData>,
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await departmentService.updateDepartment(id, values);

      if (response.status) {
        const { departmentName, description, status } = values;
        setDepartmentList(prev => prev.map(item =>
          item.id === id ? { ...item, departmentName, description: description ?? '', status } : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update department');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update department');
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

  const handleDeleteDepartment = useCallback(async (id: number) => {
    setError('');

    try {
      const response = await departmentService.deleteDepartment(id);

      if (response.status) {
        setDepartmentList(prev => prev.filter(item => item.id !== id));
        return true;
      } else {
        setError(response.message || 'Failed to delete department');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete department');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    departmentList,
    isLoading,
    error,
    fetchDepartments,
    handleAddDepartment,
    handleUpdateDepartment,
    handleDeleteDepartment,
    validationSchema: addDepartmentValidationSchema,
    initialValues: addDepartmentInitialValues,
  };
}
