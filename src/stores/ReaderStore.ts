import { EpubCFI } from "epubjs";
import Rendition from "epubjs/types/rendition";
import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../utils/helpers/axiosConfig";
import {HighlightInterface, SearchResultInterface} from "../utils/helpers/interfaces";

/**
 * Class for managing state in the E-book Reader
 */
export default class ReaderStore {

    // E-book rendition
    public rendition: Rendition | undefined = undefined;

    // Location within the book (CFI string)
    private location: string | number | undefined = undefined;

    // Highlights in a book
    public selections: HighlightInterface[] | undefined = undefined;
    public currentSelection: HighlightInterface | null = null;

    // Whether side menus and dialogs are open
    private highlightMenu: boolean = false;
    private highlightDialog: boolean = false;
    private finishedDialog: boolean = false;
    private finishedDialogDouble: boolean = false;

    // Search Results
    private searchResults: SearchResultInterface[] | undefined = undefined

    // Is this the first time the book is open?
    private firstRender: boolean = true;

    // Highlight info
    private highlightOn: boolean = false;
    private requested: boolean = false;
    private editId: number | undefined = undefined;

    // Reader theme
    private themeOn: boolean = false;

    public constructor() {
        makeAutoObservable(this);
    }

    // Rendition
    public getRendition():Rendition | undefined {
        return this.rendition;
    }

    public setRendition(rendition:Rendition | undefined) {
        runInAction(() => {
            this.rendition = rendition;
        })
    }

    public isFirstRender():boolean {
        return this.firstRender;
    }

    public setFirstRender(value:boolean) {
        runInAction(() => {
            this.firstRender = value;
        })
    }

    // Location
    public getLocation():string | number | undefined {
        return this.location;
    }

    public setLocation(location:string | number) {
        if (location !== null) {
            runInAction(() => {
                this.location = location;
            })
        }
    }

    // Highlight menu
    public isHighlightMenu():boolean {
        return this.highlightMenu;
    }

    // Highlights
    public getSelections(bookIdUrl:number):HighlightInterface[] | undefined{
        if (this.selections === undefined) {
            this.requestSelections(bookIdUrl);

            return undefined;
        } else {
            return this.selections;
        }
    }

    private static compareSelections(selection1:HighlightInterface, selection2:HighlightInterface) {
        const c = new EpubCFI();
        return c.compare(selection1.cfiRange, selection2.cfiRange);
    }

    // Request current book highlights from backend
    public requestSelections(bookId:number) {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/highlights/${bookId}`).then(data => {
            runInAction(() => {
                this.selections = data.data.sort(ReaderStore.compareSelections);
                this.requested = false
            })
        })
    }

    // The text the user currently selected
    public getCurrentSelection():HighlightInterface | null {
        return this.currentSelection;
    }

    public setCurrentSelection(selection:HighlightInterface | null) {
        runInAction(() => {
            this.currentSelection = selection;
        })
    }

    // Highlight Color
    public setColor(color:string) {
        runInAction(() => {
            if (this.currentSelection) {
                this.currentSelection.color = color;
            }
        })
    }

    // Highlight Note
    public setNote(note:string) {
        runInAction(() => {
            if (this.currentSelection) {
                this.currentSelection.note = note;
            }
        })
    }

    // Highlight Dialog
    public isHighlightDialog():boolean {
        return this.highlightDialog;
    }

    public setHighlightDialog(highlightDialog:boolean) {
        runInAction(() => {
            this.highlightDialog = highlightDialog;
        })
    }

    // Is the user highlighting something?
    public isHighlightOn():boolean {
        return this.highlightOn;
    }

    public setIsHighlightOn(highlight:boolean) {
        runInAction(() => {
            this.highlightOn = highlight;
        })
    }

    // Is the user editing a highlight?
    public getEditId():number | undefined {
        return this.editId;
    }

    public setEditId(value:number | undefined) {
        runInAction(() => {
            this.editId = value;
        })
    }

    // Search Results
    public getSearchResults():SearchResultInterface[] | undefined {
        return this.searchResults;
    }

    public setSearchResults(searchResults:SearchResultInterface[]) {
        runInAction(() => {
            this.searchResults = searchResults;
        })
    }

    // Finished Book Dialog
    public isFinishedDialog():boolean {
        return this.finishedDialog;
    }

    public setFinishedDialog(finishedDialog:boolean) {
        runInAction(() => {
            this.finishedDialog = finishedDialog;
        })
    }

    public isFinishedDialogDouble():boolean {
        return this.finishedDialogDouble;
    }

    public setFinishedDialogDouble(finishedDialogDouble:boolean) {
        runInAction(() => {
            this.finishedDialogDouble = finishedDialogDouble;
        })
    }

    // Is the theme on?
    public isThemeOn():boolean {
        return this.themeOn;
    }

    // Reset state btw renders
    public reset() {
         this.selections = undefined;
         this.searchResults = undefined;
    }
}
