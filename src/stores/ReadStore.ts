import Rendition from "epubjs/types/rendition";
import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../config/axiosConfig";
import {DEFAULT_LOCATION} from "../config/config";
import { HighlightInterface } from "../config/interfaces";
import BooksStore from "./BooksStore";

export default class ReadStore {

    private location: string | number = DEFAULT_LOCATION;
    private highlightMenu: boolean = false;
    public selections: HighlightInterface[] = [];
    private rendition: Rendition | undefined = undefined;
    public currentSelection: HighlightInterface | null = null;
    private highlightDialog: boolean = false;
    private highlightOn: boolean = false;


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

    // Update Location
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
    public getSelections():HighlightInterface[] {
        return this.selections;
    }

    public setSelections(selections:HighlightInterface[]) {
        this.selections = selections;
        console.log(this.selections)
    }

    public getCurrentSelection():HighlightInterface | null {
        return this.currentSelection;
    }

    public setCurrentSelection(selection:HighlightInterface | null) {
        runInAction(() => {
            this.currentSelection = selection;
        })
    }

    public setColor(color:string) {
        runInAction(() => {
            if (this.currentSelection) {
                this.currentSelection.color = color;
            }
        })
    }

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


}

// export default new ReadStore();
