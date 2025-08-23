import { LucideIcon } from 'lucide-react';
import { SVGProps } from "react";

interface IconProps {
    iconNode?: LucideIcon | null;
    className?: string;
}

export function Icon({ iconNode: IconComponent, className }: IconProps) {
    if (!IconComponent) {
        return null;
    }

    return <IconComponent className={className} />;
}

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill="currentColor"
                d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.59A2.592 2.592 0 0 1 7.27 15.4a2.592 2.592 0 0 1 2.59-2.59h.12V9.82h-1.12A6.583 6.583 0 0 0 2 15.4a6.583 6.583 0 0 0 6.58 6.58a6.583 6.583 0 0 0 6.58-6.58V7.36s0-1.54 1.44-1.54Z"
            ></path>
        </svg>
    );
}
