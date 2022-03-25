import "./App.css";
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import PersonPage from './pages/PersonPage';
import TeamPage from './pages/TeamPage';
import PostPage from './pages/PostPage';
import HomePage from './pages/HomePage.js'
import Layout from './components/Layout.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='person' element={<PersonPage />} />
          <Route path='team' element={<TeamPage />} />
          <Route path='post' element={<PostPage />} />
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
