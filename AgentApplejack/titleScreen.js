class titleScreen extends Phaser.Scene {

    constructor ()
    {
        super('titleScreen');
        var music;
        
    }

    preload () {
        this.load.image("backgroundTitle", "assets/level1/bg1.png");
        this.load.image("title", "assets/title-screen.png");
        this.load.image("enter", "assets/press-enter-text.png");
        this.load.image("instructions", "assets/instructions.png");
        this.load.audio('music1', 'assets/music1.mp3');
        this.load.audio('music2', 'assets/music2.mp3');
        this.load.audio('music3', 'assets/music3.mp3');
    }

    create () {
        // let graphics = this.add.graphics();
        

        var gameWidth = 640;
        var gameHeight = 480;

        this.backgroundTitle = this.add.image(gameWidth / 2, gameHeight / 2, 'backgroundTitle');
    

        this.music = this.sound.add('music2',{loop: true,}).setVolume(0.2) // 10% volume
        this.music.play();

        this.title = this.add.image(gameWidth / 2, gameHeight / 2, 'title');
        this.title.setScale(1);
        this.pressEnter = this.add.image(gameWidth/2, gameHeight - 60, 'enter').setOrigin(0.5, 0.5);
        this.pressEnter.setScale(1.5);

        var enterKey = this.input.keyboard.addKey('ENTER');
        
        enterKey.on('down', function(){
        console.log("Tutorial");
        this.scene.start("storyline");
        }, this )

        this.time.addEvent({
            delay: 700,
            callback: this.blinkText,
            callbackScope: this,
            loop: true,
          });

        this.state = 1;


        //this.input.once('pointerdown', function(){
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
        this.backgroundTitle.x  -= 0.05;
    }

}////------end of world---------/////


