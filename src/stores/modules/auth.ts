import { defineStore } from "pinia";
import { getAuthButtonListApi, getAuthMenuListApi } from "@/api/modules/login";
import { getFlatMenuList, getShowMenuList, getAllBreadcrumbList } from "@/utils";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("geeker-auth", () => {
  // 按钮权限列表
  let authButtonList = ref({});
  // 菜单权限列表
  let authMenuList = ref<Menu.MenuOptions[]>([]);
  // 当前页面的 router name，用来做按钮权限筛选
  let routeName = ref("");
  // 按钮权限列表
  const authButtonListGet = computed(() => {
    return authButtonList.value;
  });
  // 菜单权限列表 ==> 这里的菜单没有经过任何处理
  const authMenuListGet = computed(() => {
    return authMenuList.value;
  });
  // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
  const showMenuListGet = computed(() => {
    return getShowMenuList(authMenuList.value);
  });
  // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
  const flatMenuListGet = computed(() => {
    return getFlatMenuList(authMenuList.value);
  });
  // 递归处理后的所有面包屑导航列表
  const breadcrumbListGet = computed(() => {
    return getAllBreadcrumbList(authMenuList.value);
  });
  // Get AuthButtonList
  async function getAuthButtonList() {
    const { data } = await getAuthButtonListApi();
    authButtonList.value = data;
  }
  // Get AuthMenuList
  async function getAuthMenuList() {
    const { data } = await getAuthMenuListApi();
    authMenuList.value = data;
  }
  // Set RouteName
  async function setRouteName(name: string) {
    routeName.value = name;
  }
  return {
    authButtonList,
    authMenuList,
    routeName,
    authButtonListGet,
    authMenuListGet,
    showMenuListGet,
    flatMenuListGet,
    breadcrumbListGet,
    getAuthButtonList,
    getAuthMenuList,
    setRouteName
  };
});
