import React from "react";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import Header from "./components/Header";
import HomeRoutes from "./components/HomeRoutes";
import Menu from "./components/Menu/DesktopMenu";

/**
 * Entrypoint for a logged in user
 * @constructor
 */
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
  background-color: ${props => props.theme.palette.info.light};
`

const Page = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  flex-flow: column;
  margin: 0;
  background-color: ${props => props.theme.palette.primary.light};
`
