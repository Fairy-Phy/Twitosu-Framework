import init_canvas from "./init_canvas";
import osu_status_entity from "../entities/osu_status_entity";
import logger from '../utils/logger';
import image_size from './config/image_size';
import color from './config/color';
import { loadImage } from "canvas";

class text {
	/**
	 * Draw texts
	 * @param canvas
	 * @param api_osu_status
	 * @param db_osu_status
	 */
	public static async draw(canvas: init_canvas, api_osu_status: osu_status_entity, db_osu_status: osu_status_entity): Promise<void> {
		logger.debug("Start draw texts");

		await this.draw_title(canvas);
		await this.draw_date(canvas);
		await this.draw_mode(canvas, api_osu_status.mode);
		await this.draw_name(canvas, api_osu_status.username);
		await this.draw_global_rank(canvas, api_osu_status.pp_rank, db_osu_status.pp_rank);
		await this.draw_country_rank(canvas, api_osu_status.pp_country_rank, db_osu_status.pp_country_rank, api_osu_status.country);
		await this.draw_level(canvas, api_osu_status.level);
		await this.draw_progress(canvas);
		await this.draw_level_percent(canvas, api_osu_status.level, db_osu_status.level);
		await this.draw_total_pp(canvas, api_osu_status.pp_raw, db_osu_status.pp_raw);
		await this.draw_accuracy(canvas, api_osu_status.accuracy, db_osu_status.accuracy, api_osu_status.server);
		await this.draw_play_count(canvas, api_osu_status.playcount, db_osu_status.playcount, api_osu_status.server);

		if (api_osu_status.server == 0) {
			await this.draw_ss(canvas, api_osu_status.count_rank_ss, api_osu_status.count_rank_ssh, db_osu_status.count_rank_ss, db_osu_status.count_rank_ssh);
			await this.draw_s(canvas, api_osu_status.count_rank_s, api_osu_status.count_rank_sh, db_osu_status.count_rank_s, db_osu_status.count_rank_sh);
			await this.draw_a(canvas, api_osu_status.count_rank_a, db_osu_status.count_rank_a);
		}

		logger.debug("End draw texts");
		return;
	}

	private static readonly font_list: string = ' ' + '"Torus Light", "Comfortaa", "Exo 2"';

	private static async draw_title(canvas: init_canvas): Promise<void> {
		canvas.image_edit.beginPath();

		canvas.image_edit.font = '60px' + this.font_list;

		canvas.image_edit.fillStyle = color.white;

		canvas.image_edit.textAlign = "center";

		canvas.image_edit.shadowBlur = 5;
		canvas.image_edit.shadowColor = color.black;

		canvas.image_edit.fillText(`Today’s Stats`, image_size.image_width / 2, 105);

		return;
	}

	private static async draw_date(canvas: init_canvas): Promise<void> {
		canvas.image_edit.beginPath();

		canvas.image_edit.font = '30px' + this.font_list;

		canvas.image_edit.fillStyle = color.white;

		canvas.image_edit.textAlign = "center";

		canvas.image_edit.shadowBlur = 5;
		canvas.image_edit.shadowColor = color.black;

		const date = new Date();

		canvas.image_edit.fillText(`Updated on: ${date.getFullYear()} / ${Number(date.getMonth()) + 1} / ${date.getDate()}`, image_size.image_width / 2, 150);

		return;
	}

	private static async draw_mode(canvas: init_canvas, mode: number): Promise<void> {
		canvas.image_edit.beginPath();

		canvas.image_edit.font = '36px' + this.font_list;

		canvas.image_edit.fillStyle = color.white;

		canvas.image_edit.textAlign = "center";

		const mode_list = ["Standard", "Taiko", "Catch the beat", "Mania"];

		canvas.image_edit.shadowBlur = 5;
		canvas.image_edit.shadowColor = color.black;

		canvas.image_edit.fillText(`Mode: ${mode_list[mode]}`, image_size.image_width / 2, 195);

		return;
	}

	private static async draw_name(canvas: init_canvas, username: string): Promise<void> {
		canvas.image_edit.beginPath();

		canvas.image_edit.font = '48px' + this.font_list;

		canvas.image_edit.fillStyle = color.white;

		canvas.image_edit.textAlign = "center";

		canvas.image_edit.shadowBlur = 5;
		canvas.image_edit.shadowColor = color.black;

		canvas.image_edit.fillText(username, image_size.image_width / 2, (image_size.image_height / 2) + 190);

		return;
	}

