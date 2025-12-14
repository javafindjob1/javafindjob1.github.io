<script setup lang="ts">
import HeroList from '@/components/HeroList.vue'
import { x7skin } from '@/assets/x7/x7skin.ts'

import { x7data } from '@/assets/x7/x7data'
import { provide } from 'vue'
console.log('X7View', x7skin, x7data)

provide('data', x7data)
</script>
<template>
  <HeroList :skin="x7skin"></HeroList>
</template>
<style scoped></style>
