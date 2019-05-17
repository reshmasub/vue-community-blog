<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card my-5">
          <div class="card-body">
            <picture-input
              accept="image/jpeg, image/png"
              size="5"
              button-class="btn btn-danger"
              @change="onChange"
            ></picture-input>
            <select class="form-control my-3" v-model="category">
              <option selected>Select a Category</option>
              <option
                :value="category.id"
                :key="category.id"
                v-for="category in categories"
              >{{category.name}}</option>
            </select>
            <input type="text" placeholder="Title" v-model="title" class="my-3 form-control">
            <wysiwyg v-model="content"/>
            <div class="text-center">
              <button :disabled="loading" @click="createArticle()" class="btn-success btn btn-lg mt-3">
                 <i class="fas fa-spin fa-spinner" v-if="loading"></i>
                {{loading ? '' : 'Create Article'}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PictureInput from "vue-picture-input";
import Axios from "axios";
import config from "@/config";
export default {
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem("auth")) {
      return next({ path: "/login" });
    }
    next();
  },
  components: { PictureInput },
  mounted() {
    this.getCategories();
  },
  data() {
    return {
      title: "",
      content: "",
      image: null,
      categories: [],
      category: "",
      loading : false
    };
  },
  methods: {
    onChange(image) {
      this.image = image;
    },
    createArticle() {
      this.loading = true;
      const form = new FormData();
      form.append("file", this.image);
      form.append("upload_preset", "personal");
      form.append("api_key", "292878266114215");

      Axios.post("https://api.cloudinary.com/v1_1/dj0qewcgr/image/upload", form)
        .then(res =>
          Axios.post(
            `${config.apiUrl}/articles`,
            {
              title: this.title,
              content: this.content,
              category_id: this.category,
              imageUrl: res.data.secure_url
            },
            {
              headers: {
                Authorization: `Bearer ${this.$root.auth.token}`
              }
            }
          )
            .then(() => {
              this.loading = false;
              this.$noty.success("Article created successfully");
              this.$router.push("/");
            })
            .catch(() => {
              this.loading = false;
              this.$noty.error("Opss! Something went wrong.");
            })
        )
        .catch(() => {
          this.loading = false;
          this.$noty.error("Opss! Something went wrong.");
        });
    },
    getCategories() {
      const categories = localStorage.getItem("categories");
      if (categories) {
        this.categories = JSON.parse(categories);
        return;
      }
      Axios.get(`${config.apiUrl}/categories`).then(res => {
        this.categories = res.data.categories;
        localStorage.setItem("categories", JSON.stringify(this.categories));
      });
    }
  }
};
</script>

<style>
</style>
