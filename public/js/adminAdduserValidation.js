
function validate() {

   // Input feilds
   const name = document.getElementById('name')
   const email = document.getElementById('email')
   const password = document.getElementById('password')
   const mobile = document.getElementById('mobile')

   // Error feilds
   const nameError = document.getElementById('ErrorMessage')
   const emailError = document.getElementById('ErrorMessage')
   const passwordError = document.getElementById('ErrorMessage')
   const mobileError = document.getElementById('ErrorMessage');

   // Regex   
   const nameRegex = /^[A-Z]/;
   const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail+\.[a-zA-Z]{3}$/;
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
   const mobileRegex = /^[0-9]{10}$/;


   //name feild
   if (name.value.trim() === '') {
      nameError.innerHTML = 'Name is required'
      setTimeout(() => {
         nameError.innerHTML = ''
      }, 5000)
      return false;
   }
   if(!nameRegex.test(name.value)){
      nameError.innerHTML = 'First letter should be capital'
      setTimeout(()=>{
         nameError.innerHTML = ''
      },5000)
      return false;
   }

   // email feild   
   if (email.value.trim() === '') {
      emailError.innerHTML = 'Email is required'
      setTimeout(() => {
         emailError.innerHTML = ''
      }, 5000)
      return false;
   }
   if (!emailRegex.test(email.value)) {
      emailError.innerHTML = "Please enter a valid email"
      setTimeout(() => {
         emailError.innerHTML = ''
      }, 5000);
      return false;
   }

   // password feild
   if (password.value.trim() === '') {
      passwordError.innerHTML = 'Password is required'
      setTimeout(() => {
         passwordError.innerHTML = ''
      }, 5000)
      return false;
   }
   if (!passwordRegex.test(password.value)) {
      passwordError.innerHTML = "Please enter a tight password"
      setTimeout(() => {
         passwordError.innerHTML = ''
      }, 5000);
      return false;
   }

   //mobile feild
   if (mobile.value.trim() === '') {
      mobileError.innerHTML = 'Mobile Number is required'
      setTimeout(() => {
         mobileError.innerHTML = ''
      }, 5000)
      return false;
   }

   if(!mobileRegex.test(mobile.value)){
      mobileError.innerHTML = 'Please enter a valid number'
      setTimeout(()=>{
         mobileError.innerHTML = ''
      },5000)
      return false;
   }
   return true;
}

