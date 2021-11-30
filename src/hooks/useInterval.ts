import { useEffect, useRef } from "react";

type Callback = () => void;

export function useInterval(callback: Callback, delay: number) {
	const savedCallback = useRef<Callback>();

	useEffect(() => {
		savedCallback.current = callback;
	});

	useEffect(() => {
		function tick() {
			savedCallback.current && savedCallback.current();
		}

		let id = setInterval(tick, delay);
		return () => clearInterval(id);
	}, [delay]);
}
