import { useRef, useCallback } from "react";

export default function useRefCallback<T extends (...args: any[]) => any>(
	callback: T
) {
	const callbackRef = useRef(callback);
	callbackRef.current = callback;

	return useCallback((...args: any[]) => callbackRef.current(...args), []) as T;
}