	private static async draw_global_rank(canvas: init_canvas, after_pp_rank: number | string, before_pp_rank: number): Promise<void> {
		canvas.image_edit.beginPath();

		canvas.image_edit.font = '60px' + this.font_list;

		if (after_pp_rank == 0) after_pp_rank = "No rank";

		/* istanbul ignore next */
		if (after_pp_rank < 10) canvas.image_edit.fillStyle = color.red_diamond;
		else if (after_pp_rank < 100) canvas.image_edit.fillStyle = color.green_diamond;
		else if (after_pp_rank < 1000) canvas.image_edit.fillStyle = color.diamond;
		else if (after_pp_rank < 5000) canvas.image_edit.fillStyle = color.gold;
		else if (after_pp_rank < 10000) canvas.image_edit.fillStyle = color.silver;
		else if (after_pp_rank < 50000) canvas.image_edit.fillStyle = color.bronze;
		else if (after_pp_rank < 100000) canvas.image_edit.fillStyle = color.dark_bronze;
		else canvas.image_edit.fillStyle = color.white;

		canvas.image_edit.textAlign = "center";

		canvas.image_edit.shadowBlur = 5;
		if (after_pp_rank < 10) canvas.image_edit.shadowColor = color.red_diamond;
		else canvas.image_edit.shadowColor = color.black;

		const global_rank_string: string = `#${after_pp_rank}`;
		const global_rank_text: TextMetrics = canvas.image_edit.measureText(global_rank_string);

		canvas.image_edit.fillText(global_rank_string, image_size.image_width / 2, (image_size.image_height / 2) + 260);

		if (after_pp_rank != "No rank") {
			const update_global_rank: number = Number(after_pp_rank) - Number(before_pp_rank);

			canvas.image_edit.shadowColor = color.black;

			if (update_global_rank < 0) {
				let update_global_space: number = 0,
					update_global_string: string = `+${-(update_global_rank)}`;
				if (global_rank_string.length - update_global_string.length == 0) update_global_space = 5;
				else update_global_space = (global_rank_string.length - update_global_string.length) * -15;

				canvas.image_edit.fillStyle = color.green;
				canvas.image_edit.fillText(update_global_string, (image_size.image_width / 2) + global_rank_text.width + update_global_space, (image_size.image_height / 2) + 260);
			}
			else if (update_global_rank > 0) {
				let update_global_space: number = 0,
					update_global_string: string = `-${update_global_rank}`;
				if (global_rank_string.length - update_global_string.length == 0) update_global_space = 5;
				else update_global_space = (global_rank_string.length - update_global_string.length) * -15;

				canvas.image_edit.fillStyle = color.red;
				canvas.image_edit.fillText(update_global_string, (image_size.image_width / 2) + global_rank_text.width + update_global_space, (image_size.image_height / 2) + 260);
			}
		}

		return;
	}

