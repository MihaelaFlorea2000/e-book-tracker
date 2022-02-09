import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import {border, theme} from "./themeConfig";

export const StyledTextField = styled(TextField)`
  background-color: ${theme.palette.info.light};
  border-radius: ${border.borderRadius};
  fieldset {
    border-radius: ${border.borderRadius};
  }
  
  input, textarea {
    font-family: 'PoppinsRegular', sans-serif;
  }
`