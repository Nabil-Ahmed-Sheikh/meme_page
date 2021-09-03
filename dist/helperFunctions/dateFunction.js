"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFromDay = void 0;
const dateFromDay = (day) => {
    let year = 2021;
    let date = new Date(year, 0);
    let dateString = new Date(date.setDate(Number(day))).toString();
    let formattedDate = `${dateString.slice(8, 10)} ${dateString.slice(4, 7)} ${dateString.slice(11, 15)}`;
    return formattedDate;
};
exports.dateFromDay = dateFromDay;
