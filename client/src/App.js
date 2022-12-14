import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import bg from "./images/bg.jpg"
import SongRequestor from "./SongRequestor";
import HomePage from "./HomePage";
import AdminPage from "./AdminPage";

const App = () => {
  // const [loading, setLoading] = useState(false);
  const [show, setShow] = useState("");
  const [pompey, setPompey] = useState(true)


  // const showClick = (e) => {
  //     setShow(e.target.value)
  // }

  return (
    
    <BrowserRouter>

      <GlobalStyles />
      <Box style={{ backgroundImage: `url(${bg})`, backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no repeat',
        width: '100%',
        height: '500vh'}}>

      <Header />
      <AppContainer>
      </AppContainer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/requestsong/:showid" element={<SongRequestor />} />
          <Route path="/adminpage" element={<AdminPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

const AppContainer = styled.div`
display:flex;
flex-direction: column;
`;

const Box = styled.div`
`
export default App;

