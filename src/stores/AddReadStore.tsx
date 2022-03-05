import {makeAutoObservable, runInAction} from "mobx";
import {FrontSessionInterface} from "../config/interfaces";

export default class AddReadStore {

    private sessions: FrontSessionInterface[] = [];


    public constructor() {
        makeAutoObservable(this);
    }

   public getSessions():FrontSessionInterface[] {
        return this.sessions;
   }

   public setSessions(value:FrontSessionInterface[]) {
       runInAction(() => {
           this.sessions = value;
       })
   }

   public formatDate(value:string):string {
       if (!value) return '';
       return value !== '' ? new Date(value).toLocaleDateString('en-US') : '';
   }
}
