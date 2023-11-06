const musicList = document.querySelector('.music-list');
let currentSong = 0;

function displayPlaylistItems(playlist) {
    
    for (let index = 0; index < playlist.length; index++) {
        // cria um item de lista (li)
        const li = document.createElement('li');
        // cria um label que será o container do checkbox
        const checkboxContainer = document.createElement('label');
        // checkbox input
        const checkboxInput = document.createElement('input');
        // span com o icon check
        const checkmark = document.createElement('span');
        // div para capa da música
        const musicArt = document.createElement('div');
        // imagem da capa da música
        const musicCoverImage = document.createElement('img');
        // div para informação da música
        const musicInfo = document.createElement('div');
        
        // configurando os atributos dos elementos criados
        checkboxContainer.setAttribute('class', 'checkbox-container');
        checkboxInput.setAttribute('class', 'checkbox-input');
        checkboxInput.setAttribute('type', 'checkbox');
        // definimos um id para o input de modo a corresponder ao seu li na hora de remover da lista a música
        checkboxInput.setAttribute('id', index);
        checkmark.setAttribute('class', 'checkmark');
        musicArt.setAttribute('class', 'music-art');
        musicInfo.setAttribute('class', 'music-info');
        
        // adiciona o checkbox input e o icon de checkbox ao container do checkbox
        checkboxContainer.appendChild(checkboxInput);
        checkboxContainer.appendChild(checkmark);
        
        // capa da música
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
            const selectOptionIsOn = btnDisplaySelectionOption.classList.contains('select-option--active');
            // desabilita a opção de carregar música se a opção selecionar música para remoção estiver activa
            if (!selectOptionIsOn) {
                loadSelectedSong(this.id);
            }
        });

        // adiciona o item a lista musicList(ul)
        musicList.appendChild(li);
    }

    // activa a opção de seleção de música(s) para remover
    selectTheSongToRemove();
}

// carrega música selecionada pelo usuário na playlist
function loadSelectedSong(songIndex) {
    currentSong = songIndex;
    song = URL.createObjectURL(songsList[currentSong].url);
    audio.src = song;
}