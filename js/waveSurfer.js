import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js'
/*
cria um objecto com os dados da música e
    adiciona à lista "musicDataList"
    
    ------------- IMPORTANTE ----------------------
    
    a maioria das músicas baixadas ilegalmente não contém metadados, isso pode gerar um erro ao tentar obeter os dados dessa música.
*/

const audio = document.querySelector('#audio');
const musicTitle = document.querySelector('.music-title');
const artist = document.querySelector('.artist');
const musicAlbum = document.querySelector('.music-album');
const cover = document.querySelector('.album-art');
const body = document.querySelector('body');
const playPauseButton = document.querySelector('.play-pause--button');
const playPauseIcon = document.querySelector('.play-pause--icon');
const backwardButton = document.querySelector('.backward-button');
const forwardButton = document.querySelector('.forward-button');
const volumeBarInput = document.querySelector('#volume-bar');
var fill = document.querySelector('.fill');
let defaultVolumeValue = volumeBarInput.value / 100
let playlist;


const wavesurfer = WaveSurfer.create({
    container: '.waveform',
    waveColor: 'rgba(252, 252, 252, 0.144)',
    progressColor: '#ffffff',
    height: 46,
    barWidth: 2,
    barGap: 2,
});

audio.onloadedmetadata = () => {
    let musicIndex;
    let numberOfPlaylistItems = playlistContainer.childElementCount
    playlist = uploadedMusicList.songsList;
    
    /* 
    caso o número de itens na playlist seja igual a 0(zero) quando um áudio for carregado, quer dizer que estamos carregando itens pela primeira vez...
    ... então ele adicionará os items carregados à playlist, se não ele não adicionará novos itens a playlist 
    */
   if(numberOfPlaylistItems === 0) {
       displayPlaylistItems(playlist);
       musicIndex = 0;
    } else {
        musicIndex = currentSong;
    }

    changeMusicInfo(musicIndex);
    wavesurfer.load(audio.src);
}


/*
a barra de preencimento começa já com o valor predefinido no volumeBar input(apenas para o chrome)
*/
fill.style.width = volumeBarInput.value + '%';
wavesurfer.setVolume(defaultVolumeValue);


playPauseButton.onclick = ()=> {
    let isPlaying = wavesurfer.isPlaying();
    
    if (isPlaying) {
        wavesurfer.pause();
    } else {        
        wavesurfer.play();
    }
}

backwardButton.onclick = () => {
    let song;
    
    if (currentSong > 0) {
        currentSong--;
        song = URL.createObjectURL(playlist[currentSong].url);

        wavesurfer.load(song);
        changeMusicInfo(currentSong);
    }
}

forwardButton.onclick = () => {
    let song;
    
    if (currentSong < playlist.length-1) {
        currentSong++;
        song = URL.createObjectURL(playlist[currentSong].url);

        wavesurfer.load(song);
        changeMusicInfo(currentSong);
    }
}

volumeBarInput.oninput = ()=> {
    let currentVolume = volumeBarInput.value / 100;
    wavesurfer.setVolume(currentVolume);

    /*
        muda a largura do preenchimento
        da barra de volume(apenas para o chrome)
    */
    fill.style.width = volumeBarInput.value + '%';
}

function changeMusicInfo(musicIndex) {
    let defaultCoverImage = '../images/default-cover-image.png'
    musicTitle.innerHTML = playlist[musicIndex].title;
    artist.innerHTML = playlist[musicIndex].artist;
    musicAlbum.innerHTML = playlist[musicIndex].album;
    cover.src = playlist[musicIndex].cover ? playlist[musicIndex].cover : defaultCoverImage;

    if(playlist[musicIndex].cover !== defaultCoverImage) {
        body.style.backgroundImage = `url(${playlist[musicIndex].cover})`;
    } else {
        body.style.backgroundImage = 'unset';
    }
}

function convertTimeToSecMinHour(time) {
    /*
        convert o tempo dado em segundo
        para hora, minuto e segundo
        -------------------
        retorna um objecto com a hora, minuto e segundo
    */

    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - (hours * 3600)) / 60);
    let seconds = Math.floor(time - (hours * 3600) - (minutes * 60))
    .toString().padStart(2, '0'); // padStart formata o texto de 0 para 00

    const fulltime = {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }

    return fulltime;
}

function displayCurrentTime() {
    // apresenta o tempo actual da música
    
    const currentTime = wavesurfer.getCurrentTime()
    const currentTimeSpan = document.querySelector('.current-time--span');
    
    let time = convertTimeToSecMinHour(currentTime);
    let timeString = `${time.minutes}:${time.seconds}`;
    
    currentTimeSpan.innerHTML = timeString;
}

function displayCurrentDuration() {
    // apresenta o tempo restante da música
    
    let durationSpan = document.querySelector('.duration--span');
    let duration = wavesurfer.getDuration();
    let currentTime = wavesurfer.getCurrentTime();
    
    let currentDuration = duration - currentTime
    let time = convertTimeToSecMinHour(currentDuration);

    durationSpan.innerHTML = `-${time.minutes}:${time.seconds}`;
}

wavesurfer.on('audioprocess', () => {
    displayCurrentTime();
    displayCurrentDuration();
});

wavesurfer.on('ready', ()=> {
    // apresenta a duração da música
    
    let durationSpan = document.querySelector('.duration--span');
    let duration = wavesurfer.getDuration();
    
    let time = convertTimeToSecMinHour(duration);

    durationSpan.innerHTML = `${time.minutes}:${time.seconds}`;
});

wavesurfer.on('play', ()=> {
    playPauseIcon.classList.add('bi-pause-fill');
    playPauseIcon.classList.remove('bi-play-fill');
});

wavesurfer.on('pause', ()=> {
    playPauseIcon.classList.add('bi-play-fill');
    playPauseIcon.classList.remove('bi-pause-fill');
});

// quando a música terminar de ser carregada pelo wavesurfer ele vai reproduzir
wavesurfer.on('decode', ()=> {
    if(wavesurfer.isPlaying() === false)
        wavesurfer.play();
});

wavesurfer.on('finish', ()=> {
    let song;    
    // se não for a ultima música busque a próxima
    if(currentSong < playlist.length - 1) {
        currentSong ++;
        song = URL.createObjectURL(playlist[currentSong].url);
        wavesurfer.load(song);
        changeMusicInfo(currentSong);
    }else {
        wavesurfer.stop();
    }
});