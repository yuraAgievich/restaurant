'use strict';

window.onload = function () {


    //-------------------------------changeImgs---------------------------------------
    function changeImg() {
        for(var i = 0; i< smallImg.length; i++) {
            if(smallImg[i].hasAttribute('style')){
                smallImg[i].removeAttribute('style');
            }
        }
        this.style.border = "1px solid #23df07";
        this.style.opacity = ".5";
        var url = this.getAttribute('data-src');
        var elem = largeImgs.children[0];
        elem.setAttribute('src', url);
    }

    let smallImg = document.getElementsByClassName('smallImg');
    smallImg[0].style.border = "1px solid #23df07";
    smallImg[0].style.opacity = ".5";


    for(var i = 0; i < smallImg.length; i++) {
        smallImg[i].onclick = changeImg;
    }

    //------------------------------------scrollTop------------------------------------

    function createElem(name, id, where, e, fun) {
        let elem = document.createElement(name);
        if (id != '') elem.id = id;
        if (e != '') elem.addEventListener(e, fun);
        where.appendChild(elem);
    }

    window.onscroll = function () {

        if ((document.documentElement.scrollTop > 300) && (!document.querySelector('#buttonScrollTop'))){
            createElem('div','buttonScrollTop', document.body, 'click', thisScrollTop);
            setTimeout(function () {
                buttonScrollTop.className = 'active';
            },0);
        }

        if(document.documentElement.scrollTop < 300 && document.querySelector('#buttonScrollTop')){
            buttonScrollTop.removeAttribute('class');
            buttonScrollTop.remove();
        }
    }

    function thisScrollTop() {
        let topVal = document.documentElement.scrollTop;

        let x = setInterval(function(){
            if (document.documentElement.scrollTop <= 0) clearInterval(x);
            document.documentElement.scrollBy(0,-45);
        },10);
    }


    //------------------slide content---------------------

    let slideTextDesc = document.querySelector('.slideTextDesc');
    showOtherContent.addEventListener('click', changeHeight);

    function changeHeight() {
        slideTextDesc.classList.toggle('slideOpen');
        if(document.querySelector('.slideOpen'))showOtherContent.innerHTML = 'Скрыть полное описание';
        else showOtherContent.innerHTML = 'Больше информации';
    }

    //------------------------validation form ------------------------------------

    let input = document.querySelectorAll('input[type="text"');

    for(let i = 0; i < input.length; i++){
        input[i].addEventListener('blur', validForm);
    }

    let k = 0;
    function validForm() {

        let regExp = [
            ['firstName',/^[a-zA-Zа-яА-я]{2,15}$/],
            ['email',/^[0-9a-z-_\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i],
            ['phone',/^(8)(0)(29|33|44|25)\d{3}(\d{2}){2}$/]
        ];

        for (let i = 0 ; i<regExp.length; i++) {
            if (regExp[i][0] == this.name){
                if (regExp[i][1].test(this.value)) {
                    ++k;
                    this.disabled = true;
                }
            }
        }
    }

    let sendButoon = document.querySelectorAll('.sendButoon');
    for(let i = 0; i < sendButoon.length; i++){
        sendButoon[i].addEventListener('click', sendBut)
    }

    function sendBut() {
        if(k == 3){

            for(let i = 0; i < input.length; i++){
                input[i].disabled = false;
                if (input[i].type === 'text') input[i].value = '';
            }
            k = 0;

            if(!document.getElementById('okey')){
                createElem('div', 'okey', this.parentNode, '', '');
                setTimeout(function () {
                    okey.className = 'active';
                },0);
                okey.innerHTML = 'Данные отправлены.'
            };

            setTimeout(function () {
                    if(document.getElementById('okey')) {
                        setTimeout(function () {
                            if(document.querySelector('#okey'))okey.remove();
                        },1000);
                        okey.removeAttribute('class');
                    };
            },2000);



        }else{
            if(!document.getElementById('error')){
                createElem('div', 'error', this.parentNode, '', '');

                setTimeout(function () {
                    error.className = 'active';
                },0);
                error.innerHTML = 'Проверьте введенные данные.'
            }

            setTimeout(function () {
                if(document.getElementById('error')) {
                    setTimeout(function () {
                        if(document.querySelector('#error'))error.remove();
                    },1000);
                    error.removeAttribute('class');
                };
            },2000);



        }
    }

    //-------------------------------------open and close contacts-------------------------------------------

    openContacts.onclick = function () {
        document.querySelector('.contactsRestaurant').classList.add('active');
    }

    closeContacts.onclick = function () {

        document.querySelector('.contactsRestaurant.active').style.opacity = '0';
        setTimeout(function () {
            document.querySelector('.contactsRestaurant.active').classList.remove('active');
            document.querySelector('.contactsRestaurant').removeAttribute('style');
        },1000);
    }

}