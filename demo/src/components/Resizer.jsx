// Drag handle between the main view and the inspector. The width lives in
// localStorage so the panel stays where you put it across reloads.

import { useCallback, useEffect, useState } from "react";

const MIN = 260;
const MAX = 900;
const KEY = "cogent-demo:inspector-width";

export function useInspectorWidth() {
	const [width, setWidth] = useState(() => {
		const saved = Number(localStorage.getItem(KEY));
		return Number.isFinite(saved) && saved >= MIN ? Math.min(saved, MAX) : 430;
	});

	useEffect(() => {
		localStorage.setItem(KEY, String(width));
	}, [width]);

	return [width, setWidth];
}

export function Resizer({ setWidth }) {
	const [dragging, setDragging] = useState(false);

	// Width is measured from the right edge, so the inspector grows as you drag
	// left regardless of where the window edge is.
	const onMove = useCallback(
		(e) => setWidth(Math.max(MIN, Math.min(MAX, window.innerWidth - e.clientX))),
		[setWidth],
	);

	useEffect(() => {
		if (!dragging) return;
		const up = () => setDragging(false);
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", up);
		document.body.style.cursor = "col-resize";
		document.body.style.userSelect = "none";
		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", up);
			document.body.style.cursor = "";
			document.body.style.userSelect = "";
		};
	}, [dragging, onMove]);

	return (
		<div
			className={`gutter ${dragging ? "dragging" : ""}`}
			onPointerDown={(e) => {
				e.preventDefault();
				setDragging(true);
			}}
			onDoubleClick={() => setWidth(430)}
			title="Drag to resize · double-click to reset"
		/>
	);
}
