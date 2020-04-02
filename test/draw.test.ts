import logger from "../src/utils/logger";
import init_canvas from "../src/canvas/init_canvas";
import image_size from "../src/canvas/config/image_size";
import level_shape from "../src/canvas/level_shape";
import * as fs from "fs";
import player_icon from "../src/api/player_icon";
import icon from "../src/canvas/icon";
import { Image } from 'canvas';

describe("Draw Test", (): void => {
	beforeAll(() => logger.level = "off");

	test("Test Draw level shapes", async (): Promise<void> => {
		const canvas: init_canvas = new init_canvas(image_size.image_width, image_size.image_height);
		for (let i = 0; i <= 150; i+=5) {
			await level_shape.draw(canvas, i);
		}

		const image_buffer: Buffer = canvas.image.toBuffer();

		fs.writeFile(__dirname + "/" + `./Test_level_shape.png`, image_buffer, err => {
			if (err != null) throw err;
		});
	});

	test("Test Load undefined icon 1", async (): Promise<void> => {
		const icon_image: Image = await player_icon.get("xf3rt8176rbd31rb3154rb51", 0);
		const canvas: init_canvas = new init_canvas(image_size.image_width, image_size.image_height);
		await icon.draw(canvas, icon_image);

		const image_buffer: Buffer = canvas.image.toBuffer();

		fs.writeFile(__dirname + "/" + `./Test_undefined_icon1.png`, image_buffer, err => {
			if (err != null) throw err;
		});
	});

	test("Test Load undefined icon 2", async (): Promise<void> => {
		const icon_image: Image = await player_icon.get("", 0);
		const canvas: init_canvas = new init_canvas(image_size.image_width, image_size.image_height);
		await icon.draw(canvas, icon_image);

		const image_buffer: Buffer = canvas.image.toBuffer();

		fs.writeFile(__dirname + "/" + `./Test_undefined_icon2.png`, image_buffer, err => {
			if (err != null) throw err;
		});
	});

	test("Test Load undefined icon 3", async (): Promise<void> => {
		const icon_image: Image = await player_icon.get("xf3rt8176rbd31rb3154rb51", 1);
		const canvas: init_canvas = new init_canvas(image_size.image_width, image_size.image_height);
		await icon.draw(canvas, icon_image);

		const image_buffer: Buffer = canvas.image.toBuffer();

		fs.writeFile(__dirname + "/" + `./Test_undefined_icon3.png`, image_buffer, err => {
			if (err != null) throw err;
		});
	});

	test("Test Load undefined icon 4", async (): Promise<void> => {
		const icon_image: Image = await player_icon.get("", 1);
		const canvas: init_canvas = new init_canvas(image_size.image_width, image_size.image_height);
		await icon.draw(canvas, icon_image);

		const image_buffer: Buffer = canvas.image.toBuffer();

		fs.writeFile(__dirname + "/" + `./Test_undefined_icon4.png`, image_buffer, err => {
			if (err != null) throw err;
		});
	});

	afterAll(() => logger.level = "info");
});