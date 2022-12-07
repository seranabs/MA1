class level1 extends Phaser.Scene {
  constructor() {
    super({
      key: "level1",
    });

    var ladder = false;
    var box = false
    // var enemy2
    // var enemy1
    this.life = 1
    this.showenemy2 = false
    // var e1timer
    // this.hidefromenemy1 = false
    // this.resetenemy1 = false
    // Put global variable here
    
  }

  init(data) {
    this.player = data.player
    this.inventory = data.inventory
}

  preload() {
    // Step 1, load JSON
    //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");
    this.load.tilemapTiledJSON("level1", "assets/level1/map.tmj");

    // Step 2 : Preload any images here

    this.load.image("bg1IMG", "assets/level1/bg1.png")
    this.load.image("bg2IMG", "assets/level1/bg2.png")
    this.load.image("bg3IMG", "assets/level1/planet.png")
    this.load.image("bg4IMG", "assets/level1/bg3.png")
    this.load.image("box", "assets/box.png")
    this.load.image("buildingIMG", "assets/level1/tileset.png")
    this.load.image('bullet', 'assets/bullet.png');
    this.load.spritesheet('applejack', 'assets/spritesheet.png', { frameWidth: 29, frameHeight: 50 });
    this.load.spritesheet('enemy1', 'assets/spritesheet_enemy1.png', { frameWidth: 91, frameHeight: 96 });
    this.load.spritesheet('enemy2', 'assets/spritesheet_enemy2.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('boss', 'assets/boss.png', { frameWidth: 33, frameHeight: 96 });
    this.load.spritesheet('key', 'assets/key.png', { frameWidth: 32, frameHeight: 32 });

  }//////end of preload////////

  create() {
    console.log("*** level1 scene");

    //Step 3 - Create the map from main
    //let map = this.make.tilemap({ key: "world1" });
    

    let map = this.make.tilemap({ key: "level1" });

    window.key = 0
    

    // this.i = 0;

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    //let buildingTiles = map.addTilesetImage("Buildings32x32", "building");
    //let streetTiles = map.addTilesetImage("Street32x32", "street");

    let bg1tiles = map.addTilesetImage("bg1", "bg1IMG");
    let bg2tiles = map.addTilesetImage("bg2", "bg2IMG");
    let bg3tiles = map.addTilesetImage("planet", "bg3IMG");
    let bg4tiles = map.addTilesetImage("bg3", "bg4IMG");
    let buildingtiles = map.addTilesetImage("tileset", "buildingIMG");
    let boxtiles = map.addTilesetImage("box", "box");
    this.cursors = this.input.keyboard.createCursorKeys();

    // Step 5  create an array of tiles
    // let tilesArray = [
    //   buildingTiles,
    //   streetTiles,
    // ];

    let tilesArray = [
      bg1tiles, 
      bg2tiles, 
      bg3tiles, 
      bg4tiles, 
      buildingtiles,
      boxtiles
    ];

    // Step 6  Load in layers by layers
    //this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);
    // this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);
    this.bg1Layer = map.createLayer("bg1", [bg1tiles],0,0);
    this.bg2Layer = map.createLayer("bg2", [bg2tiles],0,0);
    this.bg3Layer = map.createLayer("bg3", [bg3tiles],0,0);
    this.bg4Layer = map.createLayer("bg4", [bg4tiles],0,0);
    this.buildingLayer = map.createLayer("building", [buildingtiles],0,0);
    this.ladderLayer = map.createLayer("ladder", [buildingtiles],0,0);
    this.boxLayer = map.createLayer("box", [boxtiles],0,0);

    // Set the boundaries of our game world
    this.physics.world.bounds.width = this.bg1Layer.width;
    this.physics.world.bounds.height = this.bg1Layer.height;

    // Object layers - Put Tiled object layer here
      var start = map.findObject("objectLayer",(obj) => obj.name === "start");
      this.e1 = map.findObject("objectLayer",(obj) => obj.name === "e1");
      this.e2 = map.findObject("objectLayer",(obj) => obj.name === "e2");
      this.e3 = map.findObject("objectLayer",(obj) => obj.name === "e3");
      this.boss = map.findObject("objectLayer",(obj) => obj.name === "boss");
      this.key = map.findObject("objectLayer",(obj) => obj.name === "key");

  
    // Create the this.playersprite
      //this.player = this.physics.add.sprite(100, 200, 'girl')
      //this.player = this.physics.add.sprite(startPoint.x, startPoint.y, "girl");
      this.player = this.physics.add.sprite(start.x, start.y, 'applejack');

      //  this.this.player physics properties. Give the little guy a slight bounce
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);

      this.player.body.checkCollision.up = false;

       // first gid is 3601 = ladder is 146(3747) & 170(3771))
     this.ladderLayer.setTileIndexCallback(3747, this.allowClimb, this);
     this.ladderLayer.setTileIndexCallback(3771, this.allowClimb, this);
     this.physics.add.overlap(this.ladderLayer, this.player);

     // first gid is 3985 = box is 0(3985)
     this.boxLayer.setTileIndexCallback(3985, this.allowHide, this);
     this.physics.add.overlap(this.boxLayer, this.player);

     this.anims.create({
      key: "bossmove",
      frames: this.anims.generateFrameNumbers("boss", { start: 0, end: 11 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "keymove",
      frames: this.anims.generateFrameNumbers("key", { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1,
    });
     
      this.anims.create({
        key: "e1right",
        frames: this.anims.generateFrameNumbers("enemy1", { start: 0, end: 11 }),
        frameRate: 5,
        repeat: -1,
      });

      this.anims.create({
        key: "e1left",
        frames: this.anims.generateFrameNumbers("enemy1", { start: 12, end: 23 }),
        frameRate: 5,
        repeat: -1,
      });


      this.anims.create({
        key: "e2idle",
        frames: this.anims.generateFrameNumbers("enemy2", { start: 1, end: 1 }),
        frameRate: 0.1,
        repeat: 0,
      });

      this.anims.create({
        key: "e2almost",
        frames: this.anims.generateFrameNumbers("enemy2", { start: 1, end: 2 }),
        frameRate: 5,
        repeat: 6,
      });

      this.anims.create({
        key: "e2on",
        frames: this.anims.generateFrameNumbers("enemy2", { start: 0, end: 0 }),
        frameRate: 0.1,
        repeat: 0,
      });


      this.enemy1 = this.physics.add.sprite(this.e1.x, this.e1.y, 'enemy1').play("e1right");
      this.enemy1.body.setAllowGravity(false);

      this.enemy2 = this.physics.add.sprite(this.e2.x, this.e2.y, "enemy2")
      this.enemy2.body.setAllowGravity(false);
      this.enemy2.body.setOffset(500, 500);

      this.enemy3 = this.physics.add.sprite(this.e3.x, this.e3.y, 'enemy1').play("e1left");
      this.enemy3.body.setAllowGravity(false);

      this.boss = this.physics.add.sprite(this.boss.x, this.boss.y, 'boss').play("bossmove");
      this.boss.body.setAllowGravity(false);

      this.key = this.physics.add.sprite(this.key.x, this.key.y, 'key').play("keymove");
      this.key.body.setAllowGravity(false);
      
      var body = this.enemy2.body;
      var cctvtrigger = this.enemy2.play("e2idle");
      
      cctvtrigger.on('animationcomplete', (sprite) =>
      {
        if (sprite.key === 'e2idle')
        { 
          // this.showenemy2 = false;
          this.enemy2.play('e2almost');

        } else if (sprite.key === 'e2almost')
        {
          this.showenemy2 = true;
          this.enemy2.play('e2on');

        } else if (sprite.key === 'e2on')
        {
          this.enemy2.play('e2idle');
          // this.showenemy2 = false;

        } 
      }, this);


    // Colliders
      //this.physics.add.collider(mathis.player, this.this.player);
      // this.buildingLayer = this.physics.add.group();

      this.buildingLayer.setCollisionByProperty({ wall: true });
      this.physics.add.collider(this.buildingLayer, this.player);
      // this.physics.add.collider(this.player, this.enemy1, this.hitEnemy, null, this);
 
     //  Our this.player animations, turning, walking left and walking right.
     this.anims.create({
      key: 'stand',
      frames: this.anims.generateFrameNumbers('applejack', { start:1, end: 1}),
      frameRate: 10,
      repeat: -1
      });

     this.anims.create({
         key: 'left',
         frames: this.anims.generateFrameNumbers('applejack', { start:17, end: 22 }),
         frameRate: 10,
         repeat: -1
     });
 
     this.anims.create({
         key: 'up',
         frames: this.anims.generateFrameNumbers('applejack', { start: 23, end: 28 }),
         frameRate: 10
     });

     this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('applejack', { start: 23, end: 28 }),
      frameRate: 10
    });
 
     this.anims.create({
         key: 'right',
         frames: this.anims.generateFrameNumbers('applejack', { start: 11, end: 16 }),
         frameRate: 10,
         repeat: -1
     });

     this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('applejack', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
      });

      this.anims.create({
        key: 'hide',
        frames: this.anims.generateFrameNumbers('applejack', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
        });


    // Add time event / movement here
      this.time.addEvent({
      delay: 3000,
      callback: this.moveRightLeft,
      callbackScope: this,
      loop: false,
    });

        this.time.addEvent({
          delay: 3000,
          callback: this.moveLeftRight,
          callbackScope: this,
          loop: false,
        });


    // get the tileIndex number in json, +1
    //this.player.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    //this.physics.add.collider(mathis.player, this.this.player);


    // this.physics.add.overlap(
    //   this.player,
    //   this.e2,
    //   this.hitEnemy,
    //   null,
    //   this
    // );

    this.physics.add.overlap(
      this.player,
      this.e1,
      this.hitEnemy,
      null,
      this
    );

    

    this.physics.add.overlap(
      this.player,
      this.e3,
      this.hitEnemy,
      null,
      this
    );

    // this.physics.add.overlap(
    //   this.player,
    //   this.e2,
    //   this.hitEnemy,
    //   null,
    //   this
    // );



    this.physics.add.overlap(
      this.player,
      this.key,
      this.collectkey,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.boss,
      this.killboss,
      null,
      this
    );

    

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    var e1timer = new Phaser.Time.TimerEvent({ delay: 6000 });

    // camera follow this.player
    this.cameras.main.startFollow(this.player);
    
    //this.input.once('pointerdown', function(){
      var spaceDown = this.input.keyboard.addKey('SPACE');
        
      spaceDown.on('down', function(){
      console.log("Spacebar pressed, goto level2");
      this.scene.start("level2");
      }, this );

  } /////////////////// end of create //////////////////////////////

  update() {

    if (this.player.x > 1250 && this.player.x < 1260 && this.player.y < 700 ) {
      this.nextLevel();
   }

//    if (this.player.x > 380 && this.player.x < 400 && this.player.y < 210) {
//     this.offsetE1();
//  } else {
//   this.resetE1();
//  }

    if (this.showenemy2){
    // console.log("I AM ON")
          this.enemy2.body.setOffset(-500, -500);
          this.enemy2.enableBody(true, 442, 476, true, true);
    } 

    // if (this.hidefromenemy1){
    //   console.log("I AM AWAY")
    //         this.enemy1.body.setOffset(-500, -500);
    //   } 
    // //   else {
    // //     this.enemy1.enableBody(true, this.e1.x, this.e1.y, true, true);
    // //   }
      
    //   if (this.resetenemy1) {
    //     console.log("I AM ON")
    //     // this.enemy1.enableBody(true, this.e1.x, this.e1.y, true, true);
    //     this.enemy1.body.setOffset( this.e1.x, this.e1.y);
    //     this.enemy1.enableBody(true, this.e1.x, this.e1.y, true, true);
    //   }


      // var toggle = [this.cursors.down.isDown && this.inBox == true]

     
      // if (toggle = true) {
      //   console.log("e1timer")
      //   this.e1timer = true
      // }

//       toggle.on.add( // When it ends set a timeout function to restart it
//         function() {
//             setTimeout( 
//               function() {
//               sound.play();
//               },
//                 10000 // Delay
//             )
//         }
//     );
// sound.play();
    
    if (this.onLadder) {
      //console.log('Gravity 0');
      this.player.setGravityY(0);
      // Prevent any gravity on body
      this.player.body.setAllowGravity(false);
  } else {
      //console.log('Gravity 300');
      this.player.setGravityY(300);
      // Re-enable gravity on body
      this.player.body.setAllowGravity(true);
  }

  if (this.inBox) {
      //console.log('Gravity 0');
      this.player.setGravityY(0);
      // Prevent any gravity on body
      this.player.body.setAllowGravity(false);
    } else {
        //console.log('Gravity 300');
        this.player.setGravityY(300);
        // Re-enable gravity on body
        this.player.body.setAllowGravity(true);
    }

    if (this.cursors.left.isDown)
    {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    }

    else if (this.cursors.up.isDown && this.onLadder == false)
    {
      //jump
      this.player.setVelocityY(-200);
      this.player.anims.play('jump', true); 
    } else if (this.cursors.up.isDown && this.onLadder == true) {
      // On ladder, climb up , -Y
      this.player.anims.play('up', true);
      this.player.setGravityY(0);
      this.player.setVelocityY(-100);
    }

    else if (this.cursors.down.isDown && this.onLadder == true) {
     // On ladder, climb down , +Y
     this.player.anims.play('down', true);
     this.player.setGravityY(0);
     this.player.setVelocityY(100);
    } else if (this.onLadder) {
     // Disable gravity on body
     this.player.body.setVelocityX(0);
     this.player.body.setVelocityY(0);
     this.player.anims.play('stand', true);
    }
      else if (this.cursors.down.isDown && this.inBox == true) {
     console.log('Im hiding, Show enemy False, Hide enemy true');
     this.player.anims.play('hide', true);
     this.player.setGravityY(0);
     this.player.body.setVelocityX(0);
     this.player.body.setVelocityY(0);
     this.showenemy2 = false;
    } else if (this.inBox) {
      console.log('Im standing in the Box, Show enemy false');
      this.player.body.setVelocityX(0);
      this.player.body.setVelocityY(0);
      this.player.anims.play('stand', true);
     } 
    
    else {
    this.player.anims.play("stand");
    this.player.setVelocityX(0);
    }


  // Reset onLadder flag 
  this.onLadder = false;

  // Reset inBox flag 
  this.inBox = false;


  
} /////////////////// end of update //////////////////////////////

  moveRightLeft() {
    // console.log("moveRightLeft");
    this.tweens.timeline({
      targets: this.enemy1,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 3000,
      tweens: [
        {
          x: 500,
        },
        {
          x: 299,
        },
      ],
    });
}

moveLeftRight() {
  // console.log("moveLeftRight");
  this.tweens.timeline({
    targets: this.enemy3,
    loop: -1, // loop forever
    ease: "Linear",
    duration: 3000,
    tweens: [
      {
        x: 620,
      },
      {
        x: 870,
      },
    ],
  });
}

allowClimb (sprite, tile) {
  // console.log('Allow Climb', tile);
  this.distance = Math.abs(this.player.x - (tile.pixelX + tile.width / 2));
  //console.log(this.player.x, tile.pixelX, this.distance);
  this.onLadder = true;
}

allowHide (sprite, object) {
  // console.log('Allow Hide', tile);
  this.distance = Math.abs(this.player.x - (object.pixelX + object.width / 2));
  //console.log(this.player.x, tile.pixelX, this.distance);
  this.inBox = true;
}

hitEnemy(player, enemy) {
  console.log('Ouchies!');
  //this.scene.pause();
  this.cameras.main.shake(100);
  // window.boss = 0
  // delay 1 sec
  this.life = this.life -1;

  enemy.disableBody(true, true);
    
  if (this.life < 1 )
  {  this.time.delayedCall(500,function() {
  this.life = 1;
  this.scene.restart();
  this.scene.start("gameOver");
  },[], this);
  } 
}

// offsetE1 (enemy1) {
//   console.log("offsetE1")
//   this.enemy1.body.setOffset(500, 500);
//   // this.resete1again.destroy, this.resete1again);
// }


// resetE1 (enemy1) {
//     console.log("resetE1")
//     this.enemy1.body.setOffset(-500, -500);
//     // this.resete1again.destroy, this.resete1again);
//   }


collectkey (player, key)
{
  console.log("key collected");
    window.key ++
    key.disableBody(true, true);  
}

killboss (player, boss) {
  if (window.key === 1) {
  console.log("Die!");
  window.boss = false;
  boss.disableBody(true, true);
  } else {
    this.cameras.main.shake(100);
  }
}

nextLevel(player,tile) {
  console.log("exit level1");
  this.scene.start("level2")
}

} //////////// end of class world ////////////////////////
