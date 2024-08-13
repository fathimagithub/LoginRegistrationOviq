import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginRegister from './LoginRegister';
import ProfilePage from './ProfilePage';
import PublicProfilePage from './PublicProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/public-profile/:id" element={<PublicProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;