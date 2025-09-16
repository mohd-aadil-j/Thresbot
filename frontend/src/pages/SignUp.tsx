import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
// ...existing imports and styles...

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call backend API to sign up
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="glass-card p-8 w-full max-w-md mx-auto">
        <Typography variant="h4" gutterBottom>Sign Up</Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="floating-input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="floating-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-neon w-full mt-2">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
