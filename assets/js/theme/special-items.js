import PageManager from "./page-manager";

export default class Custom extends PageManager {
    onReady() {
        alert("Hello world!");
    }
}