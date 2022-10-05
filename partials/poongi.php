<?php /* Template Name: Poongi */ ?>

<?php get_header(); ?>

<!-- Template Specific CSS -->
<style>
    body {
        height: 100vh;
        overflow: hidden;
    }
</style>
<script type="text/javascript" 
 src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit">
</script>

<!-- Annotation Popups -->
<div class="popup">
    <div class="popup-inner">
        <img src="/wp-content/themes/Divi_Child/placeholder.jpeg" class="anno-img">
        <div class="content-area">
            <h2 class="anno-title"> Testing deployment from git </h2>
            <p class="anno-content"> Content </p>
        </div>
        <div class="inner-container">
            <div class="close-popup">
                <span>X</span>
            </div>
        </div>
    </div>
</div>

<div id="google_translate_element"></div>

<!-- 3d Model -->
<iframe src="" id="api-frame" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

<!-- Top Model Control Buttons -->
<div class="model-controls top">
    <button id="fullscreen" class="poongi-btn fullscreen-btn">
        Full Screen
        <!-- <img src="<?= get_stylesheet_directory_uri() . '/icons/fullscreen.svg' ?>" /> -->
    </button>
    <button id="reset-camera" class="poongi-btn">Reset Camera</button>
    <button id="select-lang" class="poongi-btn">Language</button>
</div>

<!-- Buttons -->
<div class="model-controls">
    <button id="prev-anno" class="poongi-btn">Previous Room</button>
    <div class="anno-list-container" style="position:relative">
        <div id="anno_list"></div>
        <button id="current-anno" class="poongi-btn">Select Room</button>
    </div>
    <button id="next-anno" class="poongi-btn">Next Room</button>
</div>

<!-- The Magic Happens Here -->
<script src="<?= get_stylesheet_directory_uri() . '/js/poongi.js'?>"></script>

<?php get_footer(); ?>