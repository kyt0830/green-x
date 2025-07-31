import Router from './Router';
import { useState } from "react";
import { authService } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";

console.log(authService);
function App() {


  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // const uid = user.uid;
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setInit(true);
  });

  return (
    <div className="container">
      <h1>Green - X</h1>
      {
        init ? <Router isLoggedIn={isLoggedIn} /> : '초기화 중...'
      }

    </div>
  );
}

export default App;
