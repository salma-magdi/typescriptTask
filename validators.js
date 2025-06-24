const patterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    name: /^[a-zA-Z\u0600-\u06FF\s]{3,}$/, // Supports English and Arabic
};
const errorMessages = {
    email: 'Invalid email address',
    password: 'Password must contain: 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char',
    name: 'Name must be at least 3 characters',
    confirmPassword: 'Passwords do not match'
};
export const validateSignup = (data) => {
    const errors = {};
    if (!data.fullName?.trim() || !patterns.name.test(data.fullName)) {
        errors.fullName = errorMessages.name;
    }
    if (!data.email?.trim() || !patterns.email.test(data.email)) {
        errors.email = errorMessages.email;
    }
    if (!data.password || !patterns.password.test(data.password)) {
        errors.password = errorMessages.password;
    }
    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = errorMessages.confirmPassword;
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
export const validateSignin = (data) => {
    const errors = {};
    if (!data.email?.trim() || !patterns.email.test(data.email)) {
        errors.email = errorMessages.email;
    }
    if (!data.password) {
        errors.password = 'Password is required';
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
