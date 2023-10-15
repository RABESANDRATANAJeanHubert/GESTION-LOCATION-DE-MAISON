<template>
  <div>
    <div class="row q-mb-lg">
      <div class="col-md-12">
        <create-appartment />
      </div>
    </div>
    <div v-if="info.length > 0">
      <q-table
        flat
        bordered
        :rows="info"
        :columns="columns"
        row-key="name"
        :grid="$q.screen.lt.md"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
            <q-td auto-width>
              <q-btn-dropdown
                outline
                dense
                no-caps
                label="Actions"
                @click="onMainClick"
              >
                <q-list>
                  <q-item v-close-popup @click="onItemClick">
                    <q-btn
                      flat
                      dense
                      label="modifier"
                      size="10px"
                      icon-right="o_edit"
                      @click="
                        ($event) => {
                          showDialog = true;
                          formUpdate.id = props.row.id;
                          formUpdate.appartement = props.row.appartement;
                          formUpdate.surface = props.row.surface;
                          formUpdate.loyer = props.row.loyer;
                          formUpdate.adresse_postale =
                            props.row.adresse_postale;
                        }
                      "
                    >
                    </q-btn>
                  </q-item>
                  <q-item v-close-popup @click="onItemClick">
                    <q-btn
                      flat
                      size="10px"
                      icon-right="o_delete"
                      label="supprimer"
                      @click="evtDestroyAppartement(props.row.id)"
                      dense
                    >
                    </q-btn>
                  </q-item>

                  <q-item v-close-popup @click="onItemClick">
                    <q-btn
                      flat
                      label="détail"
                      icon-right="o_visibility"
                      size="0.6em"
                      @click="
                        ($event) => {
                          showDetail = true;
                          onDetailList(props.row.id);
                        }
                      "
                    />
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="text-left">
                This is expand slot for row above: {{ props.row.name }}.
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <q-banner
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      v-if="info.length === 0"
    >
      <template v-slot:avatar>
        <q-icon name="o_speaker_notes_off" color="primary" />
      </template>
      Vous ne pas posséder la liste d'appartement pour le moment. Veuller
      cliquait sur le bouton pour ajouter une autre
      <template v-slot:action>
        <q-btn flat color="info" disable label="Aucun Appartement" />
      </template>
    </q-banner>
    <q-dialog ref="dialogRef" v-model="showDialog">
      <q-card class="q-dialog-plugin">
        <form @submit.prevent="onUpdateForm">
          <div class="row">
            <div v-if="loading">
              <q-spinner-box color="deep-orange" />
            </div>

            <div class="col-md-12 col-xs-12 col-lg-12 q-pa-sm">
              <q-input
                v-model="formUpdate.appartement"
                filled
                type="text"
                hint="Appartement"
                :rules="[
                  (val) =>
                    (val && val.length > 2) ||
                    'Le champ est obligatoire, minimum 10 charactéres',
                ]"
              />
              <q-input
                v-model="formUpdate.loyer"
                filled
                type="text"
                hint="Loyer"
              />
              <q-input
                v-model="formUpdate.surface"
                filled
                type="text"
                hint="Surface"
                :rules="[
                  (val) =>
                    (val && val.length > 2) ||
                    'Le champ est obligatoire, minimum 5 charactéres',
                ]"
              />

              <q-input
                v-model="formUpdate.adresse_postale"
                filled
                type="text"
                hint="Adresse Postale"
                :rules="[
                  (val) =>
                    (val && val.length > 2) ||
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
            />
            <q-btn color="primary" label="Fermer" @click="showDialog = false" />
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>

    <!-- detail list -->
    <q-dialog ref="dialogRef" v-model="showDetail">
      <q-card class="q-dialog-plugin">
        <q-list bordered>
          <q-item clickable v-ripple>
            <q-item-section avatar> Appartement </q-item-section>

            <q-item-section class="text-bold">{{
              detail.appartement
            }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar> Surface </q-item-section>

            <q-item-section class="text-bold">{{
              detail.surface
            }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar> Loyer </q-item-section>

            <q-item-section class="text-bold">{{
              detail.loyer
            }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar> Date </q-item-section>

            <q-item-section class="text-bold">{{
              detail.updatedAt
            }}</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
    <!-- end detail -->
  </div>
</template>

<script lang="ts">
import { globalPageLoading } from 'src/components/models';
import { defineComponent, onMounted, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const columns: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Appartement',
    align: 'left',
    field: 'appartement',
    format: (val: any) => `${val}`,
    sortable: true,
  },
  {
    name: 'calories',
    align: 'center',
    label: 'Loyer',
    field: 'loyer',
    sortable: true,
  },
  { name: 'surface', label: 'Surface', field: 'surface', sortable: true },
  {
    name: 'adresse_postale',
    label: 'Adresse postale',
    field: 'adresse_postale',
  },
  { name: 'updatedAt', label: 'Date', field: 'updatedAt' },
];

import { EntityAppartement, UpdateTaskDto } from 'src/type';
import { Appartment } from 'src/services/Appartement';
import CreateAppartment from 'src/components/createAppartment.vue';
import { QTableColumn, useQuasar } from 'quasar';
import { Confirm } from 'notiflix';
export default defineComponent({
  components: { CreateAppartment },

  setup() {
    const showDetail = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const showDialog = ref(false);
    const info = ref<EntityAppartement[]>([]);
    const detail = ref<EntityAppartement>({
      appartement: '',
      adresse_postale: '',
      info: [],
      loyer: 0,
      surface: '',
      id: 0,
      updatedAt: '',
    });
    onMounted(async () => {
      onloadAppartement();
      globalPageLoading.value = false;
      onDetailList;
    });

    onBeforeRouteLeave((to: any, from: any) => {
      globalPageLoading.value = false;
    });

    const formUpdate = ref<UpdateTaskDto>({
      id: '',
      appartement: '',
      loyer: '',
      surface: '',
      adresse_postale: '',
    });
    const q = useQuasar();
    const onloadAppartement = async () => {
      const data = await Appartment.getAll();
      info.value = data.data;
    };

    const onDetailList = async (id: string) => {
      const data = await Appartment.getDetailAppartement(id);
      detail.value = data.data;
    };

    const onUpdateForm = async () => {
      loading.value = true;
      try {
        const data = await Appartment.update(formUpdate.value);
        if (data) {
          q.notify({
            message: 'Information modifier avec success',
            color: 'info',
            position: 'top',
          });
          onloadAppartement();
          showDialog.value = false;
        }
        loading.value = false;
      } catch (error) {
        loading.value = true;
        q.notify({
          message: "Une erreur s'est produit dans le serveur",
          color: 'red',
          position: 'top',
        });
      }
    };

    const evtDestroyAppartement = async (id: string) => {
      Confirm.show(
        'Confirmation',
        'Voulez-vous réellement supprimer cette le departement ?',
        'Oui',
        'Annuler',
        async () => {
          await onDestroyAppartement(id);
          await onloadAppartement();
        }
      );
    };

    const onDestroyAppartement = async (id: string) => {
      try {
        const ondelete = await Appartment.remove(id);
        q.notify({
          message: 'Informarion supprimer avec success',
          color: 'info',
          position: 'top',
        });
        await onloadAppartement();
        return ondelete;
      } catch (error) {
        q.notify({
          message: "Une erreur s'est produit dans le serveur",
        });
      }
    };

    return {
      detail,
      onDetailList,
      onMainClick() {
        // console.log('Clicked on main button')
      },

      onItemClick() {
        // console.log('Clicked on an Item')
      },
      showDetail,
      evtDestroyAppartement,
      onUpdateForm,
      loading,
      showDialog,
      info,
      columns,
      formUpdate,
    };
  },
});
</script>
