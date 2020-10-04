window.addEventListener("DOMContentLoaded", () => {

    const detailsWrap = document.querySelector('.details-wrapper'),
        detailsInfo = document.querySelector('.details-info'),
        detailsClose = document.querySelector('.details-close'),
        chooseWrap = document.querySelector('.choose-wrapper'),
        chooseBtn = document.querySelector('.choose-btn'),
        chooseBox = document.querySelector('.choose-box'),
        addToCart = document.querySelector('.constructor-add');


    //toggle details block
    detailsWrap.addEventListener('click', () => {
        detailsWrap.classList.toggle('active');

        if (detailsWrap.classList.contains('active')) {
            detailsInfo.style.display = 'block';
        } else {
            detailsInfo.style.display = 'none';
        }
    });

    //close details block

    detailsClose.addEventListener('click', () => {
        detailsWrap.classList.toggle('active');
        detailsInfo.style.display = 'none';
    });

    // toggle choose pack block

    chooseWrap.addEventListener('click', () => {
        chooseWrap.classList.toggle('active');
        if (chooseWrap.classList.contains('active')) {
            chooseBox.style.display = 'block';

            chooseBox.addEventListener('click', (e) => {

                if (e.target) {
                    if (e.target.classList.contains('pack')) {
                        chooseBtn.innerHTML = e.target.innerHTML;
                    }
                }
            });
        } else {
            chooseBox.style.display = 'none';
        }
    });

    // set slider settings
    $(".drag").slider({
        animate: "slow",
        range: "min",
        min: 0,
        max: 100,
        value: 0,
        step: 1
    });


    // disable last drag-slider
    $(".drag.corn").slider("disable");

    //set count num
    const componentsNum = document.querySelector('.semen-count');
    let numComp = 0;
    componentsNum.textContent = `${numComp}`;

    // set percent value
    const dragItems = document.querySelectorAll('.drag');
    dragItems.forEach(item => {
        $(item).slider({
            slide: function (event, ui) {
                $(item.nextSibling.nextSibling).text(`${ui.value}%`);
            }
        });
    });

    // add to card
    addToCart.addEventListener("click", (e) => {
        e.preventDefault();

        const dragSoybean = $(".drag.soybean").slider("value"),
            dragSesame = $(".drag.sesame").slider("value"),
            dragWheat = $(".drag.wheat").slider("value"),
            dragCorn = $(".drag.corn").slider("value");
        pack = 0;

        if (chooseBtn.textContent !== 'Choose your pack') {
            if (chooseBtn.textContent === 'small pack') {
                pack = '0.50 kg';
            } else if (chooseBtn.textContent === 'medium pack') {
                pack = '0.66 kg';
            } else {
                pack = '1.50 kg';
            }
        }

        //add component

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
        // const componentsNum = document.querySelector('.semen-count');
        // let numComp = 0;
        // console.log(componentsNum);
        // componentsNum.textContent = `${numComp}`;

        numberOfRows(tbody, componentsNum);

        function numberOfRows(tableBody, numWrapper) {
            let rows = tableBody.querySelectorAll('tr');
            rows.forEach(row => {
                numComp++;
            });
            numWrapper.textContent = `${numComp}`;
        }

        //reset component
        resetComponent('.result-reset');

        function resetComponent(deleteBtnsSelector) {
            const deleteBtns = document.querySelectorAll(deleteBtnsSelector);

            deleteBtns.forEach(item => {
                item.addEventListener('click', () => {
                    item.parentElement.remove();
                    componentsNum.textContent = `${numComp - 1}`;
                });
            });
        }
    });

    // typewriting effect
    const introTitle = document.querySelector(".intro-title");

    const text = 'mostly tastes with freshes';
    let typeCount = 0;
    let index = 0;
    let letter = '';

    function type() {
        letter = text.slice(0, ++index);

        introTitle.textContent = letter;

        let id = setTimeout(type, 80);

        if(typeCount === text.length) {
            clearInterval(id);
        }
    }

    type();

    // scroll appear
    function scrollAppear() {
        const aboutText = document.querySelector('.about-text-wrapper');
        // a distance from top of the window to the element
        const aboutPosition = aboutText.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (aboutPosition < screenPosition) {
            aboutText.classList.add("about-text-appear");
        } else {
            aboutText.classList.remove("about-text-appear");
        }
    }
    window.addEventListener('scroll', scrollAppear);

})