<template>
  <div class="row">
    <div class="col-md-5 col-lg-12">
      <q-btn
        outline
        style="color: rgb(29, 27, 23)"
        label="nouvelle  appartement"
        icon="o_add"
        @click="showDialog = true"
      />
    </div>
    <div class="col-md-7"></div>
  </div>
  <q-dialog ref="dialogRef" v-model="showDialog">
    <q-card class="q-dialog-plugin">
      <form @submit.prevent="onsubmitForm">
        <div class="row">
          <div v-if="loading">
            <q-spinner-box color="deep-orange" />
          </div>

          <div class="col-md-12 col-xs-12 col-lg-12 q-pa-sm">
            <q-input
              v-model="formApp.appartement"
              filled
              type="text"
              label="Appartement"
              :rules="[
                (val) =>
                  (val && val.length > 10) ||
                  'Le champ est obligatoire, minimum 10 charactéres',
              ]"
            />
            <q-input
              v-model="formApp.loyer"
              filled
              type="text"
              label="Loyer"
              :rules="[
                (val) =>
                  (val && val.length > 5) ||
                  'Le champ est obligatoire, minimum 5 charactéres',
              ]"
            />
            <q-input
              v-model="formApp.surface"
              filled
              type="text"
              label="Surface"
              :rules="[
                (val) =>
                  (val && val.length > 5) ||
                  'Le champ est obligatoire, minimum 5 charactéres',
              ]"
            />

            <q-input
              v-model="formApp.adresse_postale"
              filled
              type="text"
              label="Adresse Postale"
              :rules="[
                (val) =>
                  (val && val.length > 3) ||
                  'Le champ est obligatoire, minimum 3 charactéres',
              ]"
            />
          </div>
        </div>
        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="Enregistrer"
            type="submit"
            :loading="loading"
            outline
          />
          <q-btn
            color="primary"
            label="Fermer"
            @click="showDialog = false"
            outline
          />
        </q-card-actions>
      </form>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { useQuasar } from 'quasar';
import { Appartment } from 'src/services/Appartement';
import { AppartmentForm, EntityAppartement } from 'src/type';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  setup() {
    const loading = ref<boolean>(false);
    onMounted(async () => {
      onloadAppartement();
    });
    const $q = useQuasar();
    const info = ref<EntityAppartement[]>([]);

    const onloadAppartement = async () => {
      const dataInfo = await Appartment.getAll();
      info.value = dataInfo.data;
    };
    const formApp = ref<AppartmentForm>({
      appartement: '',
      loyer: '',
      surface: '',
      adresse_postale: '',
    });
    const onsubmitForm = async () => {
      try {
        const dataForm = await Appartment.create(formApp.value);
        if (dataForm) {
          $q.notify({
            message: 'Information ajouter avec success',
            color: 'info',
            position: 'top',
          });
          await onloadAppartement();
          showDialog.value = false;
          loading.value = false;
          return;
        } else {
          $q.notify({
            message: "Inmpossible d'ajouter les informations",
            color: 'red',
            position: 'top',
          });
        }
        loading.value = false;
        return dataForm;
      } catch (error) {
        $q.notify({
          message: 'Veullier ajouter les champs libres',
          color: 'red',
          position: 'top',
        });
      }
      loading.value = false;
    };
    const showDialog = ref(false);
    return { showDialog, onsubmitForm, formApp, loading };
  },
});
</script>
