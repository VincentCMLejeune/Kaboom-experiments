import patrol from './patrol.js'
import big from './big.js'

const MOVE_SPEED = 300
const BULLET_SPEED = 350
const JUMP_FORCE = 700
const FALL_DEATH = 750
const X_TEXT = 120
const Y_TEXT = 80


kaboom({
    width:1280, 
    height:640,
    debug:true,
    stretch: true,
    letterbox: true,
    background: [0, 0, 0]
})

loadSprite("bullet", "media/bullet.png")
loadSprite("canon", "media/canon.png")
loadSprite("door-up", "media/door-up.png")
loadSprite("door-down", "media/door-down.png")
loadSprite("evil-shroom", "media/ennemy.png")
loadSprite("hero", "media/mario.png")
loadSprite("item-box", "media/item-box.png")
loadSprite("item-empty", "media/item-empty.png")
loadSprite("mushroom", "media/mushroom.png")
loadSprite("pipe-UL", "media/tuyau-UL.png")
loadSprite("pipe-UR", "media/tuyau-UR.png")
loadSprite("pipe-DR", "media/tuyau-DR.png")
loadSprite("pipe-DL", "media/tuyau-DL.png")
loadSprite("spike", "media/spike.png")
loadSprite("wall", "media/wall.png")

loadSound('you-die', 'music/Retrigger_-_You_Will_Die.mp3')

loadSound('door', 'sounds/door.ogg')
loadSound('death', 'sounds/death_bell.wav')
loadSound('explosion', 'sounds/explosion.wav')
loadSound('jump', 'sounds/jump.wav')
loadSound('power-down', 'sounds/power-down.ogg')
loadSound('power-up', 'sounds/power-up.wav')

// const music = play("you-die", { loop: true, })

// IL PEUT SAUTER JUSQ'A 4 DE HAUTEUR

const LEVELS = [
    [
    "                                                                                                     ",
    "                                                                                                     ",
    "                                                                                                     ",
    "                                                                                                     ",
    "                                                                                                     ",
    "    5                                                                                              5 ",
    "    6                                                                                              6 ",
    "=====================================================================================================",
    ],
    [
    "                                                                                       ***           ",
    "                                             *                                                       ",
    "                                            ***                                 ***          ***     ",
    "                                           *****           12             ***                        ",
    "    ***      ?       12        12   ?     *******          34         12               ***           ",
    "         12     12   34        34        *********       ****         34        ***                5 ",
    "        s34     34   34  s  s  34       ***********     *****  s  ^^  34                           6 ",
    "==================   ==============================     ================                          ===",
    ],
    [
    "       ^          ^        ^^             ?                   ?**  b                  *              ",
    "   ?   *          *        **                                                        **              ",
    "       *          *        **                                     **     b           **              ",
    "                           **             =                   =         b   **      ***  12          ",
    "   =          12     12    **    12      ==                 b==                b    ***  34          ",
    "  ==          34     34          34     ===                 === **      **      b  ****  34  12    5 ",
    " ===        ^^34s s s34^ s    s ^34    ====               b====                   b****  34  34    6 ",
    "====   =  =========================   =========================     **          *******  34  34  ====",
    ],
]

const levelConf = {
    width: 40,
    height: 40,
    "=": () => [
        sprite("wall"),
        area(),
        solid(),
        scale(2)
    ],
    "1": () => [
        sprite("pipe-UL"),
        area(),
        solid(),
    ],
    "2": () => [
        sprite("pipe-UR"),
        area(),
        solid(),
    ],
    "3": () => [
        sprite("pipe-DL"),
        area(),
        solid(),
    ],
    "4": () => [
        sprite("pipe-DR"),
        area(),
        solid(),
    ],
    "*": () => [
        sprite("item-empty"),
        area(),
        solid(),
        scale(2),
    ],
    "?": () => [
        sprite("item-box"),
        area(),
        solid(),
        scale(2),
        "box-mushroom",
    ],
    "M": () => [
        sprite("mushroom"),
        area(),
        scale(2),
        body(),
        "mushroom",
    ],
    "^": () => [
        sprite("spike"),
        area(),
        solid(),
        "danger",
        scale(2)
    ],
    "5": () => [
        sprite("door-up"),
        area(),
        scale(2)
    ],
    "6": () => [
        sprite("door-down"),
        area(),
        scale(2),
        "door"
    ],
    "s": () => [
        sprite("evil-shroom"),
        area(),
        solid(),
        scale(2),
        patrol(),
        "enemy"
    ],
    "b": () => [
        sprite("bullet"),
        area(),
        solid(),
        patrol(BULLET_SPEED, 1),
        "enemy",
        scale(2)
    ],
    "c": () => [
        sprite("canon"),
        area(),
        solid(),
        scale(2),
    ],

}


scene("game", ({levelId} = {levelId:0}) => {

    const level = addLevel(LEVELS[levelId ?? 0], levelConf)
    
    const player = add([
        sprite("hero"),
        scale(2),
        pos(0, 0),
        area(),
        solid(),
        body(),
        big(),
    ])
    
    keyDown('right', () => {
        player.move(MOVE_SPEED, 0)
    })
    keyDown('left', () => {
        player.move(-MOVE_SPEED, 0)
    })
    keyPress("space", () => {
        if (player.grounded()) {
            player.jump(JUMP_FORCE);
            play('jump')
        }
    });
    
    player.action(() => {
        camPos(player.pos.x, 250);
        if (player.pos.y >= FALL_DEATH) {
            go("lose", {levelId})  ;
        }
    });
    
    
    player.collides("danger", (e) => {
        if (!player.isBig()) {
            go("lose", {levelId})
        }
        else {
            player.smallify()
            destroy(e)
            play('power-down')
        }
    })
    
    player.on("ground", (l) => {
        if (l.is("enemy")) {
            player.jump(JUMP_FORCE * 1.5);
            destroy(l);
            play('explosion')
        }
    });
    
    player.collides("enemy", (e, side) => {
        if (side !== "bottom") {
            if (!player.isBig()) {
                go("lose", {levelId})
            }
            else {
                player.smallify()
                destroy(e)
                play('power-down')
            }
        }
    });
    
    
    player.collides("mushroom", (a) => {
        destroy(a);
        player.biggify(3);
    });
    
    
    player.on("headbutt", (obj) => {
        if (obj.is("box-mushroom")) {
            const mushroom = level.spawn("M", obj.gridPos.sub(0, 1));
            destroy(obj)
        }
    });
    
    player.collides("door", () => {
        play('door')
		if (levelId + 1 < LEVELS.length) {
			go("game", {
                levelId: levelId + 1,
			});
		} else {
            go("win")
		}
    })})
    
scene("welcome", () => {
    add([
        text("MARIO ?!"),
        pos(X_TEXT, Y_TEXT),
    ]);
    add([
        text("Press space to begin"),
        pos(X_TEXT, Y_TEXT + 100)
    ])
    keyPress("space", () => go("game"))
    })
    
scene("lose", ({levelId}) => {
    play('death')
    add([
        text("YOU LOST"),
        pos(X_TEXT, Y_TEXT),
    ]);
    add([
        text("Press space to replay"),
        pos(X_TEXT, Y_TEXT + 100)
    ])

    keyPress("space", () => go("game", {
        levelId: levelId
    }))
    })
    
scene("win", () => {
    add([
        text("YOU WON"),
        pos(X_TEXT, Y_TEXT),
    ]);
    add([
        text("Press space to replay"),
        pos(X_TEXT, Y_TEXT + 100)
    ])
    keyPress("space", () => go("game"))
})

go("game")