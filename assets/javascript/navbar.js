    
    var nav = document.getElementById("nav");
    var closeNavIcon = document.getElementById("close-nav-icon");
    var openNavIcon = document.getElementById("open-nav-icon");
    var overlay = document.getElementById("overlay");

    // mở navbar
    openNavIcon.onclick = function(e) {
        nav.style.width = "65vw";
        closeNavIcon.style.display ="block";
        overlay.style.display = "block";
        // window.addEventListener('resize',setSizeClose);
    }

    window.addEventListener('resize',setSizeClose);
    
    // hàm xử lí khi thay đổi trình duyệt
    function setSizeClose() {
        // khi trình duyệt > size của tablet, trình duyệt tự trả về navbar của PC
        if(window.matchMedia('(min-width: 1025px)').matches) {
            nav.style.width = "auto";
            openNavIcon.style.display = "none";

        }
        // khi thay đổi size trình duyệt, navbar tự động đóng
        else {
            nav.style.width = "0";
            closeNavIcon.style.display = "none";
            openNavIcon.style.display = "block";
            overlay.style.display = "none";
        }
    };

    // đóng navbar với button close
    closeNavIcon.onclick = function() {
        closeNavIcon.classList.add('background-color-yellow');
        nav.style.width = "0";
        overlay.style.display = "none";
        setTimeout(function()
            { closeNavIcon.classList.remove('background-color-yellow');
            closeNavIcon.style.display ="none";
            }, 50);

        window.addEventListener('resize', setSizeClose);
    }

    overlay.onclick = function() {
        nav.style.width = "0";
        overlay.style.display = "none";
        window.addEventListener('resize', setSizeClose);
    }
    
    // hàm set style khi chọn phần tử của navbar
    function setStyleClick(currentValue)
    {
        currentValue.classList.add('background-color-yellow');
            setTimeout(function()
            { currentValue.classList.remove('background-color-yellow') }, 300);
    }

    // đóng mở subnav
    var itemNavHeight;
    var itemNav = document.querySelectorAll(".nav-item");
   
    itemNav.forEach(function(currentValue) {
        itemNavHeight = currentValue.clientHeight;
        currentValue.onclick = function(e) {
            if (window.matchMedia('(max-width: 1024px)').matches) {
                if (currentValue.id === 'nav-item-service' || currentValue.id === 'nav-item-event')
                {
                    e.preventDefault();
                }
            }

            if (currentValue.childNodes.length > 1) {

                if (currentValue.clientHeight == itemNavHeight) {
                    if(window.matchMedia('(max-width: 492px)').matches) {
                        // set height for service subnav
                        if (currentValue.id == 'nav-item-service') {
                            currentValue.style.height = "320px";
                        }
                        // set height for service event
                        else {
                            currentValue.style.height = "220px"; 
                        }
                    }if(window.matchMedia('(min-width: 493px)').matches) {
                        // set height for service subnav
                        if (currentValue.id == 'nav-item-service') {
                            currentValue.style.height = "270px";
                        }
                        // set height for service event
                        else {
                            currentValue.style.height = "160px"; 
                        }
                    }
                    if (window.matchMedia('(min-width: 539px)').matches) {
                        // set height for service subnav
                        if (currentValue.id == 'nav-item-service') {
                            currentValue.style.height = "220px";
                        }
                        // set height for service event
                        else {
                            currentValue.style.height = "160px"; 
                        }
                    }
                    if (window.matchMedia('(min-width: 790px)').matches) {
                          // set height for service subnav
                          if (currentValue.id == 'nav-item-service') {
                            currentValue.style.height = "160px";
                        }
                        // set height for service event
                           else {
                            currentValue.style.height = "160px"; 
                        }
                    }
                    if (window.matchMedia('(min-width: 940px)').matches) {
                        // set height for service subnav
                        if (currentValue.id == 'nav-item-service') {
                          currentValue.style.height = "160px";
                      }
                      // set height for service event
                         else {
                          currentValue.style.height = "100px"; 
                      }
                  }
                }
                    
                else {
                  currentValue.style.height = (itemNavHeight + 1) + 'px';
                }
                currentValue.classList.toggle("showMenu");
        }
    }
    }); 
    
   
    var itemSubNav = document.querySelectorAll(".subnav li");
    itemSubNav.forEach(function(currentValue) {
        currentValue.onclick = function(e) {
            e.stopPropagation();
            setStyleClick(currentValue);
            
        }
    
    });

    