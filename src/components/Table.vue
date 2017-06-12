<template>
    <div id="table" v-if="itemKeys.length">

      <div class="fixed">
        <table class="table-fixed">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="items" v-for="item in items">
              <td contenteditable="true">{{ item.itemName }}</td>
            </tr>
            <tr v-if="rooms" v-for="room in rooms">
              <td contenteditable="false">
                <router-link :to="{ name: 'Room', params: {
                  buildingId: buildingId,
                  floorId: floorId,
                  roomId: room.roomId } }">
                  <strong>
                    {{room.roomName}}
                  </strong>
                </router-link>
              </td>

            </tr>
          </tbody>
        </table>
      </div>

      <div class="scroll">
        <table class="table-content">
          <thead>
            <tr>
              <th v-for="key in itemKeys" v-if="key !=='roomName' && key !=='itemName'&& key !== 'roomId' && key !== 'itemId'">{{ key }}</th>
            </tr>
          </thead>
          <tbody>

            <tr v-if="items" v-for="item in items">
              <td contenteditable="true" v-for="key in itemKeys" v-if="typeof(item[key]) !== 'object' && key !== 'itemName' && key !== 'itemId'">
                {{ item[key] }}
              </td>
              <td contenteditable="true" v-else-if="key === 'location'">
                {{ item[key].buildingName }} / {{ item[key].floorName }} / {{ item[key].roomName }}
              </td>
              <td contenteditable="true" v-else-if="key === 'tags' || key === 'size'">
                <span v-for="tag in item[key]"> {{tag}},</span>
              </td>
            </tr>

            <tr v-if="rooms" v-for="room in rooms">
              <td contenteditable="true" v-for="key in itemKeys" v-if="typeof(room[key]) !== 'object' && key !== 'roomName' && key !== 'roomId'">
                {{ room[key] }}
              </td>
              <td contenteditable="true" v-else-if="key === 'tags' || key === 'size'">
                <span v-for="tag in room[key]">
                  {{tag}},
                </span>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>

</template>


<script>
/* eslint-disable */
export default {
  props: ['floorId', 'roomId', 'buildingId'],
  computed: {
    items: function() {
      if(this.roomId) {
        return this.$store.getters.g_itemsByLocation;
      } else {
        return null;
      }
    },
    rooms: function() {
      if(this.floorId) {
        return this.$store.getters.g_getRoomsByFloorId(this.floorId);
      } else {
        return null;
      }
    },
    itemKeys: function() {
      let keys = [];
      if(this.items) {
        this.items.forEach(function(elem){
          for(let key in elem) {
            if(!keys.includes(key)) {
              keys.push(key);
            }
          }
        });
      };
      if(this.rooms) {
        for(let elem in this.rooms) {
          for(let key in this.rooms[elem]) {
            if(!keys.includes(key)) {
              keys.push(key);
            }
          }
        };
      };
      return keys;
    },
  },
};
</script>

<style scoped lang="postcss">

  #table {
    * {
      box-sizing: border-box;
      /*outline: none;*/
    }
    display: flex;
    flex-direction: row;
    width: 100%;
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.08);
    table {
      border-collapse: collapse;
      font-size: 0.9em;
      font-weight: normal;
      min-width: 100%;
      text-align: left;
      thead {
        tr {
          height: 40px;
          background-color: rgba(0, 0, 0, 0.04);
        }
      }
      tbody {
      }
      th, td {
        padding: 7px 10px 7px 10px;
        word-break: nowrap;
        white-space: nowrap;
      }
      tr {
        height: auto;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      }
      tr:nth-child(2n) {
        background-color: rgba(0, 0, 0, 0.02);
      }
    }
    .fixed {
      width: 20%;
      position: relative;
      .table-fixed {
        position: absolute;
        left: 0px;
        top: 0px;
      }
    }
    .scroll {
      overflow-x: scroll;
      width: 80%;
      .table-content {
        th {
          resize: horizontal;
          overflow: auto;
        }
      }
    }
  }

</style>
