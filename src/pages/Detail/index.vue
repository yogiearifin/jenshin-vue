<template>
  <main class="p-1">
    <h1>{{ characterDetail.name }}</h1>
    <div class="flex content-center">
      <div class="mx-1">
        <img :src="BASE_URL + '/characters/' + params.character + '/card'"
          :alt="'portrait of ' + characterDetail.name" />
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { BASE_URL } from '@/helpers/helpers';
</script>
<script lang="ts">
import { useRouter } from 'vue-router';
export default {
  data() {
    return {
      characterDetail: {
        affiliation: '',
        birthday: '',
        constellation: [{
          name: '',
          unlock: '',
          description: '',
          level: 1
        }],
        name: '',
        description: '',
        nation: '',
        passiveTalents: [{
          name: '',
          unlock: '',
          description: '',
          level: 1
        }],
        rarity: 4,
        skillTalents: [
          {
            name: '',
            unlock: '',
            description: '',
            type: ''
          }
        ],
        title: '',
        vision: '',
        vision_key: '',
        weapon: '',
        weapon_key: ''
      },
      params: useRouter().currentRoute.value.params
    };
  },
  methods: {
    async getData() {
      const res: any = await (await fetch(`https://api.genshin.dev/characters/${ this.params.character }`)).json();
      this.characterDetail = res;
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style scoped>
img {
  width: 20rem;
  height: 25rem;
}
</style>