import React from "react";
import { Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface IMenuItemProps {
	children: React.ReactNode;
	to: string;
	isAbsolute?: boolean;
}

const MenuItem = (props: IMenuItemProps) => {
	const { to, children, isAbsolute } = props;

	return (
		<>
			{!!isAbsolute ? (
				<Link href={to} isExternal>
					<Text display="block">{children}</Text>
				</Link>
			) : (
				<Link as={RouterLink} to={to}>
					<Text display="block">{children}</Text>
				</Link>
			)}
		</>
	);
};

export default MenuItem;