	private static async draw_country_rank(canvas: init_canvas, after_pp_country_rank: number | string, before_pp_country_rank: number, country_name: string): Promise<void> {
		canvas.image_edit.beginPath();

		canvas.image_edit.font = '60px' + this.font_list;

		if (after_pp_country_rank == 0) after_pp_country_rank = "No rank";

		/* istanbul ignore next */
		if (after_pp_country_rank < 10) canvas.image_edit.fillStyle = color.red_diamond;
		else if (after_pp_country_rank < 100) canvas.image_edit.fillStyle = color.green_diamond;
		else if (after_pp_country_rank < 1000) canvas.image_edit.fillStyle = color.diamond;
		else if (after_pp_country_rank < 5000) canvas.image_edit.fillStyle = color.gold;
		else if (after_pp_country_rank < 10000) canvas.image_edit.fillStyle = color.silver;
		else if (after_pp_country_rank < 50000) canvas.image_edit.fillStyle = color.bronze;
		else if (after_pp_country_rank < 100000) canvas.image_edit.fillStyle = color.dark_bronze;
		else canvas.image_edit.fillStyle = color.white;

		canvas.image_edit.textAlign = "center";

		const country_rank_string: string = `#${after_pp_country_rank}`;

		const country_rank_text: TextMetrics = canvas.image_edit.measureText(country_rank_string);

		canvas.image_edit.shadowBlur = 5;
		if (after_pp_country_rank < 10) canvas.image_edit.shadowColor = color.red_diamond;
		else canvas.image_edit.shadowColor = color.black;

		canvas.image_edit.fillText(country_rank_string, image_size.image_width / 2, (image_size.image_height / 2) + 320);

		if (after_pp_country_rank != "No rank") {
			const update_country_rank: number = Number(after_pp_country_rank) - Number(before_pp_country_rank);

			canvas.image_edit.shadowColor = color.black;

			if (update_country_rank < 0) {
				let update_country_space: number = 0;
				const update_country_text: string = `+${-(update_country_rank)}`;

				if (country_rank_string.length - update_country_text.length == 0) update_country_space = 5;
				else update_country_space = (country_rank_string.length - update_country_text.length) * -15;

				canvas.image_edit.fillStyle = color.green;
				canvas.image_edit.fillText(update_country_text, (image_size.image_width / 2) + country_rank_text.width + update_country_space, (image_size.image_height / 2) + 320);
			}
			else if (update_country_rank > 0) {
				let update_country_space: number = 0;
				const update_country_text: string = `-${update_country_rank}`;
				if (country_rank_string.length - update_country_text.length == 0) update_country_space = 5;
				else update_country_space = (country_rank_string.length - update_country_text.length) * -15;

				canvas.image_edit.fillStyle = color.red;
				canvas.image_edit.fillText(update_country_text, (image_size.image_width / 2) + country_rank_text.width + update_country_space, (image_size.image_height / 2) + 320);
			}
		}

		if (country_name != undefined && country_name != null && country_name != "") {
			const pp_country_rank_length: number = String(after_pp_country_rank).length;
			const flagspace = 40 - ((pp_country_rank_length - 1) * 15);
	
			const flag_image = await loadImage(__dirname + "/" + `../../asset/flags/${country_name}.svg`);
			canvas.image_edit.drawImage(flag_image, (image_size.image_width / 2) - (country_rank_text.width + flagspace), (image_size.image_height / 2) + 270, 60, 60);
		}

		return;
	}

	private static async draw_level(canvas: init_canvas, level: number): Promise<void> {
		canvas.image_edit.beginPath();

		canvas.image_edit.font = '72px' + this.font_list;

		canvas.image_edit.fillStyle = color.white;

		canvas.image_edit.textAlign = "center";

		canvas.image_edit.shadowBlur = 5;
		canvas.image_edit.shadowColor = color.black;

		canvas.image_edit.fillText(`${Math.floor(level)}`, 144.5, 342.5);

		return;
	}

	private static async draw_progress(canvas: init_canvas): Promise<void> {
		canvas.image_edit.beginPath();

		canvas.image_edit.font = '36px' + this.font_list;

		canvas.image_edit.fillStyle = color.white;

		canvas.image_edit.textAlign = "center";

		canvas.image_edit.shadowBlur = 5;
		canvas.image_edit.shadowColor = color.black;

		canvas.image_edit.fillText("progress", (image_size.image_width / 2) - 275, 340 - 75);

		return;
	}

	private static async draw_level_percent(canvas: init_canvas, after_level: number, before_level: number): Promise<void> {
		canvas.image_edit.beginPath();

		canvas.image_edit.font = '48px' + this.font_list;

		canvas.image_edit.fillStyle = "#FFFFFF";

		canvas.image_edit.textAlign = "center";

		canvas.image_edit.shadowBlur = 5;
		canvas.image_edit.shadowColor = "#000000";

		const level_int: number = Math.floor(after_level),
		level_double: number = after_level - level_int,
		level_percent: number = Math.round(level_double * 100);

		const level_percent_string: string = `${level_percent}%`;

		canvas.image_edit.fillText(level_percent_string, (image_size.image_width / 2) - 275, 340);

		const update_level: number = Number(after_level) - Number(before_level);

		if (update_level > 0) {
			const update_level_int: number = Math.floor(update_level),
				update_level_double: number = update_level - update_level_int,
				update_level_percent: number = Math.round(update_level_double * 10000) / 100,
				update_level_string: string = `+${update_level_percent}%`;

			canvas.image_edit.fillStyle = color.green;
			canvas.image_edit.fillText(update_level_string, (image_size.image_width / 2) - 275, 340 + 60);
		}
		else if (update_level < 0) { // Do you need this...?
			const update_level_int: number = Math.floor(update_level),
				update_level_double: number = update_level - update_level_int,
				update_level_percent: number = Math.round(update_level_double * 10000) / 100,
				update_level_string: string = `-${update_level_percent}%`;

			canvas.image_edit.fillStyle = color.red;
			canvas.image_edit.fillText(update_level_string, (image_size.image_width / 2) - 275, 340 + 60);
		}

		return;
	}

