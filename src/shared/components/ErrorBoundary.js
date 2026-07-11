import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught error:', error, errorInfo);
    }
    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };
    render() {
        if (this.state.hasError) {
            return (_jsxs("div", { style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '48px 24px',
                    textAlign: 'center',
                }, children: [_jsx("h2", { style: { margin: '0 0 8px', fontSize: '20px', color: '#dc2626' }, children: "Something went wrong" }), _jsx("p", { style: { margin: '0 0 8px', color: '#6b7280', fontSize: '14px' }, children: this.state.error?.message || 'An unexpected error occurred.' }), _jsx("button", { type: "button", onClick: this.handleReset, style: {
                            padding: '8px 20px',
                            fontSize: '14px',
                            borderRadius: '6px',
                            border: '1px solid #d1d5db',
                            background: '#fff',
                            color: '#374151',
                            cursor: 'pointer',
                        }, children: "Try Again" })] }));
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
//# sourceMappingURL=ErrorBoundary.js.map