import { Image } from 'canvas';
import init_canvas from './init_canvas';
import image_size from './config/image_size';
import logger from '../utils/logger';

class icon {
	/**
	 * Draw player icon
	 * @param canvas 
	 * @param icon_image 
	 */
	public static async draw(canvas: init_canvas, icon_image: Image): Promise<void> {
		logger.debug("Start draw icon");

		const icon_canvas: init_canvas = new init_canvas(image_size.icon_width, image_size.icon_height);

		icon_canvas.image_edit.beginPath();
		icon_canvas.image_edit.arc(image_size.icon_width / 2, image_size.icon_height / 2, image_size.icon_width / 2, 0 * Math.PI / 180, 360 * Math.PI / 180);
		icon_canvas.image_edit.clip();
		
		icon_canvas.image_edit.drawImage(icon_image, 0, 0, image_size.icon_width, image_size.icon_height);

		canvas.image_edit.beginPath();
		canvas.image_edit.drawImage(icon_canvas.image, (image_size.image_width / 2) - (image_size.icon_width / 2), (image_size.image_height / 2) - (image_size.icon_height / 2));

		logger.debug("End draw icon");
		return;
	}
}

export default icon;