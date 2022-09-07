import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";

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

    const [password, setPassword] = useState(null)
    const [badpassword, setBadPassword] = useState(false)

    const [isPompey, setIsPompey] = useState(false);

    const [loggedIn, setLoggedIn] = useState(false);
    

    //lets you add a song
    const showSongAdd = (e) => {
        e.preventDefault()
        setSongAdd(!songAdd)
        setPompeyShowAdd(false)
    }

    //lets you add a show
    const showPompeyShowAdd = (e) => {
        e.preventDefault()
        setPompeyShowAdd(!pompeyShowAdd)
        setSongAdd(false)
    }



    const checkPompey = (e) => {
        // e.preventDefault()

        const loggedIn = true
        
        if (password === "yesiampompey")
        {
        fetch("/api/login", {
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({loggedIn})
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
            // setIsPompey(true)
        })
        .catch((error) => {
            console.error("Error", error);
        });
    }}

    const logOut = (e) => {
        // e.preventDefault()

        const loggedOut = false


            fetch("/api/login", {
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({loggedOut})
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);

            })
            .catch((error) => {
                console.error("Error", error);
            });
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
        
        fetch(`/api/get-login`)
        .then((res) => res.json())
        .then((data) => {
            setIsPompey(data.data[0].loggedIn)
            console.log(data.data[0].loggedIn)
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
                
                {badpassword &&
                <>
                <NavigationLink to={"/"}>
                <div>i don't think you're pompey, do you want to go back to the homepage?</div>
                </NavigationLink>
                </>
                }
            </Container>
}
        {isPompey && 
        <>
            <Welcome>WELCOME POMPEY!</Welcome>
            {/* add */}
        <form onSubmit={logOut}>
        <input type="submit" value={"logout?"}/>
        </form>
        <form onSubmit={showSongAdd}>
        <input type="submit" value={"add song?"}/>
        </form>
        {songAdd &&
        <SongAdder />
        }
        {/* add show */}
        <form onSubmit={showPompeyShowAdd}>
        <input type="submit" value={"add show?"}/>
        </form>
        {pompeyShowAdd &&
        <ShowAdder />
        }   
        <ListWrapper>
        <SongList>
            <ListTitle>Songs</ListTitle>
            {/* show song list */}
        {songs &&
        songs.map((song) => {
            return(
                <>
                <div>{song.song}</div>
                </>
            )
        })}
        </SongList>
        <CommentList>
        {songs && comments &&
        <>
        <ListTitle>Comments</ListTitle>
        {/* shows all comments along with date of show */}
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
        {/* displays all shows as a leader */}
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
        {/* displays all shows as a hired musician */}
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

const NavigationLink = styled(NavLink)`
text-decoration: none;
color:black;

`

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
max-width: 100%;

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



