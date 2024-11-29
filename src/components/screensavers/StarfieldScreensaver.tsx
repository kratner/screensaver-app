import { useState, useEffect } from "react";
import type { FC } from "react";

interface StarfieldScreensaverProps {
	isDarkMode: boolean;
}

interface Star {
	id: string;
	x: number;
	y: number;
	size: number;
	speed: number;
}

const StarfieldScreensaver: FC<StarfieldScreensaverProps> = ({
	isDarkMode,
}) => {
	const [stars, setStars] = useState<Star[]>([]);

	useEffect(() => {
		const generateStars = () =>
			Array.from({ length: 100 }, () => ({
				id: Math.random().toString(36).substr(2, 9),
				x: Math.random() * 100,
				y: Math.random() * 100,
				size: Math.random() * 2 + 1,
				speed: Math.random() * 2 + 1,
			}));

		setStars(generateStars());
	}, []);

	return (
		<div
			className={`absolute inset-0 ${isDarkMode ? "bg-black" : "bg-slate-100"}`}
		>
			{stars.map((star) => (
				<div
					key={star.id}
					className={`absolute rounded-full ${isDarkMode ? "bg-white" : "bg-black"}`}
					style={{
						left: `${star.x}%`,
						top: `${star.y}%`,
						width: `${star.size}px`,
						height: `${star.size}px`,
						animation: `twinkle ${star.speed}s infinite alternate`,
					}}
				/>
			))}
			<style jsx>{`
        @keyframes twinkle {
          from { opacity: 0.2; }
          to { opacity: 1; }
        }
      `}</style>
		</div>
	);
};

export default StarfieldScreensaver;
