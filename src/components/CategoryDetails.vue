<template>
  <div>
    <h2>{{ category.name }}</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="{ name: 'post-details', params: { id: post.id } }">
          {{ post.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const route = useRoute();
    const id = ref(route.params.id);

    watch(route.params, (newParams) => {
      id.value = newParams.id;
    });

    return {
      id,
    };
  },
  data() {
    return {
      category: {},
      posts: [],
    };
  },
  async created() {
    try {
      const categoryId = this.id;
      const categoryResponse = await this.$http.get(`/categories/${categoryId}`);
      this.category = categoryResponse.data;

      const postsResponse = await this.$http.get(`/categories/${categoryId}/posts`);
      this.posts = postsResponse.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
