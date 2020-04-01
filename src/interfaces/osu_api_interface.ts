/**
 * Osu! api player status interface
 */
interface osu_api_interface {
	/**
	 * Osu! player ID
	 */
	user_id: string;

	/**
	 * Osu! player name
	 */
	username: string;
	
	/**
	 * Osu! player play counts
	 */
	playcount: number;

	/**
	 * Osu! player total score
	 */
	total_score: number;

	/**
	 * Osu! player global ranking
	 */
	pp_rank: number;

	/**
	 * Osu! player level
	 */
	level: number;

	/**
	 * Osu! player Performance Points
	 */
	pp_raw: number;

	/**
	 * Osu! player accuracy
	 */
	accuracy: number;

	/**
	 * Osu! player SS rank counts
	 */
	count_rank_ss: number;

	/**
	 * Osu! player SS+ rank counts
	 */
	count_rank_ssh: number;

	/**
	 * Osu! player S rank counts
	 */
	count_rank_s: number;

	/**
	 * Osu! player S+ rank counts
	 */
	count_rank_sh: number;

	/**
	 * Osu! player A rank counts
	 */
	count_rank_a: number;

	/**
	 * Osu! player country
	 */
	country: string;

	/**
	 * Osu! player country ranking
	 */
    pp_country_rank: number;
}

export default osu_api_interface;