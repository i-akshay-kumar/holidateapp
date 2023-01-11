<template>
  <div >  
    <div class="container-main">
      
      <center>
        <button class="btn btn-b  btn-search " type="submit" @click.prevent="loadMatch">Reload connections</button>
      </center>
        <img src="../assets/dash-load.gif" class="img-loading"  alt="loading..." v-show="loadgif">
    <ul>
        <li v-for="(match, index) in usermatcharr" :key = "index" >
            <div class="container mb-4" >
                <div class="row d-flex justify-content-center align-items-center ">
                  <div class="col col-md-9 col-lg-7 col-xl-5">
                    <div class="card shadow" style="border-radius: 15px;">
                      <div class="card-body p-3">
                        <div class="d-flex text-black">
                          <div class="flex-shrink-0" v-if="match.image == undefined">
                            <img src="../assets/unknown_person.jpg" alt="image load failed" class="img-fluid img-user" >
                          </div>
                          <div class="flex-shrink-0" v-else>
                            <img :src="`data:${match.image.contentType};base64,${match.buffarr}`" alt="image load failed" class="img-fluid img-user" >
                          </div>
                          <div class="flex-grow-1 ms-3">
                            <h5 class="mb-1 fullname">&nbsp;<strong>{{match.fullname}}</strong></h5>
                            <div class="d-flex justify-content-start rounded-3 p-2 mb-2" style="background-color: #efefef;">
                              <div class="container-occasion">
                                <p class="small text-muted mb-1"><strong>Occasions</strong></p>
                                <p class="mb-0">{{match.occasion.toString().split(",").join(", ")}}</p>
                              </div>
                            </div>
                            
                            <div class="contact-details">
                            <p class="mb-0 " > &nbsp;&nbsp;<strong>Mail</strong> : {{match.email}}</p>
                            <p class="mb-0 mt-1 p-2 rounded-3" style="background-color: #efefef;"><strong>Call</strong> : {{match.mobilenumber}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </li>
    </ul>
    </div>
  </div>
</template>

<script>
import Axios from 'axios' ;
export default {
  
    name : "connectionPage",
    data() {
        return {
            usermatcharr : [],
            loadgif : false
        }
    },

    mounted(){
      this.loadMatch();
    },

    methods : {

        loadMatch(){
          this.loadgif = true ;
          const userObj = {
            userid : this.$store.state.userID
          }

          Axios.put("http://localhost:3000/api/match", userObj).then( 
            (res)=>{
              this.loadgif = false
              this.usermatcharr = res.data.usermatch ;

              for(let i = 0  ; i < this.usermatcharr.length ; i++){
                
                if(this.usermatcharr[i].image == undefined){
                  break;
                }
                
                this.usermatcharr[i].buffarr = this.usermatcharr[i].image.data.data ;
                let binary = "";
                let bytes = new Uint8Array(this.usermatcharr[i].buffarr);
                let len = bytes.byteLength;
                for (let j = 0; j < len; j++) {
                  binary += String.fromCharCode(bytes[j]);
                }
                this.usermatcharr[i].buffarr = window.btoa(binary);
              }
            }, 
            (err)=>{
              console.log(err);
            }
          )
        }
    }
}
</script>

<style scoped>
    .container-main{
      width: 100vw;
      height: 100vh;
      background-image: url("../assets/banner.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      overflow-y: scroll;
    }

    .btn-search{
      margin-top: 4.5rem ;
      margin-bottom: 1rem;
      background-image: linear-gradient(166deg, rgb(242, 40, 118) 0%, rgb(148, 45, 217) 100%);
      color: white; 
    }
    .btn-call {
        background-image: linear-gradient(166deg, rgb(242, 40, 118) 0%, rgb(148, 45, 217) 100%);
        color: white;  
    }
    ul{
      display: block;
    }
    ul li {
      list-style: none;
    }
    .img-user{
        width: 9rem;
        height: 11rem;
        border-radius: 1.2rem;
      }

    .btn-contact{
      height: 2.4rem;
    }

    .img-loading{
      width: 15rem;
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      text-align: center;
      z-index : 6 ;
    }
    
    @media screen and (max-width: 470px ) {
      .card{
        width: 22rem;
        height: 11rem;
      }

      .img-user{
        width: 7rem;
        height: 8.5rem;
      }

      .container-occasion p{
        font-size: 0.8rem;
      }

      .fullname{
        font-size: 0.9rem;
      }

      .btn-contact{
        height: 1.5rem;
        font-size: 0.8;
        
      }
      .contact-details{
        font-size: 0.6rem;
      }

      .btn-contact p{
        font-size: 0.8;
        margin-top: -0.3rem;
      }

      ul {
      display: table;
      margin: 0 auto;
      padding: 0;
    }

  }

</style>