	private static async draw_total_pp(canvas: init_canvas, after_pp_raw: number, before_pp_raw: number): Promise<void> {
		canvas.image_edit.beginPath();

		canvas.image_edit.font = '48px' + this.font_list;

		canvas.image_edit.fillStyle = color.white;

		canvas.image_edit.textAlign = "center";

		canvas.image_edit.shadowBlur = 5;
		canvas.image_edit.shadowColor = color.black;

		const pp_number: number = Number(after_pp_raw),
			pp_string: string = pp_number.toLocaleString(),
			total_pp: string = `${pp_string}pp`;

		canvas.image_edit.fillText(total_pp, 235, (image_size.image_height / 2) + 140);

		const update_pp: number = Number(after_pp_raw) - Number(before_pp_raw);

		if (update_pp > 0) {
			const update_pp_number: number = Number(update_pp),
				update_pp_string: string = update_pp_number.toLocaleString(),
				update_pp_text: string = `+${update_pp_string}pp`;

			canvas.image_edit.fillStyle = color.green;
			canvas.image_edit.fillText(update_pp_text, 235, (image_size.image_height / 2) + 140 + 60);
		}
		if (update_pp < 0) {
			const update_pp_number: number = Number(update_pp),
				update_pp_string: string = update_pp_number.toLocaleString(),
				update_pp_text: string = `${update_pp_string}pp`;

			canvas.image_edit.fillStyle = color.red;
			canvas.image_edit.fillText(update_pp_text, 235, (image_size.image_height / 2) + 140 + 60);
		}

		return;
	}

	private static async draw_accuracy(canvas: init_canvas, after_accuracy: number, before_accuracy: number, server: number): Promise<void> {
		canvas.image_edit.beginPath();

		canvas.image_edit.font = (server == 1 ? '50px' : '40px') + this.font_list;

		canvas.image_edit.fillStyle = color.white;

		canvas.image_edit.textAlign = "left";

		canvas.image_edit.shadowBlur = 5;
		canvas.image_edit.shadowColor = color.black;

		const acc_double: number = Math.round(after_accuracy * 100) / 100;

		const acc_string: string = `Accuracy: ${acc_double}%`;

		canvas.image_edit.fillText(acc_string, (image_size.image_width / 2) + 140, (image_size.image_height / 2) - (server == 1 ? -75 : 75));

		const acc_text: TextMetrics = canvas.image_edit.measureText(acc_string);

		const update_acc: number = Number(after_accuracy) - Number(before_accuracy);

		if (update_acc > 0) {
			const update_acc_double: number = Math.round(update_acc * 100) / 100,
				update_acc_string: string = ` +${update_acc_double}%`;

			canvas.image_edit.fillStyle = color.green;
			canvas.image_edit.fillText(update_acc_string, (image_size.image_width / 2) + 140 + acc_text.width, (image_size.image_height / 2) - (server == 1 ? -75 : 75));
		}
		else if (update_acc < 0) {
			const update_acc_double: number = Math.round(update_acc * 100) / 100,
				update_acc_string: string = ` ${update_acc_double}%`;

			canvas.image_edit.fillStyle = color.red;
			canvas.image_edit.fillText(update_acc_string, (image_size.image_width / 2) + 140 + acc_text.width, (image_size.image_height / 2) - (server == 1 ? -75 : 75));
		}

		return;
	}

