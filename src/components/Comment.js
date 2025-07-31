import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';



const Comment = ({ commentObj }) => {
    return (
        <>
            <ListGroup.Item>{commentObj.comment}</ListGroup.Item>
        </>
    )
}

export default Comment;