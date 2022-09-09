<?php /* Template Name: GLTF */ ?>

<?php get_header(); ?>

<script src="<?= get_stylesheet_directory_uri() . '/js/three.min.js'?>"></script>
<script src="<?= get_stylesheet_directory_uri() . '/js/OrbitControls.js'?>"></script>
<script src="<?= get_stylesheet_directory_uri() . '/js/GLTFLoader.js'?>"></script>
<script src="<?= get_stylesheet_directory_uri() . '/js/model.js'?>"></script>

<script>
// GLTF
var loader = new THREE.GLTFLoader();
loader.load(
  "<?= get_stylesheet_directory_uri() . '/3D+Floor+plan.gltf' ?>",
  function (gltf) {
    scene.add(gltf.scene);
  }
);

</script>


