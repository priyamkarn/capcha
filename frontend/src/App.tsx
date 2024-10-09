import { Turnstile } from '@marsidev/react-turnstile';
import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const handleResetPassword = async () => {
    try {
      const response = await axios.post("http://localhost:3000/reset-password", {
        email: "priyam@gmail.com",
        otp: otp,
        newPassword: newPassword, // Include new password
        token: token,
      });
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <>
      <input 
        placeholder='OTP'
        value={otp}
        onChange={(e) => setOtp(e.target.value)} // Update OTP state
      />
      <input 
        type='password' 
        placeholder='New password'
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)} // Update new password state
      />

      <Turnstile 
        onSuccess={(token) => setToken(token)} 
        siteKey='0x4AAAAAAAxEZtY2MbuMHwrc' 
      />

      <button onClick={handleResetPassword}>Update password</button>
    </>
  );
}

export default App;
