<template>
  <div class="area_sel">
    <ul>
      <li class="area_big">
        <dl>
          <dt id="SelectedArea" @click="Moveto1depth()">전국</dt>
          <dd>
            <ul>
              <!-- <li v-for="v in AreaList" :key="v.idx">
                <button
                  name="area"
                  type="button"
                  @click="showAreaList(v.idx, true)"
                  :id="v.idx"
                  :value="v.idx"
                  :data-rcc-id="v.idx"
                >
                  {{ v.area }}
                </button>
              </li> -->
            </ul>
          </dd>
        </dl>
      </li>
      <li class="area_mid">
        <dl>
          <dt id="areaName2">시군구</dt>
          <dd>
            <ul id="localList"></ul>
          </dd>
        </dl>
      </li>
      <li class="area_small">
        <dl>
          <dt id="areaName3">읍면동</dt>
          <dd>
            <ul id="localList2"></ul>
          </dd>
        </dl>
      </li>
    </ul>
    <div class="area_size_btn">
      <button @click="hideLayer()" type="button">
        <span class="hide">사이즈수정</span>
      </button>
    </div>
  </div>
</template>