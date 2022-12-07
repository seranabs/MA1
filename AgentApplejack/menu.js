class menu extends Phaser.Scene {

    constructor ()
    {
        super('menu');
        // var space = 0;
        
    }

    preload () {
        this.load.image("background", "/assets/level1/bg1.png");
        this.load.image("title", "/assets/title-screen.png");
        this.load.image("enter", "/assets/press-enter-text.png");
        this.load.image("title2", "/assets/instructions.png");
        // this.load.image("tutorial", "/assets/tutorial.jpg");
        // this.load.image("t2", "/assets/2.jpg");
        // this.load.image("t3", "/assets/3.jpg");
        // this.load.image("tut1", "/assets/tut1.png");
        // this.load.image("tut2", "/assets/tut2.gif");
        // this.load.image("tut3", "/assets/tut3.gif");
        // this.load.image("tut4", "/assets/tut4.gif");
        // this.load.image("tut5", "/assets/tut5.gif");
        // this.load.image("tut6", "/assets/tut6.gif");
    }

    create () {
        // let graphics = this.add.graphics();

        var gameWidth = 640;
        var gameHeight = 480;

        this.background = this.add.image(gameWidth / 2, gameHeight / 2, 'background');

        // this.tutorial = this.add.image(gameWidth / 2, gameHeight / 2, '11').setOrigin(.5, .5).setVisible(true);
        // this.tutorial.displayWidth = this.sys.canvas.width;
        // this.tutorial.displayHeight = this.sys.canvas.height;

        // this.background = this.add.image(gameWidth / 2, gameHeight / 2, 'background');
        // this.t4 = this.add.image(640 / 2, 480 / 2, 't4').setOrigin(.5, .5).setVisible(true);
        // this.t4.displayWidth = this.sys.canvas.width;
        // this.t4.displayHeight = this.sys.canvas.height;
        
        // this.t3 = this.add.image(640 / 2, 480 / 2, 't3').setOrigin(.5, .5).setVisible(true);
        // this.t3.displayWidth = this.sys.canvas.width;
        // this.t3.displayHeight = this.sys.canvas.height;

        // this.tut1 = this.add.image(gameWidth/2, gameHeight - 100, 'tut1')
        // this.tut1.setScale(1.5);
        // this.tut4 = this.add.image(gameWidth/2, gameHeight - 100, 'tut4')
        // this.tut4.setScale(1.5);
        // this.tut5 = this.add.image(gameWidth/2 + 60, gameHeight - 100, 'tut5')
        // this.tut5.setScale(1.5);
        // this.tut6 = this.add.image(gameWidth/2 - 60, gameHeight - 100, 'tut6')
        // this.tut6.setScale(1.5);

        // this.t2 = this.add.image(640 / 2, 480 / 2, 't2').setOrigin(.5, .5).setVisible(true);
        // this.t2.displayWidth = this.sys.canvas.width;
        // this.t2.displayHeight = this.sys.canvas.height;

        // this.tut2 = this.add.image(gameWidth/2 + 50, gameHeight - 100, 'tut2')
        // this.tut2.setScale(1.5);

        // this.tut3 = this.add.image(gameWidth/2 - 50, gameHeight - 100, 'tut2')
        // this.tut3.setScale(1.5);

        // this.t1 = this.add.image(640 / 2, 480 / 2, 't1').setOrigin(.5, .5).setVisible(true);
        // this.t1.displayWidth = this.sys.canvas.width;
        // this.t1.displayHeight = this.sys.canvas.height;

        // this.title = this.add.image(gameWidth / 2, 80, 'title');
        // this.title.setScale(1);
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
        // this.music1.stop();
        this.scene.start("level1");
        }, this )

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on(
            "down",
            function () {
              console.log("Spacebar pressed", space);
              space = space + 1;
            },
            this
          );
    }////----------end of create----------/////

    blinkText() {
        if(this.pressEnter.alpha) {
            this.pressEnter.alpha = 0;
        } else{
            this.pressEnter.alpha = 1;
        }
    }

    // musicChange() {
    //   this.music1.setVolume(0);
    // }

    update (){
        this.background.x  -= 0.05;
        // middleground.tilePosition.x -= 0.2;

        // if (space == 0) {
        //     null
        //   } else if (space == 1) {
        //     this.t1.setVisible(false);
        //   } else if (space == 2) {
        //   this.t2.setVisible(false);
        //   } else if (space == 3) {
        //       this.t3.setVisible(false);
        //   } else if (space == 4) {
        //       this.t4.setVisible(false);
        //   }  else if (space == 5) {
        //       space = 0;
        //     this.scene.stop("menu");
        //     this.scene.start("level1");
        //   } else if (space == 5) {
        //     space = 0;
        //     this.scene.stop("menu");
        //     this.scene.start("level1");
        //   }
    }


}////------end of world---------/////


