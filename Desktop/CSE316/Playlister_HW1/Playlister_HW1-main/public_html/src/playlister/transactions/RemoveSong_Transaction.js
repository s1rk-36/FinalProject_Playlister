import jsTPS from "../../common/jsTPS.js";
import jsTPS_Transaction from "../../common/jsTPS.js"

export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, initId, oldSong) {
        super();
        this.model = initModel;
        this.i = initId
        this.oldSong = oldSong;
    }

    doTransaction() {
        this.model.deleteSong(this.i);
    }

    undoTransaction() {
        this.model.addSongAt(this.i, this.oldSong);
    }
}