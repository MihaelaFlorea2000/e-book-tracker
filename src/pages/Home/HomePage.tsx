import styled from "@emotion/styled";
import React from "react";
import { theme } from "../../utils/style/styleConfig";
import Header from "./components/Header";
import HomeRoutes from "./components/HomeRoutes";
import Menu from "./components/Menu";
import {observer} from "mobx-react";


const HomePage = () => {

    return (
        <Container>
            <Menu />
            <Page>
                <Header />
                <HomeRoutes />
            </Page>
        </Container>
    )
}

export default observer(HomePage);

const Container = styled.div`
  display: flex;
  
`

const Page = styled.div`
  display: flex;
  width: 100vw;
  flex-flow: column;
  margin: 0;
  background-color: ${theme.palette.primary.light};
`
