"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
// Auto detect which renderer we should use (WebGL or Canvas) and set our width and height (1280x720 for this tutorial).
// You could create the renderer manually, but the Pixi.js application class helps with setup.
var app = new PIXI.Application(1280, 720);
// When the window has loaded, add the view to the DOM.
window.onload = function () {
    document.body.appendChild(app.view);
};
// Create a new asset loader, a PIXI helper class for loading our images and other assets.
var loader = new PIXI.loaders.Loader();
// Load our image.png, and give it the name `image` which we'll later refer to it by.
loader.add("image", "images/image.png");
loader.load(function () {
    // This callback is called when all of our assets are loaded.
    // Create a new sprite with our image.
    var sprite = new PIXI.Sprite();
    // Set the sprite's texture to our loaded image. PIXI automatically adds
    // it to the `TextureCache` with the name we gave it earlier.
    sprite.texture = PIXI.utils.TextureCache["image"];
    // Add the sprite to our stage.
    app.stage.addChild(sprite);
});
