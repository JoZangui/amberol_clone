let btnDisplaySelectionOption = document.querySelector('.display-selection-option--button');
let playlist;

function selectTheSongToRemove() {
    const playlistFooter = document.querySelector('.playlist-footer');
    const musicArt = document.querySelectorAll('.music-art');
    const checkboxContainer = document.querySelectorAll('.checkbox-container');
    const checkboxInput = document.querySelectorAll('.checkbox-input');
    const infoTexto = document.querySelector('.info-texto');
    const btnRemoveTheSong = document.querySelector('.delete-button-container');
    // lista de inputs checkbox
    const checkboxInputList = []
    const btnSelectAll = document.querySelector('.select-all--button');
    const btnDisplaySearchBar = document.querySelector('.display-search-bar--button');
    const searchBarContainer = document.querySelector('.search-bar-container');
    let checkedInputs;
    
    function checkedItems() {
        // cria uma lista com todos os inputs com checked igual a true
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
    
    btnSelectAll.onclick = ()=> {
        checkedInputs = checkboxInputList.map((input)=> {
            input.checked = true;
            return input
        });
    
        infoTexto.innerHTML = checkedInputs.length > 1 ? 
            `${checkedInputs.length} músicas selecionadas` 
            : `${checkedInputs.length} música selecionada`;
    }
    
    btnDisplaySelectionOption.onclick = function() {
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

    btnRemoveTheSong.onclick = ()=> {
        if(checkedInputs) {
            checkedInputs.forEach((input) => {
                // obtem o li pai do input
                let songLi = input.parentElement.parentElement;
                // elimina a música da lista de músicas
                playlist.splice(input.id, 1);
                // remove o li da ul(musicList)
                musicList.removeChild(songLi);

                // obtem todos os li's de musicList para poder reordenar os id's
                let li_s = musicList.querySelectorAll('li');
                // reordena os id dos li's e dos seus respectivos inputs
                for (let index = 0; index < li_s.length; index++) {
                    li_s[index].id = index;
                    li_s[index].querySelector('input').id = index;
                }
            });
            removeAllCheckedFromInputs(); // limpa a lista de inputs com checked = true
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
    
    
    btnDisplaySearchBar.onclick = function() {
        if (this.classList.contains('select-option--active')) {
            searchBarContainer.style.display = 'none';
            this.classList.remove('select-option--active');
        } else {
            searchBarContainer.style.display = 'flex';
            this.classList.add('select-option--active');
        }
    }
}