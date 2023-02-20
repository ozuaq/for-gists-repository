<template>
    <v-card class="mx-auto mb-2" color="grey-darken-3">
        <v-card-title>{{ areaNumber }}</v-card-title>

        <v-card-actions v-show="openBtnShow()">
            <v-btn stacked @click="show = !show">
                <div v-if="!show">
                    <v-badge :content="numberOfHideAnnotations()" color="error">
                        <v-icon>mdi-chevron-down</v-icon>
                    </v-badge>
                </div>
                <div v-else>
                    <v-icon>mdi-chevron-up</v-icon>
                </div>
            </v-btn>
        </v-card-actions>

        <div v-show="!show">
            <Annotation v-for="annotation in getRepresentativeAnnotations()" :key="annotation.pk"
                :annotation="annotation" />
        </div>

        <v-expand-transition>
            <div v-show="show">
                <v-tabs v-model="tab" color="primary" grow>
                    <v-tab value="sortByThumbups">
                        <v-icon size="x-large">mdi-thumb-up</v-icon>
                    </v-tab>
                    <v-tab value="sortByNewArrivals">
                        <v-icon size="x-large">mdi-update</v-icon>
                    </v-tab>
                </v-tabs>

                <Annotation v-for="annotation in getAnnotations()" :key="annotation.pk" :annotation="annotation" />
            </div>
        </v-expand-transition>
    </v-card>
</template>

<script>
import {
    toRefs,
    watch,
    ref
} from 'vue';
import Annotation from './Annotation.vue';

export default {
    components: {
        Annotation
    },
    props: {
        annotations: Array,
        areaNumber: Number,
        NumberOfRepresentativeAnnotations: Number
    },
    setup(props) {
        const { annotations, areaNumber, NumberOfRepresentativeAnnotations } = toRefs(props);
        const show = ref(false);
        const tab = ref("sortByThumbups");

        const getAnnotations = () => {
            let sortAnnotations = []
            switch (tab.value) {
                case "sortByThumbups":
                    sortAnnotations = annotations.value.slice().sort((a, b) => {
                        if (a.numberOfThumbupUsers !== b.numberOfThumbupUsers) {
                            return (a.numberOfThumbupUsers - b.numberOfThumbupUsers) * -1;
                        }
                        if (a.date !== b.date) {
                            if (a.date < b.date) return 1;
                            if (a.date > b.date) return -1;
                        }
                        return 0;
                    })
                    break;

                case "sortByNewArrivals":
                    sortAnnotations = annotations.value.slice().sort((a, b) => {
                        if (a.date !== b.date) {
                            if (a.date < b.date) return 1;
                            if (a.date > b.date) return -1;
                        }
                        return 0;
                    })
                    break;
            }
            return sortAnnotations;
        }
        const getRepresentativeAnnotations = () => {
            //console.log("AreaAnnotations.vue: annotations");
            //console.log(annotations.value);
            return getAnnotations().slice(0, NumberOfRepresentativeAnnotations.value);
        }
        const openBtnShow = () => {
            /*
            console.log("areaNumber" + areaNumber.value);
            console.log(annotations.value.length > NumberOfRepresentativeAnnotations.value.length);
            console.log("annotations length");
            console.log(annotations.value.length);
            console.log("NumberOfRepresentativeAnnotations length");
            console.log(NumberOfRepresentativeAnnotations.value);
            */
            return annotations.value.length > NumberOfRepresentativeAnnotations.value
        }
        const numberOfHideAnnotations = () => {
            return annotations.value.length - NumberOfRepresentativeAnnotations.value
        }

        /*
        watch(tab, () => {
            console.log("AreaAnnotations.vue Area " + areaNumber.value);
            console.log("tab value");
            console.log(tab.value);
        });
        */

        return {
            annotations,
            show,
            tab,
            getRepresentativeAnnotations,
            openBtnShow,
            numberOfHideAnnotations,
            getAnnotations
        }
    }
}
</script>