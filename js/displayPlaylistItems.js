const musicList = document.querySelector('.music-list');
let currentSong = 0;

function displayPlaylistItems(playlist) {
    
    for (let index = 0; index < playlist.length; index++) {
        // create list items
        const li = document.createElement('li');
        // checkbox container label
        const checkboxContainer = document.createElement('label');
        // checkbox input
        const checkboxInput = document.createElement('input');
        // span with check icon
        const checkmark = document.createElement('span');
        // div for music cover
        const musicArt = document.createElement('div');
        // music cover image
        const musicCoverImage = document.createElement('img');
        // div for the music info
        const musicInfo = document.createElement('div');
        
        // set items attributes
        checkboxContainer.setAttribute('class', 'checkbox-container');
        checkboxInput.setAttribute('class', 'checkbox-input');
        checkboxInput.setAttribute('type', 'checkbox');
        // definimos um id para o input de modo a corresponder ao seu li na hora de remover da lista a música
        checkboxInput.setAttribute('id', index);
        checkmark.setAttribute('class', 'checkmark');
        musicArt.setAttribute('class', 'music-art');
        musicInfo.setAttribute('class', 'music-info');
        
        // add the checkbox input and checkbox span icon to checkbox container
        checkboxContainer.appendChild(checkboxInput);
        checkboxContainer.appendChild(checkmark);
        
        // music cover
        musicCoverImage.src = playlist[index].cover;
        
        musicArt.appendChild(musicCoverImage);
        
        musicInfo.innerHTML = `<h1>${playlist[index].title}</h1>
        <h2>${playlist[index].artist}</h2>`;
        
        // definimos um id para localizar a musica selecionada
        li.setAttribute('id', index);
        li.appendChild(checkboxContainer);
        li.appendChild(musicArt);
        li.appendChild(musicInfo);
        li.addEventListener('click', function () {
            const selectOptionIsOn = displaySelectionOptionButton.classList.contains('select-option--active');
            // desabilita a opção de carregar música se a opção selecionar música estiver activa
            if (!selectOptionIsOn) {
                loadSelectedSong(this.id);
            }
        });

        // add the item to playlist container
        musicList.appendChild(li);
    }

    selectMusicOption();
}

function loadSelectedSong(songIndex) {
    currentSong = songIndex;
    song = URL.createObjectURL(uploadedMusicList.songsList[currentSong].url);
    audio.src = song;
}