import init_canvas from "./init_canvas";
import { loadImage, Image } from "canvas";
import logger from "../utils/logger";

class background {
	/**
	 * Draw background
	 * @param canvas
	 */
	public static async draw(canvas: init_canvas): Promise<void> {
		logger.debug("Start draw background");

		canvas.image_edit.beginPath();
		
		const background_image: Image = await loadImage(__dirname + "/" + "../../asset/background/background.png");
		
		canvas.image_edit.drawImage(background_image, 0, 0);

		logger.debug("End draw background");
		return;
	}
}

export default background;