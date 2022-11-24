
<template>
    <label :class="class_btn">
      <b-icon font-scale="2" icon="cloud-arrow-up-fill"></b-icon>
        {{ text_btn }}
        <b-icon class="text-danger" icon="x-circle-fill"></b-icon>
        <input type="file" @change="onChange"  :multiple="multiple" hidden/>
    </label>
</template>


<script> 
import {  mapActions , mapState} from "vuex"

  export default {
    props: { 
      multiple: {
        type: Boolean,
        default: false
      }, 
      done: {
        type: Function,
        default: () => {}
      }
    }, 
    data()  {
        return { 
        }
    },
    computed:{
        ...mapState("icp", [ 
            "file",
            "class_btn",
            "text_btn" 
        ])

    },
    methods: { 
        ...mapActions("icp", [ 
            'agregarFile',
            'deleteFile'
        ]),  
        onChange(e){

        // get the files
        let files = e.target.files;
        // Process each file
        var allFiles = []
        for (var i = 0; i < files.length; i++) {
          let file = files[i]
          // Make new FileReader
          let reader = new FileReader()
          // Convert the file to base64 text
          reader.readAsDataURL(file)
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            let fileInfo = {
              name: file.name,
              type: file.type,
              sizeKB: Math.round(file.size / 1000),
              size: Math.round(file.size / 1000)+' kB',
              base64: reader.result,
              file: file
            }

            // Push it to the state
            allFiles.push(fileInfo)
            // If all files have been proceed
            if(allFiles.length == files.length){
              // Apply Callback function
              if(this.multiple) this.done(allFiles)
              else this.agregarFile(allFiles[0])
            //   else this.done(allFiles[0]) 
            }
             // ahora
            e.target.value = '';
  
          } // reader.onload


           
        } // for
      }, // onChange()
    }
  };
</script>
<style scoped>
.text-btn{
    color : #ffffff !important;
}
</style>