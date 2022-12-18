<script setup lang="ts">
import Navbar from '@/components/Navbar/index.vue';
import FooterSection from '@/components/Footer/index.vue';
</script>

<template>
  <Navbar />
  <router-view></router-view>
  <FooterSection />
</template>
