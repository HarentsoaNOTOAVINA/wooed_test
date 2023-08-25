<script lang="ts" setup>
    import Loader from "@/components/Common/Loader/Loader.vue";
import * as pdfjs from "pdfjs-dist";
    import * as pdfViewer from "pdfjs-dist/web/pdf_viewer";
    import { onMounted, ref, reactive} from 'vue';

    const isLoading = ref<boolean>(true);
    const props = defineProps({
        pdfUrl : {
          type : String,
          default : ""
        },
        pageNum : {
          type: Number,
          default : 1
        },
        page : {
          type : Object,
          required : true
        }
    })
    //variables for pdf
    //constants
    const scale = 1

    //refs
    // let _pdf : any= null;

    const annotationCoordintes = reactive<any>({
      top : "0px",
      left : "0px",
      height : "0px",
      width : "0px",
      position : "absolute",
      overflowX : "hidden",
      lineHeight: "1.0",
      opacity: "0.5",
    })
    const viewerId = ref<string>("viewer-content-"+props.pageNum);
    const annotationId = ref<string>("annotation-"+props.pageNum);
    const viewerElt = ref<any>()
    const annotationElt = ref<any>();
    const ctx = ref<any>();
 
      async function renderPage(_page: any ,num : number) {
                
                const page = await _page;
                const viewport = page.getViewport({scale: scale});
                viewerElt.value.height = viewport.height;
                viewerElt.value.width = viewport.width;
                // get annotations layer
                  
                page.getAnnotations().then((annotation : any) =>{ 
                  annotationCoordintes.top =  viewerElt.value.offsetTop+"px",
                  annotationCoordintes.left = viewerElt.value.offsetLeft+"px", 
                  annotationCoordintes.height = viewerElt.value.height+"px",
                  annotationCoordintes.width = viewerElt.value.width+"px"
                  pdfjs.AnnotationLayer.render({
                    viewport  : viewport.clone({ dontFlip: true }),
                    div: annotationElt.value,
                    annotations: annotation,
                    renderForms  : true,
                    page: page
                  } as any)
                });
                // Render PDF page into canvas context
                const renderContext = {
                  canvasContext: ctx.value,
                  viewport: viewport
                };
                const renderTask = page.render(renderContext);
 
    }
    //lifecycle
    onMounted(async ()=>{

      viewerElt.value = document.querySelector('#'+viewerId.value);
      annotationElt.value = document.querySelector('#'+annotationId.value);
      ctx.value = viewerElt.value.getContext('2d');
      setTimeout(()=>{
        renderPage(props.page,props.pageNum);

      },1000)
      setTimeout(()=>{
        document.querySelectorAll("section").forEach((elt =>{
          elt.style.position = "absolute";
          elt.style.border = "none";
        }))
        isLoading.value = false;
      },5000)

    })
</script>

<template>
  <div class="viewer-wrapper">
    <div class="viewer-container">
      <canvas :id="viewerId" />
      <div 
      :id="annotationId" 
      class="annotation-container"
      :style="annotationCoordintes"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
  
  .viewer{
    &-wrapper{
      width: 100%;
      margin-bottom: -30px;
      padding-bottom: 30px;
      height: 110%;
    }
    &-container{
        &>canvas, &>div {
          width : 100% !important;
          //transform: scale(2);
          overflow : scroll;
        }
       overflow : scroll ;
      @apply w-full mt-10;
    }
  }
  .annotation{
    &-container{
      height: 100% !important;
      width : 100% !important;
     overflow: scroll;
     //background-color: rgba(172, 63, 63, 0.599);
    //display : none; /// ===> a enlever <=====
    }
  }
  div#annotation {
    &:deep() {
      & > section{
        background-color: rgba(172, 63, 63, 0.599);
        position: absolute;
        white-space: pre;
        cursor: text;
        transform-origin: 0% 0%;
        //border : none !important;
      }
      .linkAnnotation>a, .buttonWidgetAnnotation.pushButton>a{
        position: absolute;
        font-size: 1em;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
