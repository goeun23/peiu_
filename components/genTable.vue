<template>
    <div class="resultDiv">
      <table class='data-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>발전량(kWh)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ESS#1</td>
            <td>ESS</td>
            <td>32,323</td>
          </tr>
          <tr>
            <td>ESS#1</td>
            <td>ESS</td>
            <td>32,323</td>
          </tr>
          <tr>
            <td>ESS#1</td>
            <td>ESS</td>
            <td>32,323</td>
          </tr>
          <tr>
            <td>ESS#1</td>
            <td>ESS</td>
            <td>32,323</td>
          </tr>
          <tr>
            <td>ESS#1</td>
            <td>ESS</td>
            <td>32,323</td>
          </tr>
          <tr>
            <td>ESS#1</td>
            <td>ESS</td>
            <td>32,323</td>
          </tr>
          <tr>
            <td>ESS#1</td>
            <td>ESS</td>
            <td>32,323</td>
          </tr>
          <tr>
            <td>ESS#1</td>
            <td>ESS</td>
            <td>32,323</td>
          </tr>
          <tr>
            <td>ESS#1</td>
            <td>ESS</td>
            <td>32,323</td>
          </tr>
          <tr>
            <td>ESS#1</td>
            <td>ESS</td>
            <td>32,323</td>
          </tr>
          <tr>
            <td>ESS#1</td>
            <td>ESS</td>
            <td>32,323</td>
          </tr>
          <tr>
            <td>ESS#1</td>
            <td>ESS</td>
            <td>32,323</td>
          </tr>
          <tr>
            <td>ESS#1</td>
            <td>ESS</td>
            <td>32,323</td>
          </tr>
          <tr>
            <td>ESS#1</td>
            <td>ESS</td>
            <td>32,323</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
export default {
  data() {
    return {
      recvData: ""
    };
  },
  created() {
    this.$nuxt.$on("MY_TEST", data => {
      this.recvData = data;
      //console.log("recvData = " + this.recvData);
    });
  },
  beforeDestroy() {
    // this.$nuxt.$off('MY_TEST')
  }
};
</script>


<style>
.resultDiv {
  width: 100%;
  height: 450px;
  background-color: beige;
  border: 1px solid white;
  outline-style: greenyellow solid 1px;
}
.data-table {
  width: 100%;
  background: black;
}

table > * {
  text-align: center;
  line-height: 40px;
  overflow-y: auto;
}
</style>
