<template>
  <v-app id="app">
    <wikiusers-bar />
    <wikiusers-menu />
    <router-view />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import WikiusersBar from "@/components/bars/WikiusersBar.vue";
import WikiusersMenu from "@/components/menus/WikiusersMenu.vue";

@Component({
  components: {
    WikiusersBar,
    WikiusersMenu
  },
})
export default class App extends Vue {
  /* COMPUTED */

  get isDarkTheme(): boolean {
    return this.$store.state.darkTheme;
  }

  get primaryColour(): string | null {
    return this.$store.state.primaryColour;
  }

  /* WATCH */

  @Watch("isDarkTheme")
  watchDarkTheme() {
    this.$vuetify.theme.dark = this.isDarkTheme;
  }

  @Watch("primaryColour")
  watchPrimaryColour() {
    if (this.primaryColour) {
      this.$vuetify.theme.themes.light.primary = this.primaryColour;
      this.$vuetify.theme.themes.dark.primary = this.primaryColour;
    } else {
      this.$vuetify.theme.themes.light.primary = "#1976D2";
      this.$vuetify.theme.themes.dark.primary = "#1976D2";
    }
  }

  /* LIFE CYCLE */

  mounted() {
    this.$vuetify.theme.dark = this.isDarkTheme;
    if (this.primaryColour) {
      this.$vuetify.theme.themes.light.primary = this.primaryColour;
      this.$vuetify.theme.themes.dark.primary = this.primaryColour;
    }
  }
}
</script>

<style lang="scss">
html {
  overflow-y: auto;
}
</style>
