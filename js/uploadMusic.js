const dropArea = document.querySelector('body');
const audio = document.querySelector('#audio')
let uploadedMusicList = {'songsList': '', 'errorList': ''};


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
    const songs = event.dataTransfer.files;

    // uploadedMusicList = songs;
    uploadMusic(songs);
}

function uploadMusic(songs) {
    let musicDataListPromise
    const musicDataList = []
    let errorList = []
    
    for (const song of songs) {
        // url da música
        let musicFileURL = song;

        musicDataListPromise = new Promise((resolve, reject) => {
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
                    let musicData = {
                        title: tag.tags.title,
                        artist: tag.tags.artist,
                        album: tag.tags.album,
                        cover: cover,
                        url: musicFileURL
                    }
                    
                    // adiciona os dados da música a lista de dados
                    musicDataList.push(musicData)
                    resolve({'songs': musicDataList, 'errList': errorList});
                },
                onError: (error) => {
                    reject(error);
                }
            });
        })
    }
    musicDataListPromise.then(function(result) {
        audio.src = URL.createObjectURL(result.songs[0].url);
        uploadedMusicList.songsList = result.songs;
        // uploadedMusicList.errorList = values.errList;
    }).catch(err => {
        console.log(err);
    });
}
