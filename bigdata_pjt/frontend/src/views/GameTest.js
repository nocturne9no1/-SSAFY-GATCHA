import React from 'react'
import Phaser from 'phaser'
import "../sass/base/_test.scss"
import { IonPhaser } from '@ion-phaser/react'
import { delToken, store } from "../store";
import { useDispatch } from "react-redux";
import axios from "axios";


export default function MyGames() {
    let player_female;
    let player_male;
    let player;
    let cursors;
    let map;
    let bed;
    let direction = 'up';
    let profilebox;
    let surveybox;
    let recommendbox;
    let popularbox;
    let welcomebox;
    let logoutbox;
    let gender = 1;

    const dispatch = useDispatch();
    const clickLogout = () => {
        axios.defaults.headers.common['Authorization'] = '';
        dispatch(delToken())
        console.log(store.getState())
    }


    function toLogout(){
        logoutbox.visible = true;
        this.input.keyboard.on('keydown-Y',function(event){
            clickLogout();
            window.location.href = '/';
        });
    }
    function toProfile(){
        // window.location.href = '/survey';
        profilebox.visible = true;
        this.input.keyboard.on('keydown-Y',function(event){
            window.location.href = '/profile';
        });
    }
    function toSurvey(){
        // window.location.href = '/survey';
        surveybox.visible = true;
        this.input.keyboard.on('keydown-Y',function(event){
            window.location.href = '/survey';
        });
    }
    function toRecommend(){
        // window.location.href = '/survey';
        recommendbox.visible = true;
        this.input.keyboard.on('keydown-Y',function(event){
            window.location.href = '/recommend';
        });
    }
    function toPopular(){
        // window.location.href = '/survey';
        popularbox.visible = true;
        this.input.keyboard.on('keydown-Y',function(event){
            window.location.href = '/popular';
        });
    }

    function toWelcome(){
        // window.location.href = '/survey';
        welcomebox.visible = true;
        this.input.keyboard.on('keydown-Y',function(event){
            window.location.href = '/';
        });
    }


    const game = {
        type: Phaser.AUTO, // Which renderer to use
        width: 800, // Canvas width in pixels
        height: 544, // Canvas height in pixels
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y:0}
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };


    function preload() {
        // Runs once, loads up assets like images and audio
        this.load.image('tiles', "gamefile/poketile.png");
        this.load.image('roomTile', 'gamefile/Room_Builder.png');
        this.load.tilemapCSV('map', 'gamefile/map.csv');
        this.load.spritesheet('player_male','gamefile/player_male.png', {frameWidth:32, frameHeight:64});
        this.load.spritesheet('player_male_stop','gamefile/male_stop.png', {frameWidth:32, frameHeight:64});
        this.load.spritesheet('player_female','gamefile/player_female.png', {frameWidth:32, frameHeight:64});
        this.load.spritesheet('player_female_stop','gamefile/female_stop.png', {frameWidth:32, frameHeight:64});
        this.load.spritesheet('bed','gamefile/interior/Bed.png', {frameWidth:96, frameHeight:96});
        this.load.spritesheet('carpet1','gamefile/interior/carpet1.png', {frameWidth:64, frameHeight:96});
        this.load.spritesheet('carpet2','gamefile/interior/carpet2.png', {frameWidth:64, frameHeight:96});
        this.load.spritesheet('carpet3','gamefile/interior/carpet3.png', {frameWidth:64, frameHeight:96});
        this.load.spritesheet('window','gamefile/interior/window.png', {frameWidth:70, frameHeight:80});
        this.load.spritesheet('computer','gamefile/interior/computer.png', {frameWidth:64, frameHeight:96});
        this.load.spritesheet('shelf','gamefile/interior/shelf.png', {frameWidth:64, frameHeight:96});
        this.load.spritesheet('chatbox','gamefile/interior/chatbox.png', {frameWidth:64, frameHeight:96});
        this.load.spritesheet('door','gamefile/interior/door.png', {frameWidth:96, frameHeight:96});
        this.load.spritesheet('tv','gamefile/interior/bigtv.png', {frameWidth:64, frameHeight:96});
        this.load.spritesheet('tv2','gamefile/interior/bigtv2.png', {frameWidth:64, frameHeight:96});
        this.load.spritesheet('movetv','gamefile/interior/movetv.png', {frameWidth:96, frameHeight:64});
        this.load.spritesheet('camera','gamefile/interior/camera.png', {frameWidth:64, frameHeight:96});
        this.load.spritesheet('light','gamefile/interior/light.png', {frameWidth:64, frameHeight:96});
        this.load.spritesheet('table1','gamefile/interior/table1.png', {frameWidth:64, frameHeight:96});
        this.load.spritesheet('table2','gamefile/interior/table2.png', {frameWidth:64, frameHeight:96});
        this.load.spritesheet('table3','gamefile/interior/table3.png', {frameWidth:64, frameHeight:96});
        this.load.spritesheet('chair','gamefile/interior/chair.png', {frameWidth:64, frameHeight:96});
        this.load.spritesheet('blueball','gamefile/interior/balloonblue.png', {frameWidth:32, frameHeight:64});
        this.load.spritesheet('redball','gamefile/interior/balloonred.png', {frameWidth:32, frameHeight:64});
        this.load.spritesheet('greenball','gamefile/interior/balloongreen.png', {frameWidth:160, frameHeight:64});
        this.load.spritesheet('yellowball','gamefile/interior/balloonyellow.png', {frameWidth:32, frameHeight:64});
        this.load.spritesheet('doll','gamefile/interior/doll.png', {frameWidth:96, frameHeight:144});
        this.load.spritesheet('tomain','gamefile/interior/main.png', {frameWidth:64, frameHeight:32});
        this.load.spritesheet('profile','gamefile/interior/profile.png', {frameWidth:64, frameHeight:32});
        this.load.spritesheet('recommend','gamefile/interior/recommend.png', {frameWidth:64, frameHeight:32});
        this.load.spritesheet('popular','gamefile/interior/popular.png', {frameWidth:64, frameHeight:32});
        this.load.spritesheet('poppage','gamefile/interior/poppage.png', {frameWidth:128, frameHeight:64});
        this.load.spritesheet('propage','gamefile/interior/propage.png', {frameWidth:128, frameHeight:64});
        this.load.spritesheet('recopage','gamefile/interior/recopage.png', {frameWidth:128, frameHeight:64});
        this.load.spritesheet('surpage','gamefile/interior/surpage.png', {frameWidth:128, frameHeight:64});
        this.load.spritesheet('survey','gamefile/interior/survey.png', {frameWidth:128, frameHeight:64});
        this.load.spritesheet('welcome','gamefile/interior/welcome.png', {frameWidth:128, frameHeight:64});
        this.load.spritesheet('logout','gamefile/interior/logout.png', {frameWidth:128, frameHeight:64});
        this.load.spritesheet('survey1','gamefile/interior/survey1.png', {frameWidth:128, frameHeight:64});
        this.load.spritesheet('survey2','gamefile/interior/survey2.png', {frameWidth:128, frameHeight:64});
        this.load.spritesheet('survey3','gamefile/interior/survey3.png', {frameWidth:128, frameHeight:64});
    }

    function create() {
        // Runs once, after all assets in preload are loaded
        map = this.make.tilemap({key: 'map', tileWidth: 32, tileHeight: 32});
        // const tileset = map.addTilesetImage('tiles');
        const tileset = map.addTilesetImage('roomTile');
        const layer = map.createLayer(0, tileset, 0, 0);

        // frame size x, y, frame image, frame number
        if(gender == 0) {
            player_male = this.physics.add.sprite(384, 448, 'player_male', 8);
            player = player_male;

            this.anims.create({
                key: 'down',
                frames: this.anims.generateFrameNumbers('player_male', {start:18, end:23}),
                frameRate:10,
                repeat: -1
            });
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('player_male', {start:12, end:17}),
                frameRate:10,
                repeat: -1
            });
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('player_male', {start:0, end:5}),
                frameRate:10,
                repeat: -1
            });
            this.anims.create({
                key: 'up',
                frames: this.anims.generateFrameNumbers('player_male', {start:6, end:11}),
                frameRate:10,
                repeat: -1
            });
            this.anims.create({
                key: 'downstop',
                frames: this.anims.generateFrameNumbers('player_male_stop', {start:18, end:23}),
                frameRate:10,
                repeat: -1
            });
            this.anims.create({
                key: 'upstop',
                frames: this.anims.generateFrameNumbers('player_male_stop', {start:6, end:11}),
                frameRate:10,
                repeat: -1
            });
            this.anims.create({
                key: 'leftstop',
                frames: this.anims.generateFrameNumbers('player_male_stop', {start:12, end:17}),
                frameRate:10,
                repeat: -1
            });
            this.anims.create({
                key: 'rightstop',
                frames: this.anims.generateFrameNumbers('player_male_stop', {start:0, end:5}),
                frameRate:10,
            });
        }
        else {
            player_female = this.physics.add.sprite(384, 448, 'player_female', 8);
            player = player_female;

            this.anims.create({
                key: 'down',
                frames: this.anims.generateFrameNumbers('player_female', {start:18, end:23}),
                frameRate:10,
                repeat: -1
            });
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('player_female', {start:12, end:17}),
                frameRate:10,
                repeat: -1
            });
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('player_female', {start:0, end:5}),
                frameRate:10,
                repeat: -1
            });
            this.anims.create({
                key: 'up',
                frames: this.anims.generateFrameNumbers('player_female', {start:6, end:11}),
                frameRate:10,
                repeat: -1
            });
            this.anims.create({
                key: 'downstop',
                frames: this.anims.generateFrameNumbers('player_female_stop', {start:18, end:23}),
                frameRate:10,
                repeat: -1
            });
            this.anims.create({
                key: 'upstop',
                frames: this.anims.generateFrameNumbers('player_female_stop', {start:6, end:11}),
                frameRate:10,
                repeat: -1
            });
            this.anims.create({
                key: 'leftstop',
                frames: this.anims.generateFrameNumbers('player_female_stop', {start:12, end:17}),
                frameRate:10,
                repeat: -1
            });
            this.anims.create({
                key: 'rightstop',
                frames: this.anims.generateFrameNumbers('player_female_stop', {start:0, end:5}),
                frameRate:10,
            });
        }


        const outdoor = this.physics.add.sprite(384, 600, 'greenball',0);
        bed = this.physics.add.sprite(176,96,'bed',0);


        // my room sprites
        const carpet1 = this.physics.add.sprite(64,144,'carpet1',0);
        const carpet2 = this.physics.add.sprite(96,144,'carpet2',0);
        const carpet21 = this.physics.add.sprite(128,144,'carpet2',0);
        const carpet22 = this.physics.add.sprite(160,144,'carpet2',0);
        const carpet23 = this.physics.add.sprite(192,144,'carpet2',0);
        const carpet3 = this.physics.add.sprite(224,144,'carpet3',0);
        const window= this.physics.add.sprite(176,48,'window',0);
        const computer= this.physics.add.sprite(56,80,'computer',0);
        const shelf= this.physics.add.sprite(110,96,'shelf',0);
        const chatbox = this.physics.add.sprite(148,224,'profile',0);
        // const door = this.physics.add.sprite(70,208,'door',0);

        // TV room sprites
        const movetv= this.physics.add.sprite(352,56,'movetv',0);
        const chatbox2 = this.physics.add.sprite(448,56,'recommend',0);
        const camera = this.physics.add.sprite(304,112,'camera',0);
        const light = this.physics.add.sprite(480,112,'light',0);
        const table1 = this.physics.add.sprite(416,208,'table1',0);
        const table2 = this.physics.add.sprite(448,208,'table2',0);
        const table3 = this.physics.add.sprite(480,208,'table3',0);
        const chair = this.physics.add.sprite(432,176,'chair',0);

        // party room sprites
        const chatbox3 = this.physics.add.sprite(656,32,'popular',0);
        const redball1 = this.physics.add.sprite(560,64,'redball',0);
        const blueball1 = this.physics.add.sprite(580,48,'blueball',0);
        const redball2 = this.physics.add.sprite(704,48,'redball',0);
        const blueball2 = this.physics.add.sprite(732,64,'blueball',0);
        const doll = this.physics.add.sprite(656,64,'doll',0);

        // survey room
        const counter_t1 = this.physics.add.sprite(592,264,'survey1',0);
        const counter = this.physics.add.sprite(656,264,'survey2',0);
        const counter_t2 = this.physics.add.sprite(688,264,'survey3',0);
        const survey = this.physics.add.sprite(552,232,'survey',0);



        profilebox = this.physics.add.sprite(384,400,'propage',0);
        recommendbox = this.physics.add.sprite(384,400,'recopage',0);
        popularbox = this.physics.add.sprite(384,400,'poppage',0);
        welcomebox = this.physics.add.sprite(384,400,'welcome',0);
        logoutbox = this.physics.add.sprite(384,400,'logout',0);
        surveybox = this.physics.add.sprite(384,400,'surpage',0);
        // chatbox4.visible = false;


        // set sprite's Depth
        welcomebox.setDepth(7)
        player.setDepth(10);
        table1.setDepth(4);
        table2.setDepth(4);
        table3.setDepth(4);
        chair.setDepth(3);

        map.setCollisionBetween(0,95);
        // map.setCollisionBetween(99,380);

        this.physics.add.collider(player,layer);
        this.physics.add.collider(player,chair);
        this.physics.add.collider(player,light);
        light.setImmovable(true);
        chair.setImmovable(true);



        // sprite's move
        this.anims.create({
            key: 'tv',
            frames: this.anims.generateFrameNumbers('movetv', {start:0, end:23}),
            frameRate:10,
            repeat: -1
        });
        this.anims.create({
            key: 'red',
            frames: this.anims.generateFrameNumbers('redball',{start:0,end:4}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'blue',
            frames: this.anims.generateFrameNumbers('blueball',{start:0,end:3}),
            frameRate: 8,
            repeat: -1
        });


        // player_male's move
        // this.anims.create({
        //     key: 'down',
        //     frames: this.anims.generateFrameNumbers('player_male', {start:0, end:3}),
        //     frameRate:10,
        //     repeat: -1
        // });
        // this.anims.create({
        //     key: 'left',
        //     frames: this.anims.generateFrameNumbers('player_male', {start:4, end:7}),
        //     frameRate:10,
        //     repeat: -1
        // });
        // this.anims.create({
        //     key: 'right',
        //     frames: this.anims.generateFrameNumbers('player_male', {start:8, end:11}),
        //     frameRate:10,
        //     repeat: -1
        // });
        // this.anims.create({
        //     key: 'up',
        //     frames: this.anims.generateFrameNumbers('player_male', {start:12, end:15}),
        //     frameRate:10,
        //     repeat: -1
        // });
        // this.anims.create({
        //     key: 'downstop',
        //     frames: this.anims.generateFrameNumbers('player_male', {start:0, end:0}),
        //     frameRate:10,
        //     repeat: -1
        // });
        // this.anims.create({
        //     key: 'upstop',
        //     frames: this.anims.generateFrameNumbers('player_male', {start:12, end:12}),
        //     frameRate:10,
        //     repeat: -1
        // });
        // this.anims.create({
        //     key: 'leftstop',
        //     frames: this.anims.generateFrameNumbers('player_male', {start:4, end:4}),
        //     frameRate:10,
        //     repeat: -1
        // });
        // this.anims.create({
        //     key: 'rightstop',
        //     frames: this.anims.generateFrameNumbers('player_male', {start:8, end:8}),
        //     frameRate:10,
        // });




        // active sprite's moving
        movetv.play('tv');
        redball1.anims.play('red',true);
        blueball1.anims.play('blue', true);
        redball2.anims.play('red',true);
        blueball2.anims.play('blue', true);

        cursors = this.input.keyboard.createCursorKeys();

        // this.physics.add.overlap(player_male, player2, toMain, null, this);
        this.physics.add.overlap(player, bed, toProfile, null, this);
        this.physics.add.overlap(player, movetv, toRecommend, null, this);
        this.physics.add.overlap(player, doll, toPopular, null, this);
        this.physics.add.overlap(player, outdoor, toLogout, null, this);
        this.physics.add.overlap(player, counter, toSurvey, null, this);
    }

    function update(time, delta) {
        // Runs once per frame for the duration of the scene
        player.body.setVelocity(0);

        if(cursors.left.isDown){
            player.body.setVelocityX(-160);
            player.anims.play('left', true);
            direction = 'left';
            if (player.body.touching.none)
            {
                profilebox.visible=false;
                recommendbox.visible=false;
                popularbox.visible=false;
                welcomebox.visible=false;
                logoutbox.visible=false;
                surveybox.visible=false;
            }
        }
        else if(cursors.right.isDown){
            player.body.setVelocityX(160);
            player.anims.play('right', true);
            direction = 'right';
            if (player.body.touching.none)
            {
                profilebox.visible=false;
                recommendbox.visible=false;
                popularbox.visible=false;
                welcomebox.visible=false;
                logoutbox.visible=false;
                surveybox.visible=false;

            }
        }
        else if(cursors.up.isDown){
            player.body.setVelocityY(-160);
            player.anims.play('up', true);
            direction = 'up';
            if (player.body.touching.none)
            {
                profilebox.visible=false;
                recommendbox.visible=false;
                popularbox.visible=false;
                welcomebox.visible=false;
                logoutbox.visible=false;
                surveybox.visible=false;
            }
        }
        else if(cursors.down.isDown){
            player.body.setVelocityY(160);
            player.anims.play('down', true);
            direction = 'down';
            if (player.body.touching.none)
            {
                profilebox.visible=false;
                recommendbox.visible=false;
                popularbox.visible=false;
                welcomebox.visible=false;
                logoutbox.visible=false;
                surveybox.visible=false;
            }
        }
        else {
            if(direction == 'left')
                player.anims.play('leftstop', true);
            else if(direction == 'right')
                player.anims.play('rightstop', true);
            else if(direction == 'up')
                player.anims.play('upstop', true);
            else if(direction == 'down')
                player.anims.play('downstop', true);
        }



    }

    return(
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
        }}>
            <div>
                <IonPhaser game={game} />
            </div>
        </div>
    )
}
