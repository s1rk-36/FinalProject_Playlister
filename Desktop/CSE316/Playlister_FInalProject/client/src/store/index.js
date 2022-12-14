import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    PUBLISH_PLAYLIST: "PUBLISH_PLAYLIST",
    SEARCH_MODE: "SEARCH_MODE",
    DISPLAY_SEARCH: "DISPLAY_SEARCH",
    PLAY_LIST: "PLAY_LIST",
    CHANGE_LIST_NAME_2: "CHANGE_LIST_NAME_2",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();


const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG",
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {

    
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal : CurrentModal.NONE,
        idNamePairs: [],
        currentList: null,
        currentSongIndex : -1,
        currentSong : null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        searchMode: 'home',
        searchResult: '',
        searchArray: [],
        songsToPlay: null,
    });
    const history = useHistory();
    document.onkeydown = store.handleKeyDown;
    console.log("inside useGlobalStore");


    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    searchArray: [],
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchMode: store.searchMode,
                    searchArray: store.searchArray,
                    songsToPlay: store.songsToPlay,
                });
            }

            case GlobalStoreActionType.CHANGE_LIST_NAME_2: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    searchArray: [],
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchMode: store.searchMode,
                    searchArray: store.searchArray,
                    songsToPlay: payload.playlist,
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchMode: store.searchMode,
                    searchArray: store.searchArray,
                    songsToPlay: store.songsToPlay,
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {                
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchMode: store.searchMode,
                    searchArray: store.searchArray,
                    songsToPlay: store.songsToPlay,
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchMode: store.searchMode,
                    searchArray: store.searchArray,
                    songsToPlay: store.songsToPlay,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal : CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    searchMode: store.searchMode,
                    searchArray: store.searchArray,
                    songsToPlay: store.songsToPlay,
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchMode: store.searchMode,
                    searchArray: store.searchArray,
                    songsToPlay: store.songsToPlay,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchMode: store.searchMode,
                    searchArray: store.searchArray,
                    songsToPlay: store.songsToPlay,
                });
            }
            // 
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentModal : CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchMode: store.searchMode,
                    searchArray: store.searchArray,
                    songsToPlay: store.songsToPlay,
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentModal : CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchMode: store.searchMode,
                    searchArray: store.searchArray,
                    songsToPlay: store.songsToPlay,
                });
            }

            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchMode: store.searchMode,
                    searchArray: store.searchArray,
                    songsToPlay: store.songsToPlay,
                });
            }
            case GlobalStoreActionType.SEARCH_MODE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchMode: payload,
                    searchArray: [],
                    songsToPlay: null,
                });
            }

            case GlobalStoreActionType.DISPLAY_SEARCH: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchMode: store.searchMode,
                    searchResult: payload.searchResult,
                    searchArray: payload.idNamePairs,
                    songsToPlay: null,
                });
            }

            case GlobalStoreActionType.PLAY_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    searchArray: store.searchArray,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchMode: store.searchMode,
                    searchArray: store.searchArray,
                    songsToPlay: payload
                });
            }

            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist 
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    store.displaySearchResults = function (searchResult1) {
        if(store.searchMode === 'allUserPlaylists'){
            async function getListPairs() {
            let response = await api.getAllUsersPlaylists(searchResult1);
                if (response.data.success) {
                    let pairsArray = response.data.idNamePairs;
                    storeReducer({
                        type: GlobalStoreActionType.DISPLAY_SEARCH,
                        payload: {
                            idNamePairs: pairsArray,
                            searchResult: searchResult1
                        }
                    });
                }
            }
            getListPairs(searchResult1);
        }
        else if(store.searchMode === 'allUsers'){
            async function getListPairs() {
                let response = await api.getAllUsers(searchResult1);
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        storeReducer({
                            type: GlobalStoreActionType.DISPLAY_SEARCH,
                            payload: {
                                idNamePairs: pairsArray,
                                searchResult: searchResult1
                            }
                        });
                    }
                }
            getListPairs(searchResult1);
        }
    }

    store.loadSongsToPlay = function(id) {
        async function asyncLoadSongs() {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let pairsArray = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.PLAY_LIST,
                    payload: pairsArray
                });
            }
        }
        asyncLoadSongs(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        tps.clearAllTransactions();
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    store.handleKeyDown = function(e) {
        if(e.ctrlKey){
            if(e.key === 'y'){
                if(store.canRedo()){
                    store.redo();
                    //store.setStateWithUpdatedList(store.state.currentList);
                }
            }
            if(e.key === 'z'){
                if(store.canUndo()){
                    store.undo();
                    //store.setStateWithUpdatedList(store.state.currentList);
                }
            }

        }
    }

    store.disableButton = function(id) {
        let button = document.getElementById(id);
        button.classList.add("disabled");
        button.disabled = true;
    }
 
   store.enableButton = function(id) {
        let button = document.getElementById(id);
        button.classList.remove("disabled");
        button.disabled = false;
    }


    store.disableAllButtons = function(){
        this.disableButton("add-song-button");
        this.disableButton("undo-button");
        this.disableButton("redo-button");
        this.disableButton("close-button");
        if(store.currentList === null) this.disableButton("add-list-button");
    }

    store.enableAllButtons = function() {
        if(store.currentList === null) this.enableButton("add-list-button");
        if(store.canUndo()) this.enableButton("undo-button");
        if(store.canRedo()) this.enableButton("redo-button");
        if(store.currentList !== null) this.enableButton("close-button");
        if(store.currentList !== null) this.enableButton("add-song-button");
    }

    store.clearTransactions = function () {
        tps.clearAllTransactions();
    }

    store.incrementLike = function(playlist){
        playlist.likes.push(playlist.fullName);
        async function updatePlaylist(playlist) {
            let response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                  async function getListPairs(playlist) {
                      response = await api.getPlaylistPairs();
                      if (response.data.success) {
                          let pairsArray = response.data.idNamePairs;
                          storeReducer({
                              type: GlobalStoreActionType.CHANGE_LIST_NAME_2,
                              payload: {
                                  idNamePairs: pairsArray,
                                  playlist: playlist 
                              }
                          });
                      }
                  }
                  getListPairs(playlist);
                }
              }
            updatePlaylist(playlist);
    }

    store.incrementDislikes = function(playlist){
        playlist.dislikes.push(playlist.fullName);
        async function updatePlaylist(playlist) {
            let response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                  async function getListPairs(playlist) {
                      response = await api.getPlaylistPairs();
                      if (response.data.success) {
                          let pairsArray = response.data.idNamePairs;
                          storeReducer({
                              type: GlobalStoreActionType.CHANGE_LIST_NAME_2,
                              payload: {
                                  idNamePairs: pairsArray,
                                  playlist: playlist 
                              }
                          });
                      }
                  }
                  getListPairs(playlist);
                }
              }
            updatePlaylist(playlist);
    }



    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function (mode, dupPlaylist = null) {
        let payload = {};

        if(!dupPlaylist){

        let newListName = "Untitled" + store.newListCounter;
        let counter = 2;
        let check = true;
        let tempName = newListName;
        while(check){
            if(this.idNamePairs.length === 0)
                break;
            for(let i = 0; i < this.idNamePairs.length; i++){
                if(this.idNamePairs[i].name === tempName){
                    tempName = newListName + "(" + counter.toString() + ")";
                    counter += 1;
                    break;
                }
                else if (i === this.idNamePairs.length - 1)
                    check = false
            }
        }
        newListName = tempName;

        payload = {
            name: newListName,
            songs: [],
            ownerEmail: auth.user.email,
            likes: [],
            dislikes: [],
            listens: 0,
            public: false,
            comments: {},
            date: '',
            fullName: auth.getFullName(),
          };
        }
        else{
            
            let response = await api.getPlaylistById(dupPlaylist);
        
            if (response.data.success) {
                dupPlaylist = response.data.playlist;
                let counter = 2;
                let check = true;
                let tempName = dupPlaylist.name + "(" + counter.toString() + ")";
                while(check){
                    if(this.idNamePairs.length === 0)
                        break;
                    for(let i = 0; i < this.idNamePairs.length; i++){
                        if(this.idNamePairs[i].name === tempName){
                            counter += 1;
                            tempName = dupPlaylist.name + "(" + counter.toString() + ")";
                            break;
                        }
                        else if (i === this.idNamePairs.length - 1)
                            check = false
                    }
                }

            let newListName = tempName;
            payload = {
                name: newListName,
                songs: dupPlaylist.songs,
                ownerEmail: auth.user.email,
                likes: [],
                dislikes: [],
                listens: 0,
                public: false,
                comments: {},
                date: '',
                fullName: auth.getFullName(),
            };
            }
        }


        const response = await api.createPlaylist(payload);
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            store.loadIdNamePairs();
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }


    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.publishPlaylist = function(id) {
        store.currentList.public = true;
        async function asyncPublishPlaylist(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.public = true;

                let d = new Date();
                playlist.date = d.toDateString();

                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });

                                store.loadIdNamePairs();


                            }
                        }
                        getListPairs(playlist);

                    }
                }
                updateList(playlist);
            }
        }
        asyncPublishPlaylist(id);
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToDelete(id);
    }
    store.deleteList = async function (id) {
        console.log(id);
        try{
            const deleteRes = await api.deletePlaylistById(id);
        }
        catch(e){
            console.error(e);
        }
        store.currentList = null;
        store.loadIdNamePairs();

    }
    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.setSearchMode = (mode) => {
      storeReducer({
            type: GlobalStoreActionType.SEARCH_MODE,
            payload: mode
        });
    }


    store.displayUserOwnedLists = () => {
        // store.loadIdNamePairs();
    }

    store.showEditSongModal = (songIndex, songToEdit) => {
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToEdit}
        });
              
    }
    store.showRemoveSongModal = (songIndex, songToRemove) => {
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToRemove}
        });        
    }
    store.hideModals = () => {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    console.log(playlist);
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });

                }
            }
        }
        asyncSetCurrentList(id);
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.addNewSong = function() {
        let index = this.getPlaylistSize();
        this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function(index, song) {
        let list = store.currentList;      
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.currentList;      
        list.songs.splice(index, 1); 

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function(index, songData) {
        let list = store.currentList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    store.addNewSong = () => {
        let playlistSize = store.getPlaylistSize();
        store.addCreateSongTransaction(
            playlistSize, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }    
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
        tps.addTransaction(transaction);
    }
    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncUpdateCurrentList();
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canAddNewSong = function() {
        return (store.currentList !== null);
    }
    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo());
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo());
    }
    store.canClose = function() {
        return (store.currentList !== null);
    }
    
    store.addComment = async function (comment) {
        async function getPlaylist() {
          let response = await api.getPlaylistById(store.songsToPlay._id);
          if (response.data.success) {
            let playlist = response.data.playlist;
            playlist.comments[playlist.fullName] = comment;

            async function updatePlaylist(playlist) {
              response = await api.updatePlaylistById(playlist._id, playlist);
              if (response.data.success) {
                async function getListPairs(playlist) {
                    response = await api.getPlaylistPairs();
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        storeReducer({
                            type: GlobalStoreActionType.CHANGE_LIST_NAME_2,
                            payload: {
                                idNamePairs: pairsArray,
                                playlist: playlist 
                            }
                        });
                    }
                }
                getListPairs(playlist);
              }
            }
            updatePlaylist(playlist);
          }
        }
        getPlaylist();
    };

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };