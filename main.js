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
loadSprite("enemy", "media/enemy.png")
loadSprite("item-box", "media/item-box.png")
loadSprite("wall", "media/wall.png")


add([
    sprite("hero"),
    pos(200, 200),
])