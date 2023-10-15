<!-- new layout -->

<template>
  <q-layout view="lHh lpR LFf">
    <q-drawer
      v-model="leftDrawerOpen"
      :width="350"
      :breakpoint="767"
      bordered
      :persistent="false"
      :show-if-above="false"
      class="bg-grey-2"
    >
      <q-scroll-area
        :visible="false"
        :thumb-style="thumbStyle"
        style="height: 750px; max-width: 350px"
      >
        <div
          class="absolute-right mobile-only screen--xs q-pa-md q-mt-lg"
          style="min-width: 100px"
        >
          <q-btn @click="toggleLeftDrawer" dense icon="o_close" />
        </div>
        <div class="absolute-center" style="min-width: 250px">
          <div class="q-pa-lg text-center">
            <q-img
              src="images/louer.jpg"
              spinner-color="primary"
              :ratio="0"
              class="q-mb-lg"
              height="120px"
              width="200px"
            />
          </div>
          <!-- drawer content -->
          <menu-primary @drawer="EmitDrawer"></menu-primary>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-footer>
      <q-toolbar class="bg-primary">
        <q-toolbar-title class="text-subtitle2"
          ><router-link
            to="/contact"
            class="text-white"
            style="text-decoration: none"
          >
            <q-icon size="sm" name="fa-solid fa-headset" />
            Nous-contactez</router-link
          ></q-toolbar-title
        >
        <q-btn target="_blank" flat round dense icon="fa-brands fa-facebook" />
        <!--  <q-btn flat round dense icon="smart_display" />-->
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <div class="container q-pt-xl q-pl-md">
        <div class="row">
          <div class="col-md-5">
            <q-btn
              outline
              flat
              round
              @click="toggleLeftDrawer"
              color="black"
              icon="o_horizontal_split"
              size="1.5em"
            />
          </div>
        </div>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<!-- end new layout -->
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import MenuPrimary from './MenuPrimary.vue';
import { useQuasar } from 'quasar';
import { globalPageLoading, globalMessage } from 'src/components/models';
export default defineComponent({
  setup() {
    const leftDrawerOpen = ref(true);
    const isPro = ref<number | undefined>(0);
    const $q = useQuasar();
    let timer: NodeJS.Timeout;
    const EmitDrawer = (opened: boolean) => {
      leftDrawerOpen.value = opened;
    };
    onMounted(() => {
      document.querySelector('#loading-app')?.remove();
      if ($q.screen.width <= 767) {
        leftDrawerOpen.value = false;
      }

      // Verifier la session tous les 0.5 minute
    });

    onUnmounted(() => {
      if (timer) {
        clearInterval(timer);
      }
    });
    return {
      globalMessage,
      globalPageLoading,
      isPro,
      leftDrawerOpen,
      drawerRight: ref(false),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: '0.75',
      },
      EmitDrawer,
    };
  },
  components: { MenuPrimary },
});
</script>
<style scoped>
.container-route > .q-inner-loading {
  z-index: 999;
  color: #da1f26;
  position: fixed;
}
</style>
