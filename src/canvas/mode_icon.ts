import { Image, loadImage } from 'canvas';
import init_canvas from './init_canvas';
import image_size from './config/image_size';
import logger from '../utils/logger';

class mode_icon {
	/**
	 * Draw mode icon
	 * @param canvas
	 * @param mode
	 */
	public static async draw(canvas: init_canvas, mode: number): Promise<void> {
		logger.debug("Start draw mode icon");

		if (mode == 0) await this.std(canvas, true);
		else await this.std(canvas, false);

		if (mode == 1) await this.taiko(canvas, true);
		else await this.taiko(canvas, false);

		if (mode == 2) await this.ctb(canvas, true);
		else await this.ctb(canvas, false);

		if (mode == 3) await this.mania(canvas, true);
		else await this.mania(canvas, false);

		logger.debug("End draw mode icon");
		return;
	}
	
	private static async std(canvas: init_canvas, mode: boolean): Promise<void> {
		const mode_image: Image = await loadImage(__dirname + "/" + "../../asset/icon/std.png");
		const mode_canvas: init_canvas = new init_canvas(image_size.mode_icon_width, image_size.mode_icon_height);

		mode_canvas.image_edit.beginPath();
		mode_canvas.image_edit.globalAlpha = mode ? 1.0 : 0.5;
		mode_canvas.image_edit.drawImage(mode_image, 0, 0, image_size.mode_icon_width, image_size.mode_icon_height);

		canvas.image_edit.beginPath();
		canvas.image_edit.drawImage(mode_canvas.image, ((image_size.image_width / 2) - (image_size.mode_icon_width / 2)) - 75, 185 - (image_size.mode_icon_height / 2));
	}

	private static async taiko(canvas: init_canvas, mode: boolean): Promise<void> {
		const mode_image: Image = await loadImage(__dirname + "/" + "../../asset/icon/taiko.png");
		const mode_canvas: init_canvas = new init_canvas(image_size.mode_icon_width, image_size.mode_icon_height);

		mode_canvas.image_edit.beginPath();
		mode_canvas.image_edit.globalAlpha = mode ? 1.0 : 0.5;
		mode_canvas.image_edit.drawImage(mode_image, 0, 0, image_size.mode_icon_width, image_size.mode_icon_height);

		canvas.image_edit.beginPath();
		canvas.image_edit.drawImage(mode_canvas.image, ((image_size.image_width / 2) - (image_size.mode_icon_width / 2)) - 25, 185 - (image_size.mode_icon_height / 2));
	}

	private static async ctb(canvas: init_canvas, mode: boolean): Promise<void> {
		const mode_image: Image = await loadImage(__dirname + "/" + "../../asset/icon/ctb.png");
		const mode_canvas: init_canvas = new init_canvas(image_size.mode_icon_width, image_size.mode_icon_height);

		mode_canvas.image_edit.beginPath();
		mode_canvas.image_edit.globalAlpha = mode ? 1.0 : 0.5;
		mode_canvas.image_edit.drawImage(mode_image, 0, 0, image_size.mode_icon_width, image_size.mode_icon_height);

		canvas.image_edit.beginPath();
		canvas.image_edit.drawImage(mode_canvas.image, ((image_size.image_width / 2) - (image_size.mode_icon_width / 2)) + 25, 185 - (image_size.mode_icon_height / 2));
	}

	private static async mania(canvas: init_canvas, mode: boolean): Promise<void> {
		const mode_image: Image = await loadImage(__dirname + "/" + "../../asset/icon/mania.png");
		const mode_canvas: init_canvas = new init_canvas(image_size.mode_icon_width, image_size.mode_icon_height);

		mode_canvas.image_edit.beginPath();
		mode_canvas.image_edit.globalAlpha = mode ? 1.0 : 0.5;
		mode_canvas.image_edit.drawImage(mode_image, 0, 0, image_size.mode_icon_width, image_size.mode_icon_height);

		canvas.image_edit.beginPath();
		canvas.image_edit.drawImage(mode_canvas.image, ((image_size.image_width / 2) - (image_size.mode_icon_width / 2)) + 75, 185 - (image_size.mode_icon_height / 2));
	}
}

export default mode_icon;