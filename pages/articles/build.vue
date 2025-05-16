<template lang="html">
    <div id="div-hydra" ref="div-hydra"></div>
    <div id="builder-container">
        <div id="overlay">
            <div id="procedure">
                <h2>Procedure</h2>
                <p>
                    To contribute an article, you can create a Markdown file using the editor provided here or download it via a button (to be implemented). Alternatively, you can create the file manually. Once the file is ready, it must be sent to a moderator of the Toplap node for auditing. If the article passes the review, it will be included on the page.
                </p>
            </div>

            <h1 id="title">Builder</h1>
            <div id="article-metadata">
                
                <div id="article-metadata-info">
                    <div class="article-metadata-row">
                        <label for="article-title">Title:</label>
                        <input type="text" id="article-title" v-model="articleTitle" />
                    </div>
                    <div class="article-metadata-row">
                        <label for="article-author">Author:</label>
                        <input type="text" id="article-author" v-model="articleAuthor" />
                    </div>
                    <div class="article-metadata-row">
                        <label for="article-image" class="">Cover image:</label>
                        <label for="article-image" class="custom-file-upload">Upload image</label>
                        <input type="file" id="article-image" @change="handleImageUpload" />
                    </div>
                    <div class="article-metadata-row">
                        <p style="font-size:.8rem">(Image defaults to the one shown in the preview if not provided)</p>
                    </div>
                    <div class="article-metadata-row">
                        <label for="article-description">Description:</label>
                        <input type="text" id="article-description" v-model="articleDescription" />
                    </div>
                    <div class="article-metadata-row">
                        <label for="article-tags">Tags:</label>
                        <div id="article-tags">
                            <!-- Tags selection will be implemented here -->
                        </div>
                    </div>

                </div>

                <div id="article-metadata-preview">
                    <div id="article-preview">
                        <div id="builder-image-container">
                            <img id="builder-image" :src="articleSrc" alt="Card Image">
                        </div>
                        <div id="builder-info">
                            <div class="builder-title">{{ articleTitle }}</div>
                            <div class="builder-author">{{ articleAuthor }}</div>
                            <div class="builder-description">{{ articleDescription }}</div>
                            <div>YYYY-MM-DD</div>
                            <div class="card-tags">{{ articleTags }}</div>
                        </div>
                    </div>
                    
                </div>
            </div>
            

            <p> As you type in Markdown, the live preview on the left dynamically updates to display the rendered HTML output.</p>
            <div id="builder">

                <div id="html-preview">
                    <div class="html-header left">Preview</div>
                    <div id="div-html" ref='div-html'></div>
                </div>

                <div id="html-editor">
                    <div class="html-header right">Markdown editor</div>
                    <div v-show="aceLoaded" id="div-editor" ref="div-editor"></div>
                </div>

            </div>

            <input type="button" value="Download" id="download-button" @click="download" />

            
        </div>
    </div>
</template>
<script setup>
import DOMpurify from 'dompurify'
import {marked} from 'marked'

useHead({
    script:[{
        id:'ace',
        src:"https://cdnjs.cloudflare.com/ajax/libs/ace/1.41.0/ace.js",
        defer:true,
        'onload': () =>{onAceLoaded()},
    }]
})

// Article related variables
const articleTitle = ref('title placeholder')
const articleAuthor = ref('author placeholder')
const articleDescription = ref('description placeholder')
const articleFile = ref(null)
const articleTags = ref([])
const articleSrc = ref('')

// Ace editor related variables
const aceLoaded = ref(false)
const aceEditor = ref(null)

// Template references
const divEditor = useTemplateRef('div-editor')
const divHtml = useTemplateRef('div-html')
const divHydra = useTemplateRef('div-hydra')

const { $hydra1,$showCanvas } = useNuxtApp()


articleSrc.value = `${useRuntimeConfig().app.baseURL}images/default.png`
// onMounted(async ()=>{
//     let response = await fetch(articleSrc.value);
//     let blob = await response.blob();
//     articleFile.value = new File([blob], 'default.png', { type: blob.type });
// })

onMounted(() => {
    $showCanvas()
    $hydra1.eval('osc(6, 0.1, 0.8).rotate(-Math.PI/2).color(-1, 1).out()')
    divHydra.value.appendChild($hydra1.canvas);
})


const onAceLoaded = () => {
    aceLoaded.value = true

    aceEditor.value = ace.edit(divEditor.value,{
        mode: "ace/mode/markdown",
        theme: "ace/theme/monokai",
        copyWithEmptySelection: true,
        
    })
    aceEditor.value.setTheme("ace/theme/monokai");
    aceEditor.value.session.setMode("ace/mode/markdown");
    let supp = "(markdown rendered with a padding of 20px)\n\n"
    supp += "# First paragraph\n"
    supp += "Content of **first** paragraph\n\n"
    supp += "## Second paragraph\n"
    supp += "Content of *second* paragraph\n\n"

    supp += "(more on markdown syntax at \n"
    supp += "https://www.markdownguide.org/basic-syntax/)\n"

    aceEditor.value.on("change", () => {
        let html = aceEditor.value.getValue()
        divHtml.value.innerHTML = DOMpurify.sanitize(marked.parse(html));
    });
    aceEditor.value.setValue(supp,1)

}

