const detailsWrap = document.querySelector('.details-wrapper'),
      detailsInfo = document.querySelector('.details-info'),
      detailsClose = document.querySelector('.details-close'),
      chooseWrap = document.querySelector('.choose-wrapper'),
      chooseBtn = document.querySelector('.choose-btn'),
      chooseBox = document.querySelector('.choose-box'),
      addToCart = document.querySelector('.constructor-add');

detailsWrap.addEventListener('click', () => {
    detailsWrap.classList.toggle('active');

    if(detailsWrap.classList.contains('active')) {
        detailsInfo.style.display = 'block';
    } else {
        detailsInfo.style.display = 'none';
    }
});

detailsClose.addEventListener('click', () => {
    detailsWrap.classList.toggle('active');
    detailsInfo.style.display = 'none';
});

chooseWrap.addEventListener('click', () => {
    chooseWrap.classList.toggle('active');
    if(chooseWrap.classList.contains('active')) {
        chooseBox.style.display = 'block';

        chooseBox.addEventListener('click', (e) => {
            
            if (e.target) {
                if(e.target.classList.contains('pack')) {
                    chooseBtn.innerHTML = e.target.innerHTML;
                }       
            }
        });
    } else {
        chooseBox.style.display = 'none';
    }
});

// set slider settings
$( ".drag" ).slider({
    animate: "slow",
    range: "min",
    min: 0,
    max: 100,    
    value: 0,
    step: 1
});


// disable last drag-slider
$( ".drag.corn" ).slider( "disable" );


// set percent value
const dragItems = document.querySelectorAll('.drag');
dragItems.forEach(item => {
    $( item ).slider({
        slide : function(event, ui) {
            $(item.nextSibling.nextSibling).text(`${ui.value}%`);        
        }
    });
});


// add to card
addToCart.addEventListener("click", (e) => {
    e.preventDefault();

    const dragSoybean = $( ".drag.soybean" ).slider( "value" ),
        dragSesame = $( ".drag.sesame" ).slider( "value" ),
        dragWheat = $( ".drag.wheat" ).slider( "value" ),
        dragCorn = $( ".drag.corn" ).slider( "value" );
        pack = 0;

    if (chooseBtn.textContent !== 'Choose your pack') {
        if(chooseBtn.textContent === 'small pack') {
            pack = '0.50 kg';
        } else if(chooseBtn.textContent === 'medium pack') {
            pack = '0.66 kg';
        } else {
            pack = '1.50 kg';
        }
    }

    const numberOfComponents = document.querySelector('.semen-count');
    const tbody = document.querySelector('.details-table-body');

    addComponent(dragSoybean, dragSesame, dragWheat, dragCorn, pack);

    function addComponent(soybean, sesame, wheat, corn, pack) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><img src="img/header/info/semen.png" alt=""></td>
            <td class="soybean-percent">${soybean}%</td>
            <td class="sesame-percent">${sesame}%</td>
            <td class="wheat-percent">${wheat}%</td>
            <td class="corn-percent">${corn}%</td>
            <td class="weight">${pack}</td>
            <td class="price">81.50 <span>&#8364</span></td>
            <td class="result-reset"><img src="img/header/info/result-reset.png" alt=""></td>
        `;
        tbody.append(newRow);
    }

    // set number of components
    let numComp = 0;

    numberOfRows(tbody, numberOfComponents);

    function numberOfRows(tableBody, numWrapper) {
        let rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
            numComp++;
        });
        numWrapper.textContent = `${numComp}`;
    }

    //reset component

    const resetComponent = document.querySelectorAll('.result-reset');

    resetComponent.forEach(item => {
        item.addEventListener('click', (e) => {
            item.parentElement.remove();
            numberOfComponents.textContent = `${numComp - 1}`;
        });   
    });
});



