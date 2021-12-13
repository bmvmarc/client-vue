<template>

    <div>

        <div v-show="!$store.state.isAuth">
            <my-button 
                    :class="{ 'active' : authChoise=='login'}" 
                    @click="authChoise='login'; isRegError = false">
                        Log in</my-button>

            <my-button 
                    :class="{ 'active' : authChoise=='registration'}" 
                    @click="authChoise='registration'; isLoginError = false">
                        Register</my-button>
        </div>

        <div class="wrapper">
            <div class="field" 
                v-if="authChoise == 'login' && !$store.state.isAuth">
                
                <h3>EMAIL ADDRESS</h3>
                <my-input 
                    v-focus
                    v-model="email"></my-input>
                 

                <h3>PASSWORD</h3>
                <my-input 
                    v-model="password"></my-input>

                <div v-show="wrongData">
                    <h3 class="warning center"> Please fill in all fields </h3>
                </div>

                <my-button
                    v-show="!isLoading"
                    @click="tryToLogIn">
                        SIGN IN</my-button>

                <div v-show="isLoginError" class='error-text'>
                    <h3>Sorry, we have been unable to sign you in.</h3>
                    <h4>Please check your sign in details are correct and try again.</h4>
                </div>
            </div>

            <div class="field" v-if="authChoise == 'registration' && !$store.state.isAuth">
                
                <h3>EMAIL ADDRESS</h3>
                <my-input 
                    v-focus
                    v-model="emailReg"></my-input>

                <h3>YOUR NAME</h3>
                <my-input 
                    v-model="userNameReg"></my-input>                      

                <h3>PASSWORD</h3>
                <my-input 
                    v-model="passwordReg"></my-input>

                <div v-show="wrongDataReg">
                    <h3 class="warning center"> Please fill in all fields </h3>
                </div>

                <my-button
                    v-show="!isLoading"
                    @click="tryToRegister">
                        REGISTER</my-button>

                <div v-show="isRegError" class='error-text'>
                    <h3>Sorry, we have been unable to register you.</h3>
                    <h4>Please check your details are correct and try again.</h4>
                </div>

                <div v-show="regMessage">
                    <h3> {{regMessage}} </h3>
                </div>

            </div>            

            <div class="field" v-if="$store.state.isAuth">
                
                <h3 class="center"> You logged in as {{$store.state.userName.toUpperCase()}} </h3>
                 <my-button
                    
                    @click="$store.dispatch('logOut')">
                        Log out</my-button>
            </div>

        </div>     

    </div>

</template>

<script>
import store from '../store';
import useTryToLogin from '../hooks/auth/useTryToLogin.js';
import useTryToRegister from '../hooks/auth/useTryToRegister.js';

export default {

    data() {
        return {
            authChoise: 'login'           
        }
    },

    setup(props) {
        const { email, password, wrongData, tryToLogIn, isLoading, isLoginError} = useTryToLogin();
    
        const { emailReg, passwordReg, userNameReg, wrongDataReg, 
                tryToRegister, isRegError, regMessage} = useTryToRegister(isLoading);

        return {email, password, wrongData, tryToLogIn, isLoading, isLoginError,
                emailReg, passwordReg, userNameReg,  wrongDataReg, tryToRegister, 
                isRegError, regMessage}  
    }
      
}    

</script>

<style scoped>
    .wrapper {
       display: flex;
       justify-content: space-around;
       margin: 50px 0;
    }

    .field {
        width: 40%;
        min-width: 255px;
    }

    h3 {
        margin-top: 20px;
    }
    
    button {
        margin: 31px auto;
        display: block;
        width: 100px;
    }

    .error-text {
        border: 2px solid red;
        border-radius: 5px;
    }
    .error-text h3, h4 {
        margin: 15px;
    }
    .warning {
        color: red;

    }
    .center {
        text-align: center;        
    }

    .active {
        background-color: lightblue;
    }

</style>