import React from "react";
import { observer } from "mobx-react";
import MenuBar from "./MenuBar";
import styled from "@emotion/styled";
import { device } from "../../../../config/config";

const DesktopMenu = () => {
    return (
        <Container>
            <MenuBar />
        </Container>
    )
}

export default observer(DesktopMenu);

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 20px;

  @media only screen and ${device.tablet} {
    display: none;
  }
`


