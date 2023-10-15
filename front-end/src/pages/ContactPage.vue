<template>
  <div class="row">
    <div class="q-pa-md col-12">
      <!-- besoin d'aide -->
      <div class="row">
        <div class="col-md-10 q-pa-md col-xs-12">
          <q-card flat>
            <div>
              <div class="text-h4 q-mt-sm q-mb-lg">Nous contactez</div>
              <div class="text-dark text-body1">
                Pour appeler directement.
                <p>
                  <a href="tel:+261" class="doc-link">0327979092</a> -
                  <a href="tel:+261" class="doc-link">0327979092</a> -
                  <a href="tel:+261" class="doc-link">0327979092</a>
                </p>
                Heures d'ouverture: 7h00 - 19h00 (du lundi au vendredi)<br />
                <p>
                  Pour envoyer un message privé, envoyez-le à
                  <a href="mailto:contact@belleavenue.com" class="doc-link"
                    >contact@belleavenue.com</a
                  >
                </p>
              </div>
            </div>
            <!-- debut besoin aide -->
          </q-card>
        </div>
      </div>
      <!-- end second test -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { globalPageLoading } from 'src/components/models';
import { onBeforeRouteLeave } from 'vue-router';
export default defineComponent({
  setup() {
    onBeforeRouteLeave((to: any, from: any) => {
      globalPageLoading.value = true;
    });

    onBeforeMount(() => {
      globalPageLoading.value = false;
    });
    return {};
  },
});
</script>
