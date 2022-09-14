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

client.init(uid, {
  success: function onSuccess(api) {
    api.start();
    api.addEventListener("viewerready", function () {
      // API is ready to use
      console.log("Viewer is ready");
      $ = jQuery;
      // Close Popup
      closePopup();
      api.hideAnnotationTooltips(function (err) {
        if (!err) {
          window.console.log("Hiding annotation tooltip");
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
    });
    // annotation gets clicked
    api.addEventListener("annotationSelect", function (index) {
      window.console.log("Selected annotation", index);
      if (index == -1) {
        $(".popup").fadeOut("slow");
      }
      if (index !== -1) {
        // Open Popup
        setTimeout(function () {
          $(".popup").fadeIn("slow").css("display", "flex");
        }, 1000);
      }
      // Get Content
      api.getAnnotation(index, function (err, information) {
        if (!err) {
          window.console.log(information);
          var annoTitle = information.name;
          var annoContent = information.content.rendered;
          $(".popup .anno-title").text(annoTitle);
          $(".popup .anno-content").html(annoContent);
          $("#current-anno").text(index + 1 + ": " + annoTitle);
        }
      });
      // Next Room Function
      $("#next-anno").on("click", function () {
        api.gotoAnnotation(
          index + 1,
          { preventCameraAnimation: false, preventCameraMove: false },
          function (err, index) {
            if (!err) {
              window.console.log("Going to annotation", index + 1);
            }
          }
        );
      });
      // Previous Room Function
      $("#prev-anno").on("click", function () {
        api.gotoAnnotation(
          index - 1,
          { preventCameraAnimation: false, preventCameraMove: false },
          function (err, index) {
            if (!err) {
              window.console.log("Going to annotation", index - 1);
            }
          }
        );
      });
    });
  },
  error: function onError() {
    console.log("Viewer error");
  },
});
