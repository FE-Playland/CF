import { Box, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import MenuItem from "../../components/Menu/MenuItem";

const Footer = () => {
	return (
		<Box
			as="footer"
			role="contentinfo"
			mx="auto"
			maxW="7xl"
			py="12"
			px={{ base: "4", md: "8" }}
		>
			{/* <Stack
				spacing={8}
				align="center"
				justify={["center", "space-between", "flex-end", "flex-end"]}
				direction={["column", "row", "row", "row"]}
				pt={[4, 4, 0, 0]}
			>
				<MenuItem to="https://github.com/CakeBot-Finance">GitHub</MenuItem>
			</Stack> */}
		</Box>
	);
};

export default Footer;
