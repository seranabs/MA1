class level3 extends Phaser.Scene {
    constructor() {
      super({
        key: "level3",
      });
      var ladder = false;
      var box = false
      var enemy2
      this.life = 1
      this.showcctv1 = false;
      this.showcctv2 = false;
      this.showcctv3 = false;
    }

    init(data) {
      this.player = data.player
      this.inventory = data.inventory
  }
  
    preload() {
      // Step 1, load JSON
      //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");
      this.load.tilemapTiledJSON("level3", "assets/level3/map.tmj");
  
     // Step 2 : Preload any images here

      this.load.image("bgL31IMG", "assets/level3/background1.png")
      this.load.image("bgL32IMG", "assets/level3/background2.png")
      this.load.image("bgL33IMG", "assets/level3/backgroundlayer.png")
      this.load.image("platformsIMG", "assets/level3/mainplatforms.png")
      this.load.image("tilesetIMG", "assets/level3/tileset.png")
      this.load.spritesheet('applejack', 'assets/spritesheet.png', { frameWidth: 64, frameHeight: 64 });
      this.load.image("box", "assets/box.png")
      this.load.spritesheet('enemy1', 'assets/spritesheet_enemy1.png', { frameWidth: 91, frameHeight: 96 });
      this.load.spritesheet('enemy2', 'assets/spritesheet_enemy2.png', { frameWidth: 128, frameHeight: 128 });
      this.load.spritesheet('boss', 'assets/boss.png', { frameWidth: 33, frameHeight: 96 });
      this.load.spritesheet('key', 'assets/key.png', { frameWidth: 32, frameHeight: 32 });
  
    }//////end of preload////////
  
    create() {
      console.log("*** level3 scene");
  
      //Step 3 - Create the map from main
      //let map = this.make.tilemap({ key: "world1" });
  
      let map = this.make.tilemap({ key: "level3" });

      window.key = 0
  
      // Step 4 Load the game tiles
      // 1st parameter is name in Tiled,
      // 2nd parameter is key in Preload
      //let buildingTiles = map.addTilesetImage("Buildings32x32", "building");
      //let streetTiles = map.addTilesetImage("Street32x32", "street");
  
      let bg1tiles = map.addTilesetImage("bg1", "bgL31IMG");
      let bg2tiles = map.addTilesetImage("bg2", "bgL32IMG");
      let bg3tiles = map.addTilesetImage("bg3", "bgL33IMG");
      let platformtiles = map.addTilesetImage("platforms", "platformsIMG");
      let laddertiles = map.addTilesetImage("tileset", "tilesetIMG");
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
        platformtiles,
        laddertiles,
        boxtiles,
      ];
  
      // Step 6  Load in layers by layers
      //this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);
      //this.streetLayer = map.createLayer("streetLayer",tilesArray,0,0);
      // this.buildingLayer = map.createLayer("buildingLayer",tilesArray,0,0);
  
      this.bgLayer = map.createLayer("bgLayer", [bg1tiles],0,0);
      this.bg2Layer = map.createLayer("bg2Layer", [bg2tiles],0,0);
      this.blackLayer = map.createLayer("blackLayer", [platformtiles],0,0);
      this.bg3Layer = map.createLayer("bg3Layer", [bg3tiles],0,0);
      this.platformLayer = map.createLayer("buildingLayer", [platformtiles],0,0);
      this.ladderLayer = map.createLayer("ladderLayer", [laddertiles],0,0);
      this.boxLayer = map.createLayer("box", [boxtiles],0,0);

      // set the boundaries of our game world
      this.physics.world.bounds.width = this.bgLayer.width;
      this.physics.world.bounds.height = this.bgLayer.height;

     // Object layers - Put Tiled object layer here
     var start = map.findObject("objectLayer",(obj) => obj.name === "start");
     var start = map.findObject("objectLayer",(obj) => obj.name === "start");
     var e1 = map.findObject("objectLayer",(obj) => obj.name === "e1");
     var e2 = map.findObject("objectLayer",(obj) => obj.name === "e2");
     var e3 = map.findObject("objectLayer",(obj) => obj.name === "e3");
     var e4 = map.findObject("objectLayer",(obj) => obj.name === "e4");
     var e5 = map.findObject("objectLayer",(obj) => obj.name === "e5");
     var e6 = map.findObject("objectLayer",(obj) => obj.name === "e6");
     var e7 = map.findObject("objectLayer",(obj) => obj.name === "e7");

      var cctv1 = map.findObject("objectLayer",(obj) => obj.name === "cctv1");
      var cctv2 = map.findObject("objectLayer",(obj) => obj.name === "cctv2");
      var cctv3 = map.findObject("objectLayer",(obj) => obj.name === "cctv3");

      this.boss = map.findObject("objectLayer",(obj) => obj.name === "boss");
      this.key = map.findObject("objectLayer",(obj) => obj.name === "key");


      // Create the this.playersprite
      //this.player = this.physics.add.sprite(100, 200, 'girl')
      //this.player = this.physics.add.sprite(startPoint.x, startPoint.y, "girl");
      this.player = this.physics.add.sprite(start.x, start.y, 'applejack');
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);
      this.player.body.checkCollision.up = false;

      // first gid is 3073 = ladder is 146(3219) & 170(3243)
     this.ladderLayer.setTileIndexCallback(3219, this.allowClimb, this);
     this.ladderLayer.setTileIndexCallback(3243, this.allowClimb, this);
     this.physics.add.overlap(this.ladderLayer, this.player);

     // first gid is 3457 = box is 0(3985)
     this.boxLayer.setTileIndexCallback(3457, this.allowHide, this);
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
      frameRate: 0.3,
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
      frameRate: 0.4,
      repeat: 0,
    });

    this.anims.create({
      key: "e2Lidle",
      frames: this.anims.generateFrameNumbers("enemy2", { start: 4, end: 4 }),
      frameRate: 0.3,
      repeat: 0,
    });

    this.anims.create({
      key: "e2Lalmost",
      frames: this.anims.generateFrameNumbers("enemy2", { start: 4, end: 4}),
      frameRate: 5,
      repeat: 6,
    });

    this.anims.create({
      key: "e2Lon",
      frames: this.anims.generateFrameNumbers("enemy2", { start: 3, end: 3 }),
      frameRate: 0.4,
      repeat: 0,
    });

  
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

       ////////enemy bodies//////////
      
      this.enemy1 = this.physics.add.sprite(e1.x, e1.y, 'enemy1').play("e1right");
      this.enemy1.body.setAllowGravity(false);

      this.enemy2 = this.physics.add.sprite(e2.x, e2.y, 'enemy1').play("e1left");
      this.enemy2.body.setAllowGravity(false);

      this.enemy3 = this.physics.add.sprite(e3.x, e3.y, 'enemy1').play("e1right");
      this.enemy3.body.setAllowGravity(false);

      this.enemy4 = this.physics.add.sprite(e4.x, e4.y, 'enemy1').play("e1right");
      this.enemy4.body.setAllowGravity(false);

      this.enemy5 = this.physics.add.sprite(e5.x, e5.y, 'enemy1').play("e1right");
      this.enemy5.body.setAllowGravity(false);

      this.enemy6 = this.physics.add.sprite(e6.x, e6.y, 'enemy1').play("e1right");
      this.enemy6.body.setAllowGravity(false);

      this.enemy7 = this.physics.add.sprite(e7.x, e7.y, 'enemy1').play("e1left");
      this.enemy7.body.setAllowGravity(false);

      this.cctv1 = this.physics.add.sprite(cctv1.x, cctv1.y, 'enemy2');
      this.cctv1.body.setAllowGravity(false);
      this.cctv1.body.setOffset(1000, 1000);

      this.cctv2 = this.physics.add.sprite(cctv2.x, cctv2.y, 'enemy2');
      this.cctv2.body.setAllowGravity(false);
      this.cctv2.body.setOffset(1000, 1000);

      this.cctv3 = this.physics.add.sprite(cctv3.x, cctv3.y, 'enemy2');
      this.cctv3.body.setAllowGravity(false);
      this.cctv3.body.setOffset(1000, 1000);

      this.boss = this.physics.add.sprite(this.boss.x, this.boss.y, 'boss').play("bossmove");
      this.boss.body.setAllowGravity(false);

      this.key = this.physics.add.sprite(this.key.x, this.key.y, 'key').play("keymove");
      this.key.body.setAllowGravity(false);

      var cctvtrigger1 = this.cctv1.play("e2idle")
      var cctvtrigger2 = this.cctv2.play("e2Lidle")
      var cctvtrigger3 = this.cctv3.play("e2idle")

      cctvtrigger1.on('animationcomplete', (sprite) =>
      {
        if (sprite.key === 'e2idle')
        { 
          this.showcctv1 = false;
          this.cctv1.play('e2almost');

        } else if (sprite.key === 'e2almost')
        {
          this.showcctv1 = true;
          this.cctv1.play('e2on');

        } else if (sprite.key === 'e2on')
        {
          this.showcctv1 = false;
          this.cctv1.play('e2idle');
        } 
      }, this);

      cctvtrigger2.on('animationcomplete', (sprite) =>
      {
        if (sprite.key === 'e2Lidle')
        { 
          this.showcctv2 = false;
          this.cctv2.play('e2Lalmost');

        } else if (sprite.key === 'e2Lalmost')
        {
          this.showcctv2 = true;
          this.cctv2.play('e2Lon');

        } else if (sprite.key === 'e2Lon')
        {
          this.showcctv2 = false;
          this.cctv2.play('e2Lidle');
        } 
      }, this);

      cctvtrigger3.on('animationcomplete', (sprite) =>
      {
        if (sprite.key === 'e2idle')
        { 
          this.showcctv3 = false;
          this.cctv3.play('e2almost');

        } else if (sprite.key === 'e2almost')
        {
          this.showcctv3 = true;
          this.cctv3.play('e2on');

        } else if (sprite.key === 'e2on')
        {
          this.showcctv3 = false;
          this.cctv3.play('e2idle');
        } 
      }, this);

      // Colliders
      //this.physics.add.collider(mathis.player, this.this.player);

      this.platformLayer.setCollisionByProperty({ wall: true });
      this.physics.add.collider(this.platformLayer, this.player);
  
  
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
      //mathis.player.setTileIndexCallback(11, this.room1, this);

      this.physics.add.overlap(
        this.player,
        [ this.e1,
          this.e2,
          this.e3,
          this.e4,
          this.e5,
          this.e6,
          this.e7
        ],
        this.hitEnemy,
        null,
        this
      );

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
  
      // camera follow this.player
      this.cameras.main.startFollow(this.player);
      
      // this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
          
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level3");
        this.scene.start("gameOver");
        }, this );
    } /////////////////// end of create //////////////////////////////
  
    update() {

      if (this.player.x > 1800 && this.player.y < 350 ) {
        this.goodending();
     }

      if (this.showcctv1){
        // console.log("I AM ON")
              this.cctv1.body.setOffset(-1000, -1000);
              this.cctv1.enableBody(true, 1170, 930, true, true);
        } 

        if (this.showcctv2){
          // console.log("I AM ON")
                this.cctv2.body.setOffset(-1000, -1000);
                this.cctv2.enableBody(true, 1680, 680, true, true);
          } 

          if (this.showcctv3){
            // console.log("I AM ON")
                  this.cctv3.body.setOffset(-1000, -1000);
                  this.cctv3.enableBody(true, 305, 490, true, true);
            } 
    
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
        this.showcctv1 = false;
        this.showcctv2 = false;
        this.showcctv3 = false;
       //  this.hidefromenemy1 = true;
       } else if (this.inBox) {
         console.log('Im standing in the Box, Show enemy false');
         this.player.body.setVelocityX(0);
         this.player.body.setVelocityY(0);
         this.player.anims.play('stand', true);
        //  this.hidefromenemy1 = false;
         // this.resetenemy1 = true;
        } 

      else {
      // this.player.anims.stop();
      this.player.anims.play("stand");
      this.player.setVelocityX(0);
      // this.player.body.setVelocity(0, 0);
        //console.log('idle');
      }

      // Reset onLadder flag 
      this.onLadder = false;

      // Reset inBox flag 
      this.inBox = false;
  
    } /////////////////// end of update //////////////////////////////
  
    moveRightLeft1() {
      // console.log("moveRightLeft");
      this.tweens.timeline({
        targets: this.enemy1,
        loop: -1, // loop forever
        ease: "Linear",
        duration: 3000,
        tweens: [
          {
            x: 600,
          },
          {
            x: 175,
          },
        ],
      });
  }

  moveRightLeft2() {
    // console.log("moveRightLeft");
    this.tweens.timeline({
      targets: this.enemy3,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 3000,
      tweens: [
        {
          x: 1800,
        },
        {
          x: 900,
        },
      ],
    });
}

