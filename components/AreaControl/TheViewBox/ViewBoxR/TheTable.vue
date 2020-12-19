<template>
  <dl>
    <dt>{{ $t("areaControl.EventRecord") }} {{ occurEvtCount }}</dt>
    <dd>
      <div class="error_wrap">
        <div class="fixed_tbl_wrap">
          <div id="tbl_error" class="tbl_wrap tbl_error_info">
            <table>
              <caption></caption>
              <colgroup>
                <col width="11%" />
                <col width="27%" />
                <col width="7%" />
                <col width="*" />
              </colgroup>
              <thead>
                <th>{{ $t("areaControl.Device") }}</th>
                <th style="width: 23rem">
                  {{ $t("areaControl.EventName") }}
                </th>
                <th style="width: 15rem">
                  {{ $t("areaControl.OccourTime") }}
                </th>
                <th style="width: 15rem">
                  {{ $t("areaControl.RecoveryTime") }}
                </th>
                <th>ACK</th>
                <th>{{ $t("areaControl.Status") }}</th>
              </thead>
              <tbody>
                <tr
                  id="historytabletbody"
                  v-for="v in eventList"
                  :key="v.index"
                >
                  <td>
                    <span>{{ v.deviceId }}</span>
                  </td>
                  <td style="width: 23rem">
                    <span>{{ v.description }}</span>
                  </td>
                  <td style="width: 15rem">
                    <span>{{ v.createDT }}</span>
                  </td>
                  <td style="width: 15rem">
                    <span>{{ v.recoveryDT }}</span>
                  </td>
                  <td>
                    <button
                      :id="v.eventId"
                      type="button"
                      class="btn btn_tbl_inner"
                    >
                      <span>ACK</span>
                    </button>
                  </td>
                  <td>
                    <span class="error_state">{{ v.msg }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </dd>
  </dl>
</template>