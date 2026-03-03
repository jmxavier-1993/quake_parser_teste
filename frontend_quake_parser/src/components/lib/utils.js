import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
} 


export const isIframe = window.self !== window.top;

// Adicionado aqui para centralizar
export function createPageUrl(pageName) {
    return '/' + pageName.replace(/ /g, '-');
}