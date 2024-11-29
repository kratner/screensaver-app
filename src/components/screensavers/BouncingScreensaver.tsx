import type { FC } from "react";

interface BouncingScreensaverProps {
	isDarkMode: boolean;
}

const BouncingScreensaver: FC<BouncingScreensaverProps> = ({ isDarkMode }) => {
	return (
		<div
			className={`absolute inset-0 overflow-hidden ${isDarkMode ? "bg-black" : "bg-slate-100"}`}
		>
			<div
				className={`w-16 h-16 rounded-full ${isDarkMode ? "bg-white" : "bg-black"}`}
				style={{
					animation: "bounce 4s infinite linear",
					position: "absolute",
				}}
			/>
			<style jsx>{`
        @keyframes bounce {
          0% { transform: translate(0, 0); }
          25% { transform: translate(calc(100vw - 4rem), 0); }
          50% { transform: translate(calc(100vw - 4rem), calc(100vh - 4rem)); }
          75% { transform: translate(0, calc(100vh - 4rem)); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
		</div>
	);
};

export default BouncingScreensaver;
