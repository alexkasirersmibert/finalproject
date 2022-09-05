import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"
import CommentDisplay from "./CommentDisplay";

const SongRequestor = () => {
    // console.log(handleChange)

    //replace with database containing array of songs
    const [songs, setSongs] = useState(null)
    const [comment, setComment] = useState(null)
    const [name, setName] = useState(null)
    const [requestedSong, setRequestedSong] = useState(null)
    const [songRequested, setSongRequested] = useState(false)
    const [comments, setComments] = useState(null)
    const {showid} = useParams()

    useEffect(() => {
        fetch(`/api/get-songs`)
        .then((res) => res.json())
        .then((data) => {
            setSongs(data.data.songs);
        
        fetch(`/api/get-comments`)
        .then((res) => res.json())
        .then((data) => {
            setComments(data.data)
            // console.log(data.data)
        })
        });
        
    }, [songRequested])

    const handleChange = (e) => {
        setRequestedSong(e.target.value);
    }


    const sendComment = (e) => {
        e.preventDefault()

        const postComment = {name: name, comment: comment, song: requestedSong, showId: showid}
        
        fetch("/api/add-request/:showid", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(postComment)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:",data);
            setSongRequested(true)
            setComment(postComment)
        })
        .catch((error) => {
            console.error("Error", error);
        });
    };


    // console.log(comments)
    return (
        <>
        <Wrapper>
        {songs && !songRequested &&
            <Container onSubmit={sendComment}>
            <Select onChange={handleChange} required>
                <option value="">request a song...</option>
                    {songs.map((song) => {
                        return(
                        <option key={song.song} value={song.song}>{song.song}</option>
                        )
                })}

            </Select>
                <Inputs>
                        <input onChange={(e) => {setName(e.target.value)}} placeholder="name?" required />
                        <input onChange={(e) => {setComment(e.target.value)}} placeholder="thoughts?" required />
                        <input type="submit" value={"submit"}/>
                </Inputs>
            </Container>
        }

        {songs && songRequested && comments &&
        <>
        <div>
            {comments.map((post) => {
                console.log(post.showId === showid)
                console.log(showid)
                if (post.showId === showid){
                return(
                    <>
                    <CommentWrapper>
                    <ShortWords>
                    <Name>
                        <Category>name:</Category>
                        <div>{post.name}</div>
                    </Name>
                    <Request>
                        <Category>request:</Category>
                        <div>{post.song}</div>
                    </Request>
                    </ShortWords>
                    <Comment>{post.comment}</Comment>
                    </CommentWrapper>
                    </>
                )}
            })}
        </div>
        </>
        }
                </Wrapper>
    </>
    
    )
    
};

export default SongRequestor

const Comment = styled.div`
font-family: 'Baloo Tamma 2', cursive;
`

const Category = styled.div`
/* border-bottom:1px black solid; */
font-weight:bold;
font-family: 'Baloo Tamma 2', cursive;
font-size: large;
text-shadow: 2px 2px rgba(128, 128, 128, 0.44);

`
const Name = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
gap:8px;
`

const Request = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
gap:8px;
`

const ShortWords = styled.div`
display:flex;
gap:10px;
border-bottom:1px gray solid;
justify-content:space-between;



`

const Inputs = styled.div`
display:flex;
flex-direction:column;
gap:20px;`

const CommentWrapper = styled.div`
display:flex;
flex-direction:column;
gap:20px;
padding:20px;
margin:15px;
border:1px gray solid;
border-radius: 5px;
box-shadow: 2px 2px rgba(128, 128, 128, 0.44);
`

const Container = styled.form`
display:flex;
flex-direction:column;
align-items: center;
gap:20px;

`

const Select = styled.select`
    padding: 5px;
    margin-left: 25px;
    margin-top: 10px;
    border-radius: 3px;
    font-size: 18px;
    font-weight: bold;
    border: solid 3px black;
`
const Wrapper = styled.div`
display: flex;
flex-direction:row;
align-items: center;
justify-content: center;

`