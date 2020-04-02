import osu_api_interface from '../interfaces/osu_api_interface';

/**
 * Osu! player api status data
 */
class osu_api_entity implements osu_api_interface {
	user_id: string;
	username: string;
	playcount: number;
	total_score: number;
	pp_rank: number;
	level: number;
	pp_raw: number;
	accuracy: number;
	count_rank_ss: number;
	count_rank_ssh: number;
	count_rank_s: number;
	count_rank_sh: number;
	count_rank_a: number;
	country: string;
	pp_country_rank: number;
	
	constructor(osu_status: any) {
		if (osu_status.user_id == null || osu_status.user_id == undefined) this.user_id = "";
		else this.user_id = osu_status.user_id;

		if (osu_status.username == null || osu_status.username == undefined) this.username = "";
		else this.username = osu_status.username;

		if (osu_status.playcount == null || osu_status.playcount == undefined) this.playcount = 0;
		else this.playcount = parseInt(osu_status.playcount, 10);

		if (osu_status.total_score == null || osu_status.total_score == undefined) this.total_score = 0;
		else this.total_score = parseInt(osu_status.total_score, 10);

		if (osu_status.pp_rank == null || osu_status.pp_rank == undefined) this.pp_rank = 0;
		else this.pp_rank = parseInt(osu_status.pp_rank, 10);

		if (osu_status.level == null || osu_status.level == undefined) this.level = 0;
		else this.level = parseFloat(osu_status.level);

		if (osu_status.pp_raw == null || osu_status.pp_raw == undefined) this.pp_raw = 0;
		else this.pp_raw = parseFloat(osu_status.pp_raw);

		if (osu_status.accuracy == null || osu_status.accuracy == undefined) this.accuracy = 0;
		else this.accuracy = parseFloat(osu_status.accuracy);

		if (osu_status.count_rank_ss == null || osu_status.count_rank_ss == undefined) this.count_rank_ss = 0;
		else this.count_rank_ss = parseInt(osu_status.count_rank_ss, 10);

		if (osu_status.count_rank_ssh == null || osu_status.count_rank_ssh == undefined) this.count_rank_ssh = 0;
		else this.count_rank_ssh = parseInt(osu_status.count_rank_ssh, 10);

		if (osu_status.count_rank_s == null || osu_status.count_rank_s == undefined) this.count_rank_s = 0;
		else this.count_rank_s = parseInt(osu_status.count_rank_s, 10);

		if (osu_status.count_rank_sh == null || osu_status.count_rank_sh == undefined) this.count_rank_sh = 0;
		else this.count_rank_sh = parseInt(osu_status.count_rank_sh, 10);

		if (osu_status.count_rank_a == null || osu_status.count_rank_a == undefined) this.count_rank_a = 0;
		else this.count_rank_a = parseInt(osu_status.count_rank_a, 10);

		if (osu_status.country == null || osu_status.country == undefined) this.country = "";
		else this.country = osu_status.country;

		if (osu_status.pp_country_rank == null || osu_status.pp_country_rank == undefined) this.pp_country_rank = 0;
		else this.pp_country_rank = parseInt(osu_status.pp_country_rank, 10);
	}
}

export default osu_api_entity;