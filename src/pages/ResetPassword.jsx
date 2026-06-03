// import React, { useState } from 'react';
// import { useNavigate, useSearchParams, Navigate } from 'react-router-dom';
// import { Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
// import './ResetPassword.css';

// const ResetPassword = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get('token');

//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState('');

//   const isAuthenticated = localStorage.getItem('crm_token');

//   if (isAuthenticated) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   if (!token) {
//     return <Navigate to="/forgot-password" replace />;
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!password) {
//       setError('Please enter a new password');
//       return;
//     }

//     if (password.length < 8) {
//       setError('Password must be at least 8 characters');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     setIsLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 1500));
//     setIsLoading(false);
//     setIsSuccess(true);
//   };

//   if (isSuccess) {
//     return (
//       <div className="auth-page">
//         <div className="auth-visual-panel">
//           <div className="visual-content">
//             <div className="visual-logo">
//               <div className="logo-mark">CRM</div>
//               <span className="logo-text">Dashboard</span>
//             </div>
//           </div>
//           <div className="visual-pattern"></div>
//         </div>

//         <div className="auth-form-panel">
//           <div className="auth-card">
//             <div className="success-animation">
//               <CheckCircle size={48} />
//             </div>
//             <h1>Password Reset</h1>
//             <p>Your password has been reset successfully.</p>
//             <button className="login-link-btn" onClick={() => navigate('/login')}>
//               <span>Go to Sign In</span>
//               <ArrowRight size={18} />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="auth-page">
//       <div className="auth-visual-panel">
//         <div className="visual-content">
//           <div className="visual-logo">
//             <div className="logo-mark">CRM</div>
//             <span className="logo-text">Dashboard</span>
//           </div>
//           <div className="visual-message">
//             <h2>Create New Password</h2>
//             <p>Enter a strong password to secure your account.</p>
//           </div>
//         </div>
//         <div className="visual-pattern"></div>
//       </div>

//       <div className="auth-form-panel">
//         <div className="auth-card">
//           <div className="auth-header">
//             <h1>Create New Password</h1>
//             <p>Your new password must be different from previous passwords</p>
//           </div>

//           <form onSubmit={handleSubmit} className="auth-form">
//             {error && <div className="auth-error">{error}</div>}
            
//             <div className="form-group">
//               <label>New Password</label>
//               <div className="input-wrapper">
//                 <Lock size={18} className="input-icon" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Enter new password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="form-input"
//                 />
//                 <button
//                   type="button"
//                   className="password-toggle"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Confirm Password</label>
//               <div className="input-wrapper">
//                 <Lock size={18} className="input-icon" />
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   placeholder="Confirm new password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="form-input"
//                 />
//                 <button
//                   type="button"
//                   className="password-toggle"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             <button type="submit" className="auth-btn" disabled={isLoading}>
//               {isLoading ? (
//                 <Loader2 size={18} className="spin" />
//               ) : (
//                 <>
//                   <span>Reset Password</span>
//                   <ArrowRight size={18} />
//                 </>
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;