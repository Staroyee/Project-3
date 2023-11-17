import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PROFILE } from '../utils/mutations';

const UpdateProfileForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        variables: { username, email, password },
      });
      // Optionally, you can fetch the updated profile data and update the UI
    } catch (error) {
      console.error('Update failed:', error.message);
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      
      <button onClick={handleUpdate}>Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfileForm;