var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 20, //640
    height: 32 * 15, //480
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '000000',
    pixelArt: true,
    scene: [titleScreen, storyline, menu, level1, level2, level3, gameOver, gameOver2, gameOver3, goodending]
};

var game = new Phaser.Game(config);
