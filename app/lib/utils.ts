import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]){//merges tailwind classes
    return twMerge(clsx(inputs))
}