<template>
  <div class="flowchart-node" :style="nodeStyle"
    @mousedown="handleMousedown"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
    v-bind:class="{selected: options.selected === id}">
    <div class="node-port node-top"
         @mousedown="outputMouseDown"
         @mouseup="inputMouseDown"
    >
    </div>
    <div class="node-port node-left"
         @mousedown="outputMouseDown"
         @mouseup="inputMouseDown"
    >
    </div>
    <div class="node-main">
      <div v-text="type" class="node-type"></div>
      <div v-text="label" class="node-label"></div>
    </div>
    <div class="node-port node-right"
         @mousedown="outputMouseDown"
         @mouseup="inputMouseDown"
    >
    </div>
    <div class="node-port node-bottom"
         @mousedown="outputMouseDown"
         @mouseup="inputMouseDown"
    >
    </div>
    <div v-show="show.delete" class="node-delete">&times;</div>
  </div>
</template>

<script>
export default {
  name: 'FlowchartNode',
  props: {
    id: {
      type: Number,
      default: 1000,
      validator(val) {
        return typeof val === 'number'
      }
    },
    x: {
      type: Number,
      default: 0,
      validator(val) {
        return typeof val === 'number'
      }
    },
    y: {
      type: Number,
      default: 0,
      validator(val) {
        return typeof val === 'number'
      }
    },
    type: {
      type: String,
      default: 'Default'
    },
    label: {
      type: String,
      default: 'input name'
    },
    options: {
      type: Object,
      default() {
        return {
          centerX: 1024,
          scale: 1,
          centerY: 140,
        }
      }
    }
  },
  data() {
    return {
      show: {
        delete: false,
      }
    }
  },
  mounted() {
  },
  computed: {
    nodeStyle() {
      return {
        top: this.options.centerY + this.y * this.options.scale + 'px', // remove: this.options.offsetTop +
        left: this.options.centerX + this.x * this.options.scale + 'px', // remove: this.options.offsetLeft +
        transform: `scale(${this.options.scale})`,
      }
    }
  },
  methods: {
    handleMousedown(e) {
      const target = e.target || e.srcElement;
      if (target.className.indexOf('node-top') < 0
              && target.className.indexOf('node-bottom') < 0
              && target.className.indexOf('node-left') < 0
              && target.className.indexOf('node-right') < 0) {
        this.$emit('nodeSelected', e);
      }
      e.preventDefault();
    },
    handleMouseOver() {
      this.show.delete = true;
    },
    handleMouseLeave() {
      this.show.delete = false;
    },
    outputMouseDown(e) {
      console.log("outputMouseDown")
      this.$emit('linkingStart', e.target.classList[1])
      e.preventDefault();
    },
    inputMouseDown(e) {
      this.$emit('linkingStop', e.target.classList[1])
      e.preventDefault();
    },
    // inputMouseUp(e) {
    //   this.$emit('linkingStop')
    //   e.preventDefault();
    // },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$themeColor: rgb(255, 136, 85);
$portSize: 12;

.flowchart-node {
  margin: 0;
  width: 80px;
  height: 80px;
  position: absolute;
  box-sizing: border-box;
  border: none;
  background: white;
  z-index: 1;
  opacity: .9;
  cursor: move;
  transform-origin: top left;
  box-shadow: 0 0 0 2px #cccccc;
  .node-main {
    text-align: center;
    .node-type {
      background: $themeColor;
      color: white;
      font-size: 13px;
      padding: 6px;
    }
    .node-label {
      font-size: 13px;
    }
  }
  .node-port {
    position: absolute;
    width: #{$portSize}px;
    height: #{$portSize}px;
    border: 1px solid #ccc;
    border-radius: 100px;
    background: white;
    &:hover {
      background: $themeColor;
      border: 1px solid $themeColor;
    }
  }
  .node-left {
    top: calc(50% - #{$portSize/2}px);
    left: #{-2+$portSize/-2}px;
  }
  .node-right {
    top: calc(50% - #{$portSize/2}px);
    right: #{-2+$portSize/-2}px;
  }
  .node-top {
    left: 50%;
    transform: translate(-50%);
    top: #{-2+$portSize/-2}px;
  }
  .node-bottom {
    left: 50%;
    transform: translate(-50%);
    bottom: #{-2+$portSize/-2}px;
  }
  .node-delete {
    position: absolute;
    right: -6px;
    top: -6px;
    font-size: 12px;
    width: 12px;
    height: 12px;
    color: $themeColor;
    cursor: pointer;
    background: white;
    border: 1px solid $themeColor;
    border-radius: 100px;
    text-align: center;
    &:hover{
      background: $themeColor;
      color: white;
    }
  }
}
.selected {
  box-shadow: 0 0 0 2px $themeColor;
}
</style>