interface ErrorMessageProps {
  message: string | null | undefined;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;
  return <div className="auth-error" role="alert">{message}</div>;
};

export default ErrorMessage;
