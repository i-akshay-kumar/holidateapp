<template>
  <div class="body-container ">
    <div class="bg-color">
      <section class="container pt-5 pb-5 ">
        <div class="row justify-content-md-center">
          <form class="col-md-6 col-sm-12 bg-white p-5 rounded shadow reg-form" v-on:submit.prevent="submit" method="post" >
            <div class="col-12 text-center">
              <h3 class="text-register-now"><strong>Register</strong></h3>
            </div>
            <div class="mb-3">
              <label for="fullname" class="form-label">Full Name</label>
              <input
                type="text"
                :class="{ 'is-invalid': validationStatus($v.fullname) }"
                class="form-control"
                id="fullname"
                v-model.trim="$v.fullname.$model"
              />
              <div v-if="!$v.fullname.required" class="invalid-feedback">
                The full name field is required.
              </div>
            </div>
            <div class="mb-3">
              <label for="mobilenumber" class="form-label">Mobile Number</label>
              <input
                type="text"
                :class="{ 'is-invalid': validationStatus($v.mobilenumber) }"
                class="form-control"
                id="mobilenumber"
                v-model.trim="$v.mobilenumber.$model"
              />
              <div v-if="!$v.mobilenumber.required" class="invalid-feedback">
                The mobile number field is required.
              </div>
              <div v-if="!$v.mobilenumber.numeric" class="invalid-feedback">
                Invalid Mobile number
              </div>
              <div
                v-if="!$v.mobilenumber.minLength && $v.mobilenumber.numeric"
                class="invalid-feedback"
              >
                Mobile number must not have less than 10 digits.
              </div>
              <div
                v-if="!$v.mobilenumber.maxLength && $v.mobilenumber.numeric"
                class="invalid-feedback"
              >
                Mobile number must not have more than 10 digits.
              </div>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input
                type="email"
                :class="{ 'is-invalid': validationStatus($v.email) }"
                class="form-control"
                id="email"
                v-model.trim="$v.email.$model"
              />
              <div v-if="!$v.email.required" class="invalid-feedback">
                The email field is required.
              </div>
              <div v-if="!$v.email.email" class="invalid-feedback">
                Invalid email
              </div>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                :class="{ 'is-invalid': validationStatus($v.password) }"
                class="form-control"
                id="password"
                v-model.trim="$v.password.$model"
              />
              <div v-if="!$v.password.required" class="invalid-feedback">
                The password field is required
              </div>
              <div v-if="!$v.password.minLength" class="invalid-feedback">
                You must have atleast
                {{ $v.password.$params.minLength.min }} characters.
              </div>
              <div v-if="!$v.password.maxLength" class="invalid-feedback">
                Password must not exceed
                {{ $v.password.$params.maxLength.max }} characters.
              </div>
              <div v-if="!$v.password.containsUppercase" class="invalid-feedback">
                Password should have atleast 1 uppercase letter.
              </div>
              <div v-if="!$v.password.containsLowercase" class="invalid-feedback">
                Password should have atleast 1 lowercase letter.
              </div>
              <div v-if="!$v.password.containsNumber" class="invalid-feedback">
                Password should have atleast 1 number.
              </div>
              <div v-if="!$v.password.containsSpecial" class="invalid-feedback">
                Password should have atleast 1 special character.
              </div>
            </div>
            <div class="mb-3">
              <label for="confirm_password" class="form-label"
                >Confirm Password</label
              >
              <input
                type="password"
                :class="{ 'is-invalid': validationStatus($v.confirmPassword) }"
                class="form-control"
                id="confirm_password"
                v-model.trim="$v.confirmPassword.$model"
              />
              <div
                v-if="!$v.confirmPassword.sameAsPassword"
                class="invalid-feedback"
              >
                Passwords must be same.
              </div>
            </div>
            <div class="text-center mt-3">
              <button
                type="submit"
                class="btn btn-register-user btn-rounded w-75"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  numeric,
} from "vuelidate/lib/validators";
export default {
  name: "UserHandle",

  data() {
    return {
      fullname: "",
      mobilenumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      error : ""
    };
  },

  validations: {
    fullname: {
      required,
    },
    mobilenumber: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(10),
      numeric,
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(18),
      containsUppercase: function(value) {
        return /[A-Z]/.test(value);
      },
      containsLowercase: function(value) {
        return /[a-z]/.test(value);
      },
      containsNumber: function(value) {
        return /[0-9]/.test(value);
      },
      containsSpecial: function(value) {
        return /[()#?!@$%^&*-+<>]/.test(value);
      }
    },
    confirmPassword: {
      sameAsPassword: sameAs("password"),
    },
  },

  methods: {
    resetData() {
      (this.fullname = ""),
        (this.mobilenumber = ""),
        (this.email = ""),
        (this.password = ""),
        (this.confirmPassword = "");
    },

    validationStatus(validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    async submit() {
      this.$v.$touch();

      if (this.$v.$pending || this.$v.$error) {
        return; 
      }

      const user = {
        fullname: this.fullname,
        mobilenumber: this.mobilenumber,
        email: this.email,
        password: this.password,
      };

      await Axios.post("http://localhost:3000/api/register", user).then(
        (res) => {
          if(res.data.isUserRegistered){
            this.$router.push("/login");
          }
          this.$store.state.isUserAvailable = ""
        },
        (err) => {
          console.log(err);
          this.$router.push("/login");
          this.$store.state.isUserAvailable = err.response.data.error;
        }
      );
       
      this.$v.$reset;
      this.resetData();
      console.log("data submitted");
    },
  },
};
</script>

<style scoped>
.body-container {
  width: 100vw;
  background-image: url("../assets/banner2.jpg");
}
.btn-rounded {
  border-radius: 30px;
}
.btn-register-user {
  background-image: linear-gradient(166deg, rgb(242, 40, 118) 0%, rgb(148, 45, 217) 100%);
  color: white;
}
.text-register-now {
  color: black ;
}
.alert-message-container{
 position: absolute;
 top: 30%;
 left: 5%;
}
.alert-message{
    background-color: red;
    color: white;
}

.reg-form{
  margin-top: 2rem;
}

@media screen and (min-width:  516px ) and (max-width : 1000px) {
            .reg-form{
                width: 30rem;
                margin: 2rem auto;
            }
 
        }

  @media screen and (max-width : 516px) {
      .reg-form{
          width: 22rem;
          margin: 2rem auto;
      }
  }

</style>