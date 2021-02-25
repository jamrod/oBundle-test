import PageManager from "./page-manager";

export default class Custom extends PageManager {
    onReady() {
        this.newImageSelect()
    }

    newImageSelect() {
        const thumbs = document.querySelectorAll(".productView-thumbnail-link")

        thumbs.forEach(thumb => {
            thumb.addEventListener('mouseover', thumb.click)
        })
    }

}
