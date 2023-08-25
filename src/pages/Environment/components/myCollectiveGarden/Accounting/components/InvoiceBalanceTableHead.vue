<template>
  <tr class="title">
    <td :rowspan="rows+1">Soldes</td>
    <td colspan="6" :rowspan="rows+1"></td>
    <td>Appel de fonds</td>
    <td>Montant</td>
    <td></td>
    <td>Date d'envoi</td>
    <td>Date de payement</td>
    <td>Lots</td>
    <td>Solde à charge du lot</td>
    <!-- <td>Solde à charge du propriétaire</td>
    <td>Solde à charge du locataire</td> -->
  </tr>
</template>
<script lang="ts" setup>
const props = defineProps({
    rows: {
        type: Number,
        default: 0
    }
})
</script>
<style lang="scss" scoped>
.title td:nth-child(n + 3) {
  @apply border-l;
  border-color: #fff;
  background-color: var(--color-gray);
}
.title {
  td {
    @apply font-semibold px-2 py-4 text-left align-top;
  }
}
</style>
