/**
 * Maps a fetched MailConfigItem to the Formik shape used by the Add/Edit Mail Config drawer.
 *
 * Used by:
 * - useMailConfigData (derives the drawer's initial values in edit mode)
 */
export function mapMailConfigToFormData(item) {
    return {
        driver: item.driver || '',
        host: item.host || '',
        port: item.port ? String(item.port) : '',
        encryption: item.encryption || '',
        username: item.username || '',
        password: item.password || '',
        fromEmail: item.fromEmail || '',
        fromName: item.fromName || '',
        isActive: item.isActive,
    };
}
//# sourceMappingURL=mapMailConfigToFormData.js.map