	private static async draw_play_count(canvas: init_canvas, after_playcount: number, before_playcount: number, server: number): Promise<void> {
		// if (after_playcount > 999999) after_playcount = 999999; // after_playcount.toExponential(2);

		canvas.image_edit.beginPath();

		canvas.image_edit.font = (server == 1 ? '50px' : '40px') + this.font_list;

		canvas.image_edit.fillStyle = color.white;

		canvas.image_edit.textAlign = "left";

		canvas.image_edit.shadowBlur = 5;
		canvas.image_edit.shadowColor = color.black;

		const playcount_number: number = Number(after_playcount),
			playcount_count: string = playcount_number.toLocaleString(),
			playcount_string: string = `Play Count: ${playcount_count}`;

		canvas.image_edit.fillText(playcount_string, (image_size.image_width / 2) + (server == 1 ? 140 : 160), (image_size.image_height / 2) - (server == 1 ? 40 : 30));

		const playcount_text: TextMetrics = canvas.image_edit.measureText(playcount_string);

		const update_playcount: number = Number(after_playcount) - Number(before_playcount);

		// if (update_playcount > 999) update_playcount = 999;

		if (update_playcount > 0) {
			const update_play_number: number = Number(update_playcount),
				update_play_count: string = update_play_number.toLocaleString(),
				update_play_string: string = ` +${update_play_count}`;

			canvas.image_edit.fillStyle = color.green;
			canvas.image_edit.fillText(update_play_string, (image_size.image_width / 2) + (server == 1 ? 140 : 160) + playcount_text.width, (image_size.image_height / 2) - (server == 1 ? 40 : 30));
		}
		if (update_playcount < 0) { // ...Use?
			const update_playcount_number: number = Number(update_playcount),
				update_playcount_count: string = update_playcount_number.toLocaleString(),
				update_playcount_string: string = ` ${update_playcount_count}`;

			canvas.image_edit.fillStyle = color.red;
			canvas.image_edit.fillText(update_playcount_string, (image_size.image_width / 2) + (server == 1 ? 140 : 160) + playcount_text.width, (image_size.image_height / 2) - (server == 1 ? 40 : 30));
		}

		return;
	}

	// Now Official server only from here down

	private static async draw_ss(canvas: init_canvas, after_count_rank_ss: number, after_count_rank_ssh: number, before_count_rank_ss: number, before_count_rank_ssh: number): Promise<void> {
			canvas.image_edit.beginPath();

			canvas.image_edit.font = '40px' + this.font_list;

			canvas.image_edit.fillStyle = color.diamond;

			canvas.image_edit.textAlign = "left";

			canvas.image_edit.shadowBlur = 5;
			canvas.image_edit.shadowColor = color.black;

			canvas.image_edit.fillText("SS", (image_size.image_width / 2) + 170, (image_size.image_height / 2) + 15);

			canvas.image_edit.beginPath();

			canvas.image_edit.font = '40px' + this.font_list;

			canvas.image_edit.fillStyle = color.white;

			canvas.image_edit.textAlign = "left";

			canvas.image_edit.shadowBlur = 5;
			canvas.image_edit.shadowColor = color.black;

			const ss_number: number = Number(after_count_rank_ss),
				ssh_number: number = Number(after_count_rank_ssh),
				total_ss: number = ss_number + ssh_number,
				ss_string: string = total_ss.toLocaleString();

			const ss_text: TextMetrics = canvas.image_edit.measureText("SS");

			const ss_count_string: string = `: ${ss_string}`;

			canvas.image_edit.fillText(ss_count_string, (image_size.image_width / 2) + 170 + ss_text.width, (image_size.image_height / 2) + 15);

			const ss_count_text: TextMetrics = canvas.image_edit.measureText(ss_count_string);

			const update_ss: number = (Number(after_count_rank_ss) + Number(after_count_rank_ssh)) - (Number(before_count_rank_ss) + Number(before_count_rank_ssh));

			if (update_ss > 0) {
				const update_ss_number: number = Number(update_ss),
					update_ss_count: string = update_ss_number.toLocaleString(),
					update_ss_string: string = ` +${update_ss_count}`;

				canvas.image_edit.fillStyle = color.green;
				canvas.image_edit.fillText(update_ss_string, (image_size.image_width / 2) + 170 + ss_text.width + ss_count_text.width, (image_size.image_height / 2) + 15);
			}
			if (update_ss < 0) {
				const update_ss_number: number = Number(update_ss),
					update_ss_count: string = update_ss_number.toLocaleString(),
					update_ss_string: string = ` ${update_ss_count}`;

				canvas.image_edit.fillStyle = color.red;
				canvas.image_edit.fillText(update_ss_string, (image_size.image_width / 2) + 170 + ss_text.width + ss_count_text.width, (image_size.image_height / 2) + 15);
			}

		return;
	}

