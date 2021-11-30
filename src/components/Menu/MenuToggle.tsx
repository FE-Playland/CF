import React from "react";
import { IconButton } from "@chakra-ui/react";
import { FaTimes, FaBars } from "react-icons/fa";

const MenuToggle = (props: { toggle: { (): void }; isOpen: boolean }) => {
  const { toggle, isOpen } = props;
  return (
    <IconButton
      className="top-bar-menu-toggle"
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggle}
      aria-label="toggle menu"
      icon={isOpen ? <FaTimes /> : <FaBars />}
    />
  );
};

export default MenuToggle;
