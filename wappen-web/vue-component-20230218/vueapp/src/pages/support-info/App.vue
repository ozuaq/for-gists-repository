<template>
  <v-app id="inspire">
    <v-app-bar flat>
      <v-container class="fill-height d-flex align-center">
        <v-avatar class="mr-10 ml-4" color="grey-darken-1" size="32"></v-avatar>

        <v-btn v-for="link in links" :key="link" variant="text">
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field density="compact" hide-details variant="solo"></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="bg-black">
      <v-container>
        <v-row>
          <v-col cols="auto">
            <!--
            
              
            -->
            <ImagePanel class="sticky-item" :areas="areas" :imageBase64="imageBase64" />
          </v-col>

          <v-col>
            <!--
            
              
            -->
            <AnnotationsPanel :areaAnnotations="areaAnnotations" />  
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { onMounted, ref } from 'vue'

import AnnotationsPanel from '../../components/AnnotationsPanel.vue'
import ImagePanel from '../../components/ImagePanel.vue'

export default {
  name: 'App',
  components: {
    AnnotationsPanel,
    ImagePanel
  },
  setup() {
    let userName = "";
    const areaAnnotations = ref([]);
    const areas = ref([]);
    const imageBase64 = ref("");

    onMounted(() => {
      userName = JSON.parse(document.getElementById("userName").textContent);
      console.log("App.vue: userName: " + userName);

      const connection = new WebSocket("ws://" + window.location.host + "/filter/" + userName + "/");

      connection.onopen = function () {
        console.log("App.vue: start webSocket connection");
      }

      connection.onmessage = function (event) {
        const data = JSON.parse(event.data);
        //console.log("App.vue: onmessage data.type & data");
        //console.log(data.type);
        //console.log(data);
        switch (data.type) {
          case "annotation":
            //console.log("App.vue: areaAnnotations");
            //console.log(data.areaAnnotations);
            areaAnnotations.value = data.areaAnnotations;
            break;
          case "image":
            //console.log("App.vue: areas");
            //console.log(data.areas);
            //console.log("App.vue: imageBase64");
            areas.value = data.areas;
            imageBase64.value = data.imageBase64;
            break;
          default:
            break;
        }
      }
    })

    return {
      areaAnnotations: areaAnnotations,
      areas: areas,
      imageBase64: imageBase64
    }
  },
  data: () => ({
    links: [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates',
    ],
  }),
}
</script>
<style>
.sticky-item {
  position: sticky;
  top: 5rem;
  max-height: 100vh;
  overflow: scroll;
}
</style>