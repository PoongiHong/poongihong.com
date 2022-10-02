$ = jQuery;
var iframe = document.getElementById("api-frame");
// var uid = "6b3508269ef94ec1a0326391f4ad423c";
var uid = "0568795816b2466c8909b8d48d7a8f0a";

// By default, the latest version of the viewer API will be used.
var client = new Sketchfab(iframe);

// Alternatively, you can request a specific version.
// var client = new Sketchfab( '1.12.1', iframe );

function closePopup() {
  $(".close-popup").on("click", function () {
    $(".popup").fadeOut("slow");
  });
}

function setFrameHeight() {
  var modelControlsHeight = $(".model-controls").outerHeight();
  var headerHeight = $("#main-header").outerHeight();
  var iframeOffwidth = modelControlsHeight + headerHeight + "px";
  $("#api-frame").css({
    height: "calc(100vh - " + iframeOffwidth + ")",
  });
}

// Full Screen Function
$(".et_menu_container").append(
  '<button id="fullscreen" class="poongi-btn"><img src="https://poongihong.com/wp-content/themes/Divi_Child/icons/fullscreen.svg"></button>'
);

var fsElem = document.getElementById("et-main-area");
function fullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    fsElem.requestFullscreen();
  }
}
$("#fullscreen, .fullscreen-btn").on("click", () => {
  fullScreen();
});

var fullscreenBtn = $("#fullscreen");
document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    $("#et-main-area").prepend(fullscreenBtn);
  } else {
    $("#main-header .et_menu_container").append(fullscreenBtn);
    console.log("normal");
  }
});

// Screen Orientation
function screenOrientationStyle() {
  var screenOrientation =
    (screen.orientation || {}).type ||
    screen.mozOrientation ||
    screen.msOrientation;
  if (screenOrientation === "landscape-primary") {
    $("#main-header, #page-container, .model-controls, .popup").addClass(
      "landscape"
    );
  } else {
    $("#main-header, #page-container, .model-controls, .popup").removeClass(
      "landscape"
    );
  }
}
// Device Orientation
window.addEventListener("orientationchange", (event) => {
  screenOrientationStyle();
});

// Popup img expansion
$(".popup img").on("click", function () {
  $(this).toggleClass("expand");
});

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: "en" },
    "google_translate_element"
  );
  $(".goog-te-gadget").prepend('<button id="close-translate">X</button>');
  $("#close-translate").on("click", function () {
    $("#google_translate_element").fadeOut("slow");
  });
}

$("#select-lang").on("click", function () {
  $("#google_translate_element").fadeIn("slow").css("display", "flex");
});

