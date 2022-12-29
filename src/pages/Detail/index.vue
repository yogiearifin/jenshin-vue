<template>
  <main>
    <h1>{{ characterDetail.name && characterDetail.name ? characterDetail.name && characterDetail.name : 'Loading...' }}
    </h1>
    <div v-if="characterDetail.name.length">
      <h4>{{ characterDetail.title && characterDetail.title }}</h4>
      <p class="star">{{ characterDetail.rarity && renderStar(characterDetail.rarity) }}</p>
      <div class="flex content-center">
        <button class="favorite-button" :disabled="characterDetail.name.length === 0" @click="handleFavorite">{{
    hasItem() ? 'Remove from Favorite' : 'Add to Favorite'
}}</button>
      </div>
    </div>
    <div class="mx-1 flex container-detail content-center" v-if="characterDetail.name.length">
      <div class="flex content-center">
        <div>
          <img :src="BASE_URL + '/characters/' + params.character + '/card'"
            :alt="'portrait of ' + characterDetail.name" />
        </div>
      </div>
      <div class="flex content-center items-center container-article">
        <article>
          <p>Affiliation: <span>{{ characterDetail.affiliation && characterDetail.affiliation }}</span></p>
          <p>Nation: <span>{{ characterDetail.nation && characterDetail.name === 'Aloy' ? 'Outlander' :
    characterDetail.nation
}}</span></p>
          <p>{{ characterDetail.name && characterDetail.name === 'Traveler' ? 'Element' : archon.findIndex(item => item
    === characterDetail.name && characterDetail.name) !== -1 ? 'Gnosis' : 'Vision'
}}: <span>{{
    characterDetail.vision && characterDetail.vision
}}</span></p>
          <p>Constellation: <span>{{ characterDetail.constellation && characterDetail.constellation }}</span></p>
          <p>Weapon: <span>{{ characterDetail.weapon && characterDetail.weapon }}</span></p>
          <p>Birthday: <span>{{ characterDetail.name && characterDetail.name === 'Traveler' ? "Player's Choice" :
    characterDetail.birthday && bday(characterDetail.birthday)
              }}</span></p>
        </article>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { BASE_URL, archon } from '@/helpers/helpers';
</script>
<script lang="ts">
import { useRouter } from 'vue-router';
export default {
  data() {
    return {
      characterDetail: {
        affiliation: '',
        birthday: '',
        constellation: '',
        constellations: [{
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
      params: useRouter().currentRoute.value.params,
      favorites: [] as string[]
    };
  },
  methods: {
    async getData() {
      const res: any = await (await fetch(`https://api.genshin.dev/characters/${ this.params.character }`)).json();
      this.characterDetail = res;
    },
    renderStar(rarity: number) {
      let star = '';
      for (let i = 0; i < rarity; i++) {
        star += '⭐';
      }
      return star;
    },
    bday(date: string) {
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      function getSuffix(date: number) {
        switch (date) {
          case 1:
          case 21:
          case 31:
            return `${ date }st`;
          case 2:
          case 22:
            return `${ date }nd`;
          case 3:
          case 23:
            return `${ date }rd`;
          default:
            return `${ date }th`;
        }
      }
      const birthday = new Date(date);
      return `${ monthNames[birthday.getMonth()] } ${ getSuffix(birthday.getDate()) }`;
    },
    hasItem() {
      return this.favorites.findIndex(item => item === this.params.character)
        !== -1;
    },
    handleFavorite() {
      if (this.hasItem()) {
        if (localStorage.getItem('favorites')) {
          localStorage.setItem('favorites', JSON.stringify(Array.from(JSON.parse(localStorage.getItem('favorites') || '')).filter(item => item !== this.params.character)));
        }
      } else {
        if (localStorage.getItem('favorites')) {
          localStorage.setItem('favorites', JSON.stringify([...JSON.parse(localStorage.getItem('favorites') || ''), this.params.character]));
        } else {
          localStorage.setItem('favorites', JSON.stringify([this.params.character]));
        }
      }
      this.favorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites') || '') : [];
    }
  },
  mounted() {
    this.getData();
    if (localStorage.getItem('favorites')) {
      this.favorites = JSON.parse(localStorage.getItem('favorites') || '');
    }
  }
};
</script>
<style scoped>
img {
  width: 20rem;
  height: 25rem;
}

h4 {
  text-align: center;
}

span {
  font-weight: 600;
}

article p {
  margin-bottom: 1rem;
}

.star {
  text-align: center;
  margin-bottom: .5rem;
}

.container-article {
  margin-left: 4rem;
}


@media (max-width:600px) {
  img {
    width: 15rem;
    height: 20rem;
  }

  .container-detail {
    display: block;
  }

  .container-article {
    margin-left: 0;
    margin-top: .5rem;
    margin-bottom: .5rem;
  }

  article p {
    margin-bottom: 0;
  }
}
</style>