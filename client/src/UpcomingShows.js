import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"


const UpcomingShows = ({showDates, pompey}) => {

    const [shows, setShows] = useState(null)


    //returns show data based on which side of the site you're on (leader vs sideman)
    useEffect(() => {
        fetch(`/api/${showDates}`)
        .then((res) => res.json())
        .then((data) => {
            setShows(data.data.shows); 

        });
        
    }, [showDates])



    return(
        
        <Wrapper>
        
        {shows &&
        //returns each show
            shows.map((show) => {
                return(
                    <>
                    <Show>
                    <Info>{show.details}</Info>
                    <Date>{show.date}</Date>
                    at
                    <Venue>{show.venue}</Venue>
                    {pompey && 
                    <NavigationLink to={`/requestsong/${show._id}`}>request a song</NavigationLink>
                    }
                    </Show>
                    </>
                )
            })
        }
        </Wrapper>
    )
}

export default UpcomingShows

const Wrapper = styled.div`
display:flex;
flex-direction: column;

`

const NavigationLink = styled(NavLink)`
text-decoration:none;
color:black;
border:1px gray solid;
display:flex;
flex-direction: row;
align-items: center;
justify-content: center;
padding:3px;
background-color: aliceblue;
border-radius:5px;
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
align-items: center;
border:2px grey solid;
border-radius:5px;
box-shadow:2.5px 1.5px rgba(128, 128, 128, 0.44);
padding:16px;
text-align: center;
margin: 15px;
/* gap:20px; */
`