export const MAIL_DRIVER_OPTIONS = [
    { value: 'smtp', label: 'SMTP' },
    { value: 'sendmail', label: 'Sendmail' },
    { value: 'mailgun', label: 'Mailgun' },
];
export const ENCRYPTION_OPTIONS = [
    { value: 'tls', label: 'TLS' },
    { value: 'ssl', label: 'SSL' },
];
export const MAIL_CONFIG_API_ENDPOINTS = {
    BASE: '/mail-configs',
    BY_ID: (id) => `/mail-configs/${id}`,
};
export const INITIAL_MAIL_FORM = {
    driver: '', host: '', port: '', encryption: '',
    username: '', password: '', fromEmail: '', fromName: '', isActive: true,
};
//# sourceMappingURL=index.js.map