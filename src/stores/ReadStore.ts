import Rendition from "epubjs/types/rendition";
import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../config/axiosConfig";
import {DEFAULT_LOCATION} from "../config/config";
import {BookInterface, HighlightInterface, SearchResultInterface} from "../config/interfaces";

export default class ReadStore {

    private location: string | number = DEFAULT_LOCATION;
    private highlightMenu: boolean = false;
    public selections: HighlightInterface[] | undefined = undefined;
    public rendition: Rendition | undefined = undefined;
    public currentSelection: HighlightInterface | null = null;
    private highlightDialog: boolean = false;
    private highlightOn: boolean = false;
    private firstRender: boolean = true;
    private requested: boolean = false;
    private editId: number | undefined = undefined;
    private searchResults: SearchResultInterface[] | undefined = undefined


    public constructor() {
        makeAutoObservable(this);
    }

    // Location
    public getLocation():string | number {
        return this.location;
    }

    public setLocation(location:string | number) {
        if (location !== null) {
            runInAction(() => {
                this.location = location;
            })
        }
    }

    public isFirstRender():boolean {
        return this.firstRender;
    }

    public setFirstRender(value:boolean) {
        runInAction(() => {
            this.firstRender = value;
        })
    }

    public async updateLocation(bookId:number) {
        const data = {
            location: this.location
        }

        try {
            const res = await axiosConfig().put(`/pg/books/${bookId}/edit/location`, data)
            console.log(res.data);
        } catch (err:any) {
            console.log(err.response.data.message)
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

    // Selections
    public getSelections(bookId:number):HighlightInterface[] | undefined{
        if (this.selections === undefined) {
            this.requestSelections(bookId);

            return undefined;
        } else {
            return this.selections;
        }
    }

    // public setSelections(selections:HighlightInterface[]) {
    //     this.selections = selections;
    // }


    // Request current user books
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

    public getCurrentSelection():HighlightInterface | null {
        return this.currentSelection;
    }

    public setCurrentSelection(selection:HighlightInterface | null) {
        runInAction(() => {
            this.currentSelection = selection;
        })
    }

    // Color
    public setColor(color:string) {
        runInAction(() => {
            if (this.currentSelection) {
                this.currentSelection.color = color;
            }
        })
    }

    // Note
    public setNote(note:string) {
        runInAction(() => {
            if (this.currentSelection) {
                this.currentSelection.note = note;
            }
        })
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

    // Highlight Dialog
    public isHighlightDialog():boolean {
        return this.highlightDialog;
    }

    public setHighlightDialog(highlightDialog:boolean) {
        runInAction(() => {
            this.highlightDialog = highlightDialog;
        })
    }

    public isHighlightOn():boolean {
        return this.highlightOn;
    }

    public setIsHighlightOn(highlight:boolean) {
        runInAction(() => {
            this.highlightOn = highlight;
        })
    }

    public getEditId():number | undefined {
        return this.editId;
    }

    public setEditId(value:number | undefined) {
        runInAction(() => {
            this.editId = value;
        })
    }

    public getSearchResults():SearchResultInterface[] | undefined {
        return this.searchResults;
    }

    public setSearchResults(searchResults:SearchResultInterface[]) {
        runInAction(() => {
            this.searchResults = searchResults;
        })
    }
}
