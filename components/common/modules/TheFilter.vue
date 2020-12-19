<template>
  <div>
    <div class="sel_set_wrap">
      <select
        id="evtCategory"
        @change="SetCategory($event)"
        class="sel sel_size1"
      >
        <option value="criteria" selected="selected">
          {{ $t("statstics.criteria") }}
        </option>
        <option value="rcc">{{ $t("manage.area") }}</option>
        <option value="agg">{{ $t("manage.agg") }}</option>
        <option value="site">자원</option>
      </select>
    </div>
    <div class="sel_set_wrap aggforsiteid">
      <select
        id="rccaggcategory"
        @change="setselectId($event)"
        class="sel sel_size1"
      >
        <option value="rccaggcriteria" selected="selected">
          {{ criteria }}
        </option>
        <option v-for="v in OptionList" :key="v.idx" :value="v.id">
          {{ v.value }}
        </option>
      </select>
    </div>
    <!-- siteid 선택하기 -->
    <div class="sel_set_wrap site">
      <select
        id="siteidcategory"
        @change="setSiteId($event)"
        style="width: 22.5rem"
        class="sel sel_size1"
      >
        <option value="siteidcriteria" selected="selected">자원</option>
        <option v-for="v in SiteList" :key="v.idx" :value="v.siteid">
          {{ v.represenation }}({{ v.siteid }})
        </option>
      </select>
    </div>
    <!-- 날짜 -->
    <div class="btn_sel_wrap">
      <dl>
        <dt style="padding-right: 0.9rem"></dt>
        <dd>
          <span class="pick_calendar_wrap">
            <input
              autocomplete="off"
              id="startDate"
              type="text"
              class="pick_calendar"
              readonly
            />
          </span>
          ~
          <span class="pick_calendar_wrap">
            <input
              autocomplete="off"
              id="endDate"
              type="text"
              class="pick_calendar"
              readonly
            />
          </span>
          <button @click="setToday()" type="button" class="btn btn_sel">
            <span>금일</span>
          </button>
          <button @click="getStatChart()" type="button" class="btn btn_search">
            <span class="hide">찾기</span>
          </button>
          <button @click="downloadCSV()" type="button" class="btn btn_down">
            <span class="hide">다운받기</span>
          </button>
        </dd>
      </dl>
    </div>
  </div>
</template>