client.init(uid, {
  success: function onSuccess(api) {
    api.start();

    api.addEventListener("viewerready", function () {
      // API is ready to use
      console.log("Viewer is ready");

      // Close Popup
      closePopup();
      api.hideAnnotationTooltips(function (err) {
        if (!err) {
          //window.console.log("Hiding annotation tooltip");
        }
      });

      // Reset Camera Function
      $("#reset-camera").on("click", function () {
        api.recenterCamera(function (err) {
          if (!err) {
            $(".popup").fadeOut("slow");
          }
        });
      });

      // Click to Show Anno List
      $("#current-anno").on("click", function () {
        $("#anno_list").slideToggle("slow").css("display", "flex");
      });

      // Get Annotation List
      api.getAnnotationList(function (err, annotations) {
        if (!err) {
          //window.console.log(annotations);

          // Loop Annotation List Array
          var i;
          for (i = 0; i < annotations.length; ++i) {
            var annoBtns = annotations[i].name;
            $("#anno_list").append(
              "<button data-hotspot='" +
                i +
                "' class='poongi-btn select-room'>" +
                (i + 1) +
                ": " +
                annoBtns +
                ""
            );
          }

          // Go to Annotation from Select List
          var roomNo;
          $(".select-room").on("click", function () {
            var roomNo = $(this).attr("data-hotspot");
            api.gotoAnnotation(
              roomNo,
              { preventCameraAnimation: false, preventCameraMove: false },
              function (err, index) {
                if (!err) {
                  window.console.log("Going to annotation", index);
                }
              }
            );
            $("#anno_list").slideUp("slow");
            if ($(".popup img").hasClass("expand")) {
              $(".popup img").removeClass("expand");
            }
            $(".popup").hide();
          });
        }
      });

      // Annotation Gets Clicked

      api.addEventListener("annotationSelect", function (index) {
        //window.console.log("Selected annotation", index);
        if (index == -1) {
          $(".popup").fadeOut("slow");
          $("#anno_list").slideUp("slow");
        }
        if (index !== -1) {
          // Open Popup
          setTimeout(function () {
            $(".popup").fadeIn("slow").css("display", "flex");
            if (window.innerHeight == screen.height) {
              $(".popup").addClass("height-100vh");
            } else {
              $(".popup").removeClass("height-100vh");
            }
          }, 1500);
        }
        // Get Content
        api.getAnnotation(index, function (err, information) {
          if (!err) {
            //window.console.log(information);
            var annoTitle = information.name;
            var annoContent = information.content.rendered;
            $(".popup .anno-title").text(annoTitle);
            $(".popup .anno-content").html(annoContent);
            $("#current-anno").text(index + 1 + ": " + annoTitle);

            // Format the image uri
            var formatImg = $(".popup .anno-content span").attr("data-uri");
            $(".popup > img").attr("src", formatImg);
          }
        });
      });

      // Previous Room Function
      (function prevAnno() {
        $("#prev-anno").on("click", function () {
          var getRoomText = $("#current-anno").text();
          var getRoom = parseInt(getRoomText) - 1;

          var noRoomSelected = $("#current-anno").text() == "Select Room";
          if (!noRoomSelected) {
            index = getRoom;
          } else {
            index = -1;
          }

          api.gotoAnnotation(
            (index += -1),
            { preventCameraAnimation: false, preventCameraMove: false },
            function (err, index) {
              if (!err) {
                window.console.log("going to annotation", index);
              }
            }
          );

          var roomLength = $("#anno_list button").length;
          if (index < 0) {
            api.gotoAnnotation(roomLength - 1);
          }
          if ($(".popup img").hasClass("expand")) {
            $(".popup img").removeClass("expand");
          }
          $(".popup").hide();
        });
      })();

      // Next Room Function
      (function nextAnno() {
        $("#next-anno").on("click", function () {
          var getRoomText = $("#current-anno").text();
          var getRoom = parseInt(getRoomText) - 1;

          var noRoomSelected = $("#current-anno").text() == "Select Room";
          if (!noRoomSelected) {
            var index = getRoom;
          } else {
            var index = -1;
          }

          api.gotoAnnotation(
            (index += 1),
            { preventCameraAnimation: false, preventCameraMove: false },
            function (err, index) {
              if (!err) {
                window.console.log("going to annotation", index);
              }
            }
          );

          var roomLength = $("#anno_list button").length;
          if (index > roomLength - 1) {
            api.gotoAnnotation(0);
          }

          if ($(".popup img").hasClass("expand")) {
            $(".popup img").removeClass("expand");
          }
          $(".popup").hide();
        });
      })();

      function mobileNav() {
        $("#prev-anno").text("<");
        $("#next-anno").text(">");
      }

      function desktopNav() {
        $("#prev-anno").text("Previous Room");
        $("#next-anno").text("Next Room");
      }

      $(window).resize(function () {
        var wW = $(this).width();
        if (wW < 768) {
          mobileNav();
          screenOrientationStyle();
          // setFrameHeight();
        } else {
          desktopNav();
        }
      });

      if ($(window).width() < 768) {
        mobileNav();
        screenOrientationStyle();
        // setFrameHeight();
      }

      var buttonOneWidth = $("#reset-camera").width();
      $(".model-controls").scrollLeft(buttonOneWidth);
    }); // Viewer Ready Ends
  },
  error: function onError() {
    console.log("Viewer error");
  },
});
