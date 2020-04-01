import request from "request-promise";
import logger from '../utils/logger';
import twitter_config_entity from '../entities/twitter_config_entity';
import osu_status_entity from "../entities/osu_status_entity";
import ripple_api_converter from "../utils/ripple_api_converter";

class osu_status {
	/**
	 * Get osu! player status from api
	 * @param twitter_config_data 
	 * @param api_key 
	 */
	public static async get(twitter_config_data: twitter_config_entity, osu_api_key: string, ripple_api_key: string): Promise<osu_status_entity> {
		logger.debug("Start get osu! player status");
		const server = twitter_config_data.osu_server,
			username = twitter_config_data.osu_name,
			mode = twitter_config_data.osu_mode;

		const url = server == 1 ? `https://ripple.moe/api/v1/users/full?token=${ripple_api_key}&name=${username}` : `https://osu.ppy.sh/api/get_user?k=${osu_api_key}&m=${mode}&u=${username}`;
	
		const api_data = await request(url)
		.then(resolve => {
			if (server != 1) {
				const json_test: any = JSON.parse(resolve);
				if (json_test[0] == undefined) throw new Error("Player not found");
			}

			return resolve;
		})
		.catch(err => {
			if (logger.isDebugEnabled()) logger.error(err);
			logger.warn("Could not get player data");

			return server == 1 ?
			`{
				"code": null,
				"id": null,
				"username": null,
				"username_aka": null,
				"registered_on": null,
				"privileges": null,
				"latest_activity": null,
				"country": null,
				"std": {
					"ranked_score": null,
					"total_score": null,
					"playcount": null,
					"play_time": null,
					"replays_watched": null,
					"total_hits": null,
					"level": null,
					"accuracy": null,
					"pp": null,
					"global_leaderboard_rank": null,
					"country_leaderboard_rank": null
				},
				"taiko": {
					"ranked_score": null,
					"total_score": null,
					"playcount": null,
					"play_time": null,
					"replays_watched": null,
					"total_hits": null,
					"level": null,
					"accuracy": null,
					"pp": null,
					"global_leaderboard_rank": null,
					"country_leaderboard_rank": null
				},
				"ctb": {
					"ranked_score": null,
					"total_score": null,
					"playcount": null,
					"play_time": null,
					"replays_watched": null,
					"total_hits": null,
					"level": null,
					"accuracy": null,
					"pp": null,
					"global_leaderboard_rank": null,
					"country_leaderboard_rank": null
				},
				"mania": {
					"ranked_score": null,
					"total_score": null,
					"playcount": null,
					"play_time": null,
					"replays_watched": null,
					"total_hits": null,
					"level": null,
					"accuracy": null,
					"pp": null,
					"global_leaderboard_rank": null,
					"country_leaderboard_rank": null
				},
				"play_style": null,
				"favourite_mode": null,
				"favourite_relax": null,
				"badges": null,
				"custom_badge": null,
				"silence_info": null
			}` :
			`[
				{
					"user_id": null,
					"username": null,
					"join_date": null,
					"count300": null,
					"count100": null,
					"count50": null,
					"playcount": null,
					"ranked_score": null,
					"total_score": null,
					"pp_rank": null,
					"level": null,
					"pp_raw": null,
					"accuracy": null,
					"count_rank_ss": null,
					"count_rank_ssh": null,
					"count_rank_s": null,
					"count_rank_sh": null,
					"count_rank_a": null,
					"country": null,
					"total_seconds_played": null,
					"pp_country_rank": null,
					"events":[]
				}
			]`
		});
		
		const api_jsons: any = JSON.parse(api_data);
		logger.debug(api_jsons);
		let api_json: any = server == 1 ? ripple_api_converter.convert_ripple_data(api_jsons, mode) : api_jsons[0];
		logger.debug(api_json);

		logger.debug("End get osu! player status");
		return new osu_status_entity(api_json, twitter_config_data);
	}
}

export default osu_status;