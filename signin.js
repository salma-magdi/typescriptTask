import { validateSignin } from './validators';
import { mockBackend } from './mockBackend';
const signinForm = document.getElementById('signin-form');
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
signinForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = {
        email: formData.get('email'),
        password: formData.get('password')
    };
    const validation = validateSignin(formValues);
    if (!validation.isValid) {
        displayValidationErrors(validation.errors);
        return;
    }
    try {
        const { success, message, user } = await mockBackend.login(formValues);
        if (success && user) {
            alert(message);
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
        else {
            alert(`Login failed: ${message}`);
        }
    }
    catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
    }
});
