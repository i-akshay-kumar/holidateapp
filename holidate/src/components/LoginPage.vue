<template>
  <div class="body-container">
        <section class="container pt-5 pb-5">
        <div class="row justify-content-md-center">
            <form class="col-md-6 col-sm-12 bg-white p-5 rounded shadow reg-form"  v-on:submit.prevent="submit"  method="post" @change.prevent="errorInvalidDetails = '' ">
                <div class="col-12 text-center">
                    <h3 class="text-register-now"><strong>Login Page</strong></h3>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email"  :class="{ 'is-invalid' : validationStatus($v.email) }" class="form-control" id="email" v-model.trim="$v.email.$model" >
                    <div v-if="!$v.email.required" class="invalid-feedback">The email field is required.</div>
                    <div v-if="!$v.email.email" class="invalid-feedback">Invalid email</div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password"  :class="{ 'is-invalid' : validationStatus($v.password) }" class="form-control" id="password" v-model.trim="$v.password.$model" >
                    <div v-if="!$v.password.required" class="invalid-feedback">The password field is required</div>
                </div>
                <div class="text-center mt-3">
                    <button type="submit" class="btn btn-register-user btn-rounded w-75">Login</button>
                </div>
                <p class="text-center mt-1 text-danger">{{  errorInvalidDetails}}</p>
            </form>
            
        </div>
    </section>
  </div>
</template>

<script>
import  Axios  from 'axios';
import {required, email  } from 'vuelidate/lib/validators'
export default {
  name: "LoginPage",

  data(){
    return {
        email : "",
        password : "", 
        errorInvalidDetails : ""
    }
  }, 

    validations : {
        email : {
            required, email
        },
        password : {
            required
        }
    }, 

    methods : {

        resetData(){
            this.email = "", 
            this.password = ""
        },

        validationStatus(validation){
            return typeof validation != "undefined" ? validation.$error : false ;
        },

        resetNavItems(){
            let items = this.$store.state.showNavitems
                        items.greet = true;
                        items.login = false;
                        items.signup = false;
                        items.logout = true;
                        items.filter = true;
                        items.connection = true;
                        items.deleteAccount = true ;
        },

        async submit(){

            this.$v.$touch();

            if ( this.$v.$pending || this.$v.$error ){
                return ;    
            }

            const user = { 
                email : this.email,
                password  : this.password
            };
            await Axios.post("http://localhost:3000/api/login", user).then(
                (res) => {
                    console.log(res);
                    if(res.data.isAuthUser){
                        this.$store.commit("setAuthentication", true);
                        this.$router.push("/filter");
                        
                        this.$store.state.username = res.data.userData[1];
                        this.$store.state.userID = res.data.userData[0];

                        this.resetNavItems();
                    }

                },
                (err) => {
                console.log("errror is  :  ", err);
                if(err.response.data.isInvaidCredential){
                            this.errorInvalidDetails = err.response.data.error ; 
                        }
               }
            );

            this.$v.$reset;
            this.resetData();
        },
    }
};
</script>

<style scoped >
    .body-container{
        width: 100vw;
        height: 100vh;
        background-image: url("../assets/banner2.jpg");
      }
      
      .btn-rounded{
          border-radius: 30px;
      }
      .btn-register-user{
         background-image: linear-gradient(166deg, rgb(242, 40, 118) 0%, rgb(148, 45, 217) 100%);
         color: white;
      }
      .text-register-now{
        color: black;
      }

      .reg-form{
        margin-top: 2rem;
      }

      .user-template{
        position: absolute;
        top: 25rem;
        left: 20rem;
        z-index: 1;
        }

      @media screen and (min-width:  516px ) and (max-width : 1000px) {
            .reg-form{
                width: 30rem;
                margin: 2rem auto;
            }
 
        }

        @media screen and (max-width : 516px) {
            .reg-form{
                width: 21rem;
                margin: 2rem auto;
            }
 
        }
</style>