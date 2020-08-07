const width = document.documentElement.clientWidth > 400 ? 400 : document.documentElement.clientWidth;
const height = document.documentElement.clientHeight > 850 ? 850 : document.documentElement.clientHeight;

const fontSize = Math.trunc(0.1148148148148148 * width);
export const config = {
    gameWidth: width,
    gameHeight: height,
    timeAtkSecs: 60,
    ballDistance: 120,
    rotationSpeed: 4,
    visibleTargets: 7,
    gameMode: 0,
    botMode: false,
    sound: true,
    fontSize,
    angleRange: [
        25,
        155
    ],
    bgColors: [
        0x62bd18,
        0xffbb00,
        0xff5300,
        0xd21034,
        0xff475c,
        0x8f16b2
    ],
    itemTittle: {
        font: 'bold ' + fontSize * 2.2 + 'px Arial',
        fill: '#ffffff',
        align: 'center'
    },
    itensStyle: {
        font: 'bold ' + fontSize + 'px Arial',
        fill: '#ffffff',
        align: 'center'
    },
    smallItensStyle: {
        font: 'bold ' + (fontSize - 25) + 'px Arial',
        fill: '#ffffff'
    },
    width: 0,
    height: 0,
    centerX: 0,
    centerY: 0,
    endTime: 0,
    steps: 0,
    rand: function rand() {
        return Math.floor((Math.random() * 5) + 1);
    }
};