const handleImageUpload = (event) => {
    articleFile.value = event.target.files[0];
    if (!articleFile.value.type.startsWith("image/") || articleFile.type === "image/svg+xml") {
        alert("Only images are allowed")
        return
    }
    console.log(articleFile.value)
    articleSrc.value = URL.createObjectURL(articleFile.value);
    
}


import  JSZip  from 'jszip'

async function download() {
    const zip = new JSZip()

    // Add markdown content
    zip.file('article.md', aceEditor.value.getValue())

    // Add the cover image
    if (articleFile.value){
        zip.file('cover.jpg', articleFile.value)
    }

    // Add metadata
    let metadata = {
        title: articleTitle.value,
        author: articleAuthor.value,
        description: articleDescription.value,
        tags: articleTags.value,
    }


    zip.file('meta.json', JSON.stringify(metadata, null, 2))

    // Generate the ZIP
    const blob = await zip.generateAsync({ type: 'blob' })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'article.zip'
    link.click()

}


</script>
<style lang="css" scoped>
    #title{
        position: relative;
        z-index: 1;
    }
    p{
        font-size:1rem;
    }
    #builder-container{
        width: 100%;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        background: #222;
        color: white;
    }
    #div-hydra{
        position: fixed;
        top: 4vh;
        width: 100%;
        height: 96vh;
        z-index: 0;
        display: flex;
    }
    #overlay{
        position: relative;
        width: 94%;
        min-height: 96vh;
        z-index: 0;
        padding:10px;
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        background: linear-gradient(black, rgba(0, 0, 0, 0.8));
        
    }
    #builder{
        position: relative;
        width: 100%;
        height: 60vh;
        background: black;
        color:white;
        border-right: 1px solid white;
        border-left: 1px solid white;
        box-sizing: border-box;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    #article-metadata{
        position: relative;
        width: 100%;
        background: black;
        color:white;
        border-right: 1px solid white;
        border-left: 1px solid white;
        box-sizing: border-box;
        padding:10px;

        display: flex;
        flex-direction: row;
    }
    #article-metadata-info{
        position: relative;
        width: 100%;
        flex: 1;
        overflow: auto;

        scrollbar-width: thin;
        scrollbar-color: #888 #333;
    }
    #article-metadata-preview{
        border: 1px solid grey;
        flex: 1;

        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-left: 20px;
    }
    .article-metadata-row{
        
        position: relative;
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        margin:10px 0;
        box-sizing: border-box;
        gap:20px;
    }

    input[type="text"]{
        width: 50%;
        background: #333;
        color: white;
        border: 1px solid grey;
        border-radius: 5px;
        padding: 5px;
    }
    #html-preview{
        height: 100%;
        flex:1;
        /* background: green; */
        margin:0;
        padding:0;

        border-right: 1px solid grey;
        border-bottom: 1px solid white;

        box-sizing: border-box;
    }

    #html-editor{
        position: relative;
        height: 100%;
        flex:1;

        /* background: blue; */
        display: flex;
        flex-direction: column;

        border-left: 1px solid grey;
        border-bottom: 1px solid white;

        box-sizing: border-box;
    }
    
    .html-header{
        width: 100%;
        background: #333;

        border-bottom: 1px solid grey;
        border-top: 1px solid white;
        box-sizing: border-box;


        box-sizing: border-box;
        color: white;
        text-align: center;
        line-height: 30px;
        font-size: 20px;
    }
    
    #div-editor{
        width: 100%;
        height: 100%;
        background: #333;
        color: white;

    }
    
    #download-button{
        margin: 10px;
        padding: 10px;
        background: #333;
        color: white;
        border: 1px ;
        border-radius: 5px;
        cursor: pointer;
    }
    .custom-file-upload {
        display: inline-block;
        padding: 8px 16px;
        cursor: pointer;
        background-color: black;
        border: 1px solid white;
        color: white;
        border-radius: 4px;
        font-weight: bold;
    }
    .custom-file-upload:hover {
        background-color: #444;
    }

    input[type="file"] {
        display: none;
  }

 #article-metadata-preview{
    position: relative;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;


 }
  #article-preview{
    position: relative;
    width: 70%;

    aspect-ratio: 16/9;
    overflow: hidden;
    box-sizing: border-box;

    border: 1px dashed grey;

    }
    #builder-image-container{
        position: relative;
        width: 100%;
        height: 100%;
        
        box-sizing: border-box;
    }
    #builder-image{
       position:absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        
    }
    #builder-info{
        font-size: 1rem;
        position:absolute;
        bottom:0;
        left: 0;
        height: 40%;
        width:100%;
        background: rgba(0, 0, 0, 0.85);
        overflow: auto;

        scrollbar-width: thin;
        scrollbar-color: #888 #1e1e1e;
    }
    #div-html{
        padding:20px;
    }
</style>