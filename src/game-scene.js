import Phaser from "./phaser-module.js";
import constants from "./constants.js";


export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create(data) {
        this.cameras.main.setBackgroundColor('#FFFFFF');
        this.cameras.main.centerOn(208/2, 124/2);
        this.cameras.main.zoom = 2;

        if (!this.data.has('mapId')) {
            this.data.set('mapId', 1);
        }

        if (!this.registry.has('muted')) {
            this.registry.set('muted', false);
        }
        this.sound.mute = this.registry.get('muted');

        this.gamePause = false;

        this.player = this.add.sprite(20, 40, 'player')

        for (var i = 0; i < 10; i++) {
            this.add.sprite(i * 40, i * 40, 'player')
        }

        
        this.input.keyboard.on('keydown_R', () => this.scene.restart());
        
        this.input.keyboard.on('keydown_M', function (event) {
            this.registry.set('muted', !this.registry.get('muted'));
            this.sound.mute = this.registry.get('muted');
        }, this);
    }

    update(time, delta) {
        if (this.gamePause) {
            return;
        }

        let ground = 110;
        let maxHeight = 22;

        let stickFactor = 14;
        let slowFactor = 260;

        this.player.y = Math.min(ground, ground + stickFactor - Math.abs(Math.sin(time/slowFactor) * (ground + stickFactor - maxHeight)));

        this.player.frame = 0;
        if (ground - this.player.y < 20) {
            this.player.setFrame(1);
        } else {
            this.player.setFrame(0);
        }

        let up = false;

    }

}
