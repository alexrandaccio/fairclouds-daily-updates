export default {
	async fetch(request, env, ctx) {
	  return new Response("Worker online", {
		status: 200,
		headers: { "Content-Type": "text/plain" },
	  });
	},
	async scheduled(event, env, ctx) {
		try {
			const startTime = new Date().toISOString();
			console.log(`[${startTime}] Cron processed: calling daily-updates API`);

			const response = await fetch("https://staging.fairclouds.pages.dev/api/daily-updates", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${env.API_SECRET_KEY}`,
				},
				body: JSON.stringify({}),
			});

			const responseBody = await response.text();
			console.log(
				`[${new Date().toISOString()}] daily-updates API response status: ${response.status}`
			);
			console.log(
				`[${new Date().toISOString()}] daily-updates API response body: ${responseBody}`
			);
		} catch (err) {
			console.error(`[${new Date().toISOString()}] Error calling daily-updates API:`, err);
		}
	},
};