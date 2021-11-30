import * as React from "react";
import {
	useColorMode,
	useColorModeValue,
	IconButton,
	IconButtonProps,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const text = useColorModeValue("dark", "light");
	const SwitchIcon = useColorModeValue(FaMoon, FaSun);

	React.useEffect(() => {
		if (colorMode === "light") {
			toggleColorMode();
		}
	}, [colorMode, toggleColorMode]);

	return <></>;
};

export default ColorModeSwitcher;
