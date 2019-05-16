<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
       <router-link to="/" class="navbar-brand" >
          <img src="../assets/logo.jpg" width="30px" height="30px" alt>
       </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
              <li class="nav-item" v-if="!authUser">
                  <router-link to="/login" class="nav-link"> 
                      Login
                  </router-link>
              </li>
               <li class="nav-item" v-if="!authUser">
                  <router-link to="/signup" class="nav-link"> 
                      Signup
                  </router-link>
              </li>
           <li class="nav-item dropdown" v-if="authUser">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Hey {{authUser.name}}!</a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" @click="logout()" href="#">Logout</a>
              </div>
            </li> 
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  mounted(){
    console.log(this.$root);
  },
  computed : {
    authUser(){
      return this.$root.auth.user;
    }

  },
  methods : {
    logout(){
      localStorage.removeItem("auth");
      this.$root.auth = {};
      this.$noty.success("Successfully Logged out.")
    }
  }
}
</script>

<style>
</style>
