<template>
  <q-list class="q-pl-md" id="menu">
    <q-item
      clickable
      v-ripple
      :active="$route.path.search('appartement') >= 0"
      @click="onAfterChangePage('appartement')"
      activeClass="active"
      to="/appartement"
    >
      <q-item-section avatar>
        <q-icon size="sm" name="o_home" aria-hidden="true" />
      </q-item-section>
      <q-item-section>Appartement</q-item-section>
    </q-item>
    <q-item
      clickable
      v-ripple
      :active="$route.path.search('user-rent') >= 0"
      @click="onAfterChangePage('user-rent')"
      activeClass="active"
      to="/user-rent"
    >
      <q-item-section avatar>
        <q-icon size="sm" name="o_family_restroom" aria-hidden="true" />
      </q-item-section>
      <q-item-section>Locataire</q-item-section>
    </q-item>
    <q-item
      clickable
      v-ripple
      :active="$route.path.search('document') >= 0"
      @click="onAfterChangePage('document')"
      activeClass="active"
      to="/document"
    >
      <q-item-section avatar>
        <q-icon size="sm" name="o_description" aria-hidden="true" />
      </q-item-section>
      <q-item-section>Fiche de paie</q-item-section>
    </q-item>
    <q-item clickable v-ripple @click="singout">
      <q-item-section avatar>
        <q-icon size="sm" name="o_logout" aria-hidden="true" />
      </q-item-section>
      <q-item-section>Déconnexion</q-item-section>
    </q-item>
  </q-list>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Confirm } from 'notiflix';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
Confirm.init({
  titleColor: '#e1040c',
  okButtonBackground: '#e1040c',
  okButtonColor: '#ffffff',
  cancelButtonBackground: '#000000',
});
export default defineComponent({
  name: 'MenuPrimary',
  emits: ['drawer'],
  setup(_, { emit }) {
    const isPro = ref<number | undefined>(1);
    const activeClass = ref();
    const isCommunity = ref<boolean>(false);
    const link = ref<string>('dashboard');
    const loading = ref(true);
    const router = useRouter();
    const $q = useQuasar();
    const singout = () => {
      Confirm.show(
        'Confirmation',
        'Voulez-vous réellement vous déconnecter ?',
        'Oui',
        'Non',
        () => {
          router.push({ name: 'login' });
        }
      );
    };

    const onAfterChangePage = (pageLink: string) => {
      link.value = pageLink;
      if ($q.screen.width <= 767) {
        emit('drawer', false);
      }
    };
    return {
      isPro,
      loading,
      singout,
      isCommunity,
      link,
      onAfterChangePage,
      activeClass,
    };
  },
});
</script>
