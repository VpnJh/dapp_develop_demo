import { ref } from "vue";
const loadStatus = ref(false);
export default function useStatusPup() {
  return {
    loadStatus
  };
}
