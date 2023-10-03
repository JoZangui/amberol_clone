let displayPlaylistButton = document.querySelector('.display-playlist--icon');
let closePlaylistButton = document.querySelector('.close-playlist--button');
let playlist = document.querySelector('.playlist');

playlist.onresize = () => {
    console.log(playlist.computedStyleMap.width);
}


function displayAndClosePlayList() {
    let windowWidth = window.innerWidth;
    const shuffleIcon = document.querySelector('.shuffle-icon');
    
    if(windowWidth <= 1028) {
        // se a largura for menor ou igual 1028px ele oculta a playlist
        playlist.classList.add('playlist-off');
        displayPlaylistButton.classList.remove('option-buttons--active');
    } else {
        // se a largura for maior 1028px ele apresenta a playlist
        playlist.classList.remove('playlist-off');
        displayPlaylistButton.classList.add('option-buttons--active');
    }
}

window.onresize = displayAndClosePlayList
window.onload = displayAndClosePlayList

displayPlaylistButton.onclick = ()=> {
    let playlistIsOff = playlist.classList.contains('playlist-off');

    if(playlistIsOff) {
        // oculta a playlist se ela estiver visível
        playlist.classList.remove('playlist-off');
        displayPlaylistButton.classList.add('option-buttons--active');
    } else {
        // torna visível a playlist se ela estiver oculta
        playlist.classList.add('playlist-off');
        displayPlaylistButton.classList.remove('option-buttons--active');
    }
}

closePlaylistButton.onclick = ()=> {
    playlist.classList.add('playlist-off');
    displayPlaylistButton.classList.remove('option-buttons--active');
}