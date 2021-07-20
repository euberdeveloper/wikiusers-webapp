<template>
  <v-card>
    <!-- TOOLBAR -->
    <v-toolbar flat color="primary">
      <v-toolbar-title class="headline primary white--text">User {{ id }}</v-toolbar-title>
    </v-toolbar>

    <v-expansion-panels v-if="user" v-model="detailsExpanded" class="mt-4">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <span class="text-h6">General details</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- GENERAL INFO -->
          <v-container class="my-8" v-if="user">
            <v-row>
              <v-col :cols="4">
                <v-text-field
                  type="text"
                  label="ID"
                  name="id"
                  dense
                  append-icon="mdi-content-copy"
                  @click:append="copyText(user.id)"
                  outlined
                  readonly
                  :value="user.id"
                />
              </v-col>
              <v-col :cols="4">
                <v-text-field
                  type="text"
                  label="Username"
                  name="username"
                  dense
                  append-icon="mdi-content-copy"
                  @click:append="copyText(user.username)"
                  outlined
                  readonly
                  :value="user.username"
                />
              </v-col>
              <v-col :cols="4">
                <v-text-field
                  type="text"
                  label="Sex"
                  name="sex"
                  dense
                  append-icon="mdi-content-copy"
                  @click:append="copyText(user.sex)"
                  outlined
                  readonly
                  :value="user.sex === true ? 'MALE' : user.sex === false ? 'FEMALE' : 'UNKNOWN'"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          <span class="text-h6">Groups</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="d-flex my-4">
            <h4>Current groups:</h4>
            <v-icon class="mx-2" title="sysop" v-if="user.groups.current.includes('sysop')">mdi-account-key</v-icon>
            <v-icon class="mx-2" title="autopatrolled" v-if="user.groups.current.includes('autopatrolled')">mdi-key</v-icon>
            <v-icon class="mx-2" title="rollbacker" v-if="user.groups.current.includes('rollbacker')">mdi-backup-restore</v-icon>
            <v-icon class="mx-2" title="bureaucrat" v-if="user.groups.current.includes('bureaucrat')">mdi-file-document</v-icon>
          </div>

          <div class="d-flex my-4">
            <h4>Ever had groups:</h4>
            <v-icon class="mx-2" title="sysop" v-if="user.groups.ever_had.includes('sysop')">mdi-account-key</v-icon>
            <v-icon class="mx-2" title="autopatrolled" v-if="user.groups.ever_had.includes('autopatrolled')">mdi-key</v-icon>
            <v-icon class="mx-2" title="rollbacker" v-if="user.groups.ever_had.includes('rollbacker')">mdi-backup-restore</v-icon>
            <v-icon class="mx-2" title="bureaucrat" v-if="user.groups.ever_had.includes('bureaucrat')">mdi-file-document</v-icon>
          </div>

          <v-data-table :headers="groupsHeaders" :items="groupsItems">
            <template v-slot:item.groups="{ value }">
              <v-icon class="mx-2" title="sysop" v-if="value.includes('sysop')">mdi-account-key</v-icon>
              <v-icon class="mx-2" title="autopatrolled" v-if="value.includes('autopatrolled')">mdi-key</v-icon>
              <v-icon class="mx-2" title="rollbacker" v-if="value.includes('rollbacker')">mdi-backup-restore</v-icon>
              <v-icon class="mx-2" title="bureaucrat" v-if="value.includes('bureaucrat')">mdi-file-document</v-icon>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          <span class="text-h6">Blocks</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="d-flex my-4">
            <h4>Current blocks:</h4>
            <v-icon class="mx-2" title="sysop" v-if="user.blocks.current.includes('sysop')">mdi-account-key</v-icon>
            <v-icon class="mx-2" title="autopatrolled" v-if="user.blocks.current.includes('autopatrolled')">mdi-key</v-icon>
            <v-icon class="mx-2" title="rollbacker" v-if="user.blocks.current.includes('rollbacker')">mdi-backup-restore</v-icon>
            <v-icon class="mx-2" title="bureaucrat" v-if="user.blocks.current.includes('bureaucrat')">mdi-file-document</v-icon>
          </div>

          <div class="d-flex my-4">
            <h4>Ever had blocks:</h4>
            <v-icon class="mx-2" title="sysop" v-if="user.blocks.ever_had.includes('sysop')">mdi-account-key</v-icon>
            <v-icon class="mx-2" title="autopatrolled" v-if="user.blocks.ever_had.includes('autopatrolled')">mdi-key</v-icon>
            <v-icon class="mx-2" title="rollbacker" v-if="user.blocks.ever_had.includes('rollbacker')">mdi-backup-restore</v-icon>
            <v-icon class="mx-2" title="bureaucrat" v-if="user.blocks.ever_had.includes('bureaucrat')">mdi-file-document</v-icon>
          </div>

          <v-data-table :headers="blocksHeaders" :items="blocksItems">
            <template v-slot:item.blocks="{ value }">
              <v-icon class="mx-2" title="sysop" v-if="value.includes('sysop')">mdi-account-key</v-icon>
              <v-icon class="mx-2" title="autopatrolled" v-if="value.includes('autopatrolled')">mdi-key</v-icon>
              <v-icon class="mx-2" title="rollbacker" v-if="value.includes('rollbacker')">mdi-backup-restore</v-icon>
              <v-icon class="mx-2" title="bureaucrat" v-if="value.includes('bureaucrat')">mdi-file-document</v-icon>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- ACTIVITY -->
    <div class="graph" ref="graph" />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";
