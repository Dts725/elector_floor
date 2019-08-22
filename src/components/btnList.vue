<template >
  <div class="case">
    <ul class="uls">
      <li
        v-for="(el,index) in btnList"
        :key="index"
        @click="btnFn(el.value)"
        class="lis"
        :style="{'background-color':el.color}"
      >
        <p>
          {{el.title}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btnList: [
        {
          title: "全部",
          value: "all",
          color: "#A79FBF"
        },
        {
          title: "可安装",
          value: "1",
          color: "#FFA102"
        },

        {
          title: "已签约",
          value: "3",
          color: "#0388FF"
        },
        {
          title: "施工中",
          value: "4"
        },
        {
          title: "已交付",
          value: "5",
          color: "#37C978"
        }
      ]
    };
  },
  methods: {
    btnFn(value) {
      //   for (let i = 0; i < event.path[2].children.length; i++) {
      //     event.path[2].children[i].style.fontSize = "1rem";
      //     event.target.style.fontSize = "1.5rem";
      //   }
      //   event.path[2].children.forEach(el => {
      //     el.target.style.fontSize = "1em";
      //   });
      this.$emit("emitParent", value);
    }
  }
};
</script>
<style scoped>
.case {
  width: 40px;
}

.lis {
  height: 8em;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  writing-mode: vertical-rl;
  background-color: red;
  border-radius: 10px 0 0 10px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}
</style>