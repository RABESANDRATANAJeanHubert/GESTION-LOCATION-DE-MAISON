<template>
  <div class="text-white q-mb-lg">
    <create-use-rent-component></create-use-rent-component>
  </div>
  <div v-if="allUserRend.length > 0">
    <q-table
      title="Liste des Locataires"
      :rows="allUserRend"
      :columns="columns"
      row-key="name"
      :loading="loading"
      flat
      bordered
      :grid="$q.screen.lt.md"
      no-data-label="Aucune liste dans la table"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th auto-width />
        </q-tr>
      </template>
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
                    size="10px"
                    icon-right="o_edit"
                    label="modifier"
                    @click="
                      ($event) => {
                        showDialog = true;
                        updateUserRent.id = props.row.id;
                        updateUserRent.firstName = props.row.firstName;
                        updateUserRent.lastName = props.row.lastName;
                        updateUserRent.email = props.row.email;
                        updateUserRent.phone = props.row.phone;
                        updateUserRent.adress = props.row.adress;
                        updateUserRent.appartment_id =
                          props.row.appart?.appartement;
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
                    dense
                    @click="evtDestroyUserRent(props.row.id)"
                    label="supprimer"
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
    v-if="allUserRend.length === 0"
  >
    <template v-slot:avatar>
      <q-icon name="o_speaker_notes_off" color="primary" />
    </template>
    Vous ne pas posséder la liste de locataire pour le moment. Veuller cliquait
    sur le bouton pour ajouter une autre
    <template v-slot:action>
      <q-btn flat color="info" disable label="Aucun Locataire" />
    </template>
  </q-banner>
  <q-dialog ref="dialogRef" v-model="showDialog">
    <q-card class="q-dialog-plugin">
      <form @submit.prevent="onUpdate">
        <div class="row">
          <div v-if="loading">
            <q-spinner-box color="deep-orange" />
          </div>

          <div class="col-md-12 col-xs-12 col-lg-12 q-pa-sm">
            <q-input
              v-model="updateUserRent.firstName"
              filled
              type="text"
              label="Appartement"
              :rules="[
                (val) =>
                  (val && val.length > 2) ||
                  'Le champ est obligatoire, minimum 3 charactéres',
              ]"
            />
            <q-input
              v-model="updateUserRent.lastName"
              filled
              type="text"
              label="Loyer"
              :rules="[
                (val) =>
                  (val && val.length > 2) ||
                  'Le champ est obligatoire, minimum 3 charactéres',
              ]"
            />
            <q-input
              :rules="[(val) => validateEmail(val) || 'Email is incorrect']"
              v-model="updateUserRent.email"
              filled
              type="text"
              label="Surface"
            />

            <q-input
              v-model="updateUserRent.phone"
              filled
              type="text"
              mask="## ## ### ##"
              :rules="[
                (val) =>
                  (val && val.replace(/ /gi, '').length == 9) ||
                  'Le numéro de téléphone est requis',
                (val) =>
                  phoneNumberValidated(val) || 'Numéro de téléphone invalide',
              ]"
              name="phone"
              label="Numero de telephone"
            />
            <q-input
              v-model="updateUserRent.adress"
              filled
              type="text"
              label="Adresse Postale"
            />

            <q-select
              filled
              emit-value
              map-options
              option-value="id"
              class="text-subtitle1"
              option-label="appartement"
              label="Sélectionner l'appartement"
              v-model="updateUserRent.appartment_id"
              :options="appartmt"
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
  <!-- detail list -->
  <q-dialog ref="dialogRef" v-model="showDetail">
    <q-card class="q-dialog-plugin q-px-lg" style="width: 600px">
      <q-list bordered>
        <q-item clickable v-ripple>
          <q-item-section avatar> Nom </q-item-section>

          <q-item-section class="text-bold"
            >{{ detail.firstName }}{{ detail.lastName }}</q-item-section
          >
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar> Email </q-item-section>

          <q-item-section class="text-bold">{{ detail.email }}</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar> Telephone </q-item-section>

          <q-item-section class="text-bold">{{ detail.phone }}</q-item-section>
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
</template>

