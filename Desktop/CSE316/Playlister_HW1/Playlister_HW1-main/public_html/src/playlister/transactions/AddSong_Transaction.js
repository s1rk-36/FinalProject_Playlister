import jsTPS_Transaction from "../../common/jsTPS.js"

export default class AddSong_Transaction extends jsTPS_Transaction{
    constructor(initModel, songObject){
        super();
        this.model = initModel;
        this.songObject = songObject;
    }

    doTransaction(){
        this.model.addNewSong(this.songObject);
    }

    undoTransaction(){
        this.model.deleteSong(this.model.getPlaylistSize() - 1);
    }


}