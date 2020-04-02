import { Image, loadImage } from 'canvas';
import request from "request-promise";
import logger from '../utils/logger';

class player_icon {
	/**
	 * Get osu! player icon
	 * @param id
	 * @param server
	 */
	public static async get(id: string, server: number): Promise<Image> {
		logger.debug("Start get osu! player icon");

		const icon_get: request.Options = {
			url: server == 1 ? `https://a.ripple.moe/${id}` : `https://a.ppy.sh/${id}`,
			encoding: null
		};

		const request_result: any = await request(icon_get).catch(err => {
			/* istanbul ignore next */
			if (logger.isDebugEnabled()) logger.error(err);
			logger.warn("Icon could not get");

			return undefined;
		});

		if (request_result == undefined) return loadImage(__dirname + "/" + "../../asset/icon/avatar-guest.png");

		const buffer: Buffer = Buffer.from(request_result, "utf8");
		logger.debug(buffer);

		logger.debug("End get osu! player icon");
		return loadImage(buffer);
	}
}

export default player_icon;