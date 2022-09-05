import header from "./images/header.png"
import styled from "styled-components";
import Bio from "./Bio";
import { NavLink } from "react-router-dom";

const Header = () => {

    return(
        <>
        <Container>
        <StyledHeader src={header}/>
        <NavigationLink to={"/"}>
        <StyledName>Pompey</StyledName>
        </NavigationLink>
        </Container>
        </>
    );
}

export default Header

const NavigationLink = styled(NavLink)`
text-decoration:none;
`

const Container = styled.div`
display:flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

const StyledHeader = styled.img`
/* width:100%; */
width:1400px;
max-width: 100%;
position:relative;
height:400px;
/* border-bottom:5px black solid; */
/* border: 1px black solid; */
border-top:none;
border-radius:5px;
`

const StyledName = styled.h1`
position:relative;
width:fit-content;
top:-170px;
font-family: 'Dokdo', cursive;
text-decoration: underline blanchedalmond 2px ;
font-size:174px;
padding:3px 5px;
color:white;
text-shadow: 3px 2px rgba(128, 128, 128, 0.44);
opacity:.9;

/* border-bottom: 3px white solid; */


`