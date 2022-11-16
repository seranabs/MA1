class level1 extends Phaser.Scene {
  constructor() {
    super({
      key: "level1",
    });

    // Put global variable here
  }

  preload() {
    // Step 1, load JSON
    //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");
    this.load.tilemapTiledJSON("level1", "assets/level1/map.tmj");

    // Step 2 : Preload any images here
    //this.load.image("building", "assets/Buildings32x32.png");
    //this.load.image("street", "assets/Street32x32.png");
    // this.load.image("tilesIMG", "assets/Tiles.png")
    // this.load.image("propsIMG", "assets/Props-01.png")
    // this.load.image("bgpropsIMG", "assets/Background Props.png")


    this.load.image("bg1IMG", "assets/level1/bg1.png")
    this.load.image("bg2IMG", "assets/level1/bg2.png")
    this.load.image("bg3IMG", "assets/level1/planet.png")
    this.load.image("bg4IMG", "assets/level1/bg3.png")
    this.load.image("buildingIMG", "assets/level1/tileset.png")
    this.load.spritesheet('applejack', 'assets/spritesheet.png', { frameWidth: 64, frameHeight: 64 });
    

  }

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    //let map = this.make.tilemap({ key: "world1" });

    let map = this.make.tilemap({ key: "level1" });

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
      buildingtiles
    ];

    // Step 6  Load in layers by layers
    //this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);
    // this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);
    this.bg1Layer = map.createLayer("bg1", [bg1tiles],0,0);
    this.bg2Layer = map.createLayer("bg2", [bg2tiles],0,0);
    this.bg3Layer = map.createLayer("bg3", [bg3tiles],0,0);
    this.bg4Layer = map.createLayer("bg4", [bg4tiles],0,0);
    this.buildingLayer = map.createLayer("building", [buildingtiles],0,0);

    //this.streetLayer = map.createLayer("streetLayer",tilesArray,0,0);
    // this.buildingLayer = map.createLayer("buildingLayer",tilesArray,0,0);

    // Add main this.player here with physics.add.sprite

    this.player = this.physics.add.sprite(100, 670, 'applejack');

     //  this.this.player physics properties. Give the little guy a slight bounce.
     this.player.setBounce(0.2);
    //  this.player.setCollideWorldBounds(true);
 
     //  Our this.player animations, turning, walking left and walking right.
     this.anims.create({
         key: 'left',
         frames: this.anims.generateFrameNumbers('applejack', { start: 6, end: 11 }),
         frameRate: 10,
         repeat: -1
     });
 
     this.anims.create({
         key: 'up',
         frames: this.anims.generateFrameNumbers('applejack', { start: 22, end: 27 }),
         frameRate: 10
     });

     this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('applejack', { start: 22, end: 27 }),
      frameRate: 10
  });
 
     this.anims.create({
         key: 'right',
         frames: this.anims.generateFrameNumbers('applejack', { start: 0, end: 5 }),
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
      console.log("Spacebar pressed, goto level2");
      this.scene.start("level2");
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
    else if (this.cursors.up.isDown)
    {
        this.player.setVelocityY(-160);
        this.player.anims.play('up', true);
        
    }
    else if (this.cursors.down.isDown)
    {
        this.player.setVelocityY(160);
        this.player.anims.play('down', true);
        
    }
    else {
      this.player.anims.stop();
      this.player.body.setVelocity(0, 0);
      //console.log('idle');
    }

    // if (this.cursors.up.isDown && this.player.body.touching.down)
    // {
    //     this.player.setVelocityY(-330);
    // }

  } /////////////////// end of update //////////////////////////////

} //////////// end of class world ////////////////////////
