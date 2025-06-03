// Handles accessible JS validation and AJAX submit for Web3Forms contact form
// This script expects the form to have id="contact-form" and a div with id="form-message"
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const messageDiv = document.getElementById('form-message');
  form.addEventListener('submit', async function (e) {
    // HTML5 validation first
    if (!form.checkValidity()) {
      form.reportValidity();
      e.preventDefault();
      return;
    }
    // hCaptcha validation
    const hCaptcha = form.querySelector('textarea[name="h-captcha-response"]');
    if (!hCaptcha || !hCaptcha.value) {
      e.preventDefault();
      if (messageDiv) {
        messageDiv.textContent = 'Please complete the captcha.';
        messageDiv.className = 'form-message form-message--error';
      }
      return;
    }
    // AJAX submit
    e.preventDefault();
    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (result.success) {
        if (messageDiv) {
          messageDiv.textContent = result.message || 'Thank you! Your message has been sent.';
          messageDiv.className = 'form-message form-message--success';
        }
        form.reset();
        if (window.hcaptcha) window.hcaptcha.reset();
      } else {
        if (messageDiv) {
          messageDiv.textContent = result.message || 'Sorry, there was an error. Please try again.';
          messageDiv.className = 'form-message form-message--error';
        }
      }
    } catch (err) {
      if (messageDiv) {
        messageDiv.textContent = 'Sorry, there was an error submitting the form.';
        messageDiv.className = 'form-message form-message--error';
      }
    }
  });
});
