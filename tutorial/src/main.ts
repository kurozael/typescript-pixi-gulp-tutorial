import * as PIXI from "pixi.js";

let app = new PIXI.Application(1280, 720);

window.onload = () => {
    document.body.appendChild(app.view);
};

let loader = new PIXI.loaders.Loader();
loader.add("image", "images/image.png");

loader.load(() => {
    let sprite = new PIXI.Sprite();
    sprite.texture = PIXI.utils.TextureCache["image"];
    app.stage.addChild(sprite);
});

