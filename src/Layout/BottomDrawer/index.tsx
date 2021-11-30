import {
	Box,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	MenuItem,
	VStack,
} from "@chakra-ui/react";
import React from "react";
import ColorModeSwitcher from "../../components/ColorModeSwitcher";
import MenuLinks from "../../components/Menu/MenuLinks";
import WalletButton from "../../components/Wallet/WalletButton";

interface IDrawerProps {
	isOpen: boolean;
	onClose: { (): void };
}

const BottomDrawer = (props: IDrawerProps) => {
	return (
		<Drawer
			closeOnOverlayClick
			placement="bottom"
			isOpen={props.isOpen}
			onClose={props.onClose}
		>
			<DrawerOverlay />
			<DrawerContent>
				<VStack padding={[6]}>
					<WalletButton />
					<MenuLinks direction="column" />
				</VStack>
			</DrawerContent>
		</Drawer>
	);
};

export default BottomDrawer;
