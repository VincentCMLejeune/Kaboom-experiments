const MOVE_SPEED = 300
const JUMP_FORCE = 800
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
loadSprite("evil-shroom", "media/ennemy.png")
loadSprite("item-box", "media/item-box.png")
loadSprite("item-empty", "media/item-empty.png")
loadSprite("wall", "media/wall.png")
loadSprite("spike", "media/spike.png")
loadSprite("pipe-UL", "media/tuyau-UL.png")
loadSprite("pipe-UR", "media/tuyau-UR.png")
loadSprite("pipe-DR", "media/tuyau-DR.png")
loadSprite("pipe-DL", "media/tuyau-DL.png")
loadSprite("door-down", "media/door-down.png")
loadSprite("door-up", "media/door-up.png")


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
        player.jump(JUMP_FORCE);
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

function patrol(speed = 60, dir = 1) {
	return {
		id: "patrol",
		require: [ "pos", "area", ],
		add() {
			this.on("collide", (obj, side) => {
				if (side === "left" || side === "right") {
					dir = -dir;
				}
			});
		},
		update() {
			this.move(speed * dir, 0);
		},
	};
}

player.on("ground", (l) => {
    if (l.is("enemy")) {
        player.jump(JUMP_FORCE * 1.5);
        destroy(l);
    }
});

player.collides("enemy", (e, side) => {
    if (side !== "bottom") {
        go("lose");
    }
});                         

player.collides("door", () => {
    go("win")
})


addLevel([
    "           =                                                                                                                                                      =",
    "           =                                                                                                                                                      =",
    "           =                                                                                                                                                      =",
    "           =                                                                                                                                                      =",
    "           =                                                                                                                                                      =",
    "           =                                                                                                                                                      =",
    "           =                                                                                                                                                      =",
    "           =                                                                                                                                                      =",
    "           =                                                                                                                                                      =",
    "           =                                                                                                                                                      =",
    "           =                                                                                                                                                      =",
    "           =                                                                                                                                                      =",
    "           =                                                                                                                                                      =",
    "           =                 **?*                                                                                                                                 =",
    "           =   5      12                                                                                                                                          =",
    "           =   6      34                                                                                                                                          =",
    "           ========================================================================================================================================================",
    "           =                                                                                                                                                      =",
    "           =                                                                                                                                                      =",
    "           =                                                                                                                                                      =",
    "           =^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^=",
    "           ========================================================================================================================================================",
], {
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
    ]
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
    keyPress(() => go("level-1"))

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

scene("win", () => {
    add([
        text("YOU WON"),
        pos(X_TEXT, Y_TEXT),
    ]);
    add([
        text("Press any key to replay"),
        pos(X_TEXT, Y_TEXT + 100)
    ])
    keyPress(() => go("level-1"))

})


go("level-1")