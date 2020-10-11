export const actions = {
  async getIncidents() {
    let res = await this.$axios.get('/incidents')
    return res;
  },
  setUser(){
    return 'setUser'
  }
}