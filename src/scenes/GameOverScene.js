import {
    config
} from '../config';

export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameOverScene'
        });
    }

    create() {
        this.cameras.main.setBackgroundColor(config.bgColors[config.rand()]);
        this.cameras.main.fadeIn(1000);
        switch (config.gameMode) {
            case 1:
                this.getLocalStorage('classic');
                break;
            case 2:
                this.getLocalStorage('timeAtk');
                break;
            case 3:
                this.getLocalStorage('nightmare');
                break;
            case 4:
                this.getLocalStorage('lightSpeed');
                break;
        }
        this.savedData2 = config.steps;

        let style = {
            font: 'bold ' + config.fontSize * 1.5 + 'px Arial',
            fill: '#ffffff'
        };

        this.add.text(config.centerX, config.height / 6, 'GAME\nOVER', config.itemTittle).setOrigin(0.5);
        this.add.text(config.centerX, config.height / 2, 'Best: ' + this.savedData.score.toString(), style).setOrigin(0.5);
        this.add.text(config.centerX, config.height / 1.6, 'Score: ' + this.savedData2.toString(), style).setOrigin(0.5);

        this.addButton(config.centerX, config.height / 1.18, 'RESET', config.itensStyle, 'GameScene');
        this.addButton(config.centerX, config.height / 1.08, 'MENU', config.itensStyle, 'MenuScene');
    }

    update(time, delta) {
    }

    getLocalStorage(key) {
        this.savedData = localStorage.getItem(key.toString()) === null ? {
            score: 0
        } : JSON.parse(localStorage.getItem(key.toString()));
    }

    addButton(x, y, text, style, scene) {
        this.add.text(x, y, text, style)
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.transition({
                    target: scene,
                    duration: 500,
                    moveBelow: true,
                    sleep: true,
                    onUpdate: (progress) => {
                        this.cameras.main.y = (config.height * progress);

                        if (progress === 1) {
                            this.scene.stop();
                        }
                    }
                });
            });
    }
}
