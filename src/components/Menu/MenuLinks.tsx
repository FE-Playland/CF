import { Box, grid, Stack } from "@chakra-ui/react";
import React from "react";
import MenuItem from "./MenuItem";

interface IMenuLinksProps {
	direction: "row" | "column";
}

const MenuItems = () => {
	return (
		<>
			<MenuItem to="/">Pools</MenuItem>
			<MenuItem to="https://t.me/cakebotfinance_chinese" isAbsolute>
				Telegram
			</MenuItem>
		</>
	);
};

const RowContainer = () => {
	return (
		<Box
			className="top-bar-menu-links"
			flexBasis={{ base: "100%", md: "auto" }}
			marginLeft="auto"
		>
			<Stack
				spacing={8}
				align="center"
				justify={["center", "space-between", "flex-end", "flex-end"]}
				direction={["column", "row", "row", "row"]}
				pt={[4, 4, 0, 0]}
			>
				<MenuItems />
			</Stack>
		</Box>
	);
};

const ColumnContainer = () => {
	return (
		<Box align="center" pt={[2]} display="grid" gridGap="3" width="100%">
			<MenuItems />
		</Box>
	);
};

const MenuLinks = (props: IMenuLinksProps) => {
	return props.direction === "row" ? <RowContainer /> : <ColumnContainer />;
};

export default MenuLinks;
