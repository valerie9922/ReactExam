import React, {useState} from 'react';

const Comment = () => {
    const [commentName, setCommentName] = useState("");
    const [commentInfo, setCommentInfo] = useState("");
    const [comment, setComment] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const content = `${commentName}      said        ${commentInfo}`;
        setComment([...comment, content]);
        setCommentName("");
        setCommentInfo("");
    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" name="name" width="30" value={commentName}
                       onChange={e => setCommentName(e.target.value)} placeholder="Name"/>
                <br/>comment:
                <textarea name="content" rows={10} cols={30} value={commentInfo}
                          onChange={e => setCommentInfo(e.target.value)} placeholder="write some"/>
                <button type="submit" value="Add">Add Comment</button>
            </form>

            <div>
                <ul>
                    {comment.map((data, index) => {
                        return <li><b>{data}</b></li>
                    })}
                </ul>
            </div>
        </div>);
};

export default Comment;
