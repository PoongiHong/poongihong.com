var iframe = document.getElementById("api-frame");
var uid = "8f06939822654efb94795a467f75d599";

// By default, the latest version of the viewer API will be used.
var client = new Sketchfab(iframe);

// Alternatively, you can request a specific version.
// var client = new Sketchfab( '1.12.1', iframe );

client.init(uid, {
  success: function onSuccess(api) {
    api.start();
    api.addEventListener("viewerready", function () {
      // API is ready to use
      // Insert your code here
      console.log("Viewer is ready");
    });
    // annotation 1 gets clicked
    api.addEventListener("annotationSelect", function (index) {
      window.console.log("Selected annotation", index);
      if (index == 0) {
        document.querySelector(".popup").style.display = "flex";
        document.getElementById("close-popup").onclick = function () {
          closePopup();
        };
        function closePopup() {
          document.querySelector(".popup").style.display = "none";
        }
      }
    });
  },
  error: function onError() {
    console.log("Viewer error");
  },
});
