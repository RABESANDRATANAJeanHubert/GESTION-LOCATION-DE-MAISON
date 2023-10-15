<template>
  <div>
    <div class="row justify-center">
      <div class="col-md-3">
        <q-card flat bordered style="width: 400px; height: 485px">
          <q-card-section style="background-color: #0b45d9">
            <h4 class="text-h5 text-white q-my-md">Registration</h4>
            <div
              class="absolute-bottom-right q-pr-md"
              style="transform: translateY(50%)"
            >
              <q-btn fab dense icon="o_how_to_reg" color="info" />
            </div>
          </q-card-section>

          <q-form class="q-px-sm q-pt-xl q-pb-lg" @submit.prevent="submitForm">
            <q-input
              square
              clearable
              v-model="formUserData.firstName"
              label="firstName"
              :rules="[
                (val) =>
                  (val && val.length > 5) ||
                  'Le champ est obligatoire, minimum 5 charactéres',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input
              square
              clearable
              v-model="formUserData.lastName"
              label="lastName"
              :rules="[
                (val) => (val && val.length > 2) || 'Le champ est obligatoire',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input
              :rules="[(val) => validateEmail(val) || 'Email is incorrect']"
              square
              clearable
              v-model="formUserData.email"
              type="email"
              label="Email"
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>

            <q-input
              square
              clearable
              v-model="formUserData.password"
              type="password"
              label="Password"
              :rules="[
                (val) =>
                  (val && val.length > 8) ||
                  'Ajouter le mot de passe,8 caractères',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
            <q-card-actions class="q-px-lg">
              <q-btn
                type="submit"
                dense
                unelevated
                size="lg"
                style="background-color: #0b45d9"
                class="full-width text-white"
                label="enregister"
                icon="o_login"
                :loading="loading"
              />
            </q-card-actions>
            <q-card-section class="text-center q-pa-sm">
              <div class="text-body2 text-red-8">
                Si vous avez un compte

                <router-link :to="{ name: 'login' }" class="doc-link"
                  >cliquez ici</router-link
                >
              </div>
            </q-card-section>
          </q-form>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { InstanceAxios } from 'src/services/Axios';
import { RegisterForm } from 'src/type';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const loading = ref<boolean>(false);
    const formUserData = ref<RegisterForm>({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });

    // Function to  subscribe and create new user
    const submitForm = async () => {
      const data = await InstanceAxios.post('/user/signup', formUserData.value);
      if (!(data instanceof Error)) {
        await router.push({ name: 'login' });
      } else {
        $q.notify({
          message: "Une erreur s'est produit pendant l'inscription ",
          color: 'danger',
          position: 'top',
        });
      }
    };
    // function check  and verify email
    const validateEmail = (email: string) => {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    };

    return {
      loading,
      formUserData,
      validateEmail,
      submitForm,
    };
  },
});
</script>

<style></style>
