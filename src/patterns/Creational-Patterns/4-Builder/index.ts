export {};
// Порождающие паттерны
// Builder


enum ImageFormat {
	Png = 'png',
	Jpg = 'jpg',
}

interface IResolution {
	width: number;
	height: number;
}

interface IImageConversion extends IResolution {
	format: ImageFormat;
}

class ImageBuilder {
	private formats: ImageFormat[] = [];
	private resolutions: IResolution[] = [];

	addPng() {
		if (!this.formats.includes(ImageFormat.Png)) {
			this.formats.push(ImageFormat.Png);
		}
		return this;
	}

	addJpg() {
		if (!this.formats.includes(ImageFormat.Jpg)) {
			this.formats.push(ImageFormat.Jpg);
		}
		return this;
	}

	addResolution(width: number, height: number) {
		this.resolutions.push({
			width,
			height,
		});
		return this;
	}

	build() {
		const res: IImageConversion[] = [];
		for (const r of this.resolutions) {
			for (const f of this.formats) {
				res.push({
					format: f,
					width: r.width,
					height: r.height,
				});
			}
		}
		return res;
	}
}

console.log(
	new ImageBuilder()
	.addJpg()
	.addPng()
	.addResolution(100, 50)
	.addResolution(200, 100)
	.build(),
);
