<template>
  <view-base>
    <user :lang="lang" :id="+id" />
  </view-base>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import ViewBase from "@/components/bases/ViewBase.vue";
import User from "@/components/pages/user/User.vue";

@Component({
  components: {
    ViewBase,
    User,
  },
})
export default class UsersIdView extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  lang!: string;

  @Prop({ type: String, required: true })
  id!: string;
}
</script>
