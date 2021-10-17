export default function fire(p) {
    add([
        rect(12, 48),
        area(),
        pos(p),
        origin("center"),
        color(127, 127, 255),
        outline(4),
        move(UP, BULLET_SPEED),
        cleanup(),
        // strings here means a tag
        "bullet",
    ]);
}