<template>
  <view-base>
    <users :lang="lang" />
  </view-base>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import ViewBase from "@/components/bases/ViewBase.vue";
import Users from "@/components/pages/users/Users.vue";

@Component({
  components: {
    ViewBase,
    Users,
  },
})
export default class UsersView extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  lang!: string;
}
</script>
