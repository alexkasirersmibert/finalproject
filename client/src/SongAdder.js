import { useState } from "react";
import styled from "styled-components";


const SongAdder = () => {

    const [song, setSong] = useState(null)
    const [songAdded, setSongAdded] = useState(false)

    const addSong = (e) => {
        // e.preventDefault()


        const postSong = {song: song, }
        
        fetch("/api/add-song", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(postSong)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:",data);

            setSong(postSong)
            setSongAdded(true)
        })
        .catch((error) => {
            console.error("Error", error);
        });
    };
    return (
        <>
        <Container onSubmit={addSong}>

                    <Inputs>
                        <div>add song?</div>
                            <input onChange={(e) => {setSong(e.target.value); setSongAdded(false)}} placeholder="song name?" required />

                            <input type="submit" value={"submit"}/>
                    </Inputs>
                    {songAdded &&
                    <div>song added</div>
                    }

        </Container>
        </>
    )
}

export default SongAdder

const Inputs = styled.div`
`

const Container = styled.form`
display:flex;
flex-direction:column;
align-items: center;
gap:20px;

`