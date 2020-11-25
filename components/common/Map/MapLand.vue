<template>
<div>
    <div :id="id">
    </div>
</div>
</template>

<script>
export default {
    props : {
        id : { type:String }, 
        isDragging : { type : false}
    },
    data(){
        return {
            // map tile style
            cartodbUrl : "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png",
            map : null
        } 
    },
    created(){
        //this.initMap();
        // console.log(this.id)
        // if(this.id != null){
        //     this.initMap();
        // }
    }, 
    mounted(){
        this.initMap();
    },
    methods:{
        initMap(){
            var level = 8;
            //해상도 level 9로 조정			
            // if(window.innerWidth > 1920)
            // {
            //     level = 9;
            // }
            
            // land
            this.map = L.map(this.id).setView([36.279707, 127.847817],level);

            console.log(this.map)
            

            // prevent dragging
            this.map.dragging.disable();
            
            
            // set Map Options
            var koreaMap = this.map;
       

            L.tileLayer(this.cartodbUrl, {
                    attributionControl: false,
                    maxZoom :level,
                    minZoom :level,
                    preferCanvas: true,
                    noMoveStart : true,
                    zoomControl:false,
                    reuseTiles: true, 
                }).addTo(koreaMap);
            //     koreaMap.zoomControl.remove();			
            //     koreaMap.setMaxBounds([
            //         [37.993998198369574, 131.27563476562503],
            //         [34.52692430140103, 124.41741943359376]
            //     ]);  

            // koreaMap.doubleClickZoom.disable(); 
       

            // change background color
            // var korea = {
            //     "type": "Feature",
            //     "id": "KOR",
            //     "properties": {
            //         "name": "Korea",
            //         "style": {
            //             weight: 0,
            //             color: "#000d4c",
            //             opacity: 0.2,
            //             fillColor: "#000d4c",
            //         }
            //     },
            //     "geometry": {
            //         "type": "Polygon",
            //         "coordinates": RegionJson
            //     }
            // };
        
            // L.geoJson([korea], {
            //     style: function (feature) {
            //         return feature.properties && feature.properties.style;
            //     }
            // })
            // .addTo(this.map);

            // init marker
            //this.initMaker(koreaMap,jejuMap);
        }
    }
    
}
    
</script>
<style scoped>
#mainRccMap { height: 180px; }
</style>