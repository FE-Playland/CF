import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import ColorModeSwitcher from "../ColorModeSwitcher";
import WalletButton from "../Wallet/WalletButton";

const MenuActions = () => {
  return (
    <Box className="top-bar-menu-actions">
      <HStack>
        <ColorModeSwitcher />
        <WalletButton />
      </HStack>
    </Box>
  );
};

export default MenuActions;
