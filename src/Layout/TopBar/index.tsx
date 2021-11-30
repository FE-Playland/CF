import React, { useState } from "react";
import MenuToggle from "../../components/Menu/MenuToggle";
import MenuLinks from "../../components/Menu/MenuLinks";
import MenuActions from "../../components/Menu/MenuActions";
import BottomDrawer from "../BottomDrawer";
import Logo from "../../components/Logo/index";
import { Flex } from "@chakra-ui/react";
import "./style.css";
import ColorModeSwitcher from "../../components/ColorModeSwitcher";

const TopBar = () => {
	const [isMobileBottomDrawerOpen, setIsMobileBottomDrawerOpen] =
		useState(false);

	return (
		<Flex
			as="nav"
			align="center"
			// justify="space-between"
			wrap="wrap"
			w="100%"
			// mb={8}
			p={8}
			bg={["primary.500", "primary.500", "transparent", "transparent"]}
		>
			<Logo />
			<MenuLinks direction="row" />
			<MenuActions />
			<BottomDrawer
				isOpen={isMobileBottomDrawerOpen}
				onClose={() => setIsMobileBottomDrawerOpen(false)}
			/>
			<ColorModeSwitcher className="top-bar-theme-switch-mobile" />
			<MenuToggle
				toggle={() => {
					setIsMobileBottomDrawerOpen(!isMobileBottomDrawerOpen);
				}}
				isOpen={isMobileBottomDrawerOpen}
			/>
		</Flex>
	);
};

export default TopBar;
