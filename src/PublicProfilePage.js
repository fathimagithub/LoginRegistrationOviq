import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PublicProfilePage = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  const fetchPublicProfile = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/public-profile/${id}`);
      //const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/public-profile/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching public profile:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchPublicProfile();
  }, [fetchPublicProfile]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='content justify-content-center align-items-center d-flex shadow-lg' id='content'>
      <div className='col-md-6 d-flex justify-content-center'>
        <div>
          <div className='header-text mb-4'>
            <h1>Public Profile</h1>
          </div>
          <div className='mb-3'>
            <h2>{user.name}</h2>
          </div>
          {user.profileImage && (
            <div className='mb-3'>
              <img src={`http://localhost:8081/${user.profileImage}`} alt="Profile" style={{ maxWidth: '200px' }} />
            </div>
          )}
          {user.dateOfBirth && (
            <div className='mb-3'>
              <p>Date of Birth: {new Date(user.dateOfBirth).toLocaleDateString()}</p>
            </div>
          )}
          {user.phoneNumber && (
            <div className='mb-3'>
              <p>Phone Number: {user.phoneNumber}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;