<template>
    <label :for="id" :class="[checkboxType , alignClass ]">
        <input type="checkbox" :name="name" :id="id">
        <span class="cont"></span>
        <span class="txt">{{text}}</span>
    </label>
</template>




<script>
export default{
    props : {
        id : {
            type : String
        },
        name : {
            type : String
        },
        type : {
            type : String,
            default : 'text',
            required : false
        }, 
        placeholder : {
            type : String, 
            default : ''
        }, 
        text : {
            type : String
        }, 
        isRight : {
            type : Boolean
        }
    }, 
    data(){
        return {
            newValue: this.value,
        }
    },
    watch: {
        /**
        * When v-model is changed:
        *   1. Set internal value.
        */
        value(value) {
            this.newValue = value
        }
    },
    computed: {
        value: {
            get() {
                return this.newValue
            },
            set(value) {
                this.newValue = value
                this.$emit('input', value)
            }
        },
        checkboxType() {
            return 'checkbox_set2' 
        }, 
        alignClass(){
            return [ this.isRight ? 'flR' : 'flL' ]
        },
        

    },

    methods: {
        onInput(e){
            this.update(e.target.value)
        },
        update(value){
            console.log(value)
            this.value = value
        }, 
       
    }, 
    mounted(){
        console.log('is-right' ? 'flR' : false)
    }

}
</script>