import 'phaser';
import {
    config
} from '../config';
import {
    MenuScene
} from './MenuScene';
import {
    GameScene
} from './GameScene';
import {
    GameOverScene
} from './GameOverScene';

export class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene'
        });
    }

    preload() {
        this.load.audio('next', './assets/audio/cursor.ogg');
        this.load.audio('lose', './assets/audio/buzzer.ogg');
        this.load.image('ball', './assets/sprites/ball.png');
        this.load.image('target', './assets/sprites/target.png');
        this.load.image('arm', './assets/sprites/arm.png');
        this.load.image('arrowButton', './assets/sprites/arrow.png');
        this.load.image('soundON', './assets/sprites/soundON.png');
        this.load.image('soundOFF', './assets/sprites/soundOFF.png');

        this.scene.add('MenuScene', MenuScene, false);
        this.scene.add('GameScene', GameScene, false);
        this.scene.add('GameOverScene', GameOverScene, false);

        config.centerX = this.cameras.main.width / 2;
        config.centerY = this.cameras.main.height / 2;

        config.width = this.cameras.main.width;
        config.height = this.cameras.main.height;
    }

    create() {
        this.scene.start('MenuScene');
    }
}
