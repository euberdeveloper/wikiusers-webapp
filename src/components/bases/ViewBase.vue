<template>
  <v-fade-transition hide-on-leave>
    <v-main :key="$route.fullPath">
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10">
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-fade-transition>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class ViewBase extends Vue {}
</script>
