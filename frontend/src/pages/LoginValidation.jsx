function LoginValidation(values)
 {
   // const errors = {};
   let errors = {};
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //last is 2 ch or more
 //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; whitespace nd @

 //if (values.name==="") {
 // errors.name = 'Name is required';
//}

const usernameRegex = /^[a-zA-Z]{4,20}$/;
if (values.name === "") {
  errors.name = 'Username is required';
} else if (!usernameRegex.test(values.name)) {
  errors.name = 'Invalid username format (4-20 characters)';
}


    if (values.email==="") {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'Invalid email format';
    }
    //else{
     //   errors.email=""
   // }
  
    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

//The password must contain at least one letter, one number, and one special character.
  //  const password_pattern= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
//^(?=.*\d): Ensures at least one digit (0-9) is present.
//(?=.*[a-z]): Ensures at least one lowercase letter is present.
//(?=.*[A-Z]): Ensures at least one uppercase letter is present.
//[a-zA-Z0-9]: Matches one alphanumeric character.
//(8,): This part seems to be a mistake. It's supposed to specify the minimum length, 
// but the syntax is incorrect. It should be written as {8,} to indicate "at least 8 character

    if (values.password==="") {
      errors.password = 'Password is required';
    } else if (!passwordRegex.test(values.password)) {
      errors.password = 'Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character';
    }
    //else{
     //   errors.password=""
    //}
  
    return errors;
  };
  
export default LoginValidation;