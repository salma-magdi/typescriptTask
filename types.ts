export type SignupObject = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type SigninObject = {
    email: string;
    password: string;
};

export type ValidationResult = {
    isValid: boolean;
    errors: Record<string, string>;
};