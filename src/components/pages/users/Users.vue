<template>
  <v-card>
    <!-- TOOLBAR -->
    <v-toolbar flat color="primary">
      <v-toolbar-title class="headline primary white--text">Users of {{ lang }}wiki</v-toolbar-title>
    </v-toolbar>

    <!-- TABLE -->
    <v-data-table :headers="headers" :items="handedUsers" :loading="loading" :search="search" item-key="id">
      <template v-slot:top>
        <v-toolbar flat>
          <v-container class="pa-0 fill-height fluid d-flex" fluid>
            <slot name="header">
              <v-text-field class="flex" v-model="search" label="Search" dense solo outlined clearable hide-details prepend-inner-icon="mdi-magnify" />
            </slot>
          </v-container>
        </v-toolbar>
      </template>

      <template v-slot:item.id="{ value }">
        <router-link :to="{ name: 'user', params: { lang: lang, id: value } }" style="color: black; text-decoration: none">{{ value }}</router-link>
      </template>

      <template v-slot:item.sex="{ value }">
        <v-icon color="primary" v-if="value === true">mdi-human-male</v-icon>
        <v-icon color="error" v-else-if="value === false">mdi-human-female</v-icon>
        <v-icon v-else>mdi-help-circle</v-icon>
      </template>

      <template v-slot:item.is_bot="{ value }">
        <v-icon color="success" v-if="value">mdi-check</v-icon>
        <v-icon color="error" v-else>mdi-close</v-icon>
      </template>

      <template v-slot:item.groups="{ value }">
        <v-icon class="mx-2" title="sysop" v-if="value.includes('sysop')">mdi-account-key</v-icon>
        <v-icon class="mx-2" title="autopatrolled" v-if="value.includes('autopatrolled')">mdi-key</v-icon>
        <v-icon class="mx-2" title="rollbacker" v-if="value.includes('rollbacker')">mdi-backup-restore</v-icon>
        <v-icon class="mx-2" title="bureaucrat" v-if="value.includes('bureaucrat')">mdi-file-document</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { DataTableHeader } from "vuetify";

import { getUsers, PartialUser } from "@/utils/api";

@Component
export default class Users extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  lang!: string;

  /* DATA */

  private users: PartialUser[] = [];
  private loading = false;
  private search = "";

  private headers: DataTableHeader[] = [
    {
      text: "ID",
      value: "id",
    },
    {
      text: "Username",
      value: "username",
    },
    {
      text: "Sex",
      value: "sex",
    },
    {
      text: "Is bot",
      value: "is_bot",
    },
    {
      text: "Groups",
      value: "groups",
    },
    // {
    //   text: "Creation date",
    //   value: "registration_timestamp",
    // },
  ];

  /* GETTERS */

  get handedUsers() {
    return this.users.map((u) => ({
      id: u.id,
      username: u.username,
      sex: u.sex,
      is_bot: u.is_bot,
      groups: u.groups.current,
      registration_timestamp: u.registration_timestamp
        ? new Date(u.registration_timestamp).toLocaleDateString()
        : u.creation_timestamp
        ? new Date(u.creation_timestamp).toLocaleDateString()
        : "NOT AVAILABLE",
    }));
  }

  /* LIFE CYCLE */

  async mounted() {
    try {
      this.loading = true;
      this.users = await getUsers(this.lang);
    } finally {
      this.loading = false;
    }
  }
}
</script>