import clipboardCopy from "clipboard-copy";
import * as Plotly from "plotly.js";

import { getUser } from "@/utils/api";

@Component
export default class Users extends Vue {
  /* REFS */

  @Ref("graph")
  graphElement!: HTMLDivElement;

  /* PROPS */

  @Prop({ type: String, required: true })
  lang!: string;

  @Prop({ type: Number, required: true })
  id!: number;

  /* DATA */

  private user: any = null;
  private detailsExpanded = 0;

  /* GETTERS */

  get groupsHeaders() {
    return [
      {
        text: "From",
        value: "from",
      },
      {
        text: "To",
        value: "to",
      },
      {
        text: "Groups",
        value: "groups",
      },
    ];
  }

  get groupsItems() {
    return this.user?.groups?.history
      ? this.user.groups.history.map((val) => ({
          from: val.from ? new Date(val.from).toLocaleDateString() : "ORIGIN",
          to: val.to ? new Date(val.to).toLocaleDateString() : "NOW",
          groups: val.groups,
        }))
      : [];
  }

  get blocksHeaders() {
    return [
      {
        text: "From",
        value: "from",
      },
      {
        text: "To",
        value: "to",
      },
      {
        text: "Blocks",
        value: "blocks",
      },
    ];
  }

  get blocksItems() {
    return this.user?.blocks?.history
      ? this.user.blocks.history.map((val) => ({
          from: val.from ? new Date(val.from).toLocaleDateString() : "ORIGIN",
          to: val.to ? new Date(val.to).toLocaleDateString() : "NOW",
          blocks: val.blocks,
        }))
      : [];
  }

  // get namespaces() {
  //   return this.user.activity.total.per_namespace
  // }

  /* WATCHERS */

  @Watch("user", { deep: true })
  watchUser() {
    this.renderActivity();
  }

  /* METHODS */

  copyText(text: string): void {
    clipboardCopy(text);
  }

  renderActivity(): void {
    if (this.graphElement && this.user) {
      const traces = {
        total: {
          x: [],
          y: [],
          mode: "lines",
          name: "Total",
        },
        edit: {
          x: [],
          y: [],
          mode: "lines",
          name: "Edits",
        },
        create: {
          x: [],
          y: [],
          mode: "lines",
          name: "Creates",
        },
        delete: {
          x: [],
          y: [],
          mode: "lines",
          name: "Deletions",
        },
        restore: {
          x: [],
          y: [],
          mode: "lines",
          name: "Restores",
        },
        move: {
          x: [],
          y: [],
          mode: "lines",
          name: "Moves",
        },
        merge: {
          x: [],
          y: [],
          mode: "lines",
          name: "Merges",
        },
        minor_edit: {
          x: [],
          y: [],
          mode: "lines",
          name: "Minor edits",
        },
      };

      for (const year of Object.keys(this.user.activity.per_month).sort()) {
        const yearObj = this.user.activity.per_month[year];

        for (const month of Object.keys(yearObj).sort()) {
          const monthObj = yearObj[month];
          const xValue = new Date(+year, +month - 1, 1);
          for (const key in monthObj.events.total) {
            const yValue = +monthObj.events.total[key];
            traces[key].x.push(xValue);
            traces[key].y.push(yValue);
          }
        }
      }

      Plotly.newPlot(this.graphElement, Object.keys(traces).map(key => traces[key]));
    }
  }

  /* LIFE CYCLE */

  async mounted() {
    this.user = await getUser(this.lang, this.id);
  }
}
</script>


<style lang="scss" scoped>
.graph {
  width: 100%;
  height: 400px;
}
</style>