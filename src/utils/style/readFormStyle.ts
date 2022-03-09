import styled from "@emotion/styled";
import {device} from "../../config/config";

export const Subtitle = styled.div`
  padding-left: 2px;
  font-family: 'PoppinsSemiBold', sans-serif;
  color: ${props => props.theme.palette.primary.main};
`

export const Label = styled.div`
  padding-left: 2px;
  font-size: 0.9rem;
  font-family: 'PoppinsSemiBold', sans-serif;
  color: ${props => props.theme.palette.info.main};
`

export const Form = styled.form`
  display: flex;
  flex-flow: column;
  width: 57%;
  gap: 25px;
  
  @media only screen and ${device.tablet} {
    width: 80vw;
    flex-flow: column;
    display: flex;
    align-items: center;
    justify-items: center;
  }
`

export const FormContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
`

export const FieldContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 20px;
  
  @media only screen and ${device.tablet} {
    width: 80vw;
  }
`

export const SessionsFieldContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 5px;
`


export const DatesContainer = styled.div`
  display: flex;
  gap: 10px;

  @media only screen and ${device.tablet} {
    flex-flow: column;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-self: end;
  
  button {
    width: 120px;
  }

  @media only screen and ${device.tablet} {
    align-self: center;
    button {
      width: 100px;
    }
  }
`

export const SessionsButtonContainer = styled.div`
  margin-bottom: 10px;
`

export const SessionsContainer = styled.div`
  display: flex;
  flex-flow: column;
  border-bottom: 3px solid ${props => props.theme.palette.primary.light};
  max-height: 11vw;
  overflow-y: auto;

  @media only screen and ${device.tablet} {
    max-height: 26vw;
  }
`


export const AddContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: end;
  justify-content: space-between;

  @media only screen and ${device.tablet} {
    width: 80vw;
    flex-flow: column;
    align-items: center;
  }
`

export const SessionDateContainer = styled.div`
`

export const SessionTimeContainer = styled.div`
  width: 10vw;

  @media only screen and ${device.tablet} {
    width: 25vw;
  }
`

export const SessionButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`
