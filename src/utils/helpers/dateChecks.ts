import {FrontSessionInterface, SessionInterface} from "./interfaces";

// Check if date is btw start and end
export const isBetween = (date:string, startDate:string, endDate:string):boolean => {

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

// Check if any session has a date outside
// the start - end interval
export const isOutside = (sessions:SessionInterface[] | FrontSessionInterface[], startDate:string, endDate:string):boolean => {

    for (const session of sessions) {
        if (!isBetween(session.startDate, startDate, endDate)) {
            return true;
        }
    }

    return false
}