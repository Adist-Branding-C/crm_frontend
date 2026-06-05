import { X } from 'lucide-react';
import type { ChangeEvent } from 'react';

interface StaffDataItem {
  id: number;
  name: string;
  role: string;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  assignedStaff: string;
}

interface StaffFormDrawerProps {
  isOpen: boolean;
  editingStaff: { name: string } | null;
  formData: FormData;
  staffData: StaffDataItem[];
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onClose: () => void;
}

const StaffFormDrawer = ({ isOpen, editingStaff, formData, staffData, onInputChange, onClose }: StaffFormDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer drawer-right" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="drawer-header">
          <h5>{editingStaff ? 'Edit Staff' : 'Add Staff'}</h5>
          <button className="drawer-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-body">
          <form>
            <div className="form-group">
              <label>Name <span className="text-danger">*</span></label>
              <input type="text" name="name" className="form-control" placeholder="Enter name" value={formData.name} onChange={onInputChange} />
            </div>
            <div className="form-group">
              <label>Phone Number <span className="text-danger">*</span></label>
              <input type="text" name="phone" className="form-control" placeholder="Enter phone number" value={formData.phone} onChange={onInputChange} />
            </div>
            <div className="form-group">
              <label>Email <span className="text-danger">*</span></label>
              <input type="email" name="email" className="form-control" placeholder="Enter email" value={formData.email} onChange={onInputChange} />
            </div>
            {!editingStaff && (
              <>
                <div className="form-group">
                  <label>Password <span className="text-danger">*</span></label>
                  <input type="password" name="password" className="form-control" placeholder="Enter password" value={formData.password} onChange={onInputChange} />
                </div>
                <div className="form-group">
                  <label>Confirm Password <span className="text-danger">*</span></label>
                  <input type="password" name="confirmPassword" className="form-control" placeholder="Enter confirm password" value={formData.confirmPassword} onChange={onInputChange} />
                </div>
              </>
            )}
            {editingStaff && (
              <>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" name="password" className="form-control" placeholder="Enter new password (optional)" value={formData.password} onChange={onInputChange} />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm new password" value={formData.confirmPassword} onChange={onInputChange} />
                </div>
              </>
            )}
            <div className="form-group">
              <label>Assigned Staff</label>
              <select name="assignedStaff" className="form-control" value={formData.assignedStaff} onChange={onInputChange}>
                <option value="">Select Staff</option>
                {staffData.filter(s => s.role !== 'Admin').map(staff => (
                  <option key={staff.id} value={staff.id}>{staff.name}</option>
                ))}
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingStaff ? 'Update' : 'Save'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffFormDrawer;
