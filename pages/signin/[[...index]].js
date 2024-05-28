// src/pages/signin/[[...index]].js
import { SignIn } from '@clerk/nextjs';
import React from 'react';

const SignInPage = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <SignIn 
        path="/signin" 
        routing="path" 
        signUpUrl={null} 
        appearance={{
          elements: {
            // Target all potential elements that might contain the sign-up button
            formFieldAction: 'hidden',           // Hide specific actions (link, button) in form fields
            footerActionLink: 'hidden',          // Hide action link in the footer
            socialButtonsBlockButton: 'hidden'   // Hide social sign-up buttons (if any)
          },
        }}
      />
    </div>
  );
};

export default SignInPage;
