import {Point } from "../primitives/point";

function add(p1, p2){
    return new Point(p1.x + p2.x, p1.y + p2.y);
}

function subtract(p1, p2){
    return new Point(p1.x - p2.x, p1.y - p2.y);
}

function scale(point, scaler){
    return new Point(point.x * scaler, point.y * scaler);
}

export {
    add,
    subtract,
    scale
}