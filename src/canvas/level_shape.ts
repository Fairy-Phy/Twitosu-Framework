import init_canvas from "./init_canvas";
import logger from "../utils/logger";
import { loadImage, Image } from 'canvas';

class level_shape {
	/**
	 * Draw level shape
	 * @param canvas
	 * @param level
	 */
	public static async draw(canvas: init_canvas, level: number): Promise<void> {
		logger.debug("Start draw level shape");

		canvas.image_edit.beginPath();

		level = Math.floor(level);

		if (level < 25) {
			let shape_path: string = __dirname + "/" + "../../asset/shape/lv25" + "/";
			if (level < 5) shape_path += "white.svg";
			else if (level < 10) shape_path += "bronze.svg";
			else if (level < 15) shape_path += "silver.svg";
			else if (level < 20) shape_path += "gold.svg";
			else shape_path += "diamond.svg";

			const shape_image: Image = await loadImage(shape_path);
			canvas.image_edit.drawImage(shape_image, 27, 190);
		}
		else if (level < 50) {
			let shape_path: string = __dirname + "/" + "../../asset/shape/lv50" + "/";
			if (level < 30) shape_path += "white.svg";
			else if (level < 35) shape_path += "bronze.svg";
			else if (level < 40) shape_path += "silver.svg";
			else if (level < 45) shape_path += "gold.svg";
			else shape_path += "diamond.svg";

			const shape_image: Image = await loadImage(shape_path);
			canvas.image_edit.drawImage(shape_image, 55, 225);
		}
		else if (level < 75) {
			let shape_path: string = __dirname + "/" + "../../asset/shape/lv75" + "/";
			if (level < 55) shape_path += "white.svg";
			else if (level < 60) shape_path += "bronze.svg";
			else if (level < 65) shape_path += "silver.svg";
			else if (level < 70) shape_path += "gold.svg";
			else shape_path += "diamond.svg";

			const shape_image: Image = await loadImage(shape_path);
			canvas.image_edit.drawImage(shape_image, 35, 210);
		}
		else if (level < 100) {
			let shape_path: string = __dirname + "/" + "../../asset/shape/lv100" + "/";
			if (level < 80) shape_path += "white.svg";
			else if (level < 85) shape_path += "bronze.svg";
			else if (level < 90) shape_path += "silver.svg";
			else if (level < 95) shape_path += "gold.svg";
			else shape_path += "diamond.svg";

			const shape_image: Image = await loadImage(shape_path);
			canvas.image_edit.drawImage(shape_image, 50, 210);
		}
		else {
			let shape_path: string = __dirname + "/" + "../../asset/shape/above_level" + "/";
			if (level < 125) shape_path += "lv125.svg";
			else if (level < 150) shape_path += "lv150.svg";
			else shape_path += "above.svg";

			const shape_image: Image = await loadImage(shape_path);
			canvas.image_edit.drawImage(shape_image, 40, 215);
		}

		logger.debug("End draw level shape");
		return;
	}
}

export default level_shape;