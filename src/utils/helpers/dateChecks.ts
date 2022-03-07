import {FrontSessionInterface, SessionInterface} from "../../config/interfaces";

export const isBetween = (date:string, startDate:string, endDate:string):boolean => {
    // Check date is btw start and end
    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();
    const dateTime = new Date(date).getTime();

    return !(startDateTime > dateTime || dateTime > endDateTime);


}

export const isOutside = (sessions:SessionInterface[] | FrontSessionInterface[], startDate:string, endDate:string):boolean => {

    for (const session of sessions) {
        if (!isBetween(session.startDate, startDate, endDate)) {
            return true;
        }
    }

    return false
}