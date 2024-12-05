/**
 * Détecte si l'entrée est un email ou un numéro de téléphone
 * @param {string} value - La valeur à vérifier
 * @returns {string} - 'email' ou 'phone'
 */
export const detectInputType = (input) => {
    // Nettoie l'entrée
    const cleanInput = input.trim();
    
    // Vérifie si c'est un email
    if (isValidEmail(cleanInput)) {
        return 'email';
    }
    
    // Vérifie si c'est un numéro de téléphone guinéen
    const cleanPhone = cleanInput.replace(/[^0-9+]/g, '');
    if (isValidGuineaPhone(cleanPhone)) {
        return 'phone';
    }
    
    // Si l'entrée contient uniquement des chiffres et éventuellement un +
    if (/^[0-9+\s]*$/.test(cleanInput)) {
        return 'phone';
    }
    
    // Par défaut, considérer comme email
    return 'email';
};

/**
 * Vérifie si une entrée est un email valide
 * @param {string} input - L'entrée à vérifier
 * @returns {boolean} - true si c'est un email valide
 */
export const isValidEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input.trim());
};

/**
 * Vérifie si une entrée est un numéro de téléphone guinéen valide
 * @param {string} input - L'entrée à vérifier
 * @returns {boolean} - true si c'est un numéro valide
 */
export const isValidGuineaPhone = (input) => {
    const cleanPhone = input.replace(/[^0-9+]/g, '');
    const guineaPhoneRegex = /^\+?224[0-9]{9}$/;
    return guineaPhoneRegex.test(cleanPhone);
};

/**
 * Formate un numéro de téléphone guinéen
 * @param {string} phone - Le numéro à formater
 * @returns {string} - Le numéro formaté
 */
export const formatGuineaPhone = (phone) => {
    // Nettoie le numéro de tout sauf les chiffres et le +
    let cleanPhone = phone.replace(/[^0-9+]/g, '');
    
    // Si le numéro ne commence pas par +224, l'ajouter
    if (!cleanPhone.startsWith('+224')) {
        if (cleanPhone.startsWith('224')) {
            cleanPhone = '+' + cleanPhone;
        } else {
            cleanPhone = '+224' + cleanPhone;
        }
    }
    
    // Format: +224 XX XX XX XX
    const matches = cleanPhone.match(/^\+224(\d{2})(\d{2})(\d{2})(\d{3})$/);
    if (matches) {
        return `+224 ${matches[1]} ${matches[2]} ${matches[3]} ${matches[4]}`;
    }
    
    return cleanPhone;
};

/**
 * Formate un numéro de téléphone
 * @param {string} value - Le numéro à formater
 * @returns {string} - Le numéro formaté
 */
export const formatPhoneNumber = (value) => {
    // Supprime tout sauf les chiffres
    const numbers = value.replace(/\D/g, '');
    
    // Si c'est un numéro guinéen (commence par +224)
    if (numbers.startsWith('224')) {
        return `+${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5, 7)} ${numbers.slice(7, 9)} ${numbers.slice(9)}`;
    }
    
    // Format par défaut
    return numbers.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
};

/**
 * Valide un email
 * @param {string} email - L'email à valider
 * @returns {boolean} - true si l'email est valide
 */
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Valide un numéro de téléphone
 * @param {string} phone - Le numéro à valider
 * @returns {boolean} - true si le numéro est valide
 */
export const validatePhone = (phone) => {
    const phoneRegex = /^\+?[0-9]{8,}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
};
