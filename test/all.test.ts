// Start init framework

import logger from '../src/utils/logger';
import twitter_config_entity from '../src/entities/twitter_config_entity';
import osu_status_entity from '../src/entities/osu_status_entity';
import init_canvas from '../src/canvas/init_canvas';
import background from "../src/canvas/background";
import osu_status from "../src/api/osu_status";
import { Image } from 'canvas';
import player_icon from "../src/api/player_icon";
import icon from "../src/canvas/icon";
import image_size from '../src/canvas/config/image_size';
import center_circle from '../src/canvas/center_circle';
import level_shape from '../src/canvas/level_shape';
import text from '../src/canvas/text';

// End init framework
import * as fs from "fs";

const osu_api_key: any = process.env.OSU_API_KEY;
const ripple_api_key: any = process.env.RIPPLE_API_KEY;

describe("create_image Test", (): void => {
	test("Test Std", async (): Promise<void> => {
		const db_twitter_config: any = {
			osu_name: "[Fairy]Phy",
			osu_mode: 0,
			osu_server: 0
		};

		const db_osu_status: any = undefined;

		logger.debug("Start Statosu Framework");

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
		await text.draw(canvas, api_osu_status_data, db_osu_status_data);
	
		const image_buffer: Buffer = canvas.image.toBuffer();
	
		logger.debug("End Statosu Framework");

		fs.writeFile(__dirname + "/" + `./Test_std.png`, image_buffer, err => {
			if (err != null) throw err;
		});
	});

	test("Test Taiko", async (): Promise<void> => {
		const db_twitter_config: any = {
			osu_name: "[Fairy]Phy",
			osu_mode: 1,
			osu_server: 0
		};

		const db_osu_status: any = undefined;

		logger.debug("Start Statosu Framework");

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
		await text.draw(canvas, api_osu_status_data, db_osu_status_data);
	
		const image_buffer: Buffer = canvas.image.toBuffer();
	
		logger.debug("End Statosu Framework");

		fs.writeFile(__dirname + "/" + `./Test_taiko.png`, image_buffer, err => {
			if (err != null) throw err;
		});
	});

	test("Test Ctb", async (): Promise<void> => {
		const db_twitter_config: any = {
			osu_name: "[Fairy]Phy",
			osu_mode: 2,
			osu_server: 0
		};

		const db_osu_status: any = undefined;

		logger.debug("Start Statosu Framework");

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
		await text.draw(canvas, api_osu_status_data, db_osu_status_data);
	
		const image_buffer: Buffer = canvas.image.toBuffer();
	
		logger.debug("End Statosu Framework");

		fs.writeFile(__dirname + "/" + `./Test_ctb.png`, image_buffer, err => {
			if (err != null) throw err;
		});
	});

	test("Test Mania", async (): Promise<void> => {
		const db_twitter_config: any = {
			osu_name: "[Fairy]Phy",
			osu_mode: 3,
			osu_server: 0
		};

		const db_osu_status: any = undefined;

		logger.debug("Start Statosu Framework");

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
		await text.draw(canvas, api_osu_status_data, db_osu_status_data);
	
		const image_buffer: Buffer = canvas.image.toBuffer();
	
		logger.debug("End Statosu Framework");

		fs.writeFile(__dirname + "/" + `./Test_mania.png`, image_buffer, err => {
			if (err != null) throw err;
		});
	});

	test("Test No rank", async (): Promise<void> => {
		logger.level = "off";

		const db_twitter_config: any = {
			osu_name: "xf3rt8176rbd31rb3154rb51",
			osu_mode: 3,
			osu_server: 0
		};

		const db_osu_status: any = undefined;

		logger.debug("Start Statosu Framework");

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
		await text.draw(canvas, api_osu_status_data, db_osu_status_data);
	
		const image_buffer: Buffer = canvas.image.toBuffer();
	
		logger.debug("End Statosu Framework");

		fs.writeFile(__dirname + "/" + `./Test_no_rank.png`, image_buffer, err => {
			if (err != null) throw err;
		});

		logger.level = "info";
	});

	test("Test Other", async (): Promise<void> => {
		logger.level = "off";

		const db_twitter_config: any = {
			osu_name: "[Fairy]Phy",
			osu_mode: 3,
			osu_server: 0
		};

		const db_osu_status: any = undefined;

		logger.debug("Start Statosu Framework");

		if(typeof osu_api_key !== "string") throw new Error("Not string: osu_api_key");
		if(typeof ripple_api_key !== "string") throw new Error("Not string: ripple_api_key");
	
		const twitter_config_data: twitter_config_entity = new twitter_config_entity(db_twitter_config);
		logger.debug(twitter_config_data);
	
		const api_osu_status_data: osu_status_entity = await osu_status.get(twitter_config_data, osu_api_key, ripple_api_key);
		api_osu_status_data.pp_rank = 1;
		api_osu_status_data.pp_country_rank = 1;
		logger.debug(api_osu_status_data);
	
		const db_osu_status_data: osu_status_entity = db_osu_status == null || db_osu_status == undefined ? new osu_status_entity(api_osu_status_data) : new osu_status_entity(db_osu_status);
		logger.debug(db_osu_status_data);
		db_osu_status_data.playcount = 99999;
		db_osu_status_data.level = 999;
		db_osu_status_data.accuracy = 100;
	
		const icon_image: Image = await player_icon.get(api_osu_status_data.user_id, twitter_config_data.osu_server);
	
		const canvas: init_canvas = new init_canvas(image_size.image_width, image_size.image_height);
		await background.draw(canvas);
		await icon.draw(canvas, icon_image);
		await center_circle.draw(canvas);
		await level_shape.draw(canvas, api_osu_status_data.level);
		await text.draw(canvas, api_osu_status_data, db_osu_status_data);
	
		const image_buffer: Buffer = canvas.image.toBuffer();
	
		logger.debug("End Statosu Framework");

		fs.writeFile(__dirname + "/" + `./Test_other.png`, image_buffer, err => {
			if (err != null) throw err;
		});

		logger.level = "info";
	});

	test("Test Ripple", async (): Promise<void> => {
		const db_twitter_config: any = {
			osu_name: "[Fairy]Phy",
			osu_mode: 3,
			osu_server: 1
		};

		const db_osu_status: any = undefined;

		logger.debug("Start Statosu Framework");

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
		await text.draw(canvas, api_osu_status_data, db_osu_status_data);
	
		const image_buffer: Buffer = canvas.image.toBuffer();
	
		logger.debug("End Statosu Framework");

		fs.writeFile(__dirname + "/" + `./Test_ripple.png`, image_buffer, err => {
			if (err != null) throw err;
		});
	});

	test("Test No DB Data", async (): Promise<void> => {
		const db_twitter_config: any = {
			osu_name: "[Fairy]Phy",
			osu_mode: 3,
			osu_server: 0
		};

		const db_osu_status: any = {};

		logger.debug("Start Statosu Framework");

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
		await text.draw(canvas, api_osu_status_data, db_osu_status_data);
	
		const image_buffer: Buffer = canvas.image.toBuffer();
	
		logger.debug("End Statosu Framework");

		fs.writeFile(__dirname + "/" + `./Test_no_db_data.png`, image_buffer, err => {
			if (err != null) throw err;
		});
	});

	test("Test DB Data", async (): Promise<void> => {
		const db_twitter_config: any = {
			osu_name: "[Fairy]Phy",
			osu_mode: 3,
			osu_server: 0
		};

		const db_osu_status: any = {
			user_id: "4777360",
			username: "[Fairy]Phy",
			join_date: "2014-08-11 02:16:05",
			count300: "16150684",
			count100: "1462748",
			count50: "50626",
			playcount: "19301",
			ranked_score: "1030551234",
			total_score: "7986184236",
			pp_rank: "775",
			level: "999",
			pp_raw: "99999",
			accuracy: "97.26040313720703",
			count_rank_ss: "499",
			count_rank_ssh: "500",
			count_rank_s: "499",
			count_rank_sh: "500",
			count_rank_a: "999",
			country: "JP",
			total_seconds_played: "1402967",
			pp_country_rank: "45",
			events: []
		};

		logger.debug("Start Statosu Framework");

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
		await text.draw(canvas, api_osu_status_data, db_osu_status_data);
	
		const image_buffer: Buffer = canvas.image.toBuffer();
	
		logger.debug("End Statosu Framework");

		fs.writeFile(__dirname + "/" + `./Test_db_data.png`, image_buffer, err => {
			if (err != null) throw err;
		});
	});
});