import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import ListGroup from 'react-bootstrap/ListGroup';
import Comment from '../components/Comment';


const Home = () => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    useEffect(() => {
        getComments();
    }, []);
    const getComments = async () => {
        const querySnapshot = await getDocs(collection(db, "comments"));
        const commentsArray = querySnapshot.docs.map((item) => ({
            ...item.data(),
            id: item.id
        }))
        setComments(commentsArray);
        // console.log(commentsArray);
        // querySnapshot.forEach((itme) => {
        // doc.data() is never undefined for query doc snapshots
        //   console.log(itme.data());
        // });
    }
    const onChange = (evt) => {
        evt.preventDefault();
        console.log(evt.target.value);
        setComment(evt.target.value);
    }
    const onSubmit = async (evt) => {
        evt.preventDefault();
        console.log(evt.target.comment.value);

        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "comments"), {
            comment: comment,
            date: serverTimestamp()
        });
        setComment('');
        console.log(" 새 글의 아이디 ", docRef.id);
    }
    return (
        <>
            <h2>
                Home
            </h2>

            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" name="comment" value={comment} onChange={onChange} rows={3} />
                </Form.Group>
                <Button type="submit" variant="primary" >입력</Button>
            </Form>

            <hr />
            <ListGroup>

                {
                    comments.map(item => <Comment key={item.id} commentObj={item}></Comment>)
                }
              
              

            </ListGroup>
        </>

    )
}

export default Home;