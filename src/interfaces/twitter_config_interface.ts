/**
 * Twitter config database data interface
 */
interface twitter_config_interface {
	/**
	 * Osu! server number
	 * (0 => Official server, 1 => Ripple server)
	 */
	osu_server: number;
	
	/**
	 * Osu! player name
	 */
	osu_name: string;
	
	/**
	 * Osu! mode number
	 * (0 => Std, 1 => Taiko, 2 => Ctb, 3 => Mania)
	 */
	osu_mode: number;
}

export default twitter_config_interface;
