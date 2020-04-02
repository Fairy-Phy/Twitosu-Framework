import logger from "../src/utils/logger";
import osu_status from "../src/api/osu_status";
import twitter_config_entity from "../src/entities/twitter_config_entity";

const osu_api_key: any = process.env.OSU_API_KEY;
const ripple_api_key: any = process.env.RIPPLE_API_KEY;

describe("osu_status.get Throw Test", (): void => {
	beforeAll(() => logger.level = "off");

	test("Error Test (Official server) 1", async (): Promise<void> => {
		const db_twitter_config: any = {
			osu_name: "xf3rt8176rbd31rb3154rb51",
			osu_mode: 0,
			osu_server: 0
		};
		const twitter_config_data: twitter_config_entity = new twitter_config_entity(db_twitter_config);

		const warnspy = spyOn(logger, "warn");
		await osu_status.get(twitter_config_data, osu_api_key, ripple_api_key);
		
		expect(warnspy).toBeCalled();
	});

	test("Error Test (Official server) 2", async (): Promise<void> => {
		const db_twitter_config: any = {
			osu_name: "[Fairy]Phy",
			osu_mode: 0,
			osu_server: 0
		};
		const twitter_config_data: twitter_config_entity = new twitter_config_entity(db_twitter_config);

		const warnspy = spyOn(logger, "warn");
		await osu_status.get(twitter_config_data, "", ripple_api_key);
		
		expect(warnspy).toBeCalled();
	});

	test("Error Test (Ripple server)", async (): Promise<void> => {
		const db_twitter_config: any = {
			osu_name: "xf3rt8176rbd31rb3154rb51",
			osu_mode: 0,
			osu_server: 1
		};
		const twitter_config_data: twitter_config_entity = new twitter_config_entity(db_twitter_config);

		const warnspy = spyOn(logger, "warn");
		await osu_status.get(twitter_config_data, osu_api_key, ripple_api_key);
		
		expect(warnspy).toBeCalled();
	});

	afterAll(() => logger.level = "info");
});