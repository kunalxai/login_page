class SignupForm {
    constructor() {
        this.form = document.getElementById('signupForm');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.passwordInput = document.getElementById('password');
        this.isPasswordVisible = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupFormValidation();
    }
    
    setupEventListeners() {
        // Password visibility toggle
        this.passwordToggle.addEventListener('click', () => {
            this.togglePasswordVisibility();
        });
        
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });
        
        // Social login buttons
        document.querySelector('.google-button').addEventListener('click', () => {
            this.handleSocialLogin('google');
        });
        
        document.querySelector('.apple-button').addEventListener('click', () => {
            this.handleSocialLogin('apple');
        });
        
        // Back button
        document.querySelector('.back-button').addEventListener('click', () => {
            this.handleBackNavigation();
        });
        
        // Login link
        document.querySelector('.login-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLoginRedirect();
        });
    }
    
    setupFormValidation() {
        const inputs = this.form.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }
    
    togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;
        
        if (this.isPasswordVisible) {
            this.passwordInput.type = 'text';
            this.passwordToggle.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M2.5 2.5l15 15m-7.5-5.5a3 3 0 1 1-3-3m6 0c1.6-2.1 1.6-5.9 0-8-1.9-2.5-5.1-2.5-7 0-.8 1-.8 2.1 0 3.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
            `;
        } else {
            this.passwordInput.type = 'password';
            this.passwordToggle.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M1.66669 10S4.16669 5 10 5s8.33331 5 8.33331 5-2.5 5-8.33331 5-8.33331-5-8.33331-5z" stroke="currentColor" stroke-width="1.5"/>
                    <circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/>
                </svg>
            `;
        }
    }
    
    validateField(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        switch (input.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                errorMessage = 'Please enter a valid email address';
                break;
            case 'password':
                isValid = value.length >= 8;
                errorMessage = 'Password must be at least 8 characters long';
                break;
            default:
                isValid = value.length > 0;
                errorMessage = 'This field is required';
        }
        
        if (!isValid) {
            this.showFieldError(input, errorMessage);
        } else {
            this.clearFieldError(input);
        }
        
        return isValid;
    }
    
    showFieldError(input, message) {
        input.style.borderColor = '#ef4444';
        
        let errorDiv = input.parentNode.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = '#ef4444';
            errorDiv.style.fontSize = '0.75rem';
            errorDiv.style.marginTop = '0.25rem';
            input.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }
    
    clearFieldError(input) {
        input.style.borderColor = '#4b5563';
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    handleFormSubmission() {
        const formData = new FormData(this.form);
        const data = {
            firstName: formData.get('firstName') || document.getElementById('firstName').value,
            lastName: formData.get('lastName') || document.getElementById('lastName').value,
            email: formData.get('email') || document.getElementById('email').value,
            password: formData.get('password') || document.getElementById('password').value,
            terms: document.getElementById('terms').checked
        };
        
        // Validate all fields
        const inputs = this.form.querySelectorAll('input[required]');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        // Check terms agreement
        if (!data.terms) {
            alert('Please agree to the Terms & Conditions');
            return;
        }
        
        if (isFormValid) {
            this.submitRegistration(data);
        }
    }
    
    async submitRegistration(data) {
        const submitButton = document.querySelector('.create-button');
        const originalText = submitButton.textContent;
        
        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Creating account...';
            
            // Simulate API call
            await this.simulateApiCall(data);
            
            this.showSuccessMessage();
            
        } catch (error) {
            this.showErrorMessage(error.message);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    }
    
    async simulateApiCall(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate successful registration
                console.log('Registration data:', data);
                resolve({ success: true, message: 'Account created successfully' });
            }, 2000);
        });
    }
    
    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 1000;
        `;
        message.textContent = 'Account created successfully!';
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
    
    showErrorMessage(error) {
        const message = document.createElement('div');
        message.className = 'error-message';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 1000;
        `;
        message.textContent = error;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
    
    handleSocialLogin(provider) {
        console.log(`${provider} login clicked`);
        
        // In a real application, you would redirect to the OAuth provider
        const providerUrls = {
            google: 'https://accounts.google.com/oauth/authorize',
            apple: 'https://appleid.apple.com/auth/authorize'
        };
        
        // Simulate OAuth redirect
        alert(`Redirecting to ${provider} login...`);
        // window.location.href = providerUrls[provider];
    }
    
    handleBackNavigation() {
        // In a real application, this would navigate back to the main website
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    }
    
    handleLoginRedirect() {
        // Redirect to login page
        window.location.href = '/login';
    }
}

// Initialize the form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SignupForm();
});

// Add some interactive animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate form fields on focus
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentNode.style.transform = 'translateY(-2px)';
            input.parentNode.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', () => {
            input.parentNode.style.transform = 'translateY(0)';
        });
    });
    
    // Animate buttons on hover
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-1px)';
            button.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
});
