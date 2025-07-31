import Button from 'react-bootstrap/Button';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router";

const Profile = () => {

    const auth = getAuth();
    let navigate = useNavigate();
    const onLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            alert('로그아웃 완료!');
            navigate('/');
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <>
            <h2>
                Profile
            </h2>
            <Button variant="primary" onClick={onLogout}>Logout</Button>
        </>

    )
}

export default Profile;