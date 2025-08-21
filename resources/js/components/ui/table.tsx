import React from 'react';

export interface TableProps {
	headers: string[];
	children: React.ReactNode;
	className?: string;
}

export function Table({ headers, children, className = '' }: TableProps) {
	return (
		<table className={`min-w-full border border-gray-300 bg-white ${className}`}>
			<TableHeader>
				<TableRow>
					{headers.map((header) => (
						<TableHead key={header}>{header}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{children}
			</TableBody>
		</table>
	);
}

export function TableHeader({ children, className = "bg-gray-100" }: { children: React.ReactNode; className?: string }) {
	return <thead className={className}>{children}</thead>;
}

export function TableBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
	return <tbody className={className}>{children}</tbody>;
}

export function TableRow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
	return <tr className={className}>{children}</tr>;
}

export function TableHead({ children, className = "px-4 py-2 text-center font-semibold text-gray-700 border-b" }: { children: React.ReactNode; className?: string }) {
	return <th className={className}>{children}</th>;
}

export function TableCell({ children, className = "px-4 py-2 text-center text-gray-700 border-b" }: { children: React.ReactNode; className?: string }) {
	return <td className={className}>{children}</td>;
}
