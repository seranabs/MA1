class goodending extends Phaser.Scene {

    constructor ()
    {
        super('goodending');
        
    }

    preload () {
        this.load.image("background", "assets/level1/bg1.png");
        this.load.image("success", "assets/success.png");
        // this.load.image("title", "assets/title-screen.png");
        this.load.image("tryagain", "assets/tryagain.png");
        this.load.image("gameover", "assets/game-over.png");
    }

    create () {
        // let graphics = this.add.graphics();

        var gameWidth = 640;
        var gameHeight = 480;

        this.background = this.add.image(gameWidth / 2, 100, 'background');


        this.success = this.add.image(gameWidth / 2, 100, 'success');
        this.success.setScale(1.5);

        this.gameover= this.add.image(gameWidth / 2, gameHeight / 2, 'gameover');
        this.gameover.setScale(1.5);
        // this.title = this.add.image(gameWidth / 2, 80, 'title');
        // this.title.setScale(1);
        // this.title2 = this.add.image(gameWidth / 2, gameHeight / 2, 'tryagain');
        // this.title2.setScale(2);
        // this.tryAgain = this.add.image(gameWidth/2, gameHeight - 60, 'tryagain')
        // this.tryAgain.setScale(1.5);

        this.time.addEvent({
            delay: 700,
            callback: this.blinkText,
            callbackScope: this,
            loop: true,
          });

        this.state = 1;

        var enterDown = this.input.keyboard.addKey('ENTER');
        
        enterDown.on('down', function(){
        console.log("Spacebar pressed, goto gameScene");
        this.scene.start("titleScreen");
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


