<template>
  <div id="app">
    <h1>Блок-схема</h1>
    <div class="tool-wrapper">
      <button class="add-btn" @click="addNode">+</button>
    </div>
    
    <simple-flowchart :scene.sync="scene" 
      @nodeClick="nodeClick"
      @nodeDelete="nodeDelete"
      @linkBreak="linkBreak"
      @linkAdded="linkAdded"
      @canvasClick="canvasClick"
      :height="800"/>
  </div>
</template>

<script>
import SimpleFlowchart from './components/SimpleFlowchart.vue'

export default {
  name: 'app',
  components: {
    SimpleFlowchart
  },
  data() {
    return {
      scene: {
        centerX: 1024,
        centerY: 140,
        scale: 1,
        nodes: [
          {
            id: 2,
            x: -700,
            y: -69,
            type: 'Продукт 1',
            label: 'test1',
          },
          {
            id: 4,
            x: -450,
            y: -69,
            type: 'Продукт 2',
            label: 'test2',
          },
          {
            id: 6,
            x: -450,
            y: 80,
            type: 'Продукт 3',
            label: 'test3',
          }
        ],
        links: [
          {
            id: 3,
            from: 2, // node id the link start
            to: 4,  // node id the link end
            positionStart: 'node-right',
            positionEnd: 'node-left'
          },
          {
            id: 4,
            from: 4, // node id the link start
            to: 6,  // node id the link end
            positionStart: 'node-bottom',
            positionEnd: 'node-top'
          }
        ]
      },
      newNodeType: '',
      newNodeLabel: '',
    }
  },
  methods: {
    canvasClick(e) {
      console.log('canvas Click, event:', e)
    },
    addNode() {
      let maxID = Math.max(0, ...this.scene.nodes.map((link) => {
        return link.id
      }));

      this.scene.nodes.push({
        id: maxID + 1,
        x: -400,
        y: 50,
        type: this.newNodeType ? this.newNodeType: `Продукт${maxID + 1}`,
        label: this.newNodeLabel ? this.newNodeLabel: `test${maxID + 1}`,
      })
    },
    nodeClick(id) {
      console.log('node click', id);
    },
    nodeDelete(id) {
      console.log('node delete', id);
    },
    linkBreak(id) {
      console.log('link break', id);
    },
    linkAdded(link) {
      console.log('new link added:', link);
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  overflow: hidden;
  height: 800px;
  .tool-wrapper {
    position: relative;
  }
}
  .add-btn {
    position: absolute;
    padding: 5px 10px;
    background: #2c3e50;
    color: #ffffff;
    border: none;
    right: 10px;
    z-index: 1;
    cursor: pointer;
  }
</style>
