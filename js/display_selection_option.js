let displaySelectionOptionButton = document.querySelector('.display-selection-option--button');
let playlistFooter = document.querySelector('.playlist-footer');
let musicArt = document.querySelectorAll('.music-art');
let checkboxContainer = document.querySelectorAll('.checkbox-container');
let checkboxInput = document.querySelectorAll('.checkbox-input');
let infoTexto = document.querySelector('.info-texto');
// lista de inputs checkbox
let checkboxInputList = []
let selectAllButton = document.querySelector('.select-all--button');
let displaySearchBarButton = document.querySelector('.display-search-bar--button');
let searchBarContainer = document.querySelector('.search-bar-container');

function checkedItems() {
    let checkedInputs = checkboxInputList.filter(
        (input)=> {
            return input.checked;
        }
    );

    if (checkedInputs.length > 0) {
        infoTexto.innerHTML = checkedInputs.length > 1 ? 
            `${checkedInputs.length} músicas selecionadas` 
            : `${checkedInputs.length} música selecionada`;
    } else {
        infoTexto.innerHTML = 'Nenhuma múscia selecionada';
    }
}

function removeAllCheckedInput() {
    checkboxInputList.filter(
        (input)=>{
            return input.checked;
        }
    ).map((checkedInput) => {
        checkedInput.checked = false;
    });

    infoTexto.innerHTML = 'Nenhuma múscia selecionada';
}

selectAllButton.onclick = ()=> {
    let checkedInputs = checkboxInputList.map((input)=> {
        input.checked = true;
    })

    infoTexto.innerHTML = checkedInputs.length > 1 ? 
        `${checkedInputs.length} músicas selecionadas` 
        : `${checkedInputs.length} música selecionada`;
}

displaySelectionOptionButton.onclick = function() {
    if (this.classList.contains('active')) {
        playlistFooter.style.display = 'none';

        checkboxContainer.forEach(
            (checkbox)=> {
                checkbox.style.display = 'none';
            },
            console.log('Hi')
        )
        musicArt.forEach(
            (image)=> {
                image.style.display = 'block'
            }
        )

        this.classList.remove('active');
        removeAllCheckedInput();
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

        this.classList.add('active');
    }
}

checkboxInput.forEach((input)=> {
    // adiciona cada checkbox input a lista
    checkboxInputList.push(input);
})

checkboxInputList.map((input)=> {
    /*
        adiciona um evento onclick à cada input checkbox com a função checkedItems(esse função apresenta quantos inputs têm o checked = True)
    */
    input.onclick = checkedItems
})


displaySearchBarButton.onclick = function() {
    if (this.classList.contains('active')) {
        searchBarContainer.style.display = 'none';
        this.classList.remove('active');
    } else {
        searchBarContainer.style.display = 'flex';
        this.classList.add('active');
    }
}