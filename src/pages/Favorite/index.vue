<template>
  <main>
    <h1>Favorite Characters</h1>
    <div class="flex content-center wrap">
      {{ favoriteCharacters?.length ? null : "You don't have any favorite character yet" }}
      <div v-for="items in favoriteCharacters" class="card">
        <router-link :to="'/' + items">
          <div>
            <img :src="BASE_URL + '/characters/' + items + '/icon-big' + (items.includes('traveler') ? '-lumine' : '')"
              :alt="'portrait of ' + items" />
            <p>
              {{ capitalLetter(items.replaceAll('-', ' ')) }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { BASE_URL, capitalLetter } from '@/helpers/helpers';

</script>
<script lang="ts">

export default {
  data() {
    return {
      favoriteCharacters: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites') || '') : [],
    };
  },
};
</script>
<style>

</style>