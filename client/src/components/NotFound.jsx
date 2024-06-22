import React from 'react';
import { Link } from 'react-router-dom';

/* 
  NotFound component description:
  This component is rendered when a user tries to access a route that does not exist.
  It displays a message that the page is not found and provides a link to the homepage.
*/

export default function NotFound(){
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go to Homepage</Link>
    </div>
  );
};
