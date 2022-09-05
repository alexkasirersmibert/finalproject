import { useState, useEffect } from "react"
import styled from "styled-components"
import ShowAdder from "./ShowAdder"
import SongAdder from "./SongAdder"


const AdminPage = () => {
    const [songAdd, setSongAdd] = useState(false)
    const [pompeyShowAdd, setPompeyShowAdd] = useState(false)
    const [comments, setComments] = useState(null)
    const [songs, setSongs] = useState(null)
    const [pompeyShows, setPompeyShows] = useState(null)
    const [otherShows, setOtherShows] = useState(null)
    const [isPompey, setIsPompey] = useState(false)
    const [password, setPassword] = useState(null)
    

    const showSongAdd = (e) => {
        e.preventDefault()
        setSongAdd(!songAdd)
        setPompeyShowAdd(false)
    }
    const showPompeyShowAdd = (e) => {
        e.preventDefault()
        setPompeyShowAdd(!pompeyShowAdd)
        setSongAdd(false)
    }
    const checkPompey = (e) => {
        e.preventDefault()
        if (password === "yesiampompey")
        {setIsPompey(true)}

    }

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

        fetch(`/api/get-shows`)
        .then((res) => res.json())
        .then((data) => {
            setPompeyShows(data.data.shows); 
        });

        fetch(`/api/get-other-shows`)
        .then((res) => res.json())
        .then((data) => {
            setOtherShows(data.data.shows); 
        })
        
    }, [])
    return(

        <Wrapper>
            {!isPompey &&
            <Container onSubmit={checkPompey}>

                <Inputs>
                    <div>are you pompey?</div>
                        <input onChange={(e) => {setPassword(e.target.value)}} placeholder="answer" required />

                        <input type="submit" value={"submit"}/>
                </Inputs>

            </Container>
}
        {isPompey &&
        <>
            <Welcome>WELCOME POMPEY!</Welcome>
        <form onSubmit={showSongAdd}>
        <input type="submit" value={"add song?"}/>
        </form>
        {songAdd &&
        <SongAdder />
        }
        <form onSubmit={showPompeyShowAdd}>
        <input type="submit" value={"add show?"}/>
        </form>
        {pompeyShowAdd &&
        <ShowAdder />
        }   
        <ListWrapper>
        <SongList>
            <ListTitle>Songs</ListTitle>
        {songs &&
        songs.map((song) => {
            return(
                <div>{song.song}</div>
            )
        })}
        </SongList>
        <CommentList>
        {songs && comments &&
        <>
        <ListTitle>Comments</ListTitle>
            {comments.map((post) => {
                
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
                    {pompeyShows.map((show) => {
                        console.log(show._id)
                        console.log(post.showId)
                        if(show._id === post.showId) {
                            return(
                                <>
                                <Category>date:</Category>
                                <ShowDate>{show.date}</ShowDate>
                                </>
                            )
                        }
                    })}
                    </ShortWords>
                    
                    <Comment>{post.comment}</Comment>
                    
                    </CommentWrapper>
                    </>
                )
            })}
        </>
        }
        </CommentList>
        <Shows>
        <ListTitle>Pompey Shows</ListTitle>
        {pompeyShows &&
            pompeyShows.map((show) => {
                return(
                    <>
                    <Show>
                    <Info>{show.details}</Info>
                    <Date>{show.date}</Date>
                    at
                    <Venue>{show.venue}</Venue>

                    </Show>
                    </>
                )
            })
        }
        </Shows>
        <Shows>
        <ListTitle>other Shows</ListTitle>
        {otherShows &&
            otherShows.map((show) => {
                return(
                    <>
                    <Show>
                    <Info>{show.details}</Info>
                    <Date>{show.date}</Date>
                    at
                    <Venue>{show.venue}</Venue>

                    </Show>
                    </>
                )
            })
        }
        </Shows>
        </ListWrapper>
        </>}
        </Wrapper>
    )
}

export default AdminPage

const Container = styled.form`
display:flex;
flex-direction:column;
align-items: center;
gap:20px;

`

const Inputs = styled.div`
`

const ShowDate = styled.div`
`

const Welcome = styled.h1`
position:relative;
top:-64px;
font-size: xx-large;
`
const Shows = styled.div`
display:flex;
flex-direction:column;
align-items: center;
/* max-width:25%; */
`

const Venue = styled.div`
`
const Date = styled.div`
`
const Info = styled.div`
`
const Show = styled.div`
display:flex;
flex-direction:column;
gap:3px;
padding:20px;
margin:15px;
border:1px gray solid;
border-radius: 5px;
box-shadow: 2px 2px rgba(128, 128, 128, 0.44);
text-align: center;

/* gap:20px; */
`

const Wrapper = styled.div`
display:flex;
flex-direction: column;
align-items: center;
gap:20px;
position:relative;
top:-100px;

`

const ListWrapper = styled.div`
display:flex;
flex-direction: row;
align-items: flex-start;
justify-content:space-evenly;
border-top:1px black solid;
width:100%;
padding:20px 0;
`

const CommentList = styled.div`
/* max-width: 25%; */
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const ListTitle = styled.div`
border-bottom:1px grey solid;
display:flex;
justify-content: center;


`

const SongList = styled.div`
display:flex;
flex-direction: column;
align-items: center;
/* max-width:25%; */
`

const Comment = styled.div`
font-family: 'Baloo Tamma 2', cursive;
`

const Category = styled.div`
/* border-bottom:1px black solid; */
font-weight:bold;
font-family: 'Baloo Tamma 2', cursive;
font-size: large;
text-shadow: 2px 2px rgba(128, 128, 128, 0.44);
width:fit-content;

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



