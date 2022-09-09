<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div class="main" v-if="logged_in">
      <TheTopbar @togglenav="navOpen = !navOpen" />
      <TheSidebar :open="navOpen" />
      <router-view/>
  </div>
  <div v-else>
      <Login/>
    </div>
  </div>
</template>

<script>
import TheTopbar from './components/TopBar'
import TheSidebar from './components/SideBar'
import Login from './views/Login.vue'

export default {
  name: 'App',
  data: () => {
    return {
      navOpen: false
    }
  },
  components: {
    TheTopbar,
    TheSidebar,
    Login
  },
  computed:{
    logged_in() {
      return this.$store.state.user != null;
    }
  },
  mounted(){
    var user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.$store.state.user = user;
    } else {
      console.warn("il y'a pas de session");
    }
  },
  watch:{
    "$store.state.user":{
      deep: true,
      handler(new_user){
        localStorage.setItem('user', JSON.stringify(new_user));
      }
    }
  },
  methods:{
    loggout(){
      if (confirm("êtes vous sur de vouloir se deconnecter?")) {
        this.$store.state.user = null;
      }
    },
}
}
</script>

<style lang="scss">
  
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #app {
    width: 100%;
    min-height: 100vh;
    /*background: url('./assets/app_bg.jpg') center center;*/
    background-size: cover;
  }
</style>