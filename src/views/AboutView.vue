<template>
  <content-header title="About" />
  <content>
    <div class="row">
      <div class="col-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">About</h3>
          </div>
          <div class="card-body" >
            
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
import ContentHeader from '@/components/ContentHeader.vue';
import Content from '@/components/Content.vue';

export default{
    components:{
      ContentHeader, Content
    }
        
}
</script>