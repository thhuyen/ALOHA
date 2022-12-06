    var formRegister = document.querySelector('.modal-register');
    var formPayment = document.querySelector('.modal-payment');
    var btnCloseRegister = document.getElementById('icon-close-register');
    var btnClosePayment = document.getElementById('icon-close-payment');
    var btnFinish = document.querySelector('.button-finish');
    var btnBack = document.querySelector('.button-back');

    var fullnameRegister = document.getElementById('fullname-register');
    var phoneRegister = document.getElementById('phone-register');
    var emailRegister = document.getElementById('email-register');
    var checkinRegister = document.getElementById('checkin-day-register');
    var checkoutRegister = document.getElementById('checkout-day-register');
    var typeRoomRegister = document.getElementById('type-room-register');
    var amountOfRoomRegister = document.getElementById('number-room-register');

    var fullnamePayment = document.querySelector('.fullname-payment');
    var phonePayment = document.querySelector('.phone-payment');
    var emailPayment = document.querySelector('.email-payment');
    var checkinPayment = document.querySelector('.checkin-payment');
    var checkoutPayment = document.querySelector('.checkout-payment');
    var typeRoomPayment = document.querySelector('.type-room-payment');
    var amountOfRoomPayment = document.querySelector('.amount-room-payment');

    var groupBtnBookNow = document.querySelectorAll('.btn-booknow');

    // hàm xử lí khi click button đặt ngay
    groupBtnBookNow.forEach(function(currentElement) {
        currentElement.onclick = function() {
            formRegister.classList.add('open');
        
            switch(currentElement.id) {
                case 'btn-single':
                    typeRoomRegister.options[0].text = "Phòng đơn";
                    break;
                case 'btn-double':
                    typeRoomRegister.options[0].text = "Phòng đôi";
                    break;
                default:  typeRoomRegister.options[0].text = "Phòng bốn";
            }
        }
    });

    // hàm xử lí khi click button close register form
    btnCloseRegister.onclick = function() {
        formRegister.classList.remove('open');
        normalStyle(checkinRegister);
        normalStyle(checkoutRegister);
    }

    // hàm xử lí khi click button close payment form
    btnClosePayment.onclick = function() {
        formPayment.classList.remove('open');
    }

    var errorName = true; // biến check để thông qua form
    var errorPhone = true; // biến check để thông qua form
    var errorMail = true; // biến check để thông qua form
    var errorDate = {
        'checkin': true,
        'checkout': true
    };

    // style khi nhập lỗi
    function errorStyle(currentElement) {
        currentElement.style.border = '2px solid red';
        currentElement.style.color = 'red';
    }

    // style khi hết lỗi
    function normalStyle(currentElement) {
        currentElement.style.border = '1px solid #F9B456';
        currentElement.style.color = 'black';
    }

    // style khi input 
    function inPutStyle(currentElement) {
        currentElement.oninput = function() {
            normalStyle(currentElement);
        };
    }

    // style khi click
    function clickStyle(currentElement, text) {
        currentElement.onclick = function() {
            if(currentElement.value.includes(text)) {
                currentElement.value = '';
            }
        }
    }
    // Set điều kiện nhập cho từng input thuộc 1. Thông tin khách hàng
    var elementsInput = document.querySelectorAll('.input-form.client');
    elementsInput.forEach(function(currentElement) {
        currentElement.onblur = function() {
            var text = 'Vui lòng nhập';
            errorStyle(currentElement);
            if (currentElement.value == '' || currentElement.value.includes("Vui lòng"))
            {
                switch(currentElement.id)
                {
                    case 'fullname-register': 
                        currentElement.value = text + ' họ tên';
                        errorName = false;
                        break;
                    case 'phone-register': currentElement.value = text + ' số điện thoại';
                        errorPhone = false;
                        break;
                    case 'email-register': currentElement.value = text + ' email';
                        errorMail = false;
                        break;
                }
            }
            else {   
                switch(currentElement.id)
                {
                    case 'fullname-register': 
                        if (!currentElement.value.includes(' ')) {
                            currentElement.value += ' (Họ tên không hợp lệ!)';
                            errorStyle(currentElement);
                            errorName = false;
                        }
                        else {
                            normalStyle(currentElement);
                            errorName = true;
                        }
                        break;
                    case 'phone-register': 
                        if (/^\d{10}$/.test(currentElement.value) == false) {
                            currentElement.value += ' (Số điện thoại không hợp lệ!)';
                            errorStyle(currentElement);
                            errorPhone = false;
                        }
                        else {
                            normalStyle(currentElement);
                            errorPhone = true;
                        }
                        break;
                    case 'email-register': 
                        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(currentElement.value) == false) {
                            currentElement.value += ' (Email không hợp lệ!)';
                            errorStyle(currentElement);
                            errorMail = false;
                        }
                        else {
                            normalStyle(currentElement);
                            errorMail = true;
                        }
                        break;
                    }  
                }
            }   
            inPutStyle(currentElement);
            currentElement.onclick = function() {
                if (currentElement.value.includes("Vui lòng") || currentElement.value.includes(" không hợp lệ")) {
                    currentElement.value = '';
            }
        }     
    }); 

    // các xử lí với input số lượng phòng
    amountOfRoomRegister.onblur = function() {
        if (+amountOfRoomRegister.value > 5) {
            alert('Số lượng phòng đặt ngay tối đa là 5, nếu bạn muốn đặt nhiều hơn, vui lòng gọi điện cho chúng tôi để đặt phòng với số lượng lớn!');
            amountOfRoomRegister.value = 5;
        } 
        if (+amountOfRoomRegister.value < 1) {
            alert('Số lượng phòng không được bé hơn 1!');
            amountOfRoomRegister.value = 1;
        } 
    }; 
    inPutStyle(amountOfRoomRegister);

    // các xử lí với ngày đặt trong form đặt phòng
    const DATE = new Date();
    var countDay;
    function calculateDate(date, currentElement) { 
        let [dd, mm, yyyy] = currentElement.value.split('/');
        let newDate = new Date([mm, dd, yyyy].join('-'));
           
        const startDate  = date;
        const endDate    = newDate;

        const diffInMs   = new Date(endDate) - new Date(startDate)
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        
        countDay = Math.floor(diffInDays);
    }

    checkinRegister.addEventListener('blur', function() {
        if (checkinRegister.value == '') {
            alert('Vui lòng nhập ngày đặt!')
            errorDate.checkin = false;
            errorStyle(checkinRegister);
        }
        else {
            calculateDate(DATE, checkinRegister);
            if (countDay > 28 || countDay < 0) {
                alert('Ngày đặt không được vượt quá ngày hiện tại 4 tuần hoặc sớm hơn ngày hiện tại!');
                errorStyle(checkinRegister);
                checkinRegister.value = '';
                errorDate.checkin = false;
            }
            else {
                errorDate.checkin = true;
            }
        }
    });
    checkinRegister.addEventListener('click', function() {
        normalStyle(checkinRegister);
    });
    checkinRegister.addEventListener('change', function() {
        let StartDate = checkinRegister.value;
        let EndDate = checkoutRegister.value;
        let start = new Date(StartDate);

        if (start.getTime() >= new Date(EndDate).getTime()) {
            alert("Ngày đặt phòng phải trước ngày trả phòng!");
            checkoutRegister.value ='';
            errorDate.checkout = false;
            errorStyle(checkoutRegister);
        }

    });

    // các xử lí với ngày trả trong form đặt phòng
    checkoutRegister.addEventListener('blur', function() {
        let StartDate = checkinRegister.value;
        let EndDate = checkoutRegister.value;
        let start = new Date(StartDate);

        if (checkinRegister.value === '') {
            alert("Vui lòng nhập ngày đặt trước!");
            checkoutRegister.value = '';
            errorDate.checkout = false;
        }
        else if (checkoutRegister.value === '') {
            alert('Vui lòng nhập ngày trả!');
            errorDate.checkout = false;
            errorStyle(checkoutRegister);
        }
        
        else if (start.getTime() >= new Date(EndDate).getTime()) {
            alert("Ngày trả phòng phải lớn hơn ngày đặt phòng!");
            errorDate.checkout = false;
            errorStyle(checkoutRegister);
        }
        else {
            errorDate.checkout = true;
        }
        
    });
    checkoutRegister.addEventListener('click', function() {
        normalStyle(checkoutRegister);
    });

     // mở form thanh toán
     function openFormPayment() {
        if (!errorName || !errorPhone || !errorMail || !errorDate.checkin || !errorDate.checkout) {
            alert('Thông tin đăng ký chưa đầy đủ hoặc chưa hợp lệ!');
        }
        else if (fullnameRegister.value === '' || phoneRegister.value === '' ||  emailRegister.value === '' || checkinRegister.value === '' || checkoutRegister.value === '') {
            alert('Thông tin đăng ký chưa đầy đủ!');
        }
        else if (errorName && errorPhone && errorMail && errorDate.checkin && errorDate.checkout)
        {
            formPayment.classList.add('open');
            formRegister.classList.remove('open');
            fullnamePayment.innerHTML = 'Họ tên: ' + fullnameRegister.value;
            phonePayment.innerHTML = 'SĐT: '+ phoneRegister.value;
            emailPayment.innerHTML = 'Email: ' + emailRegister.value;
            checkinPayment.innerHTML = 'Ngày đặt: ' + checkinRegister.value;
            checkoutPayment.innerHTML = 'Ngày trả: ' + checkoutRegister.value;
            typeRoomPayment.innerHTML = 'Loại phòng: ' + typeRoomRegister.value;
            amountOfRoomPayment.innerHTML = 'Số lượng: ' + amountOfRoomRegister.value;
        }
        
    }
   
    btnBack.onclick = function() {
        formPayment.classList.remove('open');
        formRegister.classList.add('open');
    }