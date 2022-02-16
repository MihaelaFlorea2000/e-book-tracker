import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../config/axiosConfig";
import {DEFAULT_LOCATION} from "../config/config";
import BooksStore from "./BooksStore";

class BookStore {

    private location: string | number = DEFAULT_LOCATION;

    public constructor() {
        makeAutoObservable(this);
    }

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
}

export default new BookStore();
