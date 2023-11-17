function validate() {
   // Input fields
   const name = document.getElementById('name');
   const email = document.getElementById('email');
   const mobile = document.getElementById('mobile');

   // Error fields (separate elements for each field)
   const nameError = document.getElementById('nameError');
   const emailError = document.getElementById('emailError');
   const mobileError = document.getElementById('mobileError');

   // Regex patterns
   const nameRegex = /^[A-Z]/;
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   const mobileRegex = /^[0-9]{10}$/;

   // Function to clear error messages
   function clearErrorMessage(element) {
      element.innerHTML = '';
   }

   // Function to show an error message for a field
   function showErrorMessage(element, message) {
      element.innerHTML = message;
      setTimeout(() => {
         clearErrorMessage(element);
      }, 5000);
   }

   // Name field
   if (name.value.trim() === '') {
      showErrorMessage(nameError, 'Name is required');
      return false;
   }
   if (!nameRegex.test(name.value)) {
      showErrorMessage(nameError, 'First letter should be capitalized');
      return false;
   }

   // Email field
   if (email.value.trim() === '') {
      showErrorMessage(emailError, '...... Email is required');
      return false;
   }
   if (!emailRegex.test(email.value)) {
      showErrorMessage(emailError, 'Please enter a valid email');
      return false;
   }

   // Mobile field
   if (mobile.value.trim() === '') {
      showErrorMessage(mobileError, 'Mobile number is required');
      return false;
   }
   if (!mobileRegex.test(mobile.value)) {
      showErrorMessage(mobileError, 'Please enter a valid 10-digit mobile number');
      return false;
   }

   return true;
}
