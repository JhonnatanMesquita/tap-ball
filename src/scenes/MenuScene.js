import 'phaser';
import {
    config
} from '../config';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'MenuScene'
        });
    }

    create() {
        this.cameras.main.setBackgroundColor(config.bgColors[config.rand()]);

        this.add.text(config.centerX, config.height / 6, 'TAP\nBALL', config.itemTittle).setOrigin(0.5);
        // this.add.text(config.centerX, this.cameras.main.height / 10, "POCKET EDITION", config.smallItensStyle).setOrigin(0.5);

        this.addTextButton(config.centerX, config.centerY, 'CLASSIC', config.itensStyle, 1, 4);
        this.addTextButton(config.centerX, config.centerY + (config.height / 10), 'TIME ATTACK', config.itensStyle, 2, 4);
        this.addTextButton(config.centerX, config.centerY + (config.height / 10 * 2), 'NIGHTMARE', config.itensStyle, 3, 5.5);
        this.addTextButton(config.centerX, config.centerY + (config.height / 10 * 3), 'IMPOSSIBLE', config.itensStyle, 4, 10);

        let txtBot = this.add.text(config.centerX, config.height - 30, config.botMode ? 'BOT - ON' : 'BOT - OFF', config.smallItensStyle)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                config.botMode = !config.botMode;
                config.botMode ? txtBot.setText('BOT - ON') : txtBot.setText('BOT - OFF');
            });

        let btnSound = this.add.sprite(35, config.height - 35, config.sound ? 'soundON' : 'soundOFF')
            .setScrollFactor(0)
            .setScale(0.4, 0.4)
            .setOrigin(0.5, 0.5)
            .setDepth(2)
            .setInteractive()
            .on('pointerdown', () => {
                config.sound = !config.sound;
                config.sound ? btnSound.setTexture('soundON') : btnSound.setTexture('soundOFF');
            });
    }

    playGame(gameMode, rotationSpeed) {
        config.gameMode = gameMode;
        config.rotationSpeed = rotationSpeed;
        this.scene.transition({
            target: 'GameScene',
            duration: 500,
            moveBelow: true,
            sleep: true,
            onUpdate: (progress) => {
                this.cameras.main.x = (config.width * progress);
                if (progress === 1) {
                    this.scene.stop();
                }
            }
        });
    }

    addTextButton(x, y, text, style, gameMode, rotationSpeed) {
        this.add.text(x, y, text, style)
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', () => this.playGame(gameMode, rotationSpeed));
    }
}
