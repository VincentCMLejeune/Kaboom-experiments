kaboom({
    width:1280, 
    height:1024,
    debug:true,
    stretch: true,
    letterbox: true,
    background: [0, 0, 0]
})

add([
    text("Shitty Mario"),
    pos(120, 80),
]);

loadSprite("hero", "media/mario.png")
loadSprite("enemy", "media/ennemy.png")
loadSprite("item-box", "media/item-box.png")
loadSprite("wall", "media/wall.png")


const player = add([
    sprite("hero"),
    scale(2),
    pos(200, 200),
])

addLevel([
    "                           ",
    "                           ",
    "                           ",
    "                      =    ",
    "         ====         =    ",
    "                      =    ",
    "                      =    ",
    "               =           ",
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
    // "$": () => [
    //     sprite("coin"),
    //     area(),
    //     pos(0, -9),
    // ],
    // "^": () => [
    //     sprite("spike"),
    //     area(),
    //     "danger",
    // ],
});