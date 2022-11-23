class menu extends Phaser.Scene {

    constructor ()
    {
        super('menu');
        
    }

    preload () {
        this.load.image("background", "assets/level1/bg1.png");
        this.load.image("title", "assets/title-screen.png");
        this.load.image("enter", "assets/press-enter-text.png");
        this.load.image("instructions", "assets/instructions.png");
    }

    create () {
        // let graphics = this.add.graphics();

        var gameWidth = 640;
        var gameHeight = 480;
        

        this.background = this.add.image(gameWidth, gameHeight, 'background');

        this.title = this.add.image(gameWidth / 2, 80, 'title');
        this.title.setScale(1);
        this.title2 = this.add.image(gameWidth / 2, gameHeight / 2, 'instructions');
        this.title2.setScale(2);
        this.pressEnter = this.add.image(gameWidth/2, gameHeight - 60, 'enter')
        this.pressEnter.setScale(1.5);

        this.time.addEvent({
            delay: 700,
            callback: this.blinkText,
            callbackScope: this,
            loop: true,
          });

        this.state = 1;

        var enterKey = this.input.keyboard.addKey('ENTER');
        
        enterKey.on('down', function(){
        console.log("Tutorial");
        this.scene.start("level1");
        }, this )

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto gameScene");
        this.scene.start("level1");
        }, this );
    }////----------end of create----------/////

    blinkText() {
        if(this.pressEnter.alpha) {
            this.pressEnter.alpha = 0;
        } else{
            this.pressEnter.alpha = 1;
        }
    }

    update (){
        this.background.x  -= 0.05;
        // middleground.tilePosition.x -= 0.2;
    }


}////------end of world---------/////

