import BandcampPlayer from "react-bandcamp"
import styled from "styled-components"
import { useEffect, useState } from "react"
import Bio from "./Bio"
import UpcomingShows from "./UpcomingShows"
import { NavLink } from "react-router-dom"


const HomePage = () => {

    const [pompey, setPompey] = useState(true)
    const [whichPompey, setWhichPompey] = useState("get-shows")
    const [loading, setLoading] = useState(false)
    const [bandcamp, setBandcamp] = useState(null)
    const [shows, setShows] = useState(null)

    const handleClick = () => {
        setPompey(!pompey)
        setWhichPompey("get-shows")
    }
    const handleOtherPompey = () => {
        setPompey(!pompey)
        setWhichPompey("get-other-shows")
    }

    useEffect(() => {
        fetch(`/api/get-bandcamp`)
        .then((res) => res.json())
        .then((data) => {
            setBandcamp(data.data); 
            setLoading(true);

            fetch("https://rest.bandsintown.com/artists/pompey/?app_id=7faceeefa4622640004a1eeef04021cd")
            .then((res) => res.json())
            .then((data) => {
                setShows(data)
            })

        });

    }, [])


    return(
        <>
        {bandcamp &&
        <Container>
        
        <Wrapper>
            {/* show my music/shows */}
        {pompey ? 
        <>
            <ToggleSwitch onClick={handleOtherPompey}>other pompey</ToggleSwitch>
            <NavigationLink to={"/adminpage"}>i am pompey</NavigationLink>

            <StyledBandcampPlayerRight>
                <Title>songs</Title>
                
                {bandcamp.map((item) => {
                    if (item.artist === "pompey" && item.category === "songs"){
                    return (
                        <>
                            <Player>
                                <BandcampPlayer album={item.album} size="large"  width="350px" height="440px"/>
                            </Player>
                        </>
                    )}
                })}
            </StyledBandcampPlayerRight>
            <Center>
            <Bio pompey={pompey}/>
            <UpcomingShows showDates={whichPompey} pompey={pompey}/>
            {/* link to bandsintown */}
            {shows &&
            <a href={`${shows.url}`} >visit bandsintown</a>
            
}
            </Center>
            <StyledBandcampPlayerLeft>
                <Title>sounds</Title>
                {bandcamp.map((item) => {
                    if (item.artist === "pompey" && item.category === "sounds"){
                    return (
                        <>
                            <Player>
                                <BandcampPlayer album={item.album} size="large"  width="350px" height="440px"/>
                            </Player>
                        </>
                    )}
                })}
            </StyledBandcampPlayerLeft>
            </>
        :
        // show artists I play with's music/shows
        <>
        <ToggleSwitch onClick={handleClick}>other pompey</ToggleSwitch>
        <StyledBandcampPlayerRight>
            <Title>Thanya Iyer</Title>
            {bandcamp.map((item) => {
                    if (item.artist === "thanya iyer"){
                    return (
                        <>
                            <Player>
                                <BandcampPlayer album={item.album} size="large"  width="350px" height="440px"/>
                            </Player>
                        </>
                    )}
                })}
        </StyledBandcampPlayerRight>
        <Center>
        <Bio pompey={pompey}/>
        <UpcomingShows  showDates={whichPompey} pompey={pompey}/>
        </Center>
        <StyledBandcampPlayerLeft>
            <Title>More!</Title>
            {bandcamp.map((item) => {
                    if (item.artist !== "pompey" && item.artist !== "thanya iyer"){
                    return (
                        <>
                            <Player>
                                <BandcampPlayer album={item.album} size="large"  width="350px" height="440px"/>
                            </Player>
                        </>
                    )}
                })}
        </StyledBandcampPlayerLeft>
        </>
        }
        </Wrapper>
        </Container>}
        </>

    )
}

export default HomePage

const NavigationLink = styled(NavLink)`
position: fixed;
bottom:0px;
right:1000px;
font-size:24px;
font-family: 'Baloo Tamma 2', cursive;
color:lightcyan;
background-color: lightcoral;
border-radius: 5px;
text-shadow: 2.5px 1.5px rgba(128, 128, 128, 0.44);
border:none;
opacity:70%;
text-decoration: none;
padding:10px;
`

const ToggleSwitch = styled.button`
position:fixed;
bottom:0px;
left:1000px;
font-size:24px;
font-family: 'Baloo Tamma 2', cursive;
color:lightcyan;
background-color: lightcoral;
border-radius: 5px;
text-shadow: 2.5px 1.5px rgba(128, 128, 128, 0.44);
border:none;
opacity:70%;
`

const Center = styled.div`
display:flex;
flex-direction:column;
gap:200px;
align-items: center;
height:1100px;

`

const Words = styled.div`
display:flex;
justify-content: center;
align-items: center;
`

const Title = styled.div`
font-family: 'Monoton', cursive;
font-size:40px;
`

const Player = styled.div`
padding:16px 0;
`

const Container = styled.div`
display:flex;
align-items:center;
justify-content:center;`

const Wrapper = styled.div`
display:flex;
justify-content:space-between;
align-items: center;
flex-direction: row;
/* border:1px black solid; */
position:relative;
top:-160px;
width:1400px;


`

const StyledBandcampPlayerRight = styled.div`
/* border:1px black solid; */
display:flex;
justify-content: start;
align-items: center;
flex-direction: column;
width:1400px;
/* border:1px black solid; */
width:fit-content;
`
const StyledBandcampPlayerLeft = styled.div`
/* position:relative;
top:-952px; */
display:flex;
justify-content: start;
align-items: center;
flex-direction: column;
/* border:1px black solid; */
width:fit-content;
left:-200px;
`