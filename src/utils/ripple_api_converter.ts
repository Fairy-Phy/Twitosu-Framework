class ripple_api_converter {
	private static readonly mode_list: string[] = [ "std", "taiko", "ctb", "mania"];

	public static convert_ripple_data(api_json_data: any, mode: number) {
		const return_data: any = {
			user_id: api_json_data.id != null && api_json_data.id != undefined ? String(api_json_data.id) : null,
			username: api_json_data.username != null && api_json_data.username != undefined && api_json_data.username != "" ?
						api_json_data.username_aka != null && api_json_data.username_aka != undefined && api_json_data.username_aka != "" ? api_json_data.username_aka : api_json_data.username : null,
			join_date: api_json_data.registered_on != null && api_json_data.registered_on != undefined && api_json_data.registered_on != "" ? api_json_data.registered_on : null,
			count300: null,
			count100: null,
			count50: null,
			playcount: api_json_data[this.mode_list[mode]].playcount != null && api_json_data[this.mode_list[mode]].playcount != undefined ? String(api_json_data[this.mode_list[mode]].playcount) : null,
			ranked_score: api_json_data[this.mode_list[mode]].ranked_score != null && api_json_data[this.mode_list[mode]].ranked_score != undefined ? String(api_json_data[this.mode_list[mode]].ranked_score) : null,
			total_score: api_json_data[this.mode_list[mode]].total_score != null && api_json_data[this.mode_list[mode]].total_score != undefined ? String(api_json_data[this.mode_list[mode]].total_score) : null,
			pp_rank: api_json_data[this.mode_list[mode]].global_leaderboard_rank != null && api_json_data[this.mode_list[mode]].global_leaderboard_rank != undefined ? String(api_json_data[this.mode_list[mode]].global_leaderboard_rank) : null,
			level: api_json_data[this.mode_list[mode]].level != null && api_json_data[this.mode_list[mode]].level != undefined ? String(api_json_data[this.mode_list[mode]].level) : null,
			pp_raw: api_json_data[this.mode_list[mode]].pp != null && api_json_data[this.mode_list[mode]].pp != undefined ? String(api_json_data[this.mode_list[mode]].pp) : null,
			accuracy: api_json_data[this.mode_list[mode]].accuracy != null && api_json_data[this.mode_list[mode]].accuracy != undefined ? String(api_json_data[this.mode_list[mode]].accuracy) : null,
			count_rank_ss: null,
			count_rank_ssh: null,
			count_rank_s: null,
			count_rank_sh: null,
			count_rank_a: null,
			country: api_json_data.country != null && api_json_data.country != undefined && api_json_data.country != "" ? api_json_data.country : "",
			total_seconds_played: api_json_data[this.mode_list[mode]].play_time != null && api_json_data[this.mode_list[mode]].play_time != undefined ? String(api_json_data[this.mode_list[mode]].play_time) : null,
			pp_country_rank: api_json_data[this.mode_list[mode]].country_leaderboard_rank != null && api_json_data[this.mode_list[mode]].country_leaderboard_rank != undefined ? String(api_json_data[this.mode_list[mode]].country_leaderboard_rank) : null,
			events: []
		};
		
		return return_data;
	}
}
export default ripple_api_converter;