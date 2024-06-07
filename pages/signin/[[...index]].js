// pages/signIn/[...index].js

import { SignIn } from '@clerk/nextjs';
import React from 'react';

const SignInPage = () => {
  return (
    <div className="signInPageContainer">
      <h1>Welcome Back!</h1>
      <p>Please sign in to continue.</p>
      <SignIn 
        
        appearance={{
          elements: {
            formFieldAction: 'hidden',
            footerActionLink: 'hidden',
            socialButtonsBlockButton: 'hidden'
          },
        }}
      />
      <style jsx>{`
        .signInPageContainer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: black;
          color: white;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1rem;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

export default SignInPage;
