import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        isUserAvailable : "", 
        username : "", 
        userID : "",
        connectionArr : [], 
        authenticated : false, 
        showNavitems : {
            greet : false , 
            signup : true ,
            login : true , 
            filter : false , 
            connection : false , 
            deleteAccount : false
        }
    }, 

    mutations:{   
        setAuthentication(state, status){
            state.authenticated = status;
        }
    }, 

    actions:{   

    }
})

