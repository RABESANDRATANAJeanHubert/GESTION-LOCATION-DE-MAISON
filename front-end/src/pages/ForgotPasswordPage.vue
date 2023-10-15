<template>
  <div class="row justify-center items-center q-mb-lg">
    <q-card flat bordered style="width: 400px; height: 450px">
      <q-card-section style="background-color: #0b45d9">
        <h4 class="text-h5 text-white q-my-md">Frogot Password</h4>
        <div
          class="absolute-bottom-right q-pr-md"
          style="transform: translateY(50%)"
        >
          <q-btn fab icon="o_mark_email_read" color="info" />
        </div>
      </q-card-section>
      <q-card-section class="q-mb-lg">
        <q-form class="q-px-sm q-pt-xl">
          <q-input square clearable v-model="email" type="email" label="Email">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-lg">
        <q-btn
          unelevated
          size="lg"
          style="background-color: #0b45d9"
          class="full-width text-white"
          label="send your email"
          dense
        />
        <q-btn size="lg" flat class="full-width text-white" dense />
      </q-card-actions>
      <q-card-section class="text-center q-pa-sm">
        <div class="text-body2 text-red-8">
          Si vous avez un compte

          <router-link :to="{ name: 'login' }" class="doc-link"
            >cliquez ici</router-link
          >
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      email: '',
      username: '',
      password: '',
    };
  },
});
</script>

<style></style>
