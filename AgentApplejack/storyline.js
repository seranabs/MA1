var enter = 0;

// var windowWidth = window.innerWidth;
// var windowHeight = window.innerHeight;

class storyline extends Phaser.Scene {
  constructor() {
    super({ key: "storyline" });
    var gameWidth=game.config.width;
    var gameHeight=game.config.height;
  }

  preload() {

    //img preload//
    //intructions//
    this.load.image("1", "assets/storyline/story1.jpg");
    this.load.image("2", "assets/storyline/story2.jpg");
    this.load.image("3", "assets/storyline/story3.jpg");
    this.load.image("4", "assets/storyline/story4.jpg");
    this.load.image("5", "assets/storyline/story5.jpg");
    this.load.image("6", "assets/storyline/story6.jpg");
    this.load.image("7", "assets/storyline/story7.jpg");
    this.load.image("8", "assets/storyline/story8.jpg");
    this.load.image("9", "assets/storyline/story9.jpg");
    this.load.image("10", "assets/storyline/story10.jpg");
    this.load.image("11", "assets/storyline/story11.jpg");
    this.load.image("12", "/assets/tutorial.jpg");
    //
   
  }

  create() {
   
    this.cameras.main.setBackgroundColor("#231f20");

    this.story12 = this.add.image(640 / 2, 480 / 2, '11').setOrigin(.5, .5).setVisible(true);
    this.story12.displayWidth = this.sys.canvas.width;
    this.story12.displayHeight = this.sys.canvas.height;
    // this.story11.setDisplaySize(windowWidth, windowHeight);

    this.story11 = this.add.image(640 / 2, 480 / 2, '11').setOrigin(.5, .5).setVisible(true);
    this.story11.displayWidth = this.sys.canvas.width;
    this.story11.displayHeight = this.sys.canvas.height;
    // this.story11.setDisplaySize(windowWidth, windowHeight);
    
    this.story10 = this.add.image(640 / 2, 480 / 2, '10').setOrigin(.5, .5).setVisible(true);
    this.story10.displayWidth = this.sys.canvas.width;
    this.story10.displayHeight = this.sys.canvas.height;
    // this.story10.setDisplaySize(windowWidth, windowHeight);

    this.story9 = this.add.image(640 / 2, 480 / 2, '9').setOrigin(.5, .5).setVisible(true);
    this.story9.displayWidth = this.sys.canvas.width;
    this.story9.displayHeight = this.sys.canvas.height;
    // this.story9.setDisplaySize(windowWidth, windowHeight);

    this.story8 = this.add.image(640 / 2, 480 / 2, '8').setOrigin(.5, .5).setVisible(true);
    this.story8.displayWidth = this.sys.canvas.width;
    this.story8.displayHeight = this.sys.canvas.height;
    // this.story8.setDisplaySize(windowWidth, windowHeight);

    this.story7 = this.add.image(640 / 2, 480 / 2, '7').setOrigin(.5, .5).setVisible(true);
    this.story7.displayWidth = this.sys.canvas.width;
    this.story7.displayHeight = this.sys.canvas.height;
    // this.story7.setDisplaySize(windowWidth, windowHeight);

    this.story6 = this.add.image(640 / 2, 480 / 2, '6').setOrigin(.5, .5).setVisible(true);
    this.story6.displayWidth = this.sys.canvas.width;
    this.story6.displayHeight = this.sys.canvas.height;
    // this.story6.setDisplaySize(windowWidth, windowHeight);

    this.story5 = this.add.image(640 / 2, 480 / 2, '5').setOrigin(.5, .5).setVisible(true);
    this.story5.displayWidth = this.sys.canvas.width;
    this.story5.displayHeight = this.sys.canvas.height;
    // this.story5.setDisplaySize(windowWidth, windowHeight);

    this.story4 = this.add.image(640 / 2, 480 / 2, '4').setOrigin(.5, .5).setVisible(true);
    this.story4.displayWidth = this.sys.canvas.width;
    this.story4.displayHeight = this.sys.canvas.height;
    // this.story4.setDisplaySize(windowWidth, windowHeight);

    this.story3 = this.add.image(640 / 2, 480 / 2, '3').setOrigin(.5, .5).setVisible(true);
    this.story3.displayWidth = this.sys.canvas.width;
    this.story3.displayHeight = this.sys.canvas.height;
    // this.story3.setDisplaySize(windowWidth, windowHeight);

    this.story2 = this.add.image(640 / 2, 480 / 2, '2').setOrigin(.5, .5).setVisible(true);
    this.story2.displayWidth = this.sys.canvas.width;
    this.story2.displayHeight = this.sys.canvas.height;
    // this.story2.setDisplaySize(windowWidth, windowHeight);

    this.story1 = this.add.image(640 / 2, 480 / 2, '1').setOrigin(.5, .5).setVisible(true);
    this.story1.displayWidth = this.sys.canvas.width;
    this.story1.displayHeight = this.sys.canvas.height;
    // this.story1.setDisplaySize(windowWidth, windowHeight);
   
    // //intructions and tutorials//
    // this.story11 = this.add.group();
    // this.story11.create(680, , "5").setVisible(true);
   

    // //press enterbar notice//
    // this.start = this.add
    //   .image(800, 1100, "pressToContinue")
    //   .setScale(0.24)
    //   .setOrigin(0.5);

    this.fade();
    this.timedEvent = this.time.addEvent({
      delay: 3000,
      callback: this.fade,
      callbackScope: this,
      loop: true
    });
    //
    //press enterbar and skip control//
    var enterDown = this.input.keyboard.addKey("ENTER");
    var spaceDown = this.input.keyboard.addKey("SPACE");
    enterDown.on(
      "down",
      function () {
        console.log("enterbar pressed", enter);
        enter = enter + 1;
      },
      this
    );
    spaceDown.on(
      "down",
      function () {
        enter = 0;
        this.scene.stop("storyline");
        this.scene.start("menu");
      },
      this
    );
    //
  }

  fade() {
    this.time.delayedCall(
      300,
      function () {
        this.tweens.add(
          {
            targets: this.start,
            alpha: 0,
            duration: 800,
            ease: "Power2"
          },
          this
        );
      },
      [],
      this
    );
    this.time.delayedCall(
      1100,
      function () {
        this.tweens.add(
          {
            targets: this.start,
            alpha: 1,
            duration: 800,
            ease: "Power2"
          },
          this
        );
      },
      [],
      this
    );
  }

  update() {

    if (enter == 0) {
      null
    } else if (enter == 1) {
      this.story1.setVisible(false);
    } else if (enter == 2) {
    this.story2.setVisible(false);
    } else if (enter == 3) {
        this.story3.setVisible(false);
    } else if (enter == 4) {
        this.story4.setVisible(false);
    } else if (enter == 5) {
        this.story5.setVisible(false);
    } else if (enter == 6) {
        this.story6.setVisible(false);
    } else if (enter == 7) {
        this.story7.setVisible(false);
    } else if (enter == 8) {
        this.story8.setVisible(false);
    } else if (enter == 9) {
        this.story9.setVisible(false);
    } else if (enter == 10) {
        this.story10.setVisible(false);
    } else if (enter == 11) {
      this.story10.setVisible(false);
  } else if (enter == 12) {
    this.story11.setVisible(false);
    } else if (enter == 13) {
      enter = 0;
      this.scene.stop("storyline");
      this.scene.start("menu");
    }
  }
}