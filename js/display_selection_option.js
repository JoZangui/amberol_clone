let displaySelectionOptionButton = document.querySelector('.display-selection-option--button');

function selectMusicOption() {
    const playlistFooter = document.querySelector('.playlist-footer');
    const musicArt = document.querySelectorAll('.music-art');
    const checkboxContainer = document.querySelectorAll('.checkbox-container');
    const checkboxInput = document.querySelectorAll('.checkbox-input');
    const infoTexto = document.querySelector('.info-texto');
    const removeTheSongButton = document.querySelector('.delete-button-container');
    // lista de inputs checkbox
    const checkboxInputList = []
    const selectAllButton = document.querySelector('.select-all--button');
    const displaySearchBarButton = document.querySelector('.display-search-bar--button');
    const searchBarContainer = document.querySelector('.search-bar-container');
    let checkedInputs;
    
    function checkedItems() {
        // cria uma lista com todos os inputs  com checked igual a true
        checkedInputs = checkboxInputList.filter(
            (input)=> {
                return input.checked;
            }
        );
    
        /*
        apresenta o número de músicas(inputs) selecionadas  
        se existir alguma música selecionada(checkbox com checked igual a true)
        */
        if (checkedInputs.length > 0) {
            infoTexto.innerHTML = checkedInputs.length > 1 ? 
                `${checkedInputs.length} músicas selecionadas` 
                : `${checkedInputs.length} música selecionada`;
        } else {
            infoTexto.innerHTML = 'Nenhuma múscia selecionada';
        }
    }
    
    function removeAllCheckedFromInputs() {
        checkboxInputList.filter(
            (input)=>{
                return input.checked;
            }
        ).map((checkedInput) => {
            return checkedInput.checked = false;
        });

        checkedInputs = '';
    
        infoTexto.innerHTML = 'Nenhuma múscia selecionada';
    }
    
    selectAllButton.onclick = ()=> {
        checkedInputs = checkboxInputList.map((input)=> {
            input.checked = true;
            return input
        });
    
        infoTexto.innerHTML = checkedInputs.length > 1 ? 
            `${checkedInputs.length} músicas selecionadas` 
            : `${checkedInputs.length} música selecionada`;
    }
    
    displaySelectionOptionButton.onclick = function() {
        if (this.classList.contains('select-option--active')) {
            playlistFooter.style.display = 'none';
    
            checkboxContainer.forEach(
                (checkbox)=> {
                    checkbox.style.display = 'none';
                }
            )
            musicArt.forEach(
                (image)=> {
                    image.style.display = 'block'
                }
            )
    
            this.classList.remove('select-option--active');
            removeAllCheckedFromInputs();
        } else {
            playlistFooter.style.display = 'flex';
    
            checkboxContainer.forEach(
                (checkbox)=> {
                    checkbox.style.display = 'block';
                }
            )
    
            musicArt.forEach(
                (image)=> {
                    image.style.display = 'none'
                }
            )
    
            this.classList.add('select-option--active');
        }
    }

    removeTheSongButton.onclick = ()=> {
        if(checkedInputs) {
            checkedInputs.forEach((input) => {
                // obtem o li pai do input
                let songLi = input.parentElement.parentElement
                // elimina a música da lista de músicas
                uploadedMusicList.songsList.splice(input.id, 1);
                // remove o li da ul(musicList)
                musicList.removeChild(songLi);
            });
            // obtem todos os li's de musicList para poder reordenar os id's
            let li_s = musicList.querySelectorAll('li');
            // reordena os id dos li's e dos seus respectivos inputs
            for (let index = 0; index < li_s.length; index++) {
                li_s[index].id = index;
                li_s[index].querySelector('input').id = index;
            }
        }
    }
    
    checkboxInput.forEach((input)=> {
        // adiciona cada checkbox input a lista
        checkboxInputList.push(input);
    })
    
    checkboxInputList.map((input)=> {
        /*
            adiciona um evento onclick à cada input checkbox com a função checkedItems(essa função apresenta quantos inputs têm o checked = True)
        */
        input.onclick = checkedItems
    })
    
    
    displaySearchBarButton.onclick = function() {
        if (this.classList.contains('select-option--active')) {
            searchBarContainer.style.display = 'none';
            this.classList.remove('select-option--active');
        } else {
            searchBarContainer.style.display = 'flex';
            this.classList.add('select-option--active');
        }
    }
}