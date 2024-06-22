import SideBar from "app/components/drawer/vertical-drawer/SideBar";
import { DRAWER_POSITIONS } from "app/components/draw-components/side-bar/sideBar.consts";
import { KEYS } from "interaction/interactions.consts";
import { useKeyListener } from "interaction/internal/useSetUpKeyListener";
import { useCallback, useState } from "react";

export const EditorDraw = () => {
  const isVisible = useSideBarVisibility();

  return (
    <SideBar isSidebarVisible={isVisible} drawerSide={DRAWER_POSITIONS.RIGHT}>
      <EditorContent />
    </SideBar>
  );
};

const EditorContent = () => {
  return <div />;
};

const useSideBarVisibility = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);
  const toggleSideBarVisibility = useCallback(() => {
    setIsSidebarVisible((prev) => !prev);
  }, [setIsSidebarVisible]);

  useKeyListener(KEYS.F1, toggleSideBarVisibility);
  return isSidebarVisible;
};
