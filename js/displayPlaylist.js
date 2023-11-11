let displayPlaylistButton = document.querySelector('.display-playlist--icon');
let closePlaylistButton = document.querySelector('.close-playlist--button');
let playlistContainer = document.querySelector('.playlist');

function ShowOrHideThePlaylist() {
    let windowWidth = window.innerWidth;
    
    if(windowWidth <= 1028) {
        // se a largura for menor ou igual 1028px ele oculta a playlist
        playlistContainer.classList.add('playlist-off');
        displayPlaylistButton.classList.remove('option-buttons--active');
    } else {
        // se a largura for maior 1028px ele apresenta a playlist
        playlistContainer.classList.remove('playlist-off');
        displayPlaylistButton.classList.add('option-buttons--active');
    }
}

window.onresize = ShowOrHideThePlaylist;
window.onload = ShowOrHideThePlaylist;

displayPlaylistButton.onclick = ()=> {
    let playlistIsOff = playlistContainer.classList.contains('playlist-off');

    if(playlistIsOff) {
        // oculta a playlist se ela estiver visível
        playlistContainer.classList.remove('playlist-off');
        displayPlaylistButton.classList.add('option-buttons--active');
    } else {
        // torna visível a playlist se ela estiver oculta
        playlistContainer.classList.add('playlist-off');
        displayPlaylistButton.classList.remove('option-buttons--active');
    }
}

closePlaylistButton.onclick = ()=> {
    playlistContainer.classList.add('playlist-off');
    displayPlaylistButton.classList.remove('option-buttons--active');
}