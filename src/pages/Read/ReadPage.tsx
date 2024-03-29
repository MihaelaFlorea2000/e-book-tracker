import React, {useEffect} from "react";
import { useNavigate, useParams} from "react-router-dom";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faStickyNote,
    faHighlighter,
    faSearch, faCog
} from "@fortawesome/free-solid-svg-icons";
import { CircularLoading } from "../../utils/components/CircularLoading";
import SideMenu from "../../utils/components/SideMenu";
import { device } from "../../utils/helpers/constants";
import HighlightMenu from "./components/HighlightMenu";
import BookReader from "./components/BookReader";
import { useStore } from "../../stores/RootStore";
import SearchMenu from "./components/SearchMenu";
import axiosConfig from "../../utils/helpers/axiosConfig";
import {getReaderStyles} from "./helpers/ReaderColors";

/**
 * E-book reader
 * @constructor
 */
const ReadPage = () => {

    const navigate = useNavigate();

    // Get stores access
    const { readerStore, bookStore, booksStore, metricsStore, settingsStore } = useStore();

    // Get book
    const params = useParams();
    const bookId = Number(params.bookId);

    const book = bookStore.getBook(bookId);
    const settings = settingsStore.getSettings();

    // For updating location on leave
    useEffect(() => {
        bookOpened().then(() => {});
        window.addEventListener("beforeunload", handleRefresh);
        return () => {
            closeBook().then(() => {})
            window.removeEventListener("beforeunload", handleRefresh);
        };
    }, []);

    // Remember location in book on back
    const bookOpened = async() => {
        if (bookId !== undefined) {
            try {
                const res = await axiosConfig().post(`/books/${bookId}/opened`)
                console.log(res.data);
            } catch (err:any) {
                console.log(err.response.data.message)
            }
        }
    }

    // Remember location in book on back
    const closeBook = async() => {
        const data = {
            location: readerStore.getLocation()
        }

        if (bookId !== undefined) {
            console.log(`${bookId}, ${data.location}`);

            try {
                const res = await axiosConfig().post(`/books/${bookId}/closed`, data)
                console.log(res.data);
                bookStore.requestBook(bookId);
                bookStore.requestReads(bookId);
                booksStore.requestBooks();
                metricsStore.trackRefresh();
                readerStore.reset();
            } catch (err:any) {
                console.log(err.response.data.message)
            }
        }
    }

    // Remember location in book on back
    const handleBackClick = () => {
        closeBook().then(() => {navigate('/');})
    }

    // Remember location in book on refresh
    const handleRefresh = (e:any) => {
        e.preventDefault();

        closeBook().then(() => {});

        if (e) {
            e.returnValue = '';
        }

        return '';
    }

    // Loading book
    if (book === undefined || book.id === undefined || settings === undefined) {
        return (
            <Page>
                <CircularLoading />
            </Page>
        )
    }

    // Get highlights
    const selections = readerStore.getSelections(bookId);

    // Loading book
    if (selections === undefined) {
        return (
            <Page>
                <CircularLoading />
            </Page>
        )
    }

    // Set last book location
    if (readerStore.isFirstRender()) {
        readerStore.setLocation(book.location);
        readerStore.setFirstRender(false);
    }

    // Check if highlight is on
    const highlightOn = readerStore.isHighlightOn();

    // Open the highlights menu
    const handleHighlightClick = () => {
        const newHighlightOn = !highlightOn;
        readerStore.setIsHighlightOn(newHighlightOn);

        if (readerStore.getCurrentSelection() !== null && newHighlightOn) {
            readerStore.setHighlightDialog(true);
        }
    };

    // Toggle theme
    const themeOn = readerStore.isThemeOn();
    const pageColor = getReaderStyles(settings.readerTheme);

    const handleSettings = () => {
        settingsStore.collapseAll();
        settingsStore.setExpandAppearance(true);
        navigate('/settings?fromReader');
    };

    return (
        <Page>
            <ButtonsContainer>
                <SettingsButton color={pageColor.buttonsColor} onClick={handleSettings}><FontAwesomeIcon icon={faCog}/></SettingsButton>
                <SideMenu color={pageColor.buttonsColor} fontSize="1.6rem" buttonSize="medium" icon={faSearch} direction="right" menu={<SearchMenu />} />
                <HighlightButton color={pageColor.buttonsColor} onClick={handleHighlightClick}><FontAwesomeIcon icon={faHighlighter}/></HighlightButton>
                <SideMenu color={pageColor.buttonsColor} fontSize="1.6rem" buttonSize="medium" icon={faStickyNote} direction="right" menu={<HighlightMenu book={book} selections={selections}/>} />
                <BackButton color={pageColor.buttonsColor} onClick={handleBackClick}><FontAwesomeIcon icon={faHome}/></BackButton>
            </ButtonsContainer>
            <BookReader book={book} selections={selections} settings={settings}/>
        </Page>
    )
}

export default observer(ReadPage);

const Page = styled.div`
`

const ButtonsContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  text-align: center;
  z-index: 2;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`

const HighlightButton = styled.div<{color:string}>`
  color: ${props => props.color};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 35px;
  height: 35px;
  transition: color 0.5s;

  :hover {
    color: ${props => props.theme.palette.secondary.main};
  }

  @media only screen and ${device.mobileL} {
    width: 30px;
    height: 30px;
  }
`

const SettingsButton = styled.div<{color:string}>`
  color: ${props => props.color};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 35px;
  height: 35px;
  transition: color 0.5s;

  :hover {
    color: ${props => props.theme.palette.secondary.main};
  }

  @media only screen and ${device.mobileL} {
    width: 30px;
    height: 30px;
  }
`

const BackButton = styled.div<{color:string}>`
  color: ${props => props.color};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 35px;
  height: 35px;
  transition: color 0.5s;

  :hover {
    color: ${props => props.theme.palette.secondary.main};
  }

  @media only screen and ${device.mobileL} {
    width: 30px;
    height: 30px;
  }
`