/**
 * Styled components shared by the Edit Book and Upload Book forms
 */
import styled from "@emotion/styled";
import {device} from "../helpers/constants";
import {border} from "./themeConfig";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
`

export const FormContainer = styled.form`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 80vw;
  max-width: 80vw;

  @media only screen and ${device.tablet} {
    width: 85vw;
  }
`

export const FieldsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 25px;
  
  @media only screen and ${device.tablet} {
    flex-flow: column;
    align-items: center;
  }
`

export const LeftFieldsContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  gap: 20px;
`

export const CoverContainer = styled.div`
  background-color: ${props => props.theme.palette.info.light};;
  border-radius: ${border.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 21.5vw;
  height: calc(21.5vw * 1.6);

  @media only screen and ${device.tablet} {
    width: 85vw;
    height: calc(85vw * 1.6);
  }
`

export const ImageContainer = styled.div`
  width: 90%;
  height: 90%;
  position: relative;
  
  :hover div:nth-of-type(2) {
    background-color: ${props => props.theme.palette.warning.main};
  }
`

export const Image = styled.div<{image: string | undefined}>`
  background-image: url(${props => props.image});
  border-radius: ${border.borderRadius};
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

export const ChangeImage = styled.div`
  background-color: rgba(255,255,255,0);
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.5s;
  cursor: pointer;
  
  :hover div {
    opacity: 1;
  }
`
export const ButtonContainer = styled.div`
  opacity: 0;
  transition: opacity 0.5s;
`

export const RatingContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 5px;
  background-color: ${props => props.theme.palette.info.light};;
  padding: 10px;
  border-radius: ${border.borderRadius};
`

export const RatingText = styled.div`
  margin-left: 4px;
`

export const RightFieldsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-flow: column;
  justify-content: space-between;
  width: 55vw;
  max-width: 55vw;

  @media only screen and ${device.tablet} {
    width: 85vw;
    max-width: 85vw;
  }
`

export const PublicationDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, calc(35% - 10px)) 30%;
  grid-column-gap: 10px;

  @media only screen and ${device.tablet} {
    display: flex;
    flex-flow: column;
    gap: 20px;
  }
`

export const SubmitButtons = styled.div`
  display: flex;
  gap: 50px;
  
  button {
    width: 150px;
  }

  @media only screen and ${device.tablet} {
    flex-flow: column;
    gap: 30px;

    button {
      width: 120px;
    }
  }
`

export const ClearRating = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.palette.info.main};
  margin-top: 10px;
  transition: color 0.5s;
  cursor: pointer;
  
  :hover {
    color: ${props => props.theme.palette.secondary.main};
  }
`