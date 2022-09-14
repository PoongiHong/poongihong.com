var iframe = document.getElementById("api-frame");
var uid = "6b3508269ef94ec1a0326391f4ad423c";

// By default, the latest version of the viewer API will be used.
var client = new Sketchfab(iframe);

// Alternatively, you can request a specific version.
// var client = new Sketchfab( '1.12.1', iframe );

client.init(uid, {
  success: function onSuccess(api) {
    api.start();
    api.addEventListener("viewerready", function () {
      // API is ready to use
      console.log("Viewer is ready");
      $ = jQuery;
    });
    // annotation 1 gets clicked
    api.addEventListener("annotationSelect", function (index) {
      window.console.log("Selected annotation", index);
      if (index == 0) {
        // Open Popup
        setTimeout(function () {
          $(".popup").fadeIn("slow").css("display", "flex");
        }, 1000);
        // Close Popup
        $(".close-popup").on("click", function () {
          $(".popup").fadeOut("slow");
        });
      }
    });
  },
  error: function onError() {
    console.log("Viewer error");
  },
});
