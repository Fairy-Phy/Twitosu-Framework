import logger from "./utils/logger";
import twitter_config_entity from './entities/twitter_config_entity';
import osu_status_entity from './entities/osu_status_entity';
import init_canvas from './canvas/init_canvas';
import background from "./canvas/background";
import osu_status from "./api/osu_status";
import { Image } from 'canvas';
import player_icon from "./api/player_icon";
import icon from "./canvas/icon";
import image_size from './canvas/config/image_size';
import center_circle from './canvas/center_circle';
import level_shape from './canvas/level_shape';
import text from './canvas/text';
import mode_icon from './canvas/mode_icon';

/**
 * Create osu! player status image
 * @param db_twitter_config - Twitter config database data
 * @param db_osu_status - Osu! player status database data
 * @param osu_api_key - Osu! official server api key
 * @param ripple_api_key - Osu! ripple server api key
 * @returns Image buffer promise
 */
export async function create_image(db_twitter_config: any, db_osu_status: any, osu_api_key: string, ripple_api_key: string): Promise<Buffer> {
	if(typeof osu_api_key !== "string") throw new Error("Not string: osu_api_key");
	if(typeof ripple_api_key !== "string") throw new Error("Not string: ripple_api_key");

	const twitter_config_data: twitter_config_entity = new twitter_config_entity(db_twitter_config);
	logger.debug(twitter_config_data);

	const api_osu_status_data: osu_status_entity = await osu_status.get(twitter_config_data, osu_api_key, ripple_api_key);
	logger.debug(api_osu_status_data);

	const db_osu_status_data: osu_status_entity = db_osu_status == null || db_osu_status == undefined ? new osu_status_entity(api_osu_status_data) : new osu_status_entity(db_osu_status);
	logger.debug(db_osu_status_data);

	const icon_image: Image = await player_icon.get(api_osu_status_data.user_id, twitter_config_data.osu_server);

	const canvas: init_canvas = new init_canvas(image_size.image_width, image_size.image_height);
	await background.draw(canvas);
	await icon.draw(canvas, icon_image);
	await center_circle.draw(canvas);
	await level_shape.draw(canvas, api_osu_status_data.level);
	await mode_icon.draw(canvas, api_osu_status_data.mode);
	await text.draw(canvas, api_osu_status_data, db_osu_status_data);

	return canvas.image.toBuffer();
}

/**
 * Get osu! player status from api
 * @param db_player_data - require osu_username, osu_mode, osu_server
 * @param osu_api_key - Osu! official server api key
 * @param ripple_api_key - Osu! ripple server api key
 */
export async function get_osu_status(db_player_data: any, osu_api_key: string, ripple_api_key: string): Promise<osu_status_entity> {
	if(typeof osu_api_key !== "string") throw new Error("Not string: osu_api_key");
	if(typeof ripple_api_key !== "string") throw new Error("Not string: ripple_api_key");

	const player_data = new twitter_config_entity(db_player_data);
	logger.debug(player_data);

	return await osu_status.get(player_data, osu_api_key, ripple_api_key);
};