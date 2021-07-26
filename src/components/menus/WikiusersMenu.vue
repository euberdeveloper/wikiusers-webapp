<template>
<div>
  <v-navigation-drawer v-model="showMenu" :clipped="$vuetify.breakpoint.lgAndUp" app>
    <v-list shaped>
      <v-list-item-group v-model="tab">
        <v-list-item v-for="item of items" :key="item.path" :to="item.path">
          <v-list-item-icon class="mr-3" v-if="item.icon">
            <v-icon dense>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from "vue-property-decorator";
import { MutationTypes } from "@/store";
import { getLangs } from '@/utils/api';

export interface MenuItem {
  icon?: string;
  text: string;
  path: string;
}

@Component
export default class WikiusersMenu extends Vue {
  /* DATA */

  private tab = 0;
  private items: MenuItem[] = [];

  /* COMPUTED */

  get showMenu(): boolean {
    return this.$store.state.showMenu;
  }
  set showMenu(value: boolean) {
    this.$store.commit(MutationTypes.SET_SHOW_MENU, value);
  }

  /* LIFE CYCLE */

  async mounted() {
    const langs = await getLangs();
    this.items = langs.map(lang => ({
      text: `${lang}wiki`,
      path: `/${lang}`
    }));
  }

}
</script>