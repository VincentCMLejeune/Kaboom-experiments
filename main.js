const MOVE_SPEED = 240
const JUMP_FORCE = 10
const X_TEXT = 120
const Y_TEXT = 80
let currentLevel = "level-1"


kaboom({
    width:1280, 
    height:640,
    debug:true,
    stretch: true,
    letterbox: true,
    background: [0, 0, 0]
})

loadSprite("hero", "media/mario.png")
loadSprite("enemy", "media/ennemy.png")
loadSprite("item-box", "media/item-box.png")
loadSprite("wall", "media/wall.png")
loadSprite("spike", "media/spike.png")

scene("level-1", () => {

const player = add([
    sprite("hero"),
    scale(2),
    pos(500, 500),
    area(),
    solid(),
    body(),
])

keyDown('right', () => {
    player.move(MOVE_SPEED, 0)
})
keyDown('left', () => {
    player.move(-MOVE_SPEED, 0)
})
keyPress("space", () => {
    if (player.grounded()) {
        player.jump();
    }
});

add([
    text("Hello \nWorld !"),
    pos(75, 300),
]);

add([
    text("Arrows to move \nSpace to jump"),
    pos(500, 300),
]);

player.action(() => {
    camPos(player.pos);
    // if (player.pos.y >= FALL_DEATH) {
    //     go("lose");
    // }
});


player.collides("danger", () => {
    go("lose")
})



addLevel([
    "           =                           ",
    "           =                           ",
    "           =                           ",
    "           =                           ",
    "           =                           ",
    "           =                           ",
    "           =                           ",
    "           =                           ",
    "           =                           ",
    "           =                           ",
    "           =                           ",
    "           =                      =    ",
    "           =                      =    ",
    "           =                      =    ",
    "           =          =    =      =    ",
    "           =          =^^^^=           ",
    "           ============================",
    "           =                           ",
    "           =                           ",
    "           =                           ",
    "           =^^^^^^^^^^^^^^^^^^^^^^^^^^^",
    "           ============================",
], {
    // define the size of each block
    width: 40,
    height: 40,
    // define what each symbol means, by a function returning a comp list (what you'll pass to add())
    "=": () => [
        sprite("wall"),
        area(),
        solid(),
        scale(2)
    ],
    "^": () => [
        sprite("spike"),
        area(),
        solid(),
        "danger",
        scale(2)
    ],
})
})

scene("welcome", () => {
    add([
        text("SHITTY MARIO"),
        pos(X_TEXT, Y_TEXT),
    ]);
    add([
        text("Press any key to begin"),
        pos(X_TEXT, Y_TEXT + 100)
    ])
    keyPress(() => go(currentLevel))

})

scene("lose", () => {
    add([
        text("YOU LOST"),
        pos(X_TEXT, Y_TEXT),
    ]);
    add([
        text("Press any key to replay"),
        pos(X_TEXT, Y_TEXT + 100)
    ])
    keyPress(() => go(currentLevel))

})


go("welcome")