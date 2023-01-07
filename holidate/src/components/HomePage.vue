<template>
  <div class="container-main">
    <nav class="navbar navbar-expand-lg navbar-default">
      
      <div class="container-fluid">
        <a href="#" class="navbar-brand">
          Holidate
        </a>
        <button
          type="button"
          class="navbar-toggler "
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span class="navbar-toggler-icon"><i class="fas fa-chevron-down"></i></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse" >
          <div class="navbar-nav ms-auto " >
            <p class="nav-item " style="margin-top: 0.5rem ; margin-right : 1rem ; " v-if="this.$store.state.showNavitems.greet">Hello, {{(this.$store.state.username).split(" ")[0]}} </p>

            <router-link to="/" class="nav-item nav-link " v-show="this.$store.state.showNavitems.signup">signup</router-link>

            <router-link to="/login" class="nav-item nav-link"  v-show="this.$store.state.showNavitems.login">login</router-link>

            <a href="#"  @click.prevent="logout" class="nav-item nav-link" v-show="this.$store.state.showNavitems.logout">logout</a>

            <router-link to="/filter" class="nav-item nav-link"  v-show="this.$store.state.showNavitems.filter">home</router-link>

            <router-link to="/connection" class="nav-item nav-link navbar-light" v-show="this.$store.state.showNavitems.connection">connection</router-link>

            <li class="nav-item dropdown" v-show="this.$store.state.showNavitems.deleteAccount" >
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                settings
              </a>
              <ul class="dropdown-menu dropdown-content">
                <li><a href="#"  @click.prevent="deleteUserAccount" class="dropdown-item " style="color : black ;" >Delete Account</a></li>
              </ul>
          </li>
          </div>   
        </div>
      </div>
    </nav>
    
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  name: "HomePage",
  data(){
    return {
      showLogout : "logout", 
      showDeleteAccount :  "Delete your account permanently"
    }  
  }, 

  methods : {
    resetNavItems(){

      let items = this.$store.state.showNavitems;
      items.greet = false;
      items.login = true;
      items.signup = true;
      items.logout = false;
      items.filter = false;
      items.connection = false; 
      items.deleteAccount = false ;
    },

    logout(){
      this.$store.commit("setAuthentication", false);
      this.$store.state.connectionArr = [];
      this.$router.push("/login");
      this.resetNavItems();
    }, 


    async deleteUserAccount(){
      const obj = {
        userid : this.$store.state.userID
      }
      
      console.log("match array reset request sent");

      await Axios.put("http://localhost:3000/api/resetmatch", obj).then((res)=>{
        console.log(res);
      }, 
      (err)=>{
        console.log(err);
      });

      console.log("delete request sent");
      Axios.delete(`http://localhost:3000/api/deleteuser/${obj.userid}`).then((res)=>{
        console.log(res);
      }, 
      
      (err)=>{
        console.log(err);
      })

      this.logout();
    }
  }

};
</script>

<style scoped>
    .navbar{
        font-weight: bold;
        position: fixed;
        z-index: 100;
        width: 100vw;
    }

    .navbar-default{
      background-color: #5C3ACC;
      color: white;
      border-bottom: 1px solid #8e77da;
    }

    a{
      color: white;
    }

    .dropdown-content{
      position: absolute;
      top: 3.1rem;
      left: -3.2rem;
    }

    @media screen and (max-width : 991px){
      .dropdown-content{
      position: absolute;
      top: 3.1rem;
      left: 0rem;
      }

      
    }
</style>