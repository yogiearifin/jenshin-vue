<template>
  <div class="spinner">

  </div>
</template>
<script lang="ts" setup>
</script>
<style scoped>
.spinner {
  height: 5rem;
  width: 5rem;
  border-top: 4px solid #778DA9;
  border-right: 4px solid transparent;
  border-radius: 50%;
  animation: 1s spin linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>