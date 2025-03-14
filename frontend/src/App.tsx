import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import './global/_core.scss'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/queryClient'
import About from './pages/About/About'
import UsersPlaylist from './pages/Users/Playlist/UsersPlaylist'
import RouteProtector from './utils/RouteProtector'
import PlaylistDetails from './pages/PlaylistDetails/PlaylistDetails'
import PlaylistsByType from './pages/Users/Playlist/PlaylistByType/PlaylistByType'
import UserProfile from './pages/Users/Profile/UserProfile'
import UserEdit from './pages/Users/Edit/UserEdit'
import CreatePlaylist from './pages/CreatePlaylist/CreatePlaylist'
import EditPlaylist from './pages/EditPlaylist/EditPlaylist'
import Analytics from './pages/Analytics/Analytics'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<RouteProtector/>}>
            <Route path='' element={<Home/>}/>
            <Route path="about" element={<About />} />
            <Route path='profile' element={<UserProfile />} />
            <Route path='profile/edit' element={<UserEdit />} />
            <Route path="users/playlists" element={<UsersPlaylist />}/>
            <Route path="users/playlists/created" element={<PlaylistsByType />}/>
            <Route path="users/playlists/liked" element={<PlaylistsByType />}/>
            <Route path='playlist/:id' element={<PlaylistDetails />} />
            <Route path='playlist/create' element={<CreatePlaylist />} />
            <Route path='playlist/edit/:id' element={<EditPlaylist />} />
            <Route path='analytics' element={<Analytics />} />
            <Route path='playlist/:id' element={<PlaylistDetails />} />
            <Route path='profile/:id' element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;
