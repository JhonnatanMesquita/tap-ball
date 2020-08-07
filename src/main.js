import 'phaser';
import {
    config
} from './config';
import {
    BootScene
} from './scenes/BootScene';

const gameConfig = {
    type: Phaser.AUTO,
    pixelArt: false,
    roundPixels: false,
    parent: 'content',
    pageAlignHorizontally: true,
    pageAlignVertically: true,
    width: config.gameWidth,
    height: config.gameHeight,
    resolution: window.devicePixelRatio,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        lockOrientation: 'portrait'
    },
    physics: {
        default: 'arcade'
    },
    scene: [
        BootScene
    ]
};

export default new Phaser.Game(gameConfig);