<script lang="ts">
import { PhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import _ from 'lodash';
import { Confirm } from 'notiflix';
import { QTableColumn, useQuasar } from 'quasar';
import CreateUseRentComponent from 'src/components/CreateUseRentComponent.vue';
import { globalPageLoading } from 'src/components/models';
import { Appartment } from 'src/services/Appartement';
import { UserRent } from 'src/services/UserRent';
import { UpdateUserRentForm, UserRentEntity } from 'src/type';
import { defineComponent, onMounted, ref } from 'vue';
components: {
  CreateUseRentComponent;
}
const columns = ref<QTableColumn[]>([
  {
    name: 'firstName',
    align: 'left',
    label: 'Nom',
    field: 'firstName',
    sortable: true,
  },
  {
    name: 'lastName',
    align: 'left',
    label: 'Prenom',
    field: 'lastName',
    sortable: true,
  },
  {
    name: 'email',
    align: 'left',
    label: 'email',
    field: 'email',
    sortable: true,
  },
  {
    name: 'phone',
    align: 'left',
    label: 'Numero de telephone',
    field: 'phone',
    sortable: true,
  },
  {
    name: 'adresse',
    align: 'left',
    label: 'Adresse',
    field: 'adress',
    sortable: true,
  },
  {
    name: 'appartement',
    align: 'left',
    label: 'Appartement',
    field: (row: UserRentEntity) => row.appart?.appartement,
    sortable: true,
  },
  {
    name: 'loyer',
    align: 'left',
    label: 'Loyer',
    field: (row: UserRentEntity) => row.appart?.loyer,
    sortable: true,
  },
]);
export default defineComponent({
  components: { CreateUseRentComponent },
  setup() {
    const updateUserRent = ref<UpdateUserRentForm>({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      adress: '',
      appartment_id: '',
    });
    const appartmt = ref<UserRentEntity[]>([]);
    const showDialog = ref(false);
    const $q = useQuasar();
    const loading = ref<boolean>(false);
    const allUserRend = ref<UserRentEntity[]>([]);
    const showDetail = ref<boolean>(false);
    const detail = ref<UserRentEntity>({
      adress: '',
      firstName: '',
      email: '',
      lastName: '',
      phone: '',
      id: '',
      appartement_id: '',

      updatedAt: '',
      appart: {
        adresse_postale: '',
        appartement: '',
        surface: '',
        loyer: '',
      },
    });
    onMounted(async () => {
      await onLoadUserRent();
      globalPageLoading.value = false;
      const info = await Appartment.getAll();
      appartmt.value = _.map(info.data);
    });
    const onLoadUserRent = async () => {
      loading.value = false;
      const data = await UserRent.getAll();
      allUserRend.value = data.data;
    };
    // It's a function that is used to validate the phone number.
    function phoneNumberValidated(phone: string): boolean {
      try {
        const phoneNumber: PhoneNumber | undefined = parsePhoneNumber(
          phone,
          'MG'
        );
        return phoneNumber ? phoneNumber.isValid() : false;
      } catch (err) {
        return false;
      }
    }
    const validateEmail = (email: string) => {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    };
    const onUpdate = async () => {
      const data = await UserRent.update(updateUserRent.value);
      try {
        if (data) {
          $q.notify({
            message: 'Information modifier avec success',
            color: 'info',
            position: 'top',
          });
        } else {
          $q.notify({
            message: 'Impossible de modifier la liste de locataire',
            color: 'danger',
            position: 'top',
          });
        }
      } catch (error) {
        $q.notify({
          message: "Une erreur s'est produit dans le serveur",
          color: 'danger',
          position: 'top',
        });
      }
    };
    const evtDestroyUserRent = async (id: string) => {
      Confirm.show(
        'Confirmation',
        'Voulez-vous réellement supprimer cette le departement ?',
        'Oui',
        'Annuler',
        async () => {
          await onDestroyUserRent(id);
        }
      );
    };
    const onDestroyUserRent = async (id: string) => {
      try {
        const ondelete = await UserRent.remove(id);
        if (ondelete) {
          $q.notify({
            message: 'Information supprimer avec success',
            color: 'info',
            position: 'top',
          });
          await onLoadUserRent();
          return;
        } else {
          $q.notify({
            message: '',
          });
        }
        return ondelete;
      } catch (error) {
        $q.notify({
          message: 'Verifier les champs',
          color: 'red',
          position: 'top',
        });
      }
    };
    const onDetailList = async (id: string) => {
      const data = await UserRent.getDetailUserRent(id);
      detail.value = data.data;
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
      validateEmail,
      phoneNumberValidated,
      evtDestroyUserRent,
      onUpdate,
      appartmt,
      onLoadUserRent,
      columns,
      allUserRend,
      loading,
      showDialog,
      updateUserRent,
    };
  },
});
</script>
