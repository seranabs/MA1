
var content1 = `Welcom to Ultima III. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
mollit anim id est laborum. 

Press spacebar to continue`;


class storyline extends Phaser.Scene {

    constructor ()
    {
        super('storyline');
    }

    preload () {
        this.load.image("background", "assets/level1/bg1.png");
        this.load.image("title", "assets/title-screen.png");
        this.load.image("enter", "assets/press-enter-text.png");
        this.load.image("story", "assets/storyline.png");

        // this.load.scenePlugin({
        //     key: "rexuiplugin",
        //     url: "./rexuiplugin.min.js",
        //     sceneKey: "rexUI",
        // })
    }

    create () {
        // let graphics = this.add.graphics();

        var gameWidth = 640;
        var gameHeight = 480;

        this.background = this.add.image(gameWidth, gameHeight, 0, 0, 'background');
        this.background.setOrigin(0,0);

        this.title = this.add.image(gameWidth / 2, 80, 'title');
        this.title.setScale(1);
        this.story = this.add.image(gameWidth / 2, gameHeight / 2, 'story');
        this.story.setScale(1);
        this.pressEnter = this.add.image(gameWidth/2, gameHeight - 60, 'enter').setOrigin(0.5, 0.5);
        this.pressEnter.setScale(1.5);


        // createTextBox(this, 50, 100, {
        // wrapWidth: 450,
        // }).start(content1, 50);

        
  

        var enterKey = this.input.keyboard.addKey('ENTER');
        
        enterKey.on('down', function(){
        console.log("Tutorial");
        this.scene.start("menu");
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

    update (){
        this.background.x  -= 0.05;
        this.story;
        // middleground.tilePosition.x -= 0.2;
    }

    blinkText() {
        if(this.pressEnter.alpha) {
            this.pressEnter.alpha = 0;
        } else{
            this.pressEnter.alpha = 1;
        }
    }

}////------end of world---------/////

// const GetValue = Phaser.Utils.Objects.GetValue;

// var createTextBox = function (scene, x, y, config) {
//  var wrapWidth = GetValue(config, "wrapWidth", 0);
//  var fixedWidth = GetValue(config, "fixedWidth", 0);
//  var fixedHeight = GetValue(config, "fixedHeight", 0);
//  var textBox = scene.rexUI.add
//    .textBox({
//      x: x,
//      y: y,

//      background: scene.rexUI.add
//        .roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
//        .setStrokeStyle(2, COLOR_LIGHT),

//      text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
//      action: scene.add
//        .image(0, 0, "nextPage")
//        .setTint(COLOR_LIGHT)
//        .setVisible(false),

//      space: {
//        left: 20,
//        right: 20,
//        top: 20,
//        bottom: 20,
//        icon: 10,
//        text: 10,
//      },
//    })
//    .setOrigin(0)
//    .layout();

//  textBox
//    .setInteractive()
//    .on(
//      "pointerdown",
//      function () {
//        var icon = this.getElement("action").setVisible(false);
//        this.resetChildVisibleState(icon);
//        if (this.isTyping) {
//          this.stop(true);
//        } else {
//          this.typeNextPage();
//        }
//      },
//      textBox
//    )
//    .on(
//      "pageend",
//      function () {
//        if (this.isLastPage) {
//          return;
//        }

//        var icon = this.getElement("action").setVisible(true);
//        this.resetChildVisibleState(icon);
//        icon.y -= 30;
//        var tween = scene.tweens.add({
//          targets: icon,
//          y: "+=30", // '+=100'
//          ease: "Bounce", // 'Cubic', 'Elastic', 'Bounce', 'Back'
//          duration: 500,
//          repeat: 0, // -1: infinity
//          yoyo: false,
//        });
//      },
//      textBox
//    );
//  //.on('type', function () {
//  //})

//  return textBox;
// };

// var getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
//  return scene.add
//    .text(0, 0, "", {
//      fontSize: "20px",
//      wordWrap: {
//        width: wrapWidth,
//      },
//      maxLines: 20,
//    })
//    .setFixedSize(fixedWidth, fixedHeight);
// };



