<template>
  <div class="main-body">    
        <div  class="container-main">
          <div class="container-filter">
        
        <form  class="col-md-11 col-sm-12  p-5 rounded shadow mx-auto form-img-upload" v-on:submit.prevent="uploadImage"  method=POST enctype=multipart/form-data >
          <div>
            <input  class="form-control" type="file" name="image" id=""  @change="selectImage" >
          </div>
          <br>
          <div>
            <button class="btn btn-register-user btn-rounded w-100  " type="submit">upload profile image</button>
          </div>     
        </form>

        <!-- choices and filters  -->
        <form  class="col-md-11 col-sm-12 p-3 mx-auto rounded shadow " v-on:submit.prevent="submitForm"  method="POST">
          <h3>Occasion</h3> 
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="halloween" id="halloween"  v-model="occasion">
            <label class="form-check-label" for="halloween">
              Halloween 
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="easter" id="easter" v-model="occasion" >
            <label class="form-check-label" for="easter">
              Easter 
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="prom night" id="promnight" v-model="occasion" >
            <label class="form-check-label" for="promnight">
              Prom Night
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="tomatina" id="tomatina"  v-model="occasion">
            <label class="form-check-label" for="tomatina">
              Tomatina
            </label>
          </div> 
          <br>
          <h3>Add Filters</h3> 
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="halloween" id="fil-halloween"  v-model="filter">
            <label class="form-check-label" for="fil-halloween">
              Halloween 
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="easter" id="fil-easter"  v-model="filter">
            <label class="form-check-label" for="fil-easter">
              Easter 
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="prom night" id="fil-promnight"  v-model="filter">
            <label class="form-check-label" for="fil-promnight">
              Prom Night
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="tomatina" id="fil-tomatina"  v-model="filter">
            <label class="form-check-label" for="fil-tomatina">
              Tomatina
            </label>
          </div>
          <br>
          <div>
            <button class="btn btn-register-user btn-rounded " type="submit">Find Match</button>
          </div> 
        </form>

      </div>

      <div class="container-card">
        <div class="container-sm">
          
      <section class="mx-auto my-5 shadow" style="max-width: 22rem">
        
        <div class="card p-1 ">
          <Transition>
            <div class="match-overlay" v-if="isMatchFound">Connection Matched</div>
          </Transition>
          <div class="bg-image " >
            <img :src="`data:${this.contentType};base64,${this.buffarr}`" style="height : 27rem ; width : 21.4re ;" v-if="userimg">
            <img src="../assets/loading-gif.gif" alt="loading...."  v-show="imgload">
            <a href="#!">
              
            <img src="../assets/unknown_person.jpg"  alt="" v-show="unknownpersonimgload">
            <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>
            </a>
          </div>
          
          <div class="card-body">
            <h5 class="card-title font-weight-bold"><strong>{{username}}</strong></h5>
            <hr class="my-1" />
            <p style="height: 3rem ;">Occasions : {{userOccasion.toString().split(",").join(", ")}} </p>
            <div class="p-2">
                <button type="button" class="btn  btn-floating mx-3 btn-md btn-nav " @click.prevent="getPrevUser" >&#8656;</button>
                <button type="button" class="btn btn-heart btn-floating mx-5 btn-md" @click.prevent="setConnection">&#x2764;</button> 
                <button type="button" class="btn  btn-floating mx-3 btn-md btn-nav" @click.prevent="getNextUser" >&#8658;</button>
            </div>
          </div>
        </div>        
      </section>      
    </div>
      </div>
        </div>
  </div>
