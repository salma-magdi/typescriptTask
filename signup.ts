import { SignupObject } from './types';
import { validateSignup } from './validators';
import { mockBackend } from './mockBackend';

const signupForm = document.getElementById('signup-form') as HTMLFormElement;

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

signupForm.addEventListener('submit', async (event: SubmitEvent) => {
    event.preventDefault();
    
    const formData = new FormData(event.target as HTMLFormElement);
    const formValues: SignupObject = {
        fullName: formData.get('fullName') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string
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
        } else {
            alert(`Signup failed: ${message}`);
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred during signup');
    }
});