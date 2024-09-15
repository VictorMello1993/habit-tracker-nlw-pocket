import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function Label(props: ComponentProps<"label">) {
	return (
		<label for {...props} className={twMerge("font-medium text-sm tracking-tight leading-normal", props.className)} />
	);
}
