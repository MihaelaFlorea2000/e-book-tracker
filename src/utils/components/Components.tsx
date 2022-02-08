import styled from "@emotion/styled";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export class CircularLoading extends React.Component<{}> {
    public render(): React.ReactNode {
        return (
            <LoadingContainer>
                <CircularProgress color="primary" size={50} thickness={8}/>
            </LoadingContainer>
        );
    }
}

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`
