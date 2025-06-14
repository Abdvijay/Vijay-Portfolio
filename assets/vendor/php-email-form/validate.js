/**
* Simple Netlify Form Handler
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      let thisForm = this;
      
      // Show loading
      thisForm.querySelector('.loading').classList.remove('d-none');
      thisForm.querySelector('.error-message').classList.add('d-none');
      thisForm.querySelector('.sent-message').classList.add('d-none');

      // Create form data
      let formData = new FormData(thisForm);
      
      // Submit to Netlify
      fetch(thisForm.getAttribute('action'), {
        method: 'POST',
        body: formData
      })
      .then(response => {
        thisForm.querySelector('.loading').classList.add('d-none');
        
        if (response.ok) {
          thisForm.querySelector('.sent-message').classList.remove('d-none');
          thisForm.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        thisForm.querySelector('.loading').classList.add('d-none');
        thisForm.querySelector('.error-message').innerHTML = 'Sorry, there was an error sending your message. Please try again.';
        thisForm.querySelector('.error-message').classList.remove('d-none');
        console.error('Error:', error);
      });
    });
  });
})();