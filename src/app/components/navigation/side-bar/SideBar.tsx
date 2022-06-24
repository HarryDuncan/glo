import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
import {
  SideBarLinkList,
  SideBarTitleContainer,
  StyledSideBar,
} from "./SideBar.styles";
import SideBarItem, { ISideBarItem } from "../side-bar-items/SideBarItem";

interface ISideBarProps {
  navItems: ISideBarItem[];
}
const IDLE_TIMER_TIMEOUT = 5000;
const SideBar = ({ navItems }: ISideBarProps) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const toggleSideBarVisibility = useCallback((visibility: boolean) => {
    setIsSidebarVisible(visibility);
  }, []);

  useIdleTimer({
    timeout: IDLE_TIMER_TIMEOUT,
    onAction: () => toggleSideBarVisibility(true),
    onActive: () => toggleSideBarVisibility(true),
    onIdle: () => toggleSideBarVisibility(false),
  });
  return (
    <StyledSideBar $isVisible={isSidebarVisible}>
      <SideBarTitleContainer>
        <Link to={"/"}>
          <h1>GLO</h1>
        </Link>
      </SideBarTitleContainer>
      <SideBarLinkList>
        <SideBarItemList items={navItems as ISideBarItem[]} />
      </SideBarLinkList>
    </StyledSideBar>
  );
};

const SideBarItemList = ({ items }: { items: ISideBarItem[] }) => {
  return (
    <div>
      {items.map((link) => (
        <SideBarItem {...link} key={link.key} />
      ))}
    </div>
  );
};

export default SideBar;