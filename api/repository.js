// Provide nuxt-axios instance to use same configuration across the whole project
// I've used typical CRUD method names and actions here
export default $axios => resource => ({
  index() {
    return $axios.$get(`${resource}`)
  },

  async Login(params){
    // 로그인 요청
    var result = await $axios.$get(`${resource}`)
    result = { status : 200, message : '성공' }
    return result;
  },

  async getOwnerSiteNum(type){
    // 소유한 사이트 번호 
    const result = await type;
    return result;
  },

  async getOwnerFaciility(type){
    // 소유한 설치용량
    const result = await type;
    return result;
  },

  show(id) {
    return $axios.$get(`${resource}/${id}`)
  },

  create(payload) {
    return $axios.$post(`${resource}`, payload)
  },

  update(id, payload) {
    return $axios.$post(`${resource}/${id}`, payload)
  },

  delete(id) {
    return $axios.$delete(`${resource}/${id}`)
  }
})
