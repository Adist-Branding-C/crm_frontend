// Strips non-digits and caps to 10 digits; shared by agent create/update payload building and live phone-field input formatting.
export function sanitizePhoneDigits(raw) {
    return raw.replace(/\D/g, '').slice(0, 10);
}
//# sourceMappingURL=phone.util.js.map