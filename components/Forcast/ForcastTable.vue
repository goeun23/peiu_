<template>
  <div class="fixed_tbl_wrap">
    <div class="tbl_wrap record_tbl">
      <table id="t" border="0" cellpadding="0" cellspacing="0" summary="">
        <thead>
          <tr>
            <th style="width: 13rem">
              <button
                @click="prev()"
                type="button"
                class="btn"
                style="font-color: white"
              >
                <span>◁</span>
              </button>
              {{ date }}
              <button
                @click="next()"
                type="button"
                class="btn"
                style="font-color: white"
              >
                <span>▷</span>
              </button>
            </th>
            <th
              style="text-align: center; width: 7rem"
              v-for="v in thead"
              :key="v.hour"
            >
              <span>{{ v.hour }}</span>
            </th>
          </tr>
        </thead>
        <tbody style="height: 12.5rem">
          <tr>
            <td style="width: 12.5rem"><span>예측값</span></td>
            <td
              style="text-align: center; width: 7rem"
              v-for="v in tbody_table"
              :key="v.index"
            >
              <span>{{ v.forcast }}</span>
            </td>
          </tr>

          <tr>
            <td style="width: 12.5rem"><span>실제값</span></td>
            <td
              style="text-align: center; width: 7rem"
              v-for="v in tbody_table"
              :key="v.index"
            >
              <span>{{ v.pvgen }}</span>
            </td>
          </tr>

          <tr>
            <td style="width: 12.5rem"><span>오차율</span></td>
            <td
              style="text-align: center; width: 7rem"
              v-for="v in tbody_table"
              :key="v.index"
            >
              <span>{{ v.error }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>