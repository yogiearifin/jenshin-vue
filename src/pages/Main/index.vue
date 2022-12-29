<script setup lang="ts">
import { BASE_URL, capitalLetter } from '@/helpers/helpers';
import Spinner from '@/components/Spinner/index.vue';
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
    <h2>Welcome to Simple Genshin Impact Characters Database</h2>
    <div class="flex wrap content-center mx-1">
      <div v-for='item in characterList' class="card" v-if="characterList.length">
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
      <div v-else class="flex content-center">
        <Spinner />
      </div>
    </div>
  </main>
</template>
