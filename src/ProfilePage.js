import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const { id } = useParams();

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/user/${id}`);
      //const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/${id}`);
      setUser(response.data);
      setName(response.data.name);
      setDateOfBirth(response.data.dateOfBirth ? new Date(response.data.dateOfBirth).toISOString().split('T')[0] : '');
      setPhoneNumber(response.data.phoneNumber || '');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('phoneNumber', phoneNumber);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      
      const response = await axios.put(`http://localhost:8081/api/user/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUser(response.data);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='content justify-content-center align-items-center d-flex shadow-lg' id='content'>
      <div className='col-md-6 d-flex justify-content-center'>
        <form onSubmit={handleSubmit}>
          <div className='header-text mb-4'>
            <h1>Edit Profile</h1>
          </div>
          <div className='input-group mb-3'>
            <input type="text" className="form-control form-control-lg bg-light fs-6" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          </div>
          <div className='input-group mb-3'>
            <input type="date" className="form-control form-control-lg bg-light fs-6" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
          </div>
          <div className='input-group mb-3'>
            <input type="tel" className="form-control form-control-lg bg-light fs-6" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" />
          </div>
          <div className='input-group mb-3'>
            <input type="file" className="form-control form-control-lg bg-light fs-6" id="profileImage" onChange={handleImageChange} />
          </div>
          <div className='input-group mb-3 justify-content-center'>
            <button type="submit" className='btn border-white text-white w-50 fs-6'>Update Profile</button>
          </div>
        </form>
      </div>
      <div className='col-md-6 right-box'>
        {user.profileImage && (
          <div className="mb-3">
            <h3>Current Profile Image</h3>
            <img src={`http://localhost:8081/${user.profileImage}`} alt="Profile" style={{ maxWidth: '200px' }} />
          </div>
        )}
        {user.qrCode && (
          <div className="mb-3">
            <h3>Your QR Code</h3>
            <QRCodeSVG value={`http://localhost:3000/public-profile/${id}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;