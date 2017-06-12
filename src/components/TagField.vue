<template>
    <div>
      <multiselect
        v-model="selectedTags"
        :multiple="true"
        :hide-selected="true"
        :options="tagList"
        :taggable="true"
        @tag="addTag"
        tag-placeholder="add new tag">
      </multiselect>
    </div>
</template>

<script>
  /* eslint-disable */
  import Multiselect from 'vue-multiselect';
  export default {
    data () {
      return {
        selectedTags: [],
      }
    },
    methods: {
      addTag: function(newTag) {
        this.selectedTags.push(newTag);
        this.$store.dispatch('a_addNewTag', newTag);
      },
    },
    computed: {
      tagList() {
        return this.$store.getters.g_getTags;
      },
    },
    watch: {
      selectedTags() {
        this.$emit('add-tags', this.selectedTags);
      },
    },
    components: {
      Multiselect,
    },
  };
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped lang="postcss">

</style>
