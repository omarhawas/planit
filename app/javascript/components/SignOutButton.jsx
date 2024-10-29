import React from 'react';

const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      const response = await fetch('/users/sign_out', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
        },
        credentials: 'same-origin',
      });
      if (response.ok) {
        window.location.href = '/'; // Redirect to home or login page
      } else {
        console.error('Sign out failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOutButton;
