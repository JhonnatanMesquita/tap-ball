import 'phaser';
import {
    config
} from '../config';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.backButtonPress = false;
    }

    create() {
        this.scene.resume();
        switch (config.gameMode) {
            case 1:
                this.getLocalStorage('classic');
                break;
            case 2:
                this.getLocalStorage('timeAtk');
                this.timeTxt = this.add.text(config.width / 2, 45, '0', config.itensStyle).setOrigin(0.5, 0.5).setScrollFactor(0);
                this.timeTxt.depth = 2;
                break;
            case 3:
                this.getLocalStorage('nightmare');
                break;
            case 4:
                this.getLocalStorage('lightSpeed');
                break;
        }

        this.add.sprite(35, 35, 'arrowButton')
            .setFlipX(true)
            .setScrollFactor(0)
            .setScale(0.4, 0.4)
            .setOrigin(0.5, 0.5)
            .setDepth(2)
            .setInteractive()
            .on('pointerdown', () => {
                this.backButtonPress = true;
                this.scene.transition({
                    target: 'MenuScene',
                    duration: 500,
                    moveBelow: true,
                    sleep: true,
                    onUpdate: (progress) => {
                        this.cameras.main.x = -(config.width * progress);
                        if (progress === 1) {
                            this.scene.stop();
                        }
                    }
                });
            });
        this.next = this.sound.add('next');
        this.lose = this.sound.add('lose');
        this.destroy = false;
        this.saveRotationSpeed = config.rotationSpeed;
        this.tintColor = config.bgColors[Phaser.Math.Between(0, config.bgColors.length - 1)];
        do {
            this.tintColor2 = config.bgColors[Phaser.Math.Between(0, config.bgColors.length - 1)];
        } while (this.tintColor === this.tintColor2);
        this.cameras.main.setBackgroundColor(this.tintColor);
        this.targetArray = [];
        this.steps = 0;
        this.rotatingDirection = Phaser.Math.Between(0, 1);
        this.gameGroup = this.add.group();
        this.targetGroup = this.add.group();
        this.ballGroup = this.add.group();
        this.gameGroup.addMultiple(this.targetGroup);
        this.gameGroup.addMultiple(this.ballGroup);
        this.arm = this.add.sprite(config.width / 2, config.height / 4 * 2.7, 'arm');
        this.arm.setOrigin(0, 0.5);
        this.arm.tint = this.tintColor2;
        this.arm.depth = 1;
        this.ballGroup.add(this.arm);
        this.balls = [
            this.add.sprite(config.width / 2, config.height / 4 * 2.7, 'ball'),
            this.add.sprite(config.width / 2, config.height / 2, 'ball')
        ];
        this.balls[0].setOrigin(0.5, 0.5);
        this.balls[0].tint = this.tintColor2;
        this.balls[0].depth = 1;
        this.balls[1].setOrigin(0.5, 0.5);
        this.balls[1].tint = this.tintColor2;
        this.balls[1].depth = 1;
        this.ballGroup.add(this.balls[0]);
        this.ballGroup.add(this.balls[1]);
        this.rotationAngle = 0;
        this.rotatingBall = 1;
        let target = this.add.sprite(0, 0, 'target');
        target.setOrigin(0.5, 0.5);
        target.x = this.balls[0].x;
        target.y = this.balls[0].y;
        this.targetGroup.add(target);
        this.targetArray.push(target);
        this.input.on('pointerdown', this.changeBall, this);
        for (let i = 0; i < config.visibleTargets; i++) {
            this.addTarget();
        }

        this.camAux = this.physics.add.sprite(this.targetArray[0].x, this.targetArray[0].y, Phaser.Cache.DEFAULT);
        this.cameras.main.startFollow(this.camAux, false, 0.1, 0.1, 0, (config.centerY / 2));
    }

    update() {
        if (config.gameMode === 2) {
            if (this.steps - config.visibleTargets === 0) {
                config.endTime = this.time.now + (1000 * config.timeAtkSecs);
            }
            if (config.endTime > 0) {
                this.timeLeftSeconds = Math.ceil((config.endTime - this.time.now) / 1000);
                this.timeTxt.setText(this.timeLeftSeconds.toString());
            }
            if (this.timeLeftSeconds <= 0 && this.destroy) {
                this.gameOver();
            }
        }

        let distanceFromTarget = Phaser.Math.Distance.Between(this.balls[this.rotatingBall].x, this.balls[this.rotatingBall].y, this.targetArray[1].x, this.targetArray[1].y);
        let distanceCameraFromTarget = Phaser.Math.Distance.Between(this.camAux.x, this.camAux.y, this.targetArray[0].x, this.targetArray[0].y);

        if (distanceCameraFromTarget < 5) {
            this.camAux.body.reset(this.targetArray[0].x, this.targetArray[0].y);
        } else {
            this.physics.moveToObject(this.camAux, this.targetArray[0], 500);
        }

        if (config.gameMode === 3) {
            if (distanceFromTarget > 50 && this.destroy && this.steps > config.visibleTargets) {
                this.gameOver();
            }
        }
        if (distanceFromTarget < 40 && !this.destroy) {
            this.destroy = true;
        }
        if (config.botMode === true && distanceFromTarget <= 25) {
            this.changeBall();
        }
        this.rotationAngle = (this.rotationAngle + this.saveRotationSpeed * (this.rotatingDirection * 2 - 1)) % 360;
        this.arm.setAngle(this.rotationAngle + 90);
        this.balls[this.rotatingBall].x = this.balls[1 - this.rotatingBall].x - config.ballDistance * Math.sin(Phaser.Math.DegToRad(this.rotationAngle));
        this.balls[this.rotatingBall].y = this.balls[1 - this.rotatingBall].y + config.ballDistance * Math.cos(Phaser.Math.DegToRad(this.rotationAngle));
    }

    addTarget() {
        this.steps++;
        this.startX = this.targetArray[this.targetArray.length - 1].x;
        this.startY = this.targetArray[this.targetArray.length - 1].y;
        let target = this.add.sprite(0, 0, 'target');
        let randomAngle = Phaser.Math.Between(config.angleRange[0] + 90, config.angleRange[1] + 90);
        target.setOrigin(0.5, 0.5);
        let x = this.startX + config.ballDistance * Math.sin(Phaser.Math.DegToRad(randomAngle));
        let y = this.startY + config.ballDistance * Math.cos(Phaser.Math.DegToRad(randomAngle));
        let style = {
            font: 'bold 32px Arial',
            fill: '#' + this.tintColor.toString(16),
            align: 'center'
        };
        let text = this.add.text(0, 0, this.steps.toString(), style).setOrigin(0.5, 0.5);
        let container = this.add.container(x, y, [target, text]);
        container.setAlpha(1 - this.targetArray.length * (1 / 7));
        this.targetGroup.add(container);
        this.targetArray.push(container);
    }

    changeBall() {
        if (this.backButtonPress) return null;
        this.destroy = false;
        let distanceFromTarget = Phaser.Math.Distance.Between(this.balls[this.rotatingBall].x, this.balls[this.rotatingBall].y, this.targetArray[1].x, this.targetArray[1].y);
        if (distanceFromTarget < 25) {
            if (config.gameMode === 2 && ((this.steps - config.visibleTargets) + 1) % 100 === 0) {
                config.endTime += (1000 * 30);
                this.saveRotationSpeed += 0.5;
            }
            if (config.gameMode === 2 && ((this.steps - config.visibleTargets) + 1) % 10 === 0) {
                this.saveRotationSpeed += 0.5;
            }
            this.rotatingDirection = Phaser.Math.Between(0, 1);
            this.tweens.add({
                targets: this.targetArray[0],
                alpha: '-=1',
                ease: 'Cubic.easeIn',
                duration: 1000,
                onComplete: (e) => {
                    e.targets[0].destroy();
                }
            });

            this.targetArray.shift();
            this.arm.setPosition(this.balls[this.rotatingBall].x, this.balls[this.rotatingBall].y);
            this.rotatingBall = 1 - this.rotatingBall;
            this.rotationAngle = Phaser.Math.Angle.Between(this.balls[1 - this.rotatingBall].x, this.balls[1 - this.rotatingBall].y, this.balls[this.rotatingBall].x, this.balls[this.rotatingBall].y);
            this.arm.setAngle(this.rotationAngle + 90);
            for (let i = 0; i < this.targetArray.length; i++) {
                this.targetArray[i].setAlpha(this.targetArray[i].alpha + 1 / 7);
            }
            if (config.sound) this.next.play();
            this.addTarget();
        } else {
            this.gameOver();
        }
    }

    gameOver() {
        this.destroy = false;
        switch (config.gameMode) {
            case 1:
                this.setLocalStorage('classic');
                break;
            case 2:
                config.endTime = 0;
                this.setLocalStorage('timeAtk');
                break;
            case 3:
                this.setLocalStorage('nightmare');
                break;
            case 4:
                this.setLocalStorage('lightSpeed');
                break;
        }

        config.steps = this.steps - config.visibleTargets;
        this.input.on('pointerdown', this.changeBall, this);
        this.saveRotationSpeed = 0;
        this.arm.destroy();
        if (config.sound) this.lose.play();

        this.scene.transition({
            target: 'GameOverScene',
            duration: 600,
            moveBelow: true,
            sleep: true,
            onUpdate: (progress) => {
                this.balls[this.rotatingBall].setAlpha(1 - progress);
                if (progress === 1) {
                    this.scene.stop();
                }
            }
        });
    }

    setLocalStorage(key) {
        localStorage.setItem(key, JSON.stringify({
            score: Math.max(this.savedData.score, this.steps - config.visibleTargets)
        }));
    }

    getLocalStorage(key) {
        this.savedData = localStorage.getItem(key) === null ? {
            score: 0
        } : JSON.parse(localStorage.getItem(key));
    }
}
