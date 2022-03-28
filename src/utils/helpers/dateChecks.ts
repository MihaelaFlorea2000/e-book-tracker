import {FrontSessionInterface, SessionInterface} from "../../config/interfaces";

export const isBetween = (date:string, startDate:string, endDate:string):boolean => {

    // Check date is btw start and end
    const startDateTime = new Date(startDate).setHours(0,0,0,0);
    const endDateTime = new Date(endDate).setHours(0,0,0,0);
    const dateTime = new Date(date).setHours(0,0,0,0);

    if (!(startDateTime <= dateTime && dateTime <= endDateTime)) {
        console.log(startDateTime);
        console.log(dateTime);
        console.log(endDateTime);
    }

    return (startDateTime <= dateTime && dateTime <= endDateTime);
}

export const isOutside = (sessions:SessionInterface[] | FrontSessionInterface[], startDate:string, endDate:string):boolean => {

    for (const session of sessions) {
        if (!isBetween(session.startDate, startDate, endDate)) {
            return true;
        }
    }

    return false
}