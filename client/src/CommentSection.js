import { useState } from "react";

const CommentSection = () => {
    const [comment, setComment] = useState()

    const sendComment = () => {
        const postComment = {status: comment}
        fetch("/api/add-comment", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(postComment)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:",data);
        })
        .catch((error) => {
            console.error("Error", error);
        });
    };


    return(
        <>
        <input onChange={(e) => {setComment(e.target.value)}} placeholder="What's happening?"></input>
        <button type="submit" onClick={sendComment}>post</button>
        </>
    )
};

export default CommentSection