import type { FC } from "react";

interface WaveScreensaverProps {
	isDarkMode: boolean;
}

interface Wave {
	id: string;
	delay: number;
	opacity: number;
}

const WaveScreensaver: FC<WaveScreensaverProps> = ({ isDarkMode }) => {
	const waves: Wave[] = Array.from({ length: 5 }, (_, i) => ({
		id: `wave-${i}`,
		delay: i * 0.5,
		opacity: 1 - i * 0.15,
	}));

	return (
		<div
			className={`absolute inset-0 ${isDarkMode ? "bg-black" : "bg-slate-100"}`}
		>
			{waves.map((wave) => (
				<div
					key={wave.id}
					className={`absolute inset-0 ${isDarkMode ? "bg-blue-500" : "bg-blue-300"}`}
					style={{
						animation: "wave 3s infinite ease-in-out",
						animationDelay: `${wave.delay}s`,
						opacity: wave.opacity,
					}}
				/>
			))}
			<style jsx>
				{`
          @keyframes wave {
            0%, 100% {
              clip-path: polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%);
            }
            50% {
              clip-path: polygon(0% 60%, 50% 40%, 100% 60%, 100% 60%, 0% 60%);
            }
          }
        `}
			</style>
		</div>
	);
};

export default WaveScreensaver;
