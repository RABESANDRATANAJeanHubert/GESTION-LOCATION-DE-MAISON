<template>
  <q-layout class="container q-pt-xl">
    <q-page-container class="q-pt-xl">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    const message =
      "Ity dia natao ho an'ny mpamorona. Raha nisy niteny taminao mba handika sy hametaka zavatra eto mba hahafahan'ny endri-javatra iray na heverina ho mijirika ny kaontin'olon-kafa, fantaro fa fisolokiana manome an'io olona io hiditra amin'ny kaontinao.";
    console.log(
      '%c  Tandremo !  ',
      'color: white; background: red; font-size: 35px'
    );
    console.warn(`%c ${message} `, 'color: white; font-size: 17px');
  },
};
</script>
