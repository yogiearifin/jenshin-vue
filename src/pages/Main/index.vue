<script setup lang="ts">
import { BASE_URL, capitalLetter } from '@/helpers/helpers';
</script>
<script lang="ts">
export default {
  data() {
    return {
      characterList: new Array<string>
    };
  },
  methods: {
    async getData() {
      const res: string[] = await (await fetch("https://api.genshin.dev/characters")).json();
      this.characterList = res;
    },
  },
  mounted() {
    this.getData();
  }
};
</script>

<template>
  <main>
    <h2>Welcome to Simple Genshin Impact Character Database</h2>
    <div class="flex wrap content-center mx-1">
      <div v-for='item in characterList' class="card">
        <router-link :to="'/' + item">
          <div>
            <img :src="BASE_URL + '/characters/' + item + '/icon-big' + (item.includes('traveler') ? '-lumine' : '')"
              :alt="'portrait of ' + item" />
            <p>
              {{ capitalLetter(item.replaceAll('-', ' ')) }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>
