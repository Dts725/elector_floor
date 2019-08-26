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
        <p class="disabled">
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
          title: "可创造条件安装",
          value: "7",
          color: "#F43EF2"
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
      this.$nextTick(el => {
        for (let i = 0; i < event.path[1].children.length; i++) {
          event.path[1].children[i].style.transform = "translateX(0)";
          event.path[1].children[i].style.width = "30px";
        }
        event.path[0].style.transform = "translateX(-10px)";
        event.path[0].style.width = "40px";
      });

      // event.path[2].children.forEach(el => {
      //   el.target.style.width = "50px";
      // });
      this.$emit("emitParent", value); 
    }
  }
};
</script>
<style scoped>
.case {
  width: 30px;
}

.lis {
  min-height: 6em;
  padding: 10px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  writing-mode: vertical-rl;
  background-color: red;
  border-radius: 10px 0 0 10px;
  color: #fff;
  font-size: 0.9rem;
  cursor: pointer;
}
.disabled {
  pointer-events: none;
  cursor: default;
  opacity: 1;
}
.lis:nth-of-type(1) {
  width: 40px;
  transform: translateX(-10px);
}
</style>