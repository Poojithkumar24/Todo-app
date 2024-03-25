import { useState } from 'react';
import { useRouter } from 'next/router';
import { register } from '../utils/api';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const userData = { username, password };
      const data = await register(userData);
      localStorage.setItem('token', data.token);
      router.push('/tasks');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default SignupForm;
