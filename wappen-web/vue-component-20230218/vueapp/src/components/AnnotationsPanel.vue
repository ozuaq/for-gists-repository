<template>
    <div v-if="areaAnnotationsExist()">
        <AreaAnnotations v-for="(area, index) in areaAnnotations" :key="area.rectId" :areaNumber="index + 1"
            :annotations="area.annotations" :NumberOfRepresentativeAnnotations="NumberOfRepresentativeAnnotations" />
    </div>
    <v-sheet v-else color="grey-darken-3 mt-3" rounded="lg" min-height="60vh">
        <v-row class="mx-auto" style="height: 430px;" justify="center" align-content="center">
            <v-col cols=6>
                アノテーションがありません
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script>
import {
    toRefs,
    watch,
    ref
} from 'vue';
import AreaAnnotations from './AreaAnnotations.vue';

export default {
    components: {
        AreaAnnotations
    },
    props: {
        areaAnnotations: Array
    },
    setup(props) {
        const { areaAnnotations } = toRefs(props);
        const NumberOfRepresentativeAnnotations = ref(1);
        const areaAnnotationsExist = () => {
            if (areaAnnotations.value.length < 1) {
                return false;
            }
            return true;
        }

        return {
            areaAnnotations,
            NumberOfRepresentativeAnnotations,
            areaAnnotationsExist
        }
    }
}
</script>
<style>

</style>