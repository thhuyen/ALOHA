    var scrollIcon = document.getElementById("scroll-head");
    window.onscroll = function() {
        if (document.documentElement.scrollTop > 1600)
        {
            scrollIcon.style.opacity= "1";
        } else {
            scrollIcon.style.opacity= "0";
        }
        scrollIcon.onclick = function() {
            scrollTo(0,0);
        }
    };
