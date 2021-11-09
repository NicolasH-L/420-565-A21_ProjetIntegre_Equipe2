<template>
  
  <div className="grad">
      <div className="py-3">
        <div className="justify-content-start d-flex mx-5">
          <button className="btn btn-light" @click="goBack()">
            <i className="fas fa-angle-double-left"></i> Retour
          </button>
        </div>
        <div className="justify-content-center d-flex">
          <div><vue-pdf-embed ref="pdfRef" :source="content" :page="page" @rendered="handleDocumentRender" /></div>
        </div>
        <div className="justify-content-center d-flex pt-3 text-light">
          <p>
            {{ page }} / {{ pageCount }}
          </p>
        </div>
        <div className="justify-content-center d-flex">
          <button className="btn btn-dark mx-3" type="button" :disabled="page <= 1" @click="page--">
            Précédent
          </button>
          <button className="btn btn-dark" type="button" :disabled="page >= pageCount" @click="page++">
            Suivant
          </button>
        </div>
      </div>
    </div>
</template>

<script>
import VuePdfEmbed from 'vue-pdf-embed'
import router from "../router";

export default {
  name: "ViewDocument",
  components: {
    VuePdfEmbed
  },
  data() {
    return {
      page:1,
      pageCount: 1,
      content: this.base64ToArrayBuffer(),
      id:{id:this.$route.query[0]}
    };
  },
  methods: {
    base64ToArrayBuffer() {
      let binary_string = window.atob(this.$route.params.data);
      let len = binary_string.length;
      let bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    },
    handleDocumentRender() {
      this.pageCount = this.$refs.pdfRef.pageCount
    },
    goBack(){
       router.push({ name: "StudentDocuments", params: this.id})
    }
  },
};
</script>

<style></style>
