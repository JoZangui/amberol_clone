const dropArea = document.querySelector('body');
const audio = document.querySelector('#audio')
let songsList;


// arrastar conteudo para a página
dropArea.ondragover = (event)=> {
    event.stopPropagation();
    event.preventDefault();
    
    // Style the drag-and-drop as a "copy file" operation.
    event.dataTransfer.dropEffect = 'copy';
}

dropArea.ondrop = (event)=> {
    event.stopPropagation();
    event.preventDefault();
    const audioFiles = event.dataTransfer.files;

    uploadMusic(audioFiles);
}

function uploadMusic(songs) {
    let songsDataPromise;
    const songDataList = [];
    const errorList = [];
    
    songsDataPromise = new Promise((resolve, reject) => {
        for (const song of songs) {
            // url da música
            let musicFileURL = song;

            /* 
                obtem os metadados da música com:
                - título
                - autor;
                - album;
                etc...
            */
            new jsmediatags.Reader(song)
            .read({
                onSuccess: (tag) => {
                    let cover;
                    try {
                        // obtem a imagem de capa da música
                        const data = tag.tags.picture.data
                        const format = tag.tags.picture.format
                        let base64String = ''
                        for (let i = 0; i < data.length; i++) {
                            base64String += String.fromCharCode(data[i]);
                        }
                        cover = `data:${format};base64,${window.btoa(base64String)}`;
                    } catch (error) {
                        // se algum erro acontecer ao recuperar a capa da música ele adiciona a imagem padrão
                        cover = '../images/default-cover-image.png';
                    }

                    // cria o objecto com as informações recebidas
                    let songData = {
                        title: tag.tags.title,
                        artist: tag.tags.artist,
                        album: tag.tags.album,
                        cover: cover,
                        url: musicFileURL
                    }
                    
                    // adiciona os dados da música a lista de dados
                    songDataList.push(songData)
                    resolve(songDataList);
                },
                onError: (error) => {
                    let errorDetails = {songName: song.name, errorinfo: error.info}
                    errorList.push(errorDetails);
                    reject(errorList);
                }
            });
        }
    }).then(function(songs) {
        audio.src = URL.createObjectURL(songs[0].url);
        songsList = songs;
    }).catch((error) => {
        console.log(error);
    });
}