</template>
<script>
import Axios from "axios";
export default {
  name: "filterPage",
  data() {
    return {
      images: "",
      imgData: "",
      occasion: [],
      filter: [],
      buffarr: "",
      contentType: "",
      count: 0,
      userDataArr: [],
      username : "unknown", 
      userOccasion : ["unknown"],
      imgload : false,
      userimg : false,
      unknownpersonimgload : true , 
      titleclearAllDetails : "remove occasion and filter options permanently", 
      isMatchFound  : false 
    };
  },
  methods: {
    getNextUser() {
      if(this.isMatchFound){
        this.isMatchFound = false;
      }
      this.count++;
      if(this.count >= this.userDataArr.length) this.count = this.userDataArr.length - 1;  
      this.bufftoarr();
      this.username = this.userDataArr[this.count].fullname ;
      this.userOccasion = (this.userDataArr[this.count].occasion) ;
    },

    getPrevUser() {
      if(this.isMatchFound){
        this.isMatchFound = false;
      }
      this.count--;
      if(this.count < 0) this.count = 0;
      this.bufftoarr();
      this.username = this.userDataArr[this.count].fullname ;
      this.userOccasion = this.userDataArr[this.count].occasion ;
    },

    selectImage(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.images = file;
      }
    },

    uploadImage() {
      const fd = new FormData();
      fd.append("file", this.images);
      fd.append("userid", this.$store.state.userID);
      Axios.post("https://holidate.onrender.com/api/file", fd).then(
        (res) => {
          console.log(`image uploaded successfully, ${res}`);
        },
        (err) => {
          console.log(err);
        }
      );
    },

    getImage() {
      this.unknownpersonimgload = false ;
      this.imgload = true ;  
      this.userimg = false;
      const filterObj = {
        filter: this.filter,
        userid: this.$store.state.userID

      };
      console.log(filterObj);
      Axios.put("https://holidate.onrender.com/api/file", filterObj).then(
        (res) => {
          this.imgload = false;
          this.userimg = true ;
          this.userDataArr = res.data.userdata;
          this.count = 0 ;
          this.bufftoarr();
          this.username = this.userDataArr[this.count].fullname ;
          this.userOccasion = (this.userDataArr[this.count].occasion) ;
        },

        (err) => {
          console.log(err);
        }
      );
    },

    submitForm() {

      this.getImage();

      const formObj = {
        occasion: this.occasion,
        filter: this.filter,
        userid: this.$store.state.userID,
      };

      Axios.post("https://holidate.onrender.com/api/occasion", formObj).then(
        (res) => {
          console.log("this is response", res);
        },
        (err) => {
          console.log(err);
        }
      );
    },

    bufftoarr() {
      if(typeof(this.userDataArr[this.count].image) == "undefined"){
        this.unknownpersonimgload = true ;
        this.imgload = false ;  
        this.userimg = false;
        return ;
      }
      this.unknownpersonimgload = false ;    
      this.userimg = true;

      this.contentType = this.userDataArr[this.count].image.contentType;
      this.buffarr = this.userDataArr[this.count].image.data.data;
      let arrayBufferToBase64 = () => {
        var binary = "";
        var bytes = new Uint8Array(this.buffarr);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      };
      this.buffarr = arrayBufferToBase64();
    },

    setConnection(){
      let isConnectionUserAvailable = false ;

      for(let i = 0 ; i < this.$store.state.connectionArr.length ; i++){
        if(this.$store.state.connectionArr[i] == this.userDataArr[this.count]._id){
          isConnectionUserAvailable = true;
          return ;
        }
      }

      if(!isConnectionUserAvailable){
        this.$store.state.connectionArr.push(this.userDataArr[this.count]._id) ;   
      }
      

      const connectionObj = {
        userid  : this.$store.state.userID ,   
        connectUserID  : this.userDataArr[this.count]._id , 
        userconnections : this.$store.state.connectionArr
      }

      Axios.put("https://holidate.onrender.com/api/connection", connectionObj).then(
        (res) =>{
          if(res.data.isMatch){
            this.isMatchFound = true;
            setTimeout(() => {
              this.isMatchFound = false;
            }, 1200);
          }
        }, 
        (err) =>{
          console.log(err);
        }
      )
    }
  },
};
</script>

<style scoped >
.container-main {
  display: flex;
  justify-content: space-evenly;
}
.p-1{
  height: 38.8rem;
  width: 21.9rem;
}
.btn-register-user{
  width: 100%;
}
.match-overlay{
  background-image: linear-gradient(rgba(128, 255, 114, 0.7), rgba(126, 232, 250, 0.7));
  color: white;
  width: 98%;
  height: 70%;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 10;
  line-height: 30rem;
  font-size: 1.5rem;
  font-weight: bolder;
}

@media screen and (max-width : 788px) {

  .container-main {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  
  }

  .container-filter{
    max-width: 22rem;
    margin: auto;
  }
}
.cpntainer-filter, .container-card{
  margin-top: 2rem;
}
.card , form{
  background-color: white;
}

.btn-nav {
    background-image: linear-gradient(166deg, rgb(242, 40, 118) 0%, rgb(148, 45, 217) 100%);
    color: white;  
}
button{
  background-image: linear-gradient(166deg, rgb(242, 40, 118) 0%, rgb(148, 45, 217) 100%);
  color: white; 
}
img {
  width: 100%;
  height: 27rem;
}
.btn-heart{
  color: white;
}
.btn:hover:not(.btn-nav, .btn-heart){
  border: 1px solid grey;
}
.btn-heart:hover{
  color: white;
  background-color: red;
}

.form-img-upload{
  margin-top: 5rem;
  margin-bottom: 1rem;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>

