import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const signOut = useSignOut();
    const navigate = useNavigate();

    function handleLogout() {
        signOut();
        navigate('/login')
    }

    return (
        <>
            <div>
                <h1>Home</h1>
                <button onClick={handleLogout}>logout</button>
            </div>
        </>
    )
}

export default Home;