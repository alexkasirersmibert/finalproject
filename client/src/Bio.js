import styled from "styled-components"
import bg from "./images/bg.jpg"

const Bio = ({pompey}) => {


    return(
    <>
    <Wrapper>
    {pompey ? 
    <Words>
    writes songs plainly and honestly about nothing and everything.
    </Words>
    :
    <Words>
    makes sounds to make your music sound better.
    </Words>
    }
    </Wrapper>
    </>
    )
}

export default Bio

const Words = styled.p`
display:flex; 
justify-content: center;
align-items: center;
/* padding: 30px; */
flex-direction: column;

position:relative;
/* top:-475px; */
/* border:1px black solid; */
font-family: 'Baloo Tamma 2', cursive;
color:lightcyan;
/* box-shadow: 3px 5px rgba(128, 128, 128, 0.44); */
/* border:1px rgba(128, 128, 128, 0.44) solid; */
border-radius: 5px;
text-shadow: 2.5px 1.5px rgba(128, 128, 128, 0.44);
font-size:24px;
`
const Wrapper = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
width:30%;
gap:24px;
text-align: right;
/* border: 1px black solid; */
/* position:relative; */
/* top:-380px; */
`