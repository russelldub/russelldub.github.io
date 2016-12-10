var fs = {
  fs_elements: {},

  //launchIntoFullscreen(p5div);
  //https://davidwalsh.name/fullscreen
  launchIntoFullscreen: function(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.mozRequestFullScreen) {
         element.mozRequestFullScreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  },

  addFullScreenControl: function(element, width, height, callback)  {
    fs.fs_elements[element] = {toggle: false, fullscreen: false, width: width, height: height, callback: callback}

    var fs_icon_elem = document.createElement("i");
    fs_icon_elem.setAttribute("class", "fa fa-arrows-alt");
    fs_icon_elem.onclick = function() {fs.fs_elements[element].toggle=true; fs.launchIntoFullscreen(element)};
//    fs_icon_elem.style.color = "white";
    fs_icon_elem.style.position = "relative";
    fs_icon_elem.style.float = "right";
//    fs_icon_elem.style.top = "24px";
//    fs_icon_elem.style.zIndex = "-1";
    element.parentElement.appendChild(fs_icon_elem);
    element.parentElement.style.width = width+"px"
    element.parentElement.style.height = height+"px"

    //http://stackoverflow.com/questions/8796988/binding-multiple-events-to-a-listener-without-jquery
    function addListenerMulti(el, s, fn) {
      var evts = s.split(' ');
      for (var i=0, iLen=evts.length; i<iLen; i++) {
        el.addEventListener(evts[i], fn, false);
      }
    };

    addListenerMulti(document,'webkitfullscreenchange mozfullscreenchange fullscreenchange', function(event) {
        element_keys=Object.keys(fs.fs_elements);
	for(var i = 0 ; i < element_keys.length; ++i) {
          if(fs.fs_elements[element_keys[i]].toggle) {
              fs.fs_elements[element_keys[i]].callback(screen.width,screen.height);
              fs.fs_elements[element_keys[i]].toggle = false;
              fs.fs_elements[element_keys[i]].fullscreen = true;
          } else {
              var width = fs.fs_elements[element_keys[i]].width;
              var height = fs.fs_elements[element_keys[i]].height;
              fs.fs_elements[element_keys[i]].callback(width,height);
              fs.fs_elements[element_keys[i]].fullscreen = false;
          }
        }
    } );

    addListenerMulti(window,'webkitorientationchange mozorientationchange orientationchange', function(event) {
        element_keys=Object.keys(fs.fs_elements);
	for(var i = 0 ; i < element_keys.length; ++i) {
          if(fs.fs_elements[element_keys[i]].fullscreen) {
              fs.fs_elements[element_keys[i]].callback(screen.width,screen.height);
          } else {
              var width = fs.fs_elements[element_keys[i]].width;
              var height = fs.fs_elements[element_keys[i]].height;
              fs.fs_elements[element_keys[i]].callback(width,height);
          }
        }
    } );
  }
};
