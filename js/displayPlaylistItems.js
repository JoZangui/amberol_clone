function displayPlaylistItems(playlist) {
    const playlistContainer = document.querySelector('.playlist-container');
    
    for (let index = 0; index < playlist.length; index++) {
        // create list items
        const li = document.createElement('li');
        // checkbox label
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
        checkmark.setAttribute('class', 'checkmark');
        musicArt.setAttribute('class', 'music-art');
        musicInfo.setAttribute('class', 'music-info');
        
        // add the checkbox input and checkbox span icon to checkbox container
        checkboxContainer.appendChild(checkmark);
        checkboxContainer.appendChild(checkboxInput);
        
        // music cover
        musicCoverImage.src = playlist[index].cover;
        
        musicArt.appendChild(musicCoverImage);
        
        musicInfo.innerHTML = `<h1>${playlist[index].title}</h1>
        <h2>${playlist[index].artist}</h2>`;
        
        li.setAttribute('id', index);
        li.appendChild(checkboxContainer);
        li.appendChild(musicArt);
        li.appendChild(musicInfo);

        // add the item to playlist container
        playlistContainer.appendChild(li);
    }
}