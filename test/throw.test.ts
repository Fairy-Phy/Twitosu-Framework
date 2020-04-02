import twitter_config_entity from "../src/entities/twitter_config_entity";
import osu_status_entity from "../src/entities/osu_status_entity";

describe("twitter_config_entity Throw Test", (): void => {
	test("No value osu_name 1", (): void => {
		const db_twitter_config: any = {
			osu_mode: 0,
			osu_server: 0
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});

	test("No value osu_name 2", (): void => {
		const db_twitter_config: any = {
			osu_name: undefined,
			osu_mode: 0,
			osu_server: 0
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});

	test("No value osu_name 3", (): void => {
		const db_twitter_config: any = {
			osu_name: null,
			osu_mode: 0,
			osu_server: 0
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});

	test("No value osu_name 4", (): void => {
		const db_twitter_config: any = {
			osu_name: "",
			osu_mode: 0,
			osu_server: 0
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});

	test("No value osu_mode 1", (): void => {
		const db_twitter_config: any = {
			osu_name: "test_throw",
			osu_server: 0
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});

	test("No value osu_mode 2", (): void => {
		const db_twitter_config: any = {
			osu_name: "test_throw",
			osu_mode: undefined,
			osu_server: 0
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});

	test("No value osu_mode 3", (): void => {
		const db_twitter_config: any = {
			osu_name: "test_throw",
			osu_mode: null,
			osu_server: 0
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});

	test("No value osu_mode 4", (): void => {
		const db_twitter_config: any = {
			osu_name: "test_throw",
			osu_mode: "",
			osu_server: 0
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});

	test("Not allow value osu_mode 1", (): void => {
		const db_twitter_config: any = {
			osu_name: "test_throw",
			osu_mode: 4,
			osu_server: 0
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});

	test("Not allow value osu_mode 2", (): void => {
		const db_twitter_config: any = {
			osu_name: "test_throw",
			osu_mode: "4",
			osu_server: 0
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});

	test("Not allow value osu_mode 3", (): void => {
		const db_twitter_config: any = {
			osu_name: "test_throw",
			osu_mode: -1,
			osu_server: 0
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});

	test("Not allow value osu_mode 4", (): void => {
		const db_twitter_config: any = {
			osu_name: "test_throw",
			osu_mode: "-1",
			osu_server: 0
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});

	test("No value osu_server 1", (): void => {
		const db_twitter_config: any = {
			osu_name: "test_throw",
			osu_mode: 0
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});

	test("No value osu_server 2", (): void => {
		const db_twitter_config: any = {
			osu_name: "test_throw",
			osu_mode: 0,
			osu_server: undefined
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});

	test("No value osu_server 3", (): void => {
		const db_twitter_config: any = {
			osu_name: "test_throw",
			osu_mode: 0,
			osu_server: null
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});

	test("No value osu_server 4", (): void => {
		const db_twitter_config: any = {
			osu_name: "test_throw",
			osu_mode: 0,
			osu_server: ""
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});

	test("Not allow value osu_server 1", (): void => {
		const db_twitter_config: any = {
			osu_name: "test_throw",
			osu_mode: 0,
			osu_server: 2
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});

	test("Not allow value osu_server 2", (): void => {
		const db_twitter_config: any = {
			osu_name: "test_throw",
			osu_mode: 0,
			osu_server: "2"
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});

	test("Not allow value osu_server 3", (): void => {
		const db_twitter_config: any = {
			osu_name: "test_throw",
			osu_mode: 0,
			osu_server: -1
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});

	test("Not allow value osu_server 4", (): void => {
		const db_twitter_config: any = {
			osu_name: "test_throw",
			osu_mode: 0,
			osu_server: "-1"
		};

		expect((): void => {
			new twitter_config_entity(db_twitter_config);
		}).toThrow();
	});
});

describe("osu_status_entity Throw Test", (): void => {
	test("No value mode 1", (): void => {
		const db_osu_status: any = {
			server: 0
		};
		expect((new osu_status_entity(db_osu_status)).mode).toBe(0);
	});

	test("No value mode 2", (): void => {
		const db_osu_status: any = {
			mode: null,
			server: 0
		};
		expect((new osu_status_entity(db_osu_status)).mode).toBe(0);
	});

	test("No value mode 3", (): void => {
		const db_osu_status: any = {
			mode: undefined,
			server: 0
		};
		expect((new osu_status_entity(db_osu_status)).mode).toBe(0);
	});

	test("No value mode 3", (): void => {
		const db_osu_status: any = {
			mode: "",
			server: 0
		};
		expect((new osu_status_entity(db_osu_status)).mode).toBe(0);
	});

	test("Not allow value mode 1", (): void => {
		const db_osu_status: any = {
			mode: -1,
			server: 0
		};
		expect((new osu_status_entity(db_osu_status)).mode).toBe(0);
	});

	test("Not allow value mode 2", (): void => {
		const db_osu_status: any = {
			mode: "-1",
			server: 0
		};
		expect((new osu_status_entity(db_osu_status)).mode).toBe(0);
	});

	test("Not allow value mode 3", (): void => {
		const db_osu_status: any = {
			mode: 4,
			server: 0
		};
		expect((new osu_status_entity(db_osu_status)).mode).toBe(0);
	});

	test("Not allow value mode 4", (): void => {
		const db_osu_status: any = {
			mode: "4",
			server: 0
		};
		expect((new osu_status_entity(db_osu_status)).mode).toBe(0);
	});

	test("No value server 1", (): void => {
		const db_osu_status: any = {
			mode: 0
		};
		expect((new osu_status_entity(db_osu_status)).server).toBe(0);
	});

	test("No value server 2", (): void => {
		const db_osu_status: any = {
			mode: 0,
			server: null
		};
		expect((new osu_status_entity(db_osu_status)).server).toBe(0);
	});

	test("No value server 3", (): void => {
		const db_osu_status: any = {
			mode: 0,
			server: undefined
		};
		expect((new osu_status_entity(db_osu_status)).server).toBe(0);
	});

	test("No value server 4", (): void => {
		const db_osu_status: any = {
			mode: 0,
			server: ""
		};
		expect((new osu_status_entity(db_osu_status)).server).toBe(0);
	});

	test("Not allow value server 1", (): void => {
		const db_osu_status: any = {
			mode: 0,
			server: -1
		};
		expect((new osu_status_entity(db_osu_status)).server).toBe(0);
	});

	test("Not allow value server 2", (): void => {
		const db_osu_status: any = {
			mode: 0,
			server: "-1"
		};
		expect((new osu_status_entity(db_osu_status)).server).toBe(0);
	});

	test("Not allow value server 3", (): void => {
		const db_osu_status: any = {
			mode: 0,
			server: 2
		};
		expect((new osu_status_entity(db_osu_status)).server).toBe(0);
	});

	test("Not allow value server 4", (): void => {
		const db_osu_status: any = {
			mode: 0,
			server: "2"
		};
		expect((new osu_status_entity(db_osu_status)).server).toBe(0);
	});
});