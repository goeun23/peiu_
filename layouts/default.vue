<template>
	<div>
		<nuxt/>
	</div>
</template>


<script>
import { mapGetters,  mapActions} from 'vuex'

export default {
	layout: 'default',
	components: {
		
	},
	head: {
		link: [],
		script: [
		]
	},
	fetch() {
		return {

		}
	},
	data() {
		return {
			
		}
	},
	methods: {
		...mapActions(['axios/getIncidents']),
		
		async getIncidents() {
      
      let res = await this.$store.dispatch("getIncidents");
      this.incidents = res.data.data.incidents;
      console.log(res)
    }
	},
	mounted() {
		
    this.getIncidents()
	},
}
</script> 
