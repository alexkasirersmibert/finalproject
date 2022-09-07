import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const CommentDisplay = () => {
    const [comments, setComments] = useState(null)
    const showId = useParams()

    useEffect(() => {
        fetch(`/api/get-comments`)
        .then((res) => res.json())
        .then((data) => {
            setComments(data.data)
        })

        
    }, [])

    return(
    <>
    {comments &&
        comments.map((post) => {
            if (post.showId === showId){
                return(
                    <>
                    <div>{post.name}</div>
                    <div>{post.comment}</div>
                    <div>{post.name}</div>
                    </>
                )}
        })
    }
    </>
    )
}

export default CommentDisplay
