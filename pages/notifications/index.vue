<template>
  <section>
    <Header :title="title"/>
      
    <Bottom/>
  </section>
</template>

<script>
  export default {
    components: {
      Header: () => import('~/components/Header'),
      Bottom: () => import('~/components/Bottom')
    },
    data() {
      return {
        title: "NOTIFICATIONS",
        
      }
    }
  }
</script>
