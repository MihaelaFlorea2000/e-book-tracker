import Rendition from "epubjs/types/rendition";
import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../config/axiosConfig";
import {DEFAULT_LOCATION} from "../config/config";
import {HighlightInterface, SearchResultInterface} from "../config/interfaces";

export default class ReadStore {

    public rendition: Rendition | undefined = undefined;
    private location: string | number | undefined = undefined;
    private highlightMenu: boolean = false;
    public selections: HighlightInterface[] | undefined = undefined;
    public currentSelection: HighlightInterface | null = null;
    private highlightDialog: boolean = false;
    private highlightOn: boolean = false;
    private requested: boolean = false;
    private editId: number | undefined = undefined;
    private searchResults: SearchResultInterface[] | undefined = undefined


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

    public setHighlightMenu(highlightMenu:boolean) {
        runInAction(() => {
            this.highlightMenu = highlightMenu;
        })
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

    // Request current book highlights
    public requestSelections(bookId:number) {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/pg/highlights/${bookId}`).then(data => {
            runInAction(() => {
                this.selections = data.data;
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

    // Reset state btw renders
    public reset() {
         this.selections = undefined;
         this.searchResults = undefined;
    }
}