	private static async draw_s(canvas: init_canvas, after_count_rank_s: number, after_count_rank_sh: number, before_count_rank_s: number, before_count_rank_sh: number): Promise<void> {
			canvas.image_edit.beginPath();

			canvas.image_edit.font = '40px' + this.font_list;

			canvas.image_edit.fillStyle = color.gold;

			canvas.image_edit.textAlign = "left";

			canvas.image_edit.shadowBlur = 5;
			canvas.image_edit.shadowColor = color.black;

			canvas.image_edit.fillText("S", (image_size.image_width / 2) + 160, (image_size.image_height / 2) + 60);

			canvas.image_edit.beginPath();

			canvas.image_edit.font = '40px' + this.font_list;

			canvas.image_edit.fillStyle = color.white;

			canvas.image_edit.textAlign = "left";

			canvas.image_edit.shadowBlur = 5;
			canvas.image_edit.shadowColor = color.black;

			const s_number: number = Number(after_count_rank_s),
				sh_number: number = Number(after_count_rank_sh),
				total_s: number = s_number + sh_number,
				s_string: string = total_s.toLocaleString();

			const s_text: TextMetrics = canvas.image_edit.measureText("S");

			const s_count: string = `: ${s_string}`;

			canvas.image_edit.fillText(s_count, (image_size.image_width / 2) + 160 + s_text.width, (image_size.image_height / 2) + 60);

			const s_count_text: TextMetrics = canvas.image_edit.measureText(s_count);

			const update_s: number = (Number(after_count_rank_s) + Number(after_count_rank_sh)) - (Number(before_count_rank_s) + Number(before_count_rank_sh));

			if (update_s > 0) {
				const update_s_num: number = Number(update_s),
					update_s_count: string = update_s_num.toLocaleString(),
					update_s_string: string = ` +${update_s_count}`;

				canvas.image_edit.fillStyle = color.green;
				canvas.image_edit.fillText(update_s_string, (image_size.image_width / 2) + 160 + s_text.width + s_count_text.width, (image_size.image_height / 2) + 60);
			}
			if (update_s < 0) {
				const update_s_number: number = Number(update_s),
					update_s_count: string = update_s_number.toLocaleString(),
					update_s_string: string = ` ${update_s_count}`;

				canvas.image_edit.fillStyle = color.red;
				canvas.image_edit.fillText(update_s_string, (image_size.image_width / 2) + 160 + s_text.width + s_count_text.width, (image_size.image_height / 2) + 60);
			}

		return;
	}

	private static async draw_a(canvas: init_canvas, after_count_rank_a: number, before_count_rank_a: number): Promise<void> {
			canvas.image_edit.beginPath();

			canvas.image_edit.font = '40px' + this.font_list;

			canvas.image_edit.fillStyle = color.silver;

			canvas.image_edit.textAlign = "left";

			canvas.image_edit.shadowBlur = 5;
			canvas.image_edit.shadowColor = color.black;

			canvas.image_edit.fillText("A", (image_size.image_width / 2) + 150, (image_size.image_height / 2) + 105);

			canvas.image_edit.beginPath();

			canvas.image_edit.font = '40px' + this.font_list;

			canvas.image_edit.fillStyle = color.white;

			canvas.image_edit.textAlign = "left";

			canvas.image_edit.shadowBlur = 5;
			canvas.image_edit.shadowColor = color.black;

			const total_a: number = Number(after_count_rank_a),
				a_string: string = total_a.toLocaleString();

			const a_text: TextMetrics = canvas.image_edit.measureText("A");

			const a_count: string = `: ${a_string}`;

			canvas.image_edit.fillText(a_count, (image_size.image_width / 2) + 150 + a_text.width, (image_size.image_height / 2) + 105);

			const a_count_text: TextMetrics = canvas.image_edit.measureText(a_count);

			const update_a: number = Number(after_count_rank_a) - Number(before_count_rank_a);

			if (update_a > 0) {
				const update_a_number: number = Number(update_a),
					update_a_count: string = update_a_number.toLocaleString(),
					update_a_string: string = ` +${update_a_count}`;

				canvas.image_edit.fillStyle = color.green;
				canvas.image_edit.fillText(update_a_string, (image_size.image_width / 2) + 150 + a_text.width + a_count_text.width, (image_size.image_height / 2) + 105);
			}
			if (update_a < 0) {
				const update_a_number: number = Number(update_a),
					update_a_count: string = update_a_number.toLocaleString(),
					update_a_string: string = ` ${update_a_count}`;

				canvas.image_edit.fillStyle = color.red;
				canvas.image_edit.fillText(update_a_string, (image_size.image_width / 2) + 150 + a_text.width + a_count_text.width, (image_size.image_height / 2) + 105);
			}

		return;
	}
}

export default text;