moveRightLeft3() {
  // console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.enemy4,
    loop: -1, // loop forever
    ease: "Linear",
    duration: 3000,
    tweens: [
      {
        x: 800,
      },
      {
        x: 0,
      },
    ],
  });
}

moveRightLeft4() {
  // console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.enemy5,
    loop: -1, // loop forever
    ease: "Linear",
    duration: 3000,
    tweens: [
      {
        y: 300,
      },
      {
        y: 90,
      },
    ],
  });
}

moveRightLeft5() {
  // console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.enemy6,
    loop: -1, // loop forever
    ease: "Linear",
    duration: 3000,
    tweens: [
      {
        x: 1200,
      },
      {
        x: 200,
      },
    ],
  });
}


  moveLeftRight2() {
    // console.log("moveLeftRight");
    this.tweens.timeline({
      targets: this.enemy2,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 3000,
      tweens: [
        {
          x: 0,
        },
        {
          x: 800,
        },
      ],
    });
  }

  oveLeftRight2() {
    // console.log("moveLeftRight");
    this.tweens.timeline({
      targets: this.enemy7,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 3000,
      tweens: [
        {
          x: 1000,
        },
        {
          x: 1500,
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

  hitEnemy(player, enemy1) {
    console.log('Ouchies!');
    //this.scene.pause();
    this.cameras.main.shake(100);
    // window.boss = 0
    // delay 1 sec
    this.life = this.life -1;
  
    this.enemy1.disableBody(true, true);
        
    if (this.life < 1 )
    {  this.time.delayedCall(500,function() {
    this.life = 1;
    this.scene.restart();
    this.scene.start("gameOver");
    },[], this);
    } 
  }
  
  collectkey (player, key)
  {
    console.log("key collected");
      window.key ++
      key.disableBody(true, true);  
  }
  
  killboss (player, boss) {
    if (window.key === 1) {
    console.log("Die!");
    window.key ++
    boss.disableBody(true, true);
    } else {
      this.cameras.main.shake(100);
    }
  }

  goodending (player, boss) {
    if (window.boss === 3) {
    console.log("Goodending");
    this.scene.restart();
    this.scene.start("gameOver");
    }
  } 


  } //////////// end of class world ////////////////////////
  
