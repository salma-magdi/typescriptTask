import { validateSignup } from './validators';
import { mockBackend } from './mockBackend';
const signupForm = document.getElementById('signup-form');
function displayValidationErrors(errors) {
    document.querySelectorAll('.error-text').forEach(el => el.remove());
    Object.entries(errors).forEach(([field, message]) => {
        const input = document.getElementById(field);
        if (input) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-text';
            errorElement.textContent = message;
            input.parentNode?.insertBefore(errorElement, input.nextSibling);
            input.classList.add('input-error');
        }
    });
}
signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    };
    const validation = validateSignup(formValues);
    if (!validation.isValid) {
        displayValidationErrors(validation.errors);
        return;
    }
    try {
        const { success, message } = await mockBackend.signup(formValues);
        if (success) {
            alert(message);
            signupForm.reset();
        }
        else {
            alert(`Signup failed: ${message}`);
        }
    }
    catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred during signup');
    }
});
