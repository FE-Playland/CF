import React from "react";
import { LinkBox, LinkOverlay, Text, useColorMode } from "@chakra-ui/react";
import logo from "../../asserts/img/logo.svg";
import logoNight from "../../asserts/img/logo-night.svg";
import { Link as RouterLink } from "react-router-dom";

export default function Logo(props: any) {
	const { colorMode } = useColorMode();
	return (
		<LinkBox {...props}>
			<LinkOverlay as={RouterLink} to="/">
				<img
					src={colorMode === "light" ? logo : logoNight}
					alt="logo"
					style={{ height: "80px" }}
				/>
			</LinkOverlay>
		</LinkBox>
	);
}
