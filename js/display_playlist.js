let displayPlaylistButton = document.querySelector('.display-playlist--button');
let closePlaylistButton = document.querySelector('.close-playlist--button');
let playlist = document.querySelector('.playlist');


function displayAndClosePlayList() {

    let windowWidth = window.innerWidth;
    
    if(windowWidth <= 1028) {
        // se a largura for menor ou igual 1028px ele oculta a playlist
        playlist.classList.add('playlist-off');
    } else {
        // se a largura for maior 1028px ele apresenta a playlist
        playlist.classList.remove('playlist-off');
    }
}

window.onresize = displayAndClosePlayList
window.onload = displayAndClosePlayList

displayPlaylistButton.onclick = ()=> {
    let playlistIsOff = playlist.classList.contains('playlist-off');

    if(playlistIsOff) {
        // oculta a playlist se ela estiver visível
        playlist.classList.remove('playlist-off');
        displayPlaylistButton.style.backgroundColor = 'rgba(252, 252, 252, 0.356)';
    } else {
        // torna visível a playlist se ela estiver oculta
        playlist.classList.add('playlist-off');
        displayPlaylistButton.style.backgroundColor = '#ffffff28';
    }
}

closePlaylistButton.onclick = ()=> {
    playlist.classList.add('playlist-off');
}