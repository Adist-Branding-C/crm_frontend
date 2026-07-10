import React from 'react';
import { X, Loader2 } from 'lucide-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ACTION_EDIT, ACTION_ADD, ACTION_UPDATE, ACTION_SAVE, ACTION_CANCEL } from '../../constants/actionLabels';
import ValidationAlert from '../ValidationAlert';
import type { FormField, AdminFormDrawerProps } from '../../types/crud';

function buildValidationSchema(fields: FormField[]) {
  const shape: Record<string, Yup.StringSchema<string | undefined>> = {};
  for (const field of fields) {
    if (field.required) {
      let validator = Yup.string().trim().required(`${field.label} is required`);
      if (field.type === 'email') {
        validator = validator.email('Invalid email address');
      }
      shape[field.name] = validator;
    }
  }
  return Object.keys(shape).length > 0 ? Yup.object().shape(shape) : undefined;
}

const AdminFormDrawer: React.FC<AdminFormDrawerProps> = ({ isOpen, title, fields, formData, onChange, onSave, onClose,   isEditing, error, onClearError, isSaving, saveDisabled }) => {
  if (!isOpen) return null;

  const validationSchema = React.useMemo(() => buildValidationSchema(fields), [fields]);

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h5>{isEditing ? `${ACTION_EDIT} ${title}` : `${ACTION_ADD} ${title}`}</h5>
          <button className="drawer-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="drawer-body">
          <ValidationAlert message={error ?? null} onClose={onClearError} />
          <Formik
            enableReinitialize
            initialValues={formData as Record<string, string>}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              onChange(values);
              onSave();
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
              const syncOnChange = (e: React.ChangeEvent<any>) => {
                handleChange(e);
                const target = e.target;
                const name = target.name;
                const value = target.type === 'checkbox' ? target.checked : target.value;
                onChange({ ...values, [name]: value });
              };

              return (
                <Form>
                  {fields.map(field => (
                    <div className="form-group" key={field.name}>
                      <label>{field.label} {field.required && <span className="text-danger">*</span>}</label>
                      {field.type === 'text' && (
                        <input type="text" name={field.name} className="form-control"
                          placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
                          value={String(values[field.name] ?? '')}
                          onChange={syncOnChange}
                          onBlur={handleBlur} />
                      )}
                      {field.type === 'email' && (
                        <input type="email" name={field.name} className="form-control"
                          placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
                          value={String(values[field.name] ?? '')}
                          onChange={syncOnChange}
                          onBlur={handleBlur} />
                      )}
                      {field.type === 'password' && (
                        <input type="password" name={field.name} className="form-control"
                          placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
                          value={String(values[field.name] ?? '')}
                          onChange={syncOnChange}
                          onBlur={handleBlur} />
                      )}
                      {field.type === 'number' && (
                        <input type="number" name={field.name} className="form-control"
                          placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
                          value={String(values[field.name] ?? '')}
                          onChange={syncOnChange}
                          onBlur={handleBlur} />
                      )}
                      {field.type === 'color' && (
                        <input type="color" name={field.name} className="form-control form-control-color"
                          value={String(values[field.name] ?? '#3b82f6')}
                          onChange={syncOnChange} />
                      )}
                      {field.type === 'checkbox' && (
                        <input type="checkbox" name={field.name} className="form-check-input"
                          checked={Boolean(values[field.name])}
                          onChange={syncOnChange} />
                      )}
                      {field.type === 'switch' && (
                        <label className="toggle-switch">
                          <input type="checkbox" name={field.name}
                            checked={Boolean(values[field.name])}
                            onChange={syncOnChange} />
                          <span className="toggle-slider"></span>
                        </label>
                      )}
                      {field.type === 'select' && (
                        <select name={field.name} className="form-control"
                          value={String(values[field.name] ?? '')}
                          onChange={syncOnChange}
                          onBlur={handleBlur}>
                          <option value="">Select {field.label.toLowerCase()}</option>
                          {field.options?.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      )}
                      {field.type === 'textarea' && (
                        <textarea name={field.name} className="form-control"
                          placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
                          value={String(values[field.name] ?? '')}
                          onChange={syncOnChange}
                          onBlur={handleBlur} />
                      )}
                      {errors[field.name] && touched[field.name] && (
                        <div className="text-danger" style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>{String(errors[field.name])}</div>
                      )}
                    </div>
                  ))}
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={isSaving || saveDisabled}>
                      {isSaving ? <><Loader2 size={16} className="spin" /> Saving...</> : (isEditing ? ACTION_UPDATE : ACTION_SAVE)}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>{ACTION_CANCEL}</button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AdminFormDrawer;
