import {createCanvas, Canvas, CanvasRenderingContext2D, registerFont} from "canvas";
import logger from "../utils/logger";
import {existsSync} from "fs";

/**
 * Initialize canvas
 */
class init_canvas {
	public image: Canvas;
	public image_edit: CanvasRenderingContext2D;

	constructor(image_width: number, image_height: number) {
		logger.debug("Start initialize canvas");

		registerFont(__dirname + "/" + "../../asset/font/Exo-2.0/fonts/otf/Exo2-Regular.otf", { family: "Exo 2" });
		registerFont(__dirname + "/" + "../../asset/font/comfortaa/fonts/OTF/Comfortaa-Regular.otf", { family: "Comfortaa" });
		if (existsSync(__dirname + "/" + "../../asset/font/Torus-Light.otf")) registerFont(__dirname + "/" + "../../asset/font/Torus-Light.otf", { family: "Torus" });
		this.image = createCanvas(image_width, image_height);
		
		this.image_edit = this.image.getContext('2d');

		logger.debug("End initialize canvas");
	}
}

export default init_canvas;