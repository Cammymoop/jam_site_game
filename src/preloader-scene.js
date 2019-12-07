import Phaser from "./phaser-module.js";
import GameScene from "./game-scene.js";

export let LoadedMaps = new Map();

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        "use strict";
        super({ key: 'PreloaderScene' });
    }

    preload() {
        "use strict";
        this.sys.canvas.style.display = "block";
        this.sys.canvas.style.marginLeft = "auto";
        this.sys.canvas.style.marginRight = "auto";
        this.sys.canvas.style.border = "6px solid #ffa300";

        this.cameras.main.setBackgroundColor('#FFFFFF');
        this.cameras.main.zoom = 6;

        this.load.setBaseURL('assets/');

        this.fullLoad();
        //this.load.image('loader-image', 'img/loader.png');
        //this.load.once('filecomplete', this.fullLoad, this);
    }

    fullLoad() {
        "use strict";
        // show the loading splash screen
        //var loadingScreen = this.add.image(0, 0, 'loader-image');
        //this.cameras.main.centerOn(0, 0);


        this.load.image('tiles_img', 'img/tiles.png');
        this.load.spritesheet('player', 'img/player.png', {frameWidth: 18, frameHeight: 18});
        this.load.image('symbols', 'img/symbols.png');

        // Data
        this.load.json('item-data', 'data/items.json', 'items');
    }

    create() {
        "use strict";
        this.cache.bitmapFont.add('basic-font', Phaser.GameObjects.RetroFont.Parse(this, {
            image: 'symbols',
            chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>-+* ',
            width: 5,
            height: 8,
            charsPerRow: 10,
            spacing: {x: 1, y: 0},
        }));

        //let gamepadConfig = document.localStorage.getItem('gamepad-config');

        this.scene.add('GameScene', GameScene);

        console.log('starting scene');
        this.scene.start("GameScene");
    }
}
