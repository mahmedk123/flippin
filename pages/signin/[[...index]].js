import { SignIn } from '@clerk/nextjs';
import React from 'react';

const SignInPage = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <SignIn 
        path="/signin" // Update the path to "/signin"
        routing="path" 
        signUpUrl={null} 
        appearance={{
          elements: {
            formFieldAction: 'hidden',
            footerActionLink: 'hidden',
            socialButtonsBlockButton: 'hidden'
          },
        }}
      />
    </div>
  );
};

export default SignInPage;
