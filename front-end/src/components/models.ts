import { ref } from 'vue';

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}
export const globalPageLoading = ref<boolean>(true);
export const globalMessage = ref<SystemMessage | null>(null);
import { Dark } from 'quasar';

export const modeActive = () => {
  // get status
  console.log(Dark.isActive);

  // get configured status
  console.log(Dark.mode); // "auto", true, false

  // set status
  Dark.set(true); // or false or "auto"
  Dark.toggle();
  // toggle
};
