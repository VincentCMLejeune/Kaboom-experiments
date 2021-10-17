export default function verticalmove(speed = 100, time = 2, dir = 1) {
	let timer = time;
	return {
		update() {
            timer -= dt();
            if (timer <= 0) {
                dir *= -1
                timer = time
            }
			this.move(speed * dir, 0);
		},
	};
}