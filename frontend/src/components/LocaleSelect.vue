<template>
  <v-select
    style="max-width: 120px"
    title="Linguagem"    
    v-model="locale"
    :items="locales"
    @change="changedLocale"
  />
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    locale: "",
    locales: [],
  }),
  methods: {
    ...mapActions("consts", ["setLocale"]),
    changedLocale() {
      this.setLocale(this.locale);
    },
  },
  created() {
    this.locale = navigator.language;
    this.locales = navigator.languages;
  },
};
</script>

<style>
</style>