<?php /* Template Name: Sketchfab */ ?>

<?php get_header(); ?>

<style>
    .popup {
        width: 100vw;
        height: calc(100vh - 80px);
        background: rgba(0,0,0,0.8);
        align-items: center;
        justify-content: center;
        position: absolute;
        display: none;
        flex-direction: column;
    }
    h1 {
        color: #fff;
    }
    #api-frame {
        width: 100vw;
        height: calc(100vh - 80px);
    }
    #close-popup {
        background: #fff;
        border-radius: 50%;
        color: #000;
        cursor: pointer;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2em;
        position: absolute;
        top: 20px;
        right: 20px;
        transition: all .3s ease;
    }
    #close-popup:hover {
        background: #000;
        color: #fff;
    }

</style>

<div class="popup">
    <h1> Testing deployment from git </h1>
    <div class="inner-container">
        <div id="close-popup">
            <span>X</span>
        </div>
    </div>
</div>

<iframe src="" id="api-frame" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

<script src="<?= get_stylesheet_directory_uri() . '/js/poongi.js' ?>"></script>
