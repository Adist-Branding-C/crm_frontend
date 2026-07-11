// Email template CRUD routes consumed by emailTemplate.service.ts (account-settings/email-template).
export const EMAIL_TEMPLATE_API_ENDPOINTS = {
    // Used by useEmailTemplate's fetchFn to list/paginate templates for EmailTemplatePage.
    GET_ALL: '/email-template',
    // Used by createEmailTemplate when AddEmailTemplateDrawer submits a new template.
    CREATE: '/email-template',
    // Used by updateEmailTemplate when AddEmailTemplateDrawer submits an edit.
    UPDATE: (id) => `/email-template/${id}`,
    // Used by deleteEmailTemplate when AdminDeleteModal confirms a deletion.
    DELETE: (id) => `/email-template/${id}`,
};
//# sourceMappingURL=emailTemplateApiEndpoints.js.map