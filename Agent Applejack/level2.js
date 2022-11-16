class level2 extends Phaser.Scene {
    constructor() {
      super({
        key: "level2",
      });
  
      // Put global variable here
    }
  
    preload() {
      // Step 1, load JSON
      //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");
      this.load.tilemapTiledJSON("level2", "assets/level2/map.tmj");
  
      // Step 2 : Preload any images here
      //this.load.image("building", "assets/Buildings32x32.png");
      //this.load.image("street", "assets/Street32x32.png");
      // this.load.image("tilesIMG", "assets/Tiles.png")
      // this.load.image("propsIMG", "assets/Props-01.png")
      // this.load.image("bgpropsIMG", "assets/Background Props.png")
  
  
      this.load.image("bg1IMG", "assets/level2/bg.png")
      this.load.image("buildingIMG", "assets/level2/tileset.png")
      this.load.image("sidebuildingIMG", "assets/level2/tileset2.png")
      this.load.image("xtrasIMG", "assets/level2/tileset3.png")
      // this.load.image("objectsIMG", "assets/level2/tileset.png")
      this.load.spritesheet('applejack', 'assets/spritesheet.png', { frameWidth: 64, frameHeight: 64 });
      
  
    }
  
    create() {
      console.log("*** world scene");
  
      //Step 3 - Create the map from main
      //let map = this.make.tilemap({ key: "world1" });
  
      let map = this.make.tilemap({ key: "level2" });
  
      // Step 4 Load the game tiles
      // 1st parameter is name in Tiled,
      // 2nd parameter is key in Preload
      //let buildingTiles = map.addTilesetImage("Buildings32x32", "building");
      //let streetTiles = map.addTilesetImage("Street32x32", "street");
  
      let bg1tiles = map.addTilesetImage("bg", "bg1IMG");
      let buildingtiles = map.addTilesetImage("building", "buildingIMG");
      let sidetiles = map.addTilesetImage("side", "sidebuildingIMG");
      let xtrastiles = map.addTilesetImage("xtras", "xtrasIMG");
      // let bg5tiles = map.addTilesetImage("tileset", "objectsIMG");
      this.cursors = this.input.keyboard.createCursorKeys();

  
      // Step 5  create an array of tiles
      // let tilesArray = [
      //   buildingTiles,
      //   streetTiles,
      // ];
  
      let tilesArray = [
        bg1tiles, 
        buildingtiles, 
        sidetiles, 
        xtrastiles
        // bg5tiles,
      ];
  
      // Step 6  Load in layers by layers
      //this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);
      //this.streetLayer = map.createLayer("streetLayer",tilesArray,0,0);
      // this.buildingLayer = map.createLayer("buildingLayer",tilesArray,0,0);
  
      this.bgLayer = map.createLayer("bg", [bg1tiles],0,0);
      this.buildingLayer = map.createLayer("building", [buildingtiles],0,0);
      this.sidebuildingLayer = map.createLayer("sidebuilding", [sidetiles],0,0);
      this.xtraLayer = map.createLayer("xtras", [xtrastiles],0,0);
      this.objectLayer = map.createLayer("objects", [buildingtiles],0,0);

      
      // Add main this.player here with physics.add.sprite
  
      this.player = this.physics.add.sprite(100, 670, 'applejack');
  
       //  this.this.player physics properties. Give the little guy a slight bounce.
       this.player.setBounce(0.2);
      //  this.player.setCollideWorldBounds(true);
   
       //  Our this.player animations, turning, walking left and walking right.
       this.anims.create({
           key: 'left',
           frames: this.anims.generateFrameNumbers('applejack', { start: 0, end: 3 }),
           frameRate: 10,
           repeat: -1
       });
   
       this.anims.create({
           key: 'turn',
           frames: [ { key: 'applejack', frame: 4 } ],
           frameRate: 20
       });
   
       this.anims.create({
           key: 'right',
           frames: this.anims.generateFrameNumbers('applejack', { start: 5, end: 8 }),
           frameRate: 10,
           repeat: -1
       });
  
  
      // Add time event / movement here
  
      // get the tileIndex number in json, +1
      //mathis.player.setTileIndexCallback(11, this.room1, this);
  
      // Add custom properties in Tiled called "mouintain" as bool
  
      // What will collider witg what layers
      //this.physics.add.collider(mathis.player, this.this.player);
  
      // create the arrow keys
      this.cursors = this.input.keyboard.createCursorKeys();
  
      // camera follow this.player
      this.cameras.main.startFollow(this.player);
      
      //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
          
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level3");
        this.scene.start("level3");
        }, this );
    } /////////////////// end of create //////////////////////////////
  
    update() {
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
      else
      {
          this.player.setVelocityX(0);
  
          this.player.anims.play('turn');
      }
  
      if (this.cursors.up.isDown && this.player.body.touching.down)
      {
          this.player.setVelocityY(-330);
      }
  
    } /////////////////// end of update //////////////////////////////
  
  } //////////// end of class world ////////////////////////
  
