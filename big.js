export default function big() {
	let timer = 0;
	let isBig = false;
	let destScale = 2;
	return {
		// component id / name
		id: "big",
		// it requires the scale component
		require: [ "scale" ],
		// this runs every frame
		update() {
			if (isBig) {
				if (timer <= 0) {
					this.smallify();
				}
			}
			this.scale = this.scale.lerp(vec2(destScale), dt() * 6);
		},
		// custom methods
		isBig() {
			return isBig;
		},
		smallify() {
			destScale = 2;
			timer = 0;
			isBig = false;
		},
		biggify(time) {
			destScale = 3;
			timer = time;
			isBig = true;
		},
	};
}