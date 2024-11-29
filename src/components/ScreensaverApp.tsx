import { useState } from "react";
import type { FC } from "react";
import { Settings } from "lucide-react";
import StarfieldScreensaver from "./screensavers/StarfieldScreensaver";
import BouncingScreensaver from "./screensavers/BouncingScreensaver";
import WaveScreensaver from "./screensavers/WaveScreensaver";

const screensavers = {
	starfield: StarfieldScreensaver,
	bouncing: BouncingScreensaver,
	wave: WaveScreensaver,
} as const;

type ScreensaverType = keyof typeof screensavers;

const ScreensaverApp: FC = () => {
	const [isDarkMode, setIsDarkMode] = useState(true);
	const [currentScreensaver, setCurrentScreensaver] =
		useState<ScreensaverType>("starfield");
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	const SelectedScreensaver = screensavers[currentScreensaver];

	const toggleFullscreen = async () => {
		if (!document.fullscreenElement) {
			try {
				await document.documentElement.requestFullscreen();
				setIsFullscreen(true);
			} catch (err) {
				console.error("Error attempting to enable fullscreen:", err);
			}
		} else {
			if (document.exitFullscreen) {
				await document.exitFullscreen();
				setIsFullscreen(false);
			}
		}
	};

	return (
		<div className="relative w-full h-screen" role="application">
			<SelectedScreensaver isDarkMode={isDarkMode} />

			<div
				className={`fixed bottom-4 left-4 z-10 flex items-center gap-2 p-2 rounded-lg transition-opacity duration-300 ${
					isSettingsOpen ? "opacity-100" : "opacity-0 hover:opacity-100"
				}`}
				role="toolbar"
				aria-label="Screensaver controls"
			>
				<button
					type="button"
					title="Toggle Settings"
					aria-expanded="false"
					data-state={isSettingsOpen ? "open" : "closed"}
					onClick={() => setIsSettingsOpen(!isSettingsOpen)}
					className={`p-2 rounded-full transition-colors ${
						isDarkMode
							? "bg-gray-800 text-white hover:bg-gray-700"
							: "bg-white text-gray-800 hover:bg-gray-100"
					}`}
				>
					<Settings className="w-6 h-6" aria-hidden="true" />
					<span className="sr-only">Toggle Settings</span>
				</button>

				{isSettingsOpen && (
					<fieldset
						className={`flex items-center gap-2 border-0 m-0 p-0 ${
							isDarkMode ? "text-white" : "text-gray-800"
						}`}
					>
						<legend className="sr-only">Screensaver settings</legend>

						<button
							type="button"
							onClick={toggleFullscreen}
							className={`px-3 py-2 rounded-md transition-colors ${
								isDarkMode
									? "bg-gray-800 hover:bg-gray-700"
									: "bg-white hover:bg-gray-100"
							}`}
						>
							{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
						</button>

						<button
							type="button"
							onClick={() => setIsDarkMode(!isDarkMode)}
							className={`px-3 py-2 rounded-md transition-colors ${
								isDarkMode
									? "bg-gray-800 hover:bg-gray-700"
									: "bg-white hover:bg-gray-100"
							}`}
						>
							{isDarkMode ? "Light Mode" : "Dark Mode"}
						</button>

						<select
							value={currentScreensaver}
							onChange={(e) =>
								setCurrentScreensaver(e.target.value as ScreensaverType)
							}
							className={`px-3 py-2 rounded-md appearance-none cursor-pointer transition-colors ${
								isDarkMode
									? "bg-gray-800 text-white hover:bg-gray-700"
									: "bg-white text-gray-800 hover:bg-gray-100"
							}`}
							aria-label="Select screensaver type"
						>
							<option value="starfield">Starfield</option>
							<option value="bouncing">Bouncing</option>
							<option value="wave">Wave</option>
						</select>
					</fieldset>
				)}
			</div>
		</div>
	);
};

export default ScreensaverApp;
