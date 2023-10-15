<template>
  <div class="row">
    <div class="col-md-4 col-lg-12">
      <q-btn
        color="black"
        outline
        label="nouveau Locataire"
        icon="o_add"
        @click="showDialog = true"
      />
    </div>
    <div class="col-md-8"></div>
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
              v-model="formUserRent.firstName"
              filled
              type="text"
              label="firstName"
              :rules="[
                (val) =>
                  (val && val.length > 5) ||
                  'Le champ est obligatoire, minimum 5 charactéres',
              ]"
            />
            <q-input
              v-model="formUserRent.lastName"
              filled
              type="text"
              label="Loyer"
              :rules="[
                (val) => (val && val.length > 2) || 'Le champ est obligatoire',
              ]"
            />
            <q-input
              v-model="formUserRent.email"
              filled
              type="text"
              label="Surface"
              :rules="[
                (val) => (val && val.length > 2) || 'Le champ est obligatoire',
              ]"
            />

            <q-input
              v-model="formUserRent.adress"
              filled
              type="text"
              label="Adresse Postale"
              :rules="[
                (val) =>
                  (val && val.length > 3) ||
                  'Le champ est obligatoire, minimum 3 charactéres',
              ]"
            />
            <q-input
              v-model="formUserRent.phone"
              filled
              type="text"
              label="Adresse Postale"
              :rules="[
                (val) => (val && val.length > 3) || 'Le champ est obligatoire',
              ]"
            />
            <q-select
              filled
              v-model="formUserRent.appartment_id"
              dense
              emit-value
              map-options
              option-label="appartement"
              option-value="id"
              :options="appartements"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Information obligatoire et/ou sélectionner  la liste d\'appartement ',
              ]"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
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
import { UserRent } from 'src/services/UserRent';
import { UserRentEntity, UserRentForm } from 'src/type';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  setup() {
    const loading = ref<boolean>(false);
    onMounted(async () => {
      onloadUserRent();
      onloadAppartement();
    });
    const $q = useQuasar();
    const info = ref<UserRentEntity[]>([]);
    const appartements = ref<Appartment[]>([]);

    const onloadUserRent = async () => {
      const dataInfo = await UserRent.getAll();
      info.value = dataInfo.data;
    };
    const formUserRent = ref<UserRentForm>({
      adress: '',
      appartment_id: '',
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
    });

    const onloadAppartement = async () => {
      const listAppartement = await Appartment.getAll();
      appartements.value = listAppartement.data;
    };
    const onsubmitForm = async () => {
      try {
        const dataForm = await UserRent.create(formUserRent.value);
        if (dataForm) {
          $q.notify({
            message: 'Information ajouter avec success',
            color: 'info',
            position: 'top',
          });
          await onloadUserRent();
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
    return { showDialog, onsubmitForm, formUserRent, loading, appartements };
  },
});
</script>
