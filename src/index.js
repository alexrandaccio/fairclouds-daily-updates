/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async scheduled(event, env, ctx) {
		try {
			const startTime = new Date().toISOString();
			console.log(`[${startTime}] Cron processed: calling daily-updates API`);

			const response = await fetch("https://staging.fairclouds.pages.dev/api/daily-updates", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
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