import init_canvas from "./init_canvas";
import color from './config/color';
import image_size from "./config/image_size";
import logger from "../utils/logger";

class center_circle {
	/**
	 * Draw center circle
	 * @param canvas
	 */
	public static async draw(canvas: init_canvas): Promise<void> {
		logger.debug("Start draw center circle");

		canvas.image_edit.beginPath();

		canvas.image_edit.strokeStyle = color.white;

		canvas.image_edit.arc(image_size.image_width / 2, image_size.image_height / 2, 275 / 2, 0, Math.PI * 2, false);

		canvas.image_edit.lineWidth = 5;

		canvas.image_edit.stroke();

		logger.debug("End draw center circle");
		return;
	}
}

export default center_circle;