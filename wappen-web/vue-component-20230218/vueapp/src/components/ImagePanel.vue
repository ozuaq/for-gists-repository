<template>
    <v-sheet color="grey-darken-3" rounded="lg" min-height="60vh">
        <canvas id="cvs"></canvas>
    </v-sheet>
</template>

<script>
import { watch, toRefs } from 'vue';

export default {
    props: {
        areas: Array,
        imageBase64: String
    },
    setup(props) {
        const { areas, imageBase64 } = toRefs(props);

        watch(areas, () => {
            //console.log("ImagePanel.vue: areas");
            //console.log(areas.value);
            //console.log("ImagePanel.vue: imageBase64");
            //console.log(imageBase64.value);
            var cvs = document.getElementById('cvs');
            var ctx = cvs.getContext('2d');
            //画像オブジェクトを生成
            var img = new Image();
            img.onload = function () {
                cvs.width = img.width;
                cvs.height = img.height;
                ctx.drawImage(img, 0, 0);

                let index = 0
                for (let area of areas.value) {
                    index++;
                    ctx.lineWidth = 4;
                    ctx.fillStyle = 'rgb(255,255,255)';
                    ctx.strokeStyle = 'rgb(255,0,0)';
                    ctx.strokeRect(area['x'], area['y'], area['width'], area['height']);
                    ctx.font = "20px 'ＭＳ ゴシック'";
                    ctx.strokeText(index.toString(), area['x'], area['y'] - 5);
                    ctx.fillText(index.toString(), area['x'], area['y'] - 5);
                }
            };
            img.src = "data:image/png;base64," + imageBase64.value;
        })
    }
}
</script>