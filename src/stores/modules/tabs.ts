import router from "@/routers";
import { defineStore } from "pinia";
import { getUrlWithParams } from "@/utils";
import { useKeepAliveStore } from "./keepAlive";
import { TabsMenuProps } from "@/stores/interface";
import piniaPersistConfig from "@/stores/helper/persist";
import { ref } from "vue";

const keepAliveStore = useKeepAliveStore();

export const useTabsStore = defineStore(
  "geeker-tabs",
  () => {
    let tabsMenuList = ref([]);
    // Add Tabs
    async function addTabs(tabItem: TabsMenuProps) {
      if (tabsMenuList.value.every(item => item.path !== tabItem.path)) {
        tabsMenuList.value.push(tabItem);
      }
      if (!keepAliveStore.keepAliveName.includes(tabItem.name) && tabItem.isKeepAlive) {
        keepAliveStore.addKeepAliveName(tabItem.name);
      }
    }
    // Remove Tabs
    async function removeTabs(tabPath: string, isCurrent: boolean = true) {
      if (isCurrent) {
        tabsMenuList.value.forEach((item, index) => {
          if (item.path !== tabPath) return;
          const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
          if (!nextTab) return;
          router.push(nextTab.path);
        });
      }
      // remove keepalive
      const tabItem = tabsMenuList.value.find(item => item.path === tabPath);
      tabItem?.isKeepAlive && keepAliveStore.removeKeepAliveName(tabItem.name);
      // set tabs
      tabsMenuList.value = tabsMenuList.value.filter(item => item.path !== tabPath);
    }
    // Close Tabs On Side
    async function closeTabsOnSide(path: string, type: "left" | "right") {
      const currentIndex = tabsMenuList.value.findIndex(item => item.path === path);
      if (currentIndex !== -1) {
        const range = type === "left" ? [0, currentIndex] : [currentIndex + 1, tabsMenuList.value.length];
        tabsMenuList.value = tabsMenuList.value.filter((item, index) => {
          return index < range[0] || index >= range[1] || !item.close;
        });
      }
      // set keepalive
      const KeepAliveList = tabsMenuList.value.filter(item => item.isKeepAlive);
      keepAliveStore.setKeepAliveName(KeepAliveList.map(item => item.name));
    }
    // Close MultipleTab
    async function closeMultipleTab(tabsMenuValue?: string) {
      tabsMenuList.value = tabsMenuList.value.filter(item => {
        return item.path === tabsMenuValue || !item.close;
      });
      // set keepalive
      const KeepAliveList = tabsMenuList.value.filter(item => item.isKeepAlive);
      keepAliveStore.setKeepAliveName(KeepAliveList.map(item => item.name));
    }
    // Set Tabs
    async function setTabs(tabs: TabsMenuProps[]) {
      tabsMenuList.value = tabs;
    }
    // Set Tabs Title
    async function setTabsTitle(title: string) {
      tabsMenuList.value.forEach(item => {
        if (item.path == getUrlWithParams()) item.title = title;
      });
    }
    return { tabsMenuList, addTabs, removeTabs, closeTabsOnSide, closeMultipleTab, setTabs, setTabsTitle };
  },
  { persist: piniaPersistConfig("geeker-tabs") }
);
