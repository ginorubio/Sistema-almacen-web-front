<template>
  <content-header title="Home" />
  <content>
    <div class="row">
      <div class="col-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Home</h3>
          </div>
          <div class="card-body" >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti id, placeat laborum, ab hic consequuntur sed animi facere voluptates architecto porro cum molestias totam maiores modi, eos ipsum! Quibusdam, repudiandae.
          </div>
          <div class="card-footer">
            Footer
          </div>
        </div>

      </div>
    </div>
  </content>
</template>

<script>
import ContentHeader from "@/components/ContentHeader.vue";
import Content from "@/components/Content.vue";

export default{
  components: {
    ContentHeader, Content
  }
}

</script>