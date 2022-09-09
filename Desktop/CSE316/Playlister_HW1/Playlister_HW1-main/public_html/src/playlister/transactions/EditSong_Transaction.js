import jsTPS_Transaction from "../../common/jsTPS.js"

export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, initId, newSong, oldSong){
        super();
        this.model = initModel;
        this.i = initId
        this.newSong = newSong;
        this.oldSong = oldSong;
    }

    doTransaction() {
        this.model.confirmEdit(this.i, this.newSong);
    }

    undoTransaction() {
        this.model.restoreEdit(this.i, this.oldSong);
    }

}