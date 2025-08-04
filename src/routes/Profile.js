import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";












import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from '../firebase';
import Comment from '../components/Comment';



const Profile = () => {

  const auth = getAuth();








  let navigate = useNavigate();
  const user = auth.currentUser
  const defaultProfileURL = `${process.env.PUBLIC_URL}/usericon.svg`;
  const [profile, setProfile] = useState(defaultProfileURL)
  const [comments, setComments] = useState([]);


  console.log(user);


  const getComments = async () => {

    const q = query(collection(db, "comments"), where("uid", "==", user.uid), orderBy('date', "desc"));
    const querySnapshot = await getDocs(q);
    const commentsArray = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
    setComments(commentsArray);

  };







  useEffect(() => {
    getComments();
    console.log(comments);
  }, []);







  const onLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      alert('로그아웃 되었습니다');
      navigate('/');
    }).catch((error) => {
      // An error happened.
    });
  }

  const updateLogo = async (evt) => {
    const file = evt.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, `profile/${user.uid}`);
    const snapshot = await uploadBytes(storageRef, file);
    const profileURL = await getDownloadURL(snapshot.ref); // 

    console.log(profileURL);
    setProfile(profileURL);
    updateProfile(user, {
      photoURL: profileURL
    });

    console.log(auth);
  }
  useEffect(() => {
    (user.photoURL !== null && user.photoURL.includes('firebase')) && setProfile(user.photoURL);
  }, []);




  return (
    <>
      <h2>Profile</h2>
      <div className='profile'>
        <div className='info'>
          <img src={`${profile}`} alt="프로필 이미지" />
          <h3>{user.displayName}</h3>
        </div>
        <input className='hidden' type="file" accept="image/*" name='profile' id="profile" onChange={updateLogo} />
        <label htmlFor="profile" className='btn btn-secondary btn-sm'>Update Profile</label>
      </div>
      <Button variant="primary" onClick={onLogout}>Logout</Button>
      <hr />
      <h3>My Momment List</h3>

      <ListGroup>
        {
          comments.map(c =>
            <Comment key={c.id} commentObj={c} isOwner={true}></Comment>
          )
        }

      </ListGroup>

    </>
  )
}
export default Profile;