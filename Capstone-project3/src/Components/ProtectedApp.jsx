import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import supabase from '../supabase'; // Import the Supabase client instance

export default function ProtectedApp({ component: Component, ...rest }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user object from Supabase when the component mounts
    const fetchUser = async () => {
      const currentUser = supabase.auth.user();
      setUser(currentUser);
    };
    fetchUser();
  }, []); // The empty dependency array ensures that this effect runs only once

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}


















