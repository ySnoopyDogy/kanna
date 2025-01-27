module.exports.options = {
	handler: {
		disabled: false,
		interactive: false,
		logLevel: "info",
		scope: "custom",
		secrets: [],
		stream: process.stdout,
		types: {
			loading: {
				badge: "↻",
				color: "yellow",
				label: "loading",
				logLevel: "info",
			},
		},
	},
	ready: {
		disabled: false,
		interactive: false,
		logLevel: "info",
		scope: "custom",
		secrets: [],
		stream: process.stdout,
		types: {
			rocket: {
				badge: "🚀",
				color: "red",
				label: "rocket",
				logLevel: "info",
			},
			loading: {
				badge: "↻",
				color: "yellow",
				label: "loading",
				logLevel: "info",
			},
		},
	},
};

module.exports.coins = {
	link: "https://miraiscute.com/img/Kabo.gif",
	emoji: "<a:Kabo:985550861071695882>",
};
