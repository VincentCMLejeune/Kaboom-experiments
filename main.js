const MOVE_SPEED = 240
const JUMP_FORCE = 10


kaboom({
    width:1280, 
    height:640,
    debug:true,
    stretch: true,
    letterbox: true,
    background: [0, 0, 0]
})

const player = add([
    sprite("hero"),
    scale(2),
    pos(0, 0),
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
    text("Shitty Mario"),
    pos(120, 80),
]);

loadSprite("hero", "media/mario.png")
loadSprite("enemy", "media/ennemy.png")
loadSprite("item-box", "media/item-box.png")
loadSprite("wall", "media/wall.png")
loadSprite("spike", "media/spike.png")



addLevel([
    "                           ",
    "                           ",
    "                           ",
    "                      =    ",
    "         ====         =    ",
    "                      =    ",
    "                      =    ",
    "           =^^^=           ",
    "===========================",
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
});