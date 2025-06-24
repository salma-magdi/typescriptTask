import { SigninObject } from './types';
import { validateSignin } from './validators';
import { mockBackend } from './mockBackend';

const signinForm = document.getElementById('signin-form') as HTMLFormElement;

function displayValidationErrors(errors: Record<string, string>) {
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

signinForm.addEventListener('submit', async (event: SubmitEvent) => {
    event.preventDefault();
    
    const formData = new FormData(event.target as HTMLFormElement);
    const formValues: SigninObject = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
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
            
        } else {
            alert(`Login failed: ${message}`);
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
    }
});