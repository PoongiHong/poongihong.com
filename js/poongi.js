$ = jQuery;
var iframe = document.getElementById("api-frame");
var uid = "6b3508269ef94ec1a0326391f4ad423c";

// By default, the latest version of the viewer API will be used.
var client = new Sketchfab(iframe);

// Alternatively, you can request a specific version.
// var client = new Sketchfab( '1.12.1', iframe );

function closePopup() {
  $(".close-popup").on("click", function () {
    $(".popup").fadeOut("slow");
  });
}

// Show

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
            if ($(".popup").css("display") == "flex") {
              $(".popup").fadeOut("slow");
            }
            $("#anno_list").slideUp("slow");
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
          $(".popup").fadeOut("slow");
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
          $(".popup").fadeOut("slow");
        });
      })();
    }); // Viewer Ready Ends
  },
  error: function onError() {
    console.log("Viewer error");
  },
});
