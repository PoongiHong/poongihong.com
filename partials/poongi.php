<?php /* Template Name: Poongi */ ?>

<?php get_header(); ?>

<div class="popup">
    <img src="" class="anno-img">
    <h2 class="anno-title"> Testing deployment from git </h2>
    <p class="anno-content"> Content </p>
    <div class="inner-container">
        <div class="close-popup">
            <span>X</span>
        </div>
    </div>
</div>
<iframe src="" id="api-frame" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
<div class="model-controls">
    <button id="reset-camera" class="poongi-btn">Reset Camera</button>
    <button id="prev-anno" class="poongi-btn">Previous Room</button>
    <button id="current-anno" class="poongi-btn">Select Room</button>
    <button id="next-anno" class="poongi-btn">Next Room</button>
    <button id="select-lang" class="poongi-btn">Language</button>
</div>
<script src="<?= get_stylesheet_directory_uri() . '/js/poongi.js'?>"></script>