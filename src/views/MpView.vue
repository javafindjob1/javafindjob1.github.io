<script setup lang="ts">
import HeroList from '@/components/HeroList.vue'
import { mpskin } from '@/assets/mp/mpskin.ts'
import { mpdata } from '@/assets/mp/mpdata.ts'
import { provide } from 'vue'
console.log('X7View', mpskin, mpdata)

provide('data', mpdata)

</script>
<template>
  <HeroList :skin="mpskin"></HeroList>
</template>
<style scoped></style>


