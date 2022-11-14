    var formRegister = document.querySelector('.modal-register');
    var formPayment = document.querySelector('.modal-payment');
    var btnCloseRegister = document.getElementById('icon-close-register');
    var btnClosePayment = document.getElementById('icon-close-payment');
    var btnFinish = document.querySelector('.button-finish');
    var btnBack = document.querySelector('.button-back');
    
    var checkinHome = document.getElementById("check-in");
    var checkoutHome = document.getElementById("check-out");
    var adults = document.getElementById('adults');
    var kids = document.getElementById('kids');
    var peopleTotal = document.getElementById('people');
    var priceRoom = document.getElementById('price-room');

    
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
    

    // set ngày đặt mặc định cho ngày đặt 
    const DATE = new Date();
	let date = new Date(DATE.setHours(0, 0, 0, 0));
    let dayReal = (date.getDate()).toString();
    let monthReal = '0' + ((date.getMonth() + 1).toString());
    let yearReal = date.getFullYear().toString();
    let currentDate = `${yearReal}-${monthReal}-${dayReal}`;
    checkinHome.value = currentDate;

    checkinHome.onblur = function() {
        calculateDate(DATE, checkinHome);
        if (countDay > 28 || countDay < 0) {
            alert('Ngày đặt không được vượt quá ngày hiện tại 4 tuần hoặc sớm hơn ngày hiện tại!');
            checkinHome.value = currentDate;
        }
    }

    // hàm ràng buộc điều kiện ngày trả lớn hơn ngày đặt
    function compareDate() {
        var StartDate = checkinHome.value;
        var EndDate = checkoutHome.value;
        var start = new Date(StartDate);
    
        if (start.getTime() >= new Date(EndDate).getTime()) {
              alert("Ngày trả phòng phải lớn hơn ngày đặt phòng!");
              $("#check-out").val(new Date(start.setDate(start.getDate() + 1)).toISOString().split('T')[0]);
              return false;
        }
        return true;
    }

    //hàm hiển thị dd mm yyyy 
    var getYear, getMonth, getDay, dateForm;
    function getDate(text) {
        if(text != '') {
            getYear = text.slice(0,4);
            getMonth = text.slice(5,7);
            getDay = text.slice(8,11);
            dateForm = getDay + '/' + getMonth + '/' + getYear;
            return dateForm;
        }
        return text;
    }

    // các xử lí với người lớn và trẻ em input 
    function checkAmountPeople(currentElement) {
        currentElement.onblur = function() {
            if (currentElement.value > 4) {
                alert('Số lượng tối đa là 4');
                currentElement.value = 4;
            }
        }
        inPutStyle(currentElement);
    }
    checkAmountPeople(adults);
    checkAmountPeople(kids);

    var dateCheckinRegister;
    // hàm xử lí khi click button đặt ngay
    function OpenForm() {
        var numberAdult = +adults.value;
        var numberKid = +kids.value;
        var total = numberAdult + numberKid

        if (adults.value == '' || kids.value == '' || checkoutHome.value =='') {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        if (total == 0) {
            alert('Số lượng người phải lớn hơn 0');
            return;
        }
        if (total > 4) {
            alert('Số lượng người lớn và trẻ em tối đa là 4 người, bạn có thể đặt thêm phòng trong đơn đăng ký phòng');
            return;
        }
        formRegister.classList.add('open');
        let [dd, mm, yyyy] = getDate(checkinHome.value).toString().split('/');
        dateCheckinRegister = new Date([mm, dd, yyyy].join('-'));
        checkinRegister.value = getDate(checkinHome.value)
        checkoutRegister.value = getDate(checkoutHome.value);
        peopleTotal.value = total;

        if (total == 3) {
            typeRoomRegister.options[0].text = "Phòng đôi";
            if (typeRoomRegister.length < 2) {
                var newOption = document.createElement("option");
                newOption.text = "Phòng bốn";
                typeRoomRegister.add(newOption);
            }
        }
        else {
            typeRoomRegister.remove(1);
            if (total == 1) {
                typeRoomRegister.options[0].text = "Phòng đơn";
            }
            else if (total == 2) {
                typeRoomRegister.options[0].text = "Phòng đôi";
            }
            else if (total == 4) {
                typeRoomRegister.options[0].text = "Phòng bốn";
            }
        }
    }

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

    var errorName; // biến check để thông qua form
    var errorPhone; // biến check để thông qua form
    var errorMail; // biến check để thông qua form
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
        currentElement.style.border = '1px solid black';
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

    // hàm kiểm tra điều kiện date trong form đăng ký có đúng định dạng ko
    const isDate = (date) => {
        return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
    }
   

    // style khi blur với input ngày đặt, ngày trả
    var countDay, count;
    function blurStyle(currentElement, text, date, errorCheck) {
        if(currentElement.value == '') {
            currentElement.value = 'Không được bỏ trống ' + text;
            errorStyle(currentElement);
        }

        // kiểm tra định dạng date time
        let value = currentElement.value;
        let [dd, mm, yyyy] = value.split('/');
        let dateFormatValue = [mm, dd, yyyy].join('/');
        
        if (!value.includes('bỏ trống')) {
            if (!isDate(dateFormatValue) || currentElement.value.includes('-') || currentElement.value.length < 8) {
                count = 1;
                alert('Thứ tự nhập phải theo định dạng ngày/tháng/năm và hợp lệ!');
                errorStyle(currentElement);
                switch (currentElement.id) {
                    case 'checkin-day-register': errorCheck.checkin = false;
                        break;
                    default: errorCheck.checkout = false;
                }
            }
            else {
                count = 0; // biến count xuất hiện để ko bị trùng lắp alert 
            }
        }        

         // gán biến dateCheckingRegister để lát nữa gọi hàm truyền tham số vô
         if (currentElement.id == 'checkin-day-register') {
            dateCheckinRegister = new Date([mm, dd, yyyy].join('-'));
        }  
        
    } 

    // hàm tính toán ngày tháng năm để set điều kiện
    function calculateDate(date, currentElement) { 
        let [dd, mm, yyyy] = currentElement.value.split('/');
        let newDate = new Date([mm, dd, yyyy].join('-'));
           
        const startDate  = date;
        const endDate    = newDate;

        const diffInMs   = new Date(endDate) - new Date(startDate)
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        
        countDay = Math.floor(diffInDays);
    }

    // các xử lí với check in đơn đăng ký phòng
    function checkinDateInput(currentElement) {
        currentElement.onblur = function() {

            calculateDate(DATE, currentElement);
            blurStyle(currentElement, 'ngày đặt', date, errorDate);
            if (count == 0) {
                if (countDay > 28 || countDay < 0) {
                    alert('Ngày đặt không được vượt quá ngày hiện tại 4 tuần hoặc sớm hơn ngày hiện tại!');
                    errorStyle(currentElement);
                    errorDate.checkin = false;
                }
                else {
                    errorDate.checkin = true;
                }
            }      
        } 
    }   
    clickStyle(checkinRegister, 'bỏ trống');
    checkinDateInput(checkinRegister);
    inPutStyle(checkinRegister);

    // các xử lí với check out đơn đăng ký phòng
    function checkoutInput(currentElement) {
        currentElement.onblur = function() {
            calculateDate(dateCheckinRegister, currentElement); 
            if (checkinRegister.value == '' || checkinRegister.value.includes('bỏ')) {
                alert('Vui lòng nhập ngày đặt trước ngày trả!');
                currentElement.value = '';
            }
            else {
                blurStyle(currentElement, 'ngày trả', dateCheckinRegister, errorDate);
                
                // kiểm tra ngày trả có lớn hơn ngày đặt hay không
                if (count == 0) {
                    if (countDay < 0) {
                        alert('Ngày trả không được bé hơn ngày đặt');
                        errorDate.checkout = false;
                        errorStyle(currentElement);                    
                    } 
                    else if (countDay == 0) {
						alert('Ngày trả không được bằng ngày đặt');
                        errorDate.checkout = false;
						errorStyle(currentElement); 
					}
                    else {
                        errorDate.checkout = true;
                    }
                }
            }
        }
    }
        clickStyle(checkoutRegister, 'bỏ trống');
        checkoutInput(checkoutRegister);
        inPutStyle(checkoutRegister);


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

    function openFormPayment() {
        if (checkinRegister.value.includes('bỏ trống')) {
            errorDate.checkin = false;
        }
        if (checkoutRegister.value.includes('bỏ trống')) {
            errorDate.checkout = false;
        }
        if (!errorName || !errorPhone || !errorMail || !errorDate.checkin || !errorDate.checkout) {
            alert('Thông tin đăng ký chưa đầy đủ hoặc chưa hợp lệ!');
            return;
        }
        if (errorName && errorPhone && errorMail && errorDate.checkin && errorDate.checkout)
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