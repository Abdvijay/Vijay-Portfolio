/**
* Netlify Form Validation - Modified for Netlify Forms
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      let thisForm = this;
      let formData = new FormData(thisForm);
      
      // Show loading state
      thisForm.querySelector('.loading').classList.remove('d-none');
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.error-message').classList.add('d-none');
      thisForm.querySelector('.sent-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.add('d-none');

      // Submit to Netlify
      fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      })
      .then(response => {
        thisForm.querySelector('.loading').classList.remove('d-block');
        thisForm.querySelector('.loading').classList.add('d-none');
        
        if (response.ok) {
          thisForm.querySelector('.sent-message').classList.remove('d-none');
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.reset();
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch((error) => {
        thisForm.querySelector('.loading').classList.remove('d-block');
        thisForm.querySelector('.loading').classList.add('d-none');
        thisForm.querySelector('.error-message').innerHTML = 'Sorry, there was an error sending your message. Please try again.';
        thisForm.querySelector('.error-message').classList.remove('d-none');
        thisForm.querySelector('.error-message').classList.add('d-block');
      });
    });
  });
})();