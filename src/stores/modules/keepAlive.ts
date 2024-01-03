import { defineStore } from "pinia";
import { ref } from "vue";

export const useKeepAliveStore = defineStore("geeker-keepAlive", () => {
  let keepAliveName = ref([]);
  // Add KeepAliveName
  async function addKeepAliveName(name: string) {
    !keepAliveName.value.includes(name) && keepAliveName.value.push(name);
  }
  // Remove KeepAliveName
  async function removeKeepAliveName(name: string) {
    keepAliveName.value = keepAliveName.value.filter(item => item !== name);
  }
  // Set KeepAliveName
  async function setKeepAliveName(newKeepAliveName: string[] = []) {
    keepAliveName.value = newKeepAliveName;
  }

  return { keepAliveName, addKeepAliveName, removeKeepAliveName, setKeepAliveName };
});
