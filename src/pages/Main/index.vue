<script setup lang="ts">
import { BASE_URL } from '@/helpers/helpers';
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
    capitalLetter(str: string) {
      const newStr = str.split(" ");
      for (let i = 0; i < newStr.length; i++) {
        newStr[i] = newStr[i][0].toUpperCase() + newStr[i].substr(1);
      }
      return newStr.join(" ");
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<template>
  <main class="p-1">
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
