import React from "react";
import styled from "@emotion/styled";
import CircularProgress from "@mui/material/CircularProgress";

/**
 * Component displayed while the page is loading
 */
export const CircularLoading = () => {
    return (
        <LoadingContainer>
            <CircularProgress color="primary" size={50} thickness={8}/>
        </LoadingContainer>
    );
}

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`
