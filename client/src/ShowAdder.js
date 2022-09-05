import { useState } from "react";
import styled from "styled-components";


const ShowAdder = () => {

    const [show, setShow] = useState(null)
    const [venue, setVenue] = useState(null)
    const [date, setDate] = useState(null)
    const [details, setDetails] = useState(null)
    const [showAdded, setShowAdded] = useState(false)

    const addPompeyShow = (e) => {
        e.preventDefault()


        const postShow = {venue: venue, date: date, details: details }
        
        fetch("/api/add-pompey-show", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(postShow)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:",data);

            setShow(postShow)
            setShowAdded(true)
        })
        .catch((error) => {
            console.error("Error", error);
        });
    };
    const addOtherShow = (e) => {

        e.preventDefault()


        const postShow = {venue: venue, date: date, details: details }

        fetch("/api/add-other-show", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(postShow)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:",data);

            setShow(postShow)
            setShowAdded(true)
        })
        .catch((error) => {
            console.error("Error", error);
        });
    };
    
    return (
        <>
        <Container onSubmit={addPompeyShow}>

                    <Inputs>
                        <div>add Pompey show?</div>
                            <input onChange={(e) => {setDate(e.target.value); setShowAdded(false)}} placeholder="date?" required />
                            <input onChange={(e) => {setDetails(e.target.value); setShowAdded(false)}} placeholder="details?" required />
                            <input onChange={(e) => {setVenue(e.target.value); setShowAdded(false)}} placeholder="venue?" required />
                            <input type="submit" value={"submit"}/>
                    </Inputs>
                    {showAdded &&
                    <div>show added</div>
                    }

        </Container>
        <Container onSubmit={addOtherShow}>

                    <Inputs>
                        <div>add other show?</div>
                            <input onChange={(e) => {setDate(e.target.value); setShowAdded(false)}} placeholder="date?" required />
                            <input onChange={(e) => {setDetails(e.target.value); setShowAdded(false)}} placeholder="details?" required />
                            <input onChange={(e) => {setVenue(e.target.value); setShowAdded(false)}} placeholder="venue?" required />
                            <input type="submit" value={"submit"}/>
                    </Inputs>
                    {showAdded &&
                    <div>show added</div>
                    }

        </Container>
        </>
    )
}

export default ShowAdder

const Inputs = styled.div`
`

const Container = styled.form`
display:flex;
flex-direction:column;
align-items: center;
gap:20px;

`