import { createWriteStream, existsSync, mkdirSync } from "fs";
import { basename, join } from "path";
import https from "https";
import http from "http";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Define __dirname manually
const __dirname = dirname(fileURLToPath(import.meta.url));

const images = [
		"https://www.marketcircle.com/assets/img/why-daylite/header-image-xs@2x.jpg",
		"https://www.marketcircle.com/assets/img/why-daylite/section-1-xs@2x.jpg",
		"https://www.marketcircle.com/assets/img/why-daylite/section-1-xs@2x.jpg",
		"https://www.marketcircle.com/assets/img/why-daylite/section-2-xs@2x.jpg",
		"https://www.marketcircle.com/assets/img/why-daylite/section-3-xs@2x.jpg",
		"https://www.marketcircle.com/assets/img/why-daylite/section-3-xs@2x.jpg",
		"https://www.marketcircle.com/assets/img/why-daylite/section-4-xs@2x.jpg",
		"https://www.marketcircle.com/assets/img/why-daylite/section-5-xs@2x.jpg",
		"https://www.marketcircle.com/assets/img/why-daylite/section-5-xs@2x.jpg",
		"https://www.marketcircle.com/assets/img/why-daylite/daylite-group-1-xs@2x.webp",
];

const downloadImage = (url) => {
	return new Promise((resolve, reject) => {
		const parsedUrl = new URL(url);
		const filename = basename(parsedUrl.pathname).split("@")[0] + ".webp";
		const filePath = join(__dirname, "images", filename);

		const protocol = parsedUrl.protocol === "https:" ? https : http;

		protocol
			.get(url, (response) => {
				if (response.statusCode !== 200) {
					return reject(new Error(`Failed to download ${url}`));
				}

				const fileStream = createWriteStream(filePath);
				response.pipe(fileStream);

				fileStream.on("finish", () => {
					fileStream.close(() => resolve(filename));
				});
			})
			.on("error", reject);
	});
};

const downloadAllImages = async () => {
	if (!existsSync("images")) {
		mkdirSync("images");
	}

	try {
		const results = await Promise.all(images.map(downloadImage));
		console.log("Downloaded files:", results);
	} catch (error) {
		console.error("Error downloading images:", error);
	}
};

downloadAllImages();
