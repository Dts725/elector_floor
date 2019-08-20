<template>
  <div class="top h100">
      <header-top class="h5"></header-top>
  
    <router-view class="h95" />
  </div>
</template>
<script>
import headerTop from "./components/header";

export default {
  components: { headerTop }
};
</script>

<style scoped>

</style>
