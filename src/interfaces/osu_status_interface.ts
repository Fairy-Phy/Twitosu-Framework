import osu_api_interface from './osu_api_interface';

/**
 * Osu! player status interface
 */
interface osu_status_interface extends osu_api_interface {
	/**
	 * Osu! player status play mode
	 * (0 => Std, 1 => Taiko, 2 => Ctb, 3 => Mania)
	 */
	mode: number;

	/**
	 * Osu! player status osu! server number
	 * (0 => Official server, 1 => Ripple server)
	 */
	server: number;
}

export default osu_status_interface;