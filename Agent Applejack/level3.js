class level3 extends Phaser.Scene {
    constructor() {
      super({
        key: "level3",
      });
      var ladder = false;
      // Put global variable here
    }
  
    preload() {
      // Step 1, load JSON
      //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");
      this.load.tilemapTiledJSON("level3", "assets/level3/map.tmj");
  
     // Step 2 : Preload any images here

      this.load.image("bg1IMG", "assets/level3/DP/_PNG/background1.png")
      this.load.image("bg2IMG", "assets/level3/DP/_PNG/background2.png")
      this.load.image("bg3IMG", "assets/level3/DP/_PNG/3. background layer.png")
      this.load.image("platformsIMG", "assets/level3/DP/_PNG/1. main platforms.png")
      this.load.image("tilesetIMG", "assets/level3/tileset.png")
      this.load.spritesheet('applejack', 'assets/spritesheet.png', { frameWidth: 64, frameHeight: 64 });
      this.load.image("box1", "assets/box.png")
      this.load.spritesheet('enemy1', 'assets/spritesheet_enemy1.png', { frameWidth: 91, frameHeight: 96 });
      this.load.spritesheet('enemy2', 'assets/spritesheet_enemy2.png', { frameWidth: 128, frameHeight: 128 });
  
    }//////end of preload////////
  
    create() {
      console.log("*** level3 scene");
  
      //Step 3 - Create the map from main
      //let map = this.make.tilemap({ key: "world1" });
  
      let map = this.make.tilemap({ key: "level3" });

      // window.map = map;
  
      // Step 4 Load the game tiles
      // 1st parameter is name in Tiled,
      // 2nd parameter is key in Preload
      //let buildingTiles = map.addTilesetImage("Buildings32x32", "building");
      //let streetTiles = map.addTilesetImage("Street32x32", "street");
  
      let bg1tiles = map.addTilesetImage("bg1", "bg1IMG");
      let bg2tiles = map.addTilesetImage("bg2", "bg2IMG");
      let bg3tiles = map.addTilesetImage("bg3", "bg3IMG");
      let platformtiles = map.addTilesetImage("platforms", "platformsIMG");
      let laddertiles = map.addTilesetImage("tileset", "tilesetIMG")
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

      // set the boundaries of our game world
      this.physics.world.bounds.width = this.bgLayer.width;
      this.physics.world.bounds.height = this.bgLayer.height;

     // Object layers - Put Tiled object layer here
     var start = map.findObject("objectLayer",(obj) => obj.name === "start");
     var e1 = map.findObject("objectLayer",(obj) => obj.name === "e1");
     var e2 = map.findObject("objectLayer",(obj) => obj.name === "e2");
     var box1 = map.findObject("objectLayer",(obj) => obj.name === "box1");
     // var fire1 = map.findObject("objectLayer", (obj) => obj.name === "fire1")

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

    this.enemy1 = this.physics.add.sprite(e1.x, e1.y, 'enemy1').play("e1right");
    this.enemy1.body.setAllowGravity(false);

    this.enemy2 = this.physics.add.sprite(e2.x, e2.y, 'enemy2');
    this.enemy2.body.setAllowGravity(false);

    this.box1 = this.physics.add.sprite(box1.x, box1.y, 'box1');
    this.box1.body.setAllowGravity(false);


      // Colliders
      //this.physics.add.collider(mathis.player, this.this.player);

      this.platformLayer.setCollisionByProperty({ wall: true });
      this.physics.add.collider(this.platformLayer, this.player);
  
  
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
        callback: this.cctv,
        callbackScope: this,
        loop: false,
      });

  
      // get the tileIndex number in json, +1
      //mathis.player.setTileIndexCallback(11, this.room1, this);

      this.physics.add.overlap(
        this.player,
        this.laser,
        this.hitLaser,
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
      
      else if (this.cursors.up.isDown && this.player.body.onFloor)
      {// hide
          this.player.setVelocityY(0);
          this.player.setVelocityX(0);
          this.player.anims.play('hide', true);
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
  
    } /////////////////// end of update //////////////////////////////
  
    moveRightLeft() {
      console.log("moveRightLeft");
      this.tweens.timeline({
        targets: this.enemy1,
        loop: -1, // loop forever
        ease: "Linear",
        duration: 2000,
        tweens: [
          {
            x: 500,
          },
          {
            x: 400,
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
  
  cctv() {
    console.log("laser");
    
  }
  
  // this function will be called when the this.playertouches a coin
  hitLaser(player, laser) {
    console.log("Hit fire!!!", player, laser);
    this.cameras.main.shake(200);
    this.laser.disableBody(true, true); // remove fire
  }

  } //////////// end of class world ////////////////////////
  
