import React from "react";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {device} from "../../../../utils/helpers/constants";
import axiosConfig from "../../../../utils/helpers/axiosConfig";
import {useStore} from "../../../../stores/RootStore";

interface Props {
    bookId: number;
}

/**
 * Dialog confirming if the user wants to delete the book
 * @param props
 * @constructor
 */
const ConfirmBox = (props:Props) => {

    const navigate = useNavigate();

    // Get stores access
    const { booksStore, deleteStore } = useStore();

    // Is Delete confirm box open?
    const [open, setOpen] = React.useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleNo = () => {
        setOpen(false);
    };

    const handleYes = async () => {
        // Delete Book
        try {
            const res = await axiosConfig().delete(`/books/${props.bookId}`)

            if (res.data.status) {
                booksStore.requestBooks();
                navigate('/?fromDelete');
            } else {
                deleteStore.setError(res.data.message);
            }
        } catch (err:any) {
            console.log(err);
            deleteStore.setError(err.response.data.message);
        }
        setOpen(false);
    };

    return (
        <Container>
            <ButtonsContainer>
                <DesktopButton>
                    <Button
                        type="button"
                        variant="contained"
                        color="error"
                        size="medium"
                        onClick={handleOpen}
                        startIcon={<FontAwesomeIcon className="fa-fw" icon={faTrash}/>}
                    >Delete</Button>
                </DesktopButton>
                <MobileButton>
                    <Button
                        type="button"
                        variant="contained"
                        color="error"
                        onClick={handleOpen}
                        size="large"
                    >
                        <FontAwesomeIcon className="fa-fw" icon={faTrash}/>
                    </Button>
                </MobileButton>
            </ButtonsContainer>
            <StyledDialog
                open={open}
                onClose={handleNo}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Delete"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this book?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleYes}>Yes</Button>
                    <Button onClick={handleNo} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </StyledDialog>
        </Container>
    )
}

export default observer(ConfirmBox);

const Container = styled.div`
`

const ButtonsContainer = styled.div`
`

const DesktopButton = styled.div`
  @media only screen and ${device.tablet} {
    display: none;
  }
`

const MobileButton = styled.div`
  display: none;

  @media only screen and ${device.tablet} {
    display: flex;
  }
`

const StyledDialog = styled(Dialog)`
  h2 {
    font-family: 'PoppinsSemiBold', sans-serif;
  }
  
  p {
    font-family: 'PoppinsRegular', sans-serif;
  }
`

