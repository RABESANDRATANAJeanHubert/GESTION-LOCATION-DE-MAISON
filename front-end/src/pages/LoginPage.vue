<template>
  <div class="row justify-center items-center q-mb-lg">
    <q-card flat bordered style="width: 400px; height: 450px">
      <q-card-section style="background-color: #0b45d9">
        <h4 class="text-h5 text-white q-my-md">Login</h4>
        <div
          class="absolute-bottom-right q-pr-md"
          style="transform: translateY(50%)"
        >
          <q-btn fab icon="o_how_to_reg" color="info" />
        </div>
      </q-card-section>
      <q-form class="q-px-sm q-pt-xl" @submit="onSubmitLogin">
        <q-input
          square
          clearable
          v-model="formUser.email"
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
          v-model="formUser.password"
          type="password"
          label="Password"
          class="q-mb-lg"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
        <q-btn
          unelevated
          size="lg"
          style="background-color: #0b45d9"
          class="full-width text-white q-mb-md"
          label="Sign In"
          icon="o_login"
          dense
          type="submit"
        />
        <q-card-section class="text-center q-pa-sm">
          <div class="text-body2 text-red-8">
            Vous n'avez pas encore de compte ?
            <router-link :to="{ name: 'register' }" class="doc-link"
              >Creer un compte</router-link
            >
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </div>
</template>

<script lang="ts">
import { isNull, isUndefined } from 'lodash';
import { useQuasar } from 'quasar';
import { InstanceAxios } from 'src/services/Axios';
import { LoginForm } from 'src/type';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const formUser = ref<LoginForm>({
      email: '',
      password: '',
    });
    const onSubmitLogin = async () => {
      if (
        isNull(formUser.value.email) ||
        isUndefined(formUser.value.email) ||
        isNull(formUser.value.password) ||
        isUndefined(formUser.value.password)
      ) {
        $q.notify({
          message: 'Login et/ou mot de passe est  incorrect',
          color: 'red',
          position: 'top',
        });
      }
      const user = await InstanceAxios.post('user/signin', formUser.value);

      if (user.status === 400) {
        $q.notify({
          message: user.data,
          color: 'info',
          position: 'top',
        });
        return;
      }
      if (user) {
        router.push({ name: 'user-rent' });
      }
    };
    return {
      formUser,
      onSubmitLogin,
    };
  },
});
</script>

<style></style>
