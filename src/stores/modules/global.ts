import { defineStore } from "pinia";
import { GlobalState } from "@/stores/interface";
import { DEFAULT_PRIMARY } from "@/config";
import piniaPersistConfig from "@/stores/helper/persist";
import { ref } from "vue";

export const useGlobalStore = defineStore(
  "geeker-global",
  () => {
    // 修改默认值之后，需清除 localStorage 数据
    // 布局模式 (纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns)
    let layout = ref("vertical");
    // element 组件大小
    let assemblySize = ref("default");
    // 当前系统语言
    let language = ref(null);
    // 当前页面是否全屏
    let maximize = ref(false);
    // 主题颜色
    let primary = ref(DEFAULT_PRIMARY);
    // 深色模式
    let isDark = ref(false);
    // 灰色模式
    let isGrey = ref(false);
    // 色弱模式
    let isWeak = ref(false);
    // 侧边栏反转
    let asideInverted = ref(false);
    // 头部反转
    let headerInverted = ref(false);
    // 折叠菜单
    let isCollapse = ref(false);
    // 菜单手风琴
    let accordion = ref(true);
    // 面包屑导航
    let breadcrumb = ref(true);
    // 面包屑导航图标
    let breadcrumbIcon = ref(true);
    // 标签页
    let tabs = ref(true);
    // 标签页图标
    let tabsIcon = ref(true);
    // 页脚
    let footer = ref(true);
    // Set GlobalState
    function setGlobalState(...args: ObjToKeyValArray<GlobalState>) {
      this.$patch({ [args[0]]: args[1] });
    }
    return {
      layout,
      assemblySize,
      language,
      maximize,
      primary,
      isDark,
      isGrey,
      isWeak,
      asideInverted,
      headerInverted,
      isCollapse,
      accordion,
      breadcrumb,
      breadcrumbIcon,
      tabs,
      tabsIcon,
      footer,
      setGlobalState
    };
  },
  { persist: piniaPersistConfig("geeker-global") }
);
