class gameOver2 extends Phaser.Scene {

    constructor ()
    {
        super('gameOver2');
        
    }

    preload () {
        this.load.image("background", "assets/level1/bg1.png");
        // this.load.image("title", "assets/title-screen.png");
        this.load.image("failed", "assets/failed.png");
        this.load.image("tryagain", "assets/tryagain.png");
    }

    create () {
        // let graphics = this.add.graphics();

        var gameWidth = 640;
        var gameHeight = 480;

        this.background = this.add.image(gameWidth / 2, gameHeight / 2, 'background');


        this.failed = this.add.image(gameWidth / 2, gameHeight / 2, 'failed');
        this.failed.setScale(1.2);
        // this.title2 = this.add.image(gameWidth / 2, gameHeight / 2, 'tryagain');
        // this.title2.setScale(2);
        this.tryAgain = this.add.image(gameWidth/2, gameHeight - 60, 'tryagain')
        // this.tryAgain.setScale(1.5);

        this.time.addEvent({
            delay: 700,
            callback: this.blinkText,
            callbackScope: this,
            loop: true,
          });

        this.state = 1;

        var tryagainKey = this.input.keyboard.addKey('ENTER');
        
        tryagainKey.on('down', function(){
        console.log("Tutorial");
        this.scene.start("level2");
        }, this )

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto gameScene");
        this.scene.start("level1");
        }, this );
    }////----------end of create----------/////

    blinkText() {
        if(this.tryAgain.alpha) {
            this.tryAgain.alpha = 0;
        } else{
            this.tryAgain.alpha = 1;
        }
    }

    update (){
        this.background.x  -= 0.05;
        // middleground.tilePosition.x -= 0.2;
    }


}////------end of world---------/////


