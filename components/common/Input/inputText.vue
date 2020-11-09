<template>
    <span class=" input_unit">
        <input 
            :type="type"  
            :value="value"
            :placeholder="placeholder" 
            autocomplete="off"
            @input="onInput"
        />
    </span>
</template>


<script>
export default{
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
    },
    props : {
        type : {
            type : String,
            default : 'text',
            required : false
        }, 
        placeholder : {
            type : String, 
            default : ''
        }
    }, 
    methods: {
        onInput(e){
            this.update(e.target.value)
        },
        update(value){
            console.log(value)
            this.value = value
        }, 
       
    }

}
</script>