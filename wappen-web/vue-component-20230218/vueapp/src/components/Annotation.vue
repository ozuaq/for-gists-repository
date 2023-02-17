<template>
    <v-card class="ma-1" color="grey-darken-2" prepend-icon="mdi-account-circle">
        <template v-slot:prepend>
            <v-icon size="x-large"></v-icon>
            <span class="subheading mr-2">{{ annotation.userId }}</span>
        </template>
        <v-card-subtitle>
            {{ annotation.date }}
        </v-card-subtitle>
        <v-card-text>
            {{ annotation.text }}
        </v-card-text>

        <v-card-actions>
            <v-row class="mr-2 justify-end">
                <v-icon v-if="annotation.isThumbup" color="red lighten-2" @click="getThumbUpResponse" class="mr-1">
                    mdi-thumb-up
                </v-icon>
                <v-icon v-else color="grey lighten-2" @click="getThumbUpResponse" class="mr-1">
                    mdi-thumb-up
                </v-icon>
                <span class="subheading mr-2">{{ annotation.numberOfThumbupUsers }}</span>
            </v-row>
        </v-card-actions>
    </v-card>
</template>

<script>
import { toRefs, watch, toRef } from 'vue';
import axios from 'axios';

export default {
    props: {
        annotation: {
            pk: Number,
            userId: String,
            text: String,
            date: String,
            rectId: Number,
            isThumbup: Boolean,
            numberOfThumbupUsers: Number
        }
    },
    setup(props) {
        const { annotation } = toRefs(props);
        //const annotation = toRef(props, 'annotation');
        const userName = JSON.parse(document.getElementById("userName").textContent);
        const apiURL = "http://" + window.location.host + "/api/annotation_to_thumbup/";
        const getThumbUpResponse = async () => {
            const response = await axios.post(apiURL, {
                username: userName,
                annotation_id: annotation.value.pk
            }).then(function (result) {
                //console.log(result);
                return result.data;
            }).catch(function (error) {
                //console.log(error);
                return {};
            });

            console.log("Annotation.vue: response");
            console.log(response);
            annotation.value.numberOfThumbupUsers = response.numberOfThumbupUsers;
            annotation.value.isThumbup = response.isThumbup;
        }

        watch(annotation, () => {
            //console.log("Annotation.vue: annotation");
            //console.log(annotation.value.text);
        });

        //console.log("Annotation.vue: userName");
        //console.log(userName);
        //console.log("Annotation.vue: url");
        //console.log(apiURL);

        return {
            annotation,
            getThumbUpResponse
        }
    }
